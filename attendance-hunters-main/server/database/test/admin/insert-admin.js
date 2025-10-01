require('dotenv').config();
const { PrismaClient } = require('../../generated/prisma');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function insertAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const imagePath = path.join(__dirname, 'image.png');
    const imageBuffer = fs.readFileSync(imagePath);
    const avatarUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    
    const admin = await prisma.user.create({
      data: {
        name: 'Eldo Macuacua',
        email: 'eldomacuacua@gmail.com',
        password: hashedPassword,
        role: 'admin',
        avatarUrl: avatarUrl,
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