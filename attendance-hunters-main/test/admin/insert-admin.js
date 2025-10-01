require('dotenv').config();
const { PrismaClient } = require('../../server/database/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function insertAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Eldo Macuacua',
        email: 'eldomacuacua@gmail.com',
        password: hashedPassword,
        role: 'admin',
        avatarUrl: 'attendance-hunters-main/test/admin/image.png',
        admin: {
          create: {
            adminLevel: 'system',
            permissions: { all: true }
          }
        },
        staff: {
          create: {
            employeeId: '25AD40100',
            department: 'Administration',
            position: 'System Administrator'
          }
        }
      }
    });

    console.log('✅ Admin user created:', admin);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertAdmin();