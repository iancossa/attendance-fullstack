require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const admins = [
  { email: 'eldomacuacua@gmail.com', image: 'image.png' },
  { email: 'iancossa@gmail.com', image: 'ian.png' },
  { email: 'joaquimmagode@gmail.com', image: 'joaquim.png' },
  { email: 'ahiryfaruk@gmail.com', image: 'faruk.png' },
  { email: 'niurkachico@gmail.com', image: 'niurka.png' },
  { email: 'taibojunior@gmail.com', image: 'junior.png' }
];

async function updateAdminImages() {
  console.log('🖼️ Updating Admin Images...\n');
  
  try {
    for (const admin of admins) {
      const imagePath = path.join(__dirname, 'test/admin', admin.image);
      
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const avatarUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        
        await prisma.user.update({
          where: { email: admin.email },
          data: { avatarUrl: avatarUrl }
        });
        
        console.log(`✅ Updated ${admin.email} with ${admin.image}`);
      } else {
        console.log(`❌ Image not found: ${admin.image}`);
      }
    }
    
    console.log('\n🎉 All admin images updated!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminImages();