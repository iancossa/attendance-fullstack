const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkStudentSchema() {
    try {
        console.log('🔍 Checking Student Schema...\n');

        // Try basic query first
        console.log('👥 Testing basic student query...');
        const students = await prisma.student.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            take: 3
        });

        console.log(`✅ Found ${students.length} students with basic fields`);
        students.forEach(student => {
            console.log(`  - ${student.name} (${student.email})`);
        });

        // Try to find what fields work
        console.log('\n🔍 Testing individual fields...');
        
        const testFields = [
            'id', 'name', 'email', 'password', 'phone', 
            'department', 'class', 'section', 'year', 
            'studentId', 'enrollmentDate', 'status', 'gpa'
        ];

        const workingFields = [];
        
        for (const field of testFields) {
            try {
                const selectObj = { id: true };
                selectObj[field] = true;
                
                await prisma.student.findFirst({
                    select: selectObj
                });
                
                workingFields.push(field);
                console.log(`  ✅ ${field}`);
            } catch (error) {
                console.log(`  ❌ ${field} - ${error.message.includes('does not exist') ? 'does not exist' : 'error'}`);
            }
        }

        console.log(`\n📊 Working fields: ${workingFields.join(', ')}`);

    } catch (error) {
        console.error('❌ Schema check failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkStudentSchema();