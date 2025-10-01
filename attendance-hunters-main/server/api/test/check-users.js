const { PrismaClient } = require('../../database/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function checkUsers() {
    try {
        console.log('🔍 Checking database users...\n');
        
        // Get all users
        const users = await prisma.user.findMany({
            include: {
                admin: true,
                staff: true,
                student: true
            }
        });
        
        console.log(`Found ${users.length} users in database:\n`);
        
        for (const user of users) {
            console.log(`📧 Email: ${user.email}`);
            console.log(`👤 Name: ${user.name}`);
            console.log(`🔑 Role: ${user.role}`);
            console.log(`📊 Status: ${user.status}`);
            
            // Test password hash
            if (user.role === 'admin') {
                const testPasswords = ['admin123', 'password', '123456', 'admin'];
                for (const testPass of testPasswords) {
                    const isValid = await bcrypt.compare(testPass, user.password);
                    if (isValid) {
                        console.log(`✅ Password: ${testPass} (WORKS)`);
                        break;
                    }
                }
            }
            
            if (user.admin) {
                console.log(`🔐 Admin Level: ${user.admin.adminLevel}`);
            }
            if (user.staff) {
                console.log(`👔 Employee ID: ${user.staff.employeeId}`);
            }
            if (user.student) {
                console.log(`🎓 Student ID: ${user.student.studentId}`);
            }
            
            console.log('---');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkUsers();