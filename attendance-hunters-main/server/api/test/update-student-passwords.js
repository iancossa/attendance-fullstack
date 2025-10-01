require('dotenv').config({ path: './config/db/.env' });
const bcrypt = require('bcrypt');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function updateStudentPasswords() {
    try {
        console.log('🔐 Updating student passwords...\n');

        // Hash the password "student123"
        const hashedPassword = await bcrypt.hash('student123', 10);
        console.log('✅ Password hashed successfully');

        // Update all students with the hashed password
        const result = await prisma.student.updateMany({
            data: {
                password: hashedPassword
            }
        });

        console.log(`✅ Updated ${result.count} students with password "student123"`);
        
        // Verify by getting a few students
        const students = await prisma.student.findMany({
            take: 5,
            select: {
                name: true,
                email: true,
                studentId: true
            }
        });

        console.log('\n📋 Sample students that can now login:');
        students.forEach(student => {
            console.log(`   📧 ${student.email} (${student.name})`);
        });

        console.log('\n🎉 All students can now login with password: student123');

    } catch (error) {
        console.error('❌ Error updating passwords:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

updateStudentPasswords();