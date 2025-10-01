require('dotenv').config({ path: './config/db/.env' });
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// Mock data from web/src/data
const MOCK_STUDENTS = [
  {
    studentId: '303105221-A-001',
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Electronics Engineering',
    class: 'Digital Electronics Laboratory',
    section: 'A',
    year: '3',
    gpa: 3.8
  },
  {
    studentId: '303105221-A-002',
    name: 'Bob Smith',
    email: 'bob.smith@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Electronics Engineering',
    class: 'Digital Electronics Laboratory',
    section: 'A',
    year: '3',
    gpa: 3.6
  },
  {
    studentId: '303191202-A-003',
    name: 'Carol Davis',
    email: 'carol.davis@university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Computer Science & Engineering',
    class: 'Discrete Mathematics',
    section: 'A',
    year: '2',
    gpa: 3.4
  },
  {
    studentId: '303105221-B-004',
    name: 'David Wilson',
    email: 'david.wilson@university.edu',
    phone: '+1 (555) 456-7890',
    department: 'Electronics Engineering',
    class: 'Digital Electronics Laboratory',
    section: 'B',
    year: '3',
    gpa: 3.9
  },
  {
    studentId: '303191202-A-005',
    name: 'Emma Brown',
    email: 'emma.brown@university.edu',
    phone: '+1 (555) 567-8901',
    department: 'Computer Science & Engineering',
    class: 'Discrete Mathematics',
    section: 'A',
    year: '2',
    gpa: 3.2
  },
  {
    studentId: '303105221-A-006',
    name: 'Frank Miller',
    email: 'frank.miller@university.edu',
    phone: '+1 (555) 678-9012',
    department: 'Electronics Engineering',
    class: 'Digital Electronics Laboratory',
    section: 'A',
    year: '3',
    gpa: 3.5
  },
  {
    studentId: '303191202-B-007',
    name: 'Grace Lee',
    email: 'grace.lee@university.edu',
    phone: '+1 (555) 789-0123',
    department: 'Computer Science & Engineering',
    class: 'Discrete Mathematics',
    section: 'B',
    year: '2',
    gpa: 3.7
  },
  {
    studentId: '303105221-B-008',
    name: 'Henry Clark',
    email: 'henry.clark@university.edu',
    phone: '+1 (555) 890-1234',
    department: 'Electronics Engineering',
    class: 'Digital Electronics Laboratory',
    section: 'B',
    year: '3',
    gpa: 2.8
  },
  {
    studentId: '303191202-A-009',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@university.edu',
    phone: '+1 (555) 901-2345',
    department: 'Computer Science & Engineering',
    class: 'Discrete Mathematics',
    section: 'A',
    year: '2',
    gpa: 3.6
  },
  {
    studentId: '303105221-A-010',
    name: 'Jack Thompson',
    email: 'jack.thompson@university.edu',
    phone: '+1 (555) 012-3456',
    department: 'Electronics Engineering',
    class: 'Digital Electronics Laboratory',
    section: 'A',
    year: '3',
    gpa: 3.3
  },
  {
    studentId: 'CSE-A-029',
    name: 'Diana Foster',
    email: 'diana.foster@university.edu',
    phone: '+1 (555) 109-2345',
    department: 'Computer Science & Engineering',
    class: 'Data Structures and Algorithms',
    section: 'A',
    year: '2',
    gpa: 3.7
  },
  {
    studentId: '303105222-A-030',
    name: 'Ethan Cooper',
    email: 'ethan.cooper@university.edu',
    phone: '+1 (555) 210-3456',
    department: 'Electronics Engineering',
    class: 'Microprocessor Systems',
    section: 'A',
    year: '3',
    gpa: 3.8
  },
  {
    studentId: 'CSE-A-049',
    name: 'Alex Thompson',
    email: 'alex.thompson@university.edu',
    phone: '+1 (555) 111-2222',
    department: 'Computer Science & Engineering',
    class: 'Advanced Software Engineering',
    section: 'A',
    year: '4',
    gpa: 3.6
  },
  {
    studentId: 'IT-B-050',
    name: 'Maya Singh',
    email: 'maya.singh@university.edu',
    phone: '+1 (555) 222-3333',
    department: 'Information Technology',
    class: 'Network Security & Administration',
    section: 'B',
    year: '3',
    gpa: 3.8
  },
  {
    studentId: 'DSA-A-051',
    name: 'Ryan Kumar',
    email: 'ryan.kumar@university.edu',
    phone: '+1 (555) 333-4444',
    department: 'Data Science & Analytics',
    class: 'Statistical Analysis & Data Mining',
    section: 'A',
    year: '2',
    gpa: 3.5
  },
  {
    studentId: 'AIML-A-052',
    name: 'Zara Ahmed',
    email: 'zara.ahmed@university.edu',
    phone: '+1 (555) 444-5555',
    department: 'Artificial Intelligence & Machine Learning',
    class: 'Computer Vision & Image Processing',
    section: 'A',
    year: '3',
    gpa: 3.9
  },
  {
    studentId: 'CDF-A-053',
    name: 'Jordan Lee',
    email: 'jordan.lee@university.edu',
    phone: '+1 (555) 555-6666',
    department: 'Cybersecurity & Digital Forensics',
    class: 'Digital Forensics & Investigation',
    section: 'A',
    year: '2',
    gpa: 3.7
  },
  {
    studentId: 'SED-A-054',
    name: 'Casey Morgan',
    email: 'casey.morgan@university.edu',
    phone: '+1 (555) 666-7777',
    department: 'Software Engineering & DevOps',
    class: 'Microservices Architecture',
    section: 'A',
    year: '3',
    gpa: 3.6
  },
  {
    studentId: 'BCT-A-055',
    name: 'River Chen',
    email: 'river.chen@university.edu',
    phone: '+1 (555) 777-8888',
    department: 'Blockchain & Cryptocurrency Technology',
    class: 'Introduction to Blockchain Technology',
    section: 'A',
    year: '1',
    gpa: 3.8
  },
  {
    studentId: 'IT-A-057',
    name: 'Phoenix Taylor',
    email: 'phoenix.taylor@university.edu',
    phone: '+1 (555) 999-0000',
    department: 'Information Technology',
    class: 'Web Development & Cloud Services',
    section: 'A',
    year: '2',
    gpa: 3.7
  }
];

