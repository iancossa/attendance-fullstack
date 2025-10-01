const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function checkStudents() {
    try {
        console.log('📚 Checking Students Database...\n');

        // Get all students
        const students = await prisma.student.findMany({
            include: {
                attendance: true
            },
            orderBy: { createdAt: 'desc' }
        });

        console.log(`📊 Total Students: ${students.length}\n`);

        if (students.length === 0) {
            console.log('❌ No students found in database');
            console.log('💡 Creating sample students...\n');
            
            // Create sample students
            const sampleStudents = [
                {
                    studentId: 'STU001',
                    name: 'John Doe',
                    email: 'john.doe@university.edu',
                    phone: '+1234567890',
                    department: 'Computer Science',
                    class: 'CS-101',
                    section: 'A',
                    year: '2024',
                    gpa: 3.5
                },
                {
                    studentId: 'STU002',
                    name: 'Jane Smith',
                    email: 'jane.smith@university.edu',
                    phone: '+1234567891',
                    department: 'Mathematics',
                    class: 'MATH-201',
                    section: 'B',
                    year: '2023',
                    gpa: 3.8
                },
                {
                    studentId: 'STU003',
                    name: 'Mike Johnson',
                    email: 'mike.johnson@university.edu',
                    phone: '+1234567892',
                    department: 'Computer Science',
                    class: 'CS-201',
                    section: 'A',
                    year: '2024',
                    gpa: 3.2
                }
            ];

            for (const studentData of sampleStudents) {
                try {
                    const student = await prisma.student.create({
                        data: studentData
                    });
                    console.log(`✅ Created: ${student.name} (${student.studentId})`);
                } catch (error) {
                    if (error.code === 'P2002') {
                        console.log(`ℹ️  Student ${studentData.studentId} already exists`);
                    } else {
                        console.log(`❌ Error creating ${studentData.name}: ${error.message}`);
                    }
                }
            }

            // Fetch students again after creation
            const updatedStudents = await prisma.student.findMany({
                include: {
                    attendance: true
                },
                orderBy: { createdAt: 'desc' }
            });

            console.log(`\n📊 Updated Total Students: ${updatedStudents.length}\n`);
            
            // Display students
            updatedStudents.forEach((student, index) => {
                console.log(`${index + 1}. ${student.name}`);
                console.log(`   ID: ${student.studentId}`);
                console.log(`   Email: ${student.email}`);
                console.log(`   Department: ${student.department}`);
                console.log(`   Class: ${student.class} - Section ${student.section}`);
                console.log(`   Year: ${student.year}`);
                console.log(`   GPA: ${student.gpa}`);
                console.log(`   Status: ${student.status}`);
                console.log(`   Attendance Records: ${student.attendance.length}`);
                console.log(`   Created: ${student.createdAt.toLocaleDateString()}\n`);
            });

        } else {
            // Display existing students
            students.forEach((student, index) => {
                console.log(`${index + 1}. ${student.name}`);
                console.log(`   ID: ${student.studentId}`);
                console.log(`   Email: ${student.email}`);
                console.log(`   Department: ${student.department}`);
                console.log(`   Class: ${student.class} - Section ${student.section}`);
                console.log(`   Year: ${student.year}`);
                console.log(`   GPA: ${student.gpa}`);
                console.log(`   Status: ${student.status}`);
                console.log(`   Attendance Records: ${student.attendance.length}`);
                console.log(`   Created: ${student.createdAt.toLocaleDateString()}\n`);
            });
        }

        console.log('✅ Students database check complete!');

    } catch (error) {
        console.error('❌ Error checking students:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkStudents();