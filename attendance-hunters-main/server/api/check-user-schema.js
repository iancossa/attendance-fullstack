const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkUserSchema() {
    try {
        console.log('🔍 Checking User Schema...\n');

        // Try to get users with minimal fields first
        console.log('👥 Checking basic user structure...');
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });

        console.log(`📊 Found ${users.length} users in database`);
        
        if (users.length === 0) {
            console.log('❌ No users found! Need to create admin user...\n');
            
            // Try to create a simple admin user
            console.log('🔧 Creating admin user...');
            const adminUser = await prisma.user.create({
                data: {
                    email: 'admin@test.com',
                    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
                    name: 'Admin User',
                    role: 'admin'
                }
            });
            
            console.log('✅ Admin user created:');
            console.log(`   ID: ${adminUser.id}`);
            console.log(`   Email: admin@test.com`);
            console.log(`   Password: password`);
            console.log(`   Name: ${adminUser.name}`);
            console.log(`   Role: ${adminUser.role}\n`);
        } else {
            console.log('✅ Users found:');
            users.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name} (${user.email})`);
                console.log(`   Role: ${user.role}`);
                console.log(`   Created: ${user.createdAt.toLocaleDateString()}\n`);
            });
        }

        console.log('✅ User schema check complete!');

    } catch (error) {
        console.error('❌ Schema check failed:', error.message);
        
        // If it's a column error, show what fields are available
        if (error.message.includes('does not exist')) {
            console.log('\n🔍 Checking what fields are available in User model...');
            try {
                // Try with just id and email
                const basicUsers = await prisma.user.findMany({
                    select: {
                        id: true,
                        email: true
                    }
                });
                console.log(`✅ Basic query works - found ${basicUsers.length} users`);
            } catch (basicError) {
                console.error('❌ Even basic query failed:', basicError.message);
            }
        }
    } finally {
        await prisma.$disconnect();
    }
}

checkUserSchema();