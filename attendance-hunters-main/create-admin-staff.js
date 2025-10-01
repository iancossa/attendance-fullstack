const { PrismaClient } = require('./server/database/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminStaff() {
    console.log('🔧 Creating Admin and Staff Users...\n');
    
    try {
        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await prisma.user.upsert({
            where: { email: 'admin@university.edu' },
            update: {},
            create: {
                email: 'admin@university.edu',
                password: adminPassword,
                name: 'Admin User',
                role: 'admin'
            }
        });
        console.log('✅ Admin user created:', admin.email);
        
        // Create staff user
        const staffPassword = await bcrypt.hash('staff123', 10);
        const staff = await prisma.user.upsert({
            where: { email: 'staff@university.edu' },
            update: {},
            create: {
                email: 'staff@university.edu',
                password: staffPassword,
                name: 'Staff User',
                role: 'staff'
            }
        });
        console.log('✅ Staff user created:', staff.email);
        
        console.log('\n🎉 Admin and Staff users ready for login!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminStaff();