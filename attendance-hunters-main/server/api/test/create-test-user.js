const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        console.log('🔐 Creating test user for login...\n');

        // Hash password
        const hashedPassword = await bcrypt.hash(process.env.TEST_STUDENT_PASSWORD || 'defaultpass', 10);

        // Create test student user
        const user = await prisma.user.create({
            data: {
                email: 'student@university.edu',
                password: hashedPassword,
                name: 'Test Student',
                employeeId: 'STU001',
                role: 'student'
            }
        });

        console.log('✅ Test user created successfully!');
        console.log('📋 Login Credentials:');
        console.log('   Email: student@university.edu');
        console.log('   Password: ' + (process.env.TEST_STUDENT_PASSWORD || 'defaultpass'));
        console.log('   Role: student');
        console.log(`   User ID: ${user.id}\n`);

        // Also create a staff user
        const hashedStaffPassword = await bcrypt.hash(process.env.TEST_STAFF_PASSWORD || 'defaultpass', 10);
        
        const staffUser = await prisma.user.create({
            data: {
                email: 'staff@university.edu',
                password: hashedStaffPassword,
                name: 'Test Staff',
                employeeId: 'STAFF001',
                role: 'employee'
            }
        });

        console.log('✅ Test staff user created successfully!');
        console.log('📋 Staff Login Credentials:');
        console.log('   Email: staff@university.edu');
        console.log('   Password: ' + (process.env.TEST_STAFF_PASSWORD || 'defaultpass'));
        console.log('   Role: employee');
        console.log(`   User ID: ${staffUser.id}\n`);

        console.log('🎉 Ready for login testing!');

    } catch (error) {
        if (error.code === 'P2002') {
            console.log('ℹ️  Test users already exist');
            console.log('📋 Use these credentials:');
            console.log('   Student: student@university.edu / ' + (process.env.TEST_STUDENT_PASSWORD || 'defaultpass'));
            console.log('   Staff: staff@university.edu / ' + (process.env.TEST_STAFF_PASSWORD || 'defaultpass'));
        } else {
            console.error('❌ Error creating test user:', error.message);
        }
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();