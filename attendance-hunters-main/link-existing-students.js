const { PrismaClient } = require('./server/api/generated/prisma');

async function linkExistingStudents() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🔗 Linking existing students to user accounts...\n');
        
        // Get students without user links
        const studentsWithoutUsers = await prisma.student.findMany({
            where: { userId: null },
            take: 5
        });
        
        console.log(`Found ${studentsWithoutUsers.length} students without user accounts`);
        
        // Create user accounts for existing students
        for (const student of studentsWithoutUsers) {
            try {
                // Create user account for student
                const user = await prisma.user.create({
                    data: {
                        email: student.email,
                        password: student.password, // Use existing password
                        name: student.name,
                        role: 'student'
                    }
                });
                
                // Link student to user
                await prisma.student.update({
                    where: { id: student.id },
                    data: { userId: user.id }
                });
                
                console.log(`✅ Linked ${student.studentId} (${student.name}) to user ${user.id}`);
                
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log(`⚠️  User already exists for ${student.email}, skipping...`);
                } else {
                    console.error(`❌ Failed to link ${student.studentId}:`, error.message);
                }
            }
        }
        
        // Verify the links
        const linkedStudents = await prisma.student.findMany({
            where: { userId: { not: null } },
            include: { user: true },
            take: 5
        });
        
        console.log(`\n✅ Successfully linked ${linkedStudents.length} students to users:`);
        linkedStudents.forEach(s => {
            console.log(`   - ${s.studentId}: ${s.name} → User(${s.user.role})`);
        });
        
        console.log('\n🎉 Student-User linking completed!');
        
    } catch (error) {
        console.error('❌ Linking failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

linkExistingStudents();