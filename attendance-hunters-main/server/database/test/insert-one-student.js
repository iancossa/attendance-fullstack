require('dotenv').config({ path: '../../api/.env' });
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function insertOneStudent() {
  console.log('📝 Inserting one student into database...');

  try {
    const hashedPassword = await bcrypt.hash('student123', 10);
    
    const student = await prisma.user.create({
      data: {
        email: 'test.student@university.edu',
        password: hashedPassword,
        name: 'Test Student',
        role: 'student',
        status: 'active',
        phone: '+1234567890',
        student: {
          create: {
            studentId: 'TEST001',
            class: 'CS-2024',
            section: 'A',
            year: '2024',
            enrollmentDate: new Date('2024-01-15'),
            gpa: 3.50,
            parentEmail: 'parent.test@example.com',
            parentPhone: '+1234567891',
            address: '123 Test Street, Test City'
          }
        }
      },
      include: {
        student: true
      }
    });

    console.log('✅ Student created successfully!');
    console.log(`Student ID: ${student.id}`);
    console.log(`Email: ${student.email}`);
    console.log(`Name: ${student.name}`);
    console.log(`Student Number: ${student.student?.studentId}`);
    console.log(`Class: ${student.student?.class}`);

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('ℹ️ Student with this email already exists');
    } else {
      console.error('❌ Error inserting student:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

insertOneStudent();