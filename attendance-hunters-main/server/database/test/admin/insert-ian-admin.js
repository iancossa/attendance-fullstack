require('dotenv').config();
const { PrismaClient } = require('../../generated/prisma');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function insertIanAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Read and convert image to base64
    const imagePath = path.join(__dirname, 'ian.png');
    let avatarUrl = null;
    
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      avatarUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
      console.log('✅ Image loaded, size:', Math.round(avatarUrl.length / 1024), 'KB');
    } else {
      console.log('⚠️ Image not found at:', imagePath);
    }
    
    const admin = await prisma.user.create({
      data: {
        name: 'Ian Cossa',
        email: 'iancossa@gmail.com',
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
            employeeId: '25AD40101',
            department: 'Administration',
            position: 'System Administrator'
          }
        }
      }
    });

    console.log('✅ Ian admin user created:', admin);
  } catch (error) {
    console.error('❌ Error creating Ian admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertIanAdmin();