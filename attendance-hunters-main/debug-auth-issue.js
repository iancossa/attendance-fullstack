const { PrismaClient } = require('./server/api/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function debugAuthIssue() {
    try {
        console.log('🔍 Debugging Authentication Issue...\n');

        // Check if there are any users in the database
        console.log('👥 Checking users in database...');
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                employeeId: true,
                createdAt: true
            }
        });

        console.log(`📊 Found ${users.length} users in database:`);
        if (users.length === 0) {
            console.log('❌ No users found! Creating a test admin user...\n');
            
            // Create a test admin user
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const adminUser = await prisma.user.create({
                data: {
                    email: 'admin@test.com',
                    password: hashedPassword,
                    name: 'Test Admin',
                    employeeId: 'ADMIN001',
                    role: 'admin'
                }
            });
            
            console.log('✅ Test admin user created:');
            console.log(`   Email: admin@test.com`);
            console.log(`   Password: admin123`);
            console.log(`   Role: admin`);
            console.log(`   Employee ID: ADMIN001\n`);
        } else {
            users.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name} (${user.email})`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Employee ID: ${user.employeeId}`);
                console.log(`   Created: ${user.createdAt.toLocaleDateString()}\n`);
            });
        }

        // Test password validation for existing users
        if (users.length > 0) {
            console.log('🔐 Testing password validation...');
            const testUser = users[0];
            
            // Get the full user with password
            const fullUser = await prisma.user.findUnique({
                where: { email: testUser.email }
            });
            
            if (fullUser) {
                console.log(`Testing user: ${fullUser.email}`);
                
                // Test with a common password
                const testPasswords = ['password', 'admin123', '123456', 'test123'];
                
                for (const testPassword of testPasswords) {
                    try {
                        const isValid = await bcrypt.compare(testPassword, fullUser.password);
                        if (isValid) {
                            console.log(`✅ Password '${testPassword}' is valid for ${fullUser.email}`);
                            break;
                        }
                    } catch (error) {
                        console.log(`❌ Error testing password '${testPassword}': ${error.message}`);
                    }
                }
            }
        }

        console.log('\n🧪 Testing validation middleware...');
        
        // Test validation logic
        const testData = {
            email: 'admin@test.com',
            password: 'admin123'
        };
        
        console.log('Test data:', testData);
        
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(testData.email);
        console.log(`Email validation: ${isValidEmail ? '✅ Valid' : '❌ Invalid'}`);
        
        // Check password length
        const isValidPassword = testData.password && testData.password.length >= 6;
        console.log(`Password validation: ${isValidPassword ? '✅ Valid' : '❌ Invalid'}`);

        console.log('\n✅ Authentication debug complete!');

    } catch (error) {
        console.error('❌ Debug failed:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        await prisma.$disconnect();
    }
}

debugAuthIssue();