require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const admins = [
  {
    name: 'Eldo Macuacua',
    email: 'eldomacuacua@gmail.com',
    employeeId: '25AD40100',
    department: 'Administration',
    position: 'System Administrator',
    avatarUrl: 'attendance-hunters-main/test/admin/image.png'
  },
  {
    name: 'Ian Silva',
    email: 'ian@university.edu',
    employeeId: '25AD40101',
    department: 'IT Department',
    position: 'Technical Administrator',
    avatarUrl: 'attendance-hunters-main/test/admin/ian.png'
  },
  {
    name: 'Joaquim Santos',
    email: 'joaquim@university.edu',
    employeeId: '25AD40102',
    department: 'Academic Affairs',
    position: 'Academic Administrator',
    avatarUrl: 'attendance-hunters-main/test/admin/joaquim.png'
  },
  {
    name: 'Ahiry Costa',
    email: 'ahiry@university.edu',
    employeeId: '25AD40103',
    department: 'Student Affairs',
    position: 'Student Administrator',
    avatarUrl: 'attendance-hunters-main/test/admin/faruk.png'
  },
  {
    name: 'Niurka Rodriguez',
    email: 'niurka@university.edu',
    employeeId: '25AD40104',
    department: 'Human Resources',
    position: 'HR Administrator',
    avatarUrl: 'attendance-hunters-main/test/admin/niurka.png'
  },
  {
    name: 'Taibo Junior',
    email: 'taibo@university.edu',
    employeeId: '25AD40105',
    department: 'Finance',
    position: 'Finance Administrator',
    avatarUrl: 'attendance-hunters-main/test/admin/junior.png'
  }
];

async function insertAllAdmins() {
  console.log('🔧 Creating All Admin Users...\n');
  
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    for (const adminData of admins) {
      const admin = await prisma.user.upsert({
        where: { email: adminData.email },
        update: {},
        create: {
          name: adminData.name,
          email: adminData.email,
          password: hashedPassword,
          role: 'admin',
          avatarUrl: adminData.avatarUrl,
          admin: {
            create: {
              adminLevel: 'system',
              permissions: { all: true }
            }
          },
          staff: {
            create: {
              employeeId: adminData.employeeId,
              department: adminData.department,
              position: adminData.position
            }
          }
        }
      });
      console.log(`✅ Admin created: ${admin.name} (${admin.email})`);
    }
    
    console.log('\n🎉 All 6 admin users ready for login!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

insertAllAdmins();