const ATTENDANCE_RECORDS = [
  { studentName: 'Alice Johnson', classId: '303105221', date: '2024-01-15', status: 'present', timestamp: '14:15' },
  { studentName: 'Bob Smith', classId: '303105221', date: '2024-01-15', status: 'present', timestamp: '14:12' },
  { studentName: 'Carol Davis', classId: '303191202', date: '2024-01-15', status: 'absent', timestamp: null },
  { studentName: 'David Wilson', classId: '303105221', date: '2024-01-15', status: 'late', timestamp: '14:25' },
  { studentName: 'Emma Brown', classId: '303191202', date: '2024-01-15', status: 'present', timestamp: '10:08' },
  { studentName: 'Frank Miller', classId: '303105221', date: '2024-01-15', status: 'present', timestamp: '14:10' },
  { studentName: 'Grace Lee', classId: '303191202', date: '2024-01-15', status: 'present', timestamp: '10:05' },
  { studentName: 'Henry Clark', classId: '303105221', date: '2024-01-15', status: 'absent', timestamp: null },
  { studentName: 'Isabella Garcia', classId: '303191202', date: '2024-01-15', status: 'present', timestamp: '10:18' },
  { studentName: 'Jack Thompson', classId: '303105221', date: '2024-01-15', status: 'late', timestamp: '14:22' },
  { studentName: 'Diana Foster', classId: '303201301', date: '2024-01-15', status: 'present', timestamp: '09:15' },
  { studentName: 'Ethan Cooper', classId: '303105222', date: '2024-01-15', status: 'present', timestamp: '11:10' },
  { studentName: 'Alex Thompson', classId: 'CSE401', date: '2024-01-15', status: 'present', timestamp: '09:05' },
  { studentName: 'Maya Singh', classId: 'IT301', date: '2024-01-15', status: 'present', timestamp: '10:15' },
  { studentName: 'Ryan Kumar', classId: 'DSA201', date: '2024-01-15', status: 'late', timestamp: '11:25' },
  { studentName: 'Zara Ahmed', classId: 'AIML301', date: '2024-01-15', status: 'present', timestamp: '14:08' },
  { studentName: 'Jordan Lee', classId: 'CDF201', date: '2024-01-15', status: 'present', timestamp: '15:12' },
  { studentName: 'Casey Morgan', classId: 'SED301', date: '2024-01-15', status: 'present', timestamp: '16:05' },
  { studentName: 'River Chen', classId: 'BCT101', date: '2024-01-15', status: 'present', timestamp: '13:10' },
  { studentName: 'Phoenix Taylor', classId: 'IT201', date: '2024-01-15', status: 'present', timestamp: '11:45' }
];

async function insertAllMockData() {
    try {
        console.log('🚀 Starting comprehensive mock data insertion...\n');

        // Insert Students
        console.log('👥 Inserting Students...');
        let studentCount = 0;
        for (const studentData of MOCK_STUDENTS) {
            try {
                const student = await prisma.student.create({
                    data: studentData
                });
                console.log(`✅ Student: ${student.name} (${student.studentId})`);
                studentCount++;
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log(`ℹ️  Student ${studentData.studentId} already exists`);
                } else {
                    console.log(`❌ Error creating ${studentData.name}: ${error.message}`);
                }
            }
        }

        // Insert Attendance Records
        console.log('\n📊 Inserting Attendance Records...');
        let attendanceCount = 0;
        for (const record of ATTENDANCE_RECORDS) {
            try {
                // Find student by name
                const student = await prisma.student.findFirst({
                    where: { name: record.studentName }
                });

                if (student) {
                    const attendance = await prisma.studentAttendance.create({
                        data: {
                            studentId: student.id,
                            classId: record.classId,
                            date: new Date(record.date),
                            status: record.status,
                            timestamp: record.timestamp
                        }
                    });
                    console.log(`✅ Attendance: ${record.studentName} - ${record.status}`);
                    attendanceCount++;
                } else {
                    console.log(`⚠️  Student not found: ${record.studentName}`);
                }
            } catch (error) {
                console.log(`❌ Error creating attendance for ${record.studentName}: ${error.message}`);
            }
        }

        // Summary
        console.log('\n📈 Final Summary:');
        const totalStudents = await prisma.student.count();
        const totalAttendance = await prisma.studentAttendance.count();
        
        console.log(`   👥 Total Students: ${totalStudents}`);
        console.log(`   📊 Total Attendance Records: ${totalAttendance}`);
        console.log(`   ✅ New Students Added: ${studentCount}`);
        console.log(`   ✅ New Attendance Records Added: ${attendanceCount}`);

        console.log('\n🎉 Mock data insertion completed successfully!');

    } catch (error) {
        console.error('❌ Error during data insertion:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the insertion
insertAllMockData();