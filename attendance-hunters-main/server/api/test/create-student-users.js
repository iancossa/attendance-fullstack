const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createStudentUsers() {
    try {
        console.log('🔐 Creating student user accounts...\n');

        // Hash password for all students
        const hashedPassword = await bcrypt.hash('student123', 10);

        // Get students from database
        const students = await prisma.student.findMany({
            take: 5 // Create users for first 5 students
        });

        console.log(`Found ${students.length} students to create user accounts for:\n`);

        for (const student of students) {
            try {
                // Create user account for student
                const user = await prisma.user.create({
                    data: {
                        email: student.email,
                        password: hashedPassword,
                        name: student.name,
                        employeeId: student.studentId,
                        role: 'student'
                    }
                });

                console.log(`✅ Created user account for ${student.name}`);
                console.log(`   Email: ${student.email}`);
                console.log(`   Student ID: ${student.studentId}`);
                console.log(`   Password: student123\n`);

            } catch (error) {
                if (error.code === 'P2002') {
                    console.log(`ℹ️  User account already exists for ${student.name}`);
                } else {
                    console.log(`❌ Error creating user for ${student.name}: ${error.message}`);
                }
            }
        }

        console.log('🎉 Student user accounts creation complete!');
        console.log('\n📋 Login Credentials Summary:');
        console.log('Password for all students: student123');
        console.log('\nStudent Login Examples:');
        console.log('1. alice.johnson@university.edu / student123');
        console.log('2. bob.smith@university.edu / student123');
        console.log('3. carol.davis@university.edu / student123');

    } catch (error) {
        console.error('❌ Error creating student users:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

createStudentUsers();