require('dotenv').config();
const { PrismaClient } = require('./generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function updateTaiboAvatar() {
  try {
    const imagePath = path.join(__dirname, '../../test/admin/junior.png');
    
    if (!fs.existsSync(imagePath)) {
      console.log('❌ Image file not found at:', imagePath);
      console.log('Please ensure junior.png exists in the test/admin/ directory');
      return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    const updatedAdmin = await prisma.user.update({
      where: { email: 'taibojunior@gmail.com' },
      data: { avatarUrl: base64Image }
    });

    console.log('✅ Taibo avatar updated with base64 image');
    console.log('Image size:', Math.round(base64Image.length / 1024), 'KB');
  } catch (error) {
    console.error('❌ Error updating avatar:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTaiboAvatar();