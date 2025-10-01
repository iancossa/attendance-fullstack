const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const realStudents = [
    {
        studentId: 'CS2024001',
        name: 'Alice Johnson',
        email: 'alice.johnson@university.edu',
        phone: '+1234567890',
        department: 'Computer Science',
        class: 'CS-301',
        section: 'A',
        year: '2024',
        gpa: 3.8
    },
    {
        studentId: 'CS2024002',
        name: 'Bob Smith',
        email: 'bob.smith@university.edu',
        phone: '+1234567891',
        department: 'Computer Science',
        class: 'CS-301',
        section: 'A',
        year: '2024',
        gpa: 3.5
    },
    {
        studentId: 'CS2024003',
        name: 'Carol Davis',
        email: 'carol.davis@university.edu',
        phone: '+1234567892',
        department: 'Computer Science',
        class: 'CS-201',
        section: 'B',
        year: '2023',
        gpa: 3.9
    },
    {
        studentId: 'MATH2024001',
        name: 'David Wilson',
        email: 'david.wilson@university.edu',
        phone: '+1234567893',
        department: 'Mathematics',
        class: 'MATH-301',
        section: 'A',
        year: '2024',
        gpa: 3.7
    },
    {
        studentId: 'MATH2024002',
        name: 'Emma Brown',
        email: 'emma.brown@university.edu',
        phone: '+1234567894',
        department: 'Mathematics',
        class: 'MATH-201',
        section: 'B',
        year: '2023',
        gpa: 3.6
    },
    {
        studentId: 'ENG2024001',
        name: 'Frank Miller',
        email: 'frank.miller@university.edu',
        phone: '+1234567895',
        department: 'Engineering',
        class: 'ENG-301',
        section: 'A',
        year: '2024',
        gpa: 3.4
    },
    {
        studentId: 'ENG2024002',
        name: 'Grace Lee',
        email: 'grace.lee@university.edu',
        phone: '+1234567896',
        department: 'Engineering',
        class: 'ENG-201',
        section: 'B',
        year: '2023',
        gpa: 3.8
    },
    {
        studentId: 'PHY2024001',
        name: 'Henry Taylor',
        email: 'henry.taylor@university.edu',
        phone: '+1234567897',
        department: 'Physics',
        class: 'PHY-301',
        section: 'A',
        year: '2024',
        gpa: 3.5
    },
    {
        studentId: 'PHY2024002',
        name: 'Ivy Chen',
        email: 'ivy.chen@university.edu',
        phone: '+1234567898',
        department: 'Physics',
        class: 'PHY-201',
        section: 'B',
        year: '2023',
        gpa: 3.9
    },
    {
        studentId: 'BIO2024001',
        name: 'Jack Anderson',
        email: 'jack.anderson@university.edu',
        phone: '+1234567899',
        department: 'Biology',
        class: 'BIO-301',
        section: 'A',
        year: '2024',
        gpa: 3.3
    },
    {
        studentId: 'BIO2024002',
        name: 'Kate Martinez',
        email: 'kate.martinez@university.edu',
        phone: '+1234567800',
        department: 'Biology',
        class: 'BIO-201',
        section: 'B',
        year: '2023',
        gpa: 3.7
    },
    {
        studentId: 'CHEM2024001',
        name: 'Liam Garcia',
        email: 'liam.garcia@university.edu',
        phone: '+1234567801',
        department: 'Chemistry',
        class: 'CHEM-301',
        section: 'A',
        year: '2024',
        gpa: 3.6
    },
    {
        studentId: 'CHEM2024002',
        name: 'Mia Rodriguez',
        email: 'mia.rodriguez@university.edu',
        phone: '+1234567802',
        department: 'Chemistry',
        class: 'CHEM-201',
        section: 'B',
        year: '2023',
        gpa: 3.8
    },
    {
        studentId: 'CS2023001',
        name: 'Noah Thompson',
        email: 'noah.thompson@university.edu',
        phone: '+1234567803',
        department: 'Computer Science',
        class: 'CS-401',
        section: 'A',
        year: '2022',
        gpa: 3.9
    },
    {
        studentId: 'CS2023002',
        name: 'Olivia White',
        email: 'olivia.white@university.edu',
        phone: '+1234567804',
        department: 'Computer Science',
        class: 'CS-401',
        section: 'A',
        year: '2022',
        gpa: 3.7
    }
];

async function insertRealStudents() {
    try {
        console.log('📚 Inserting Real Student Data...\n');

        let insertedCount = 0;
        let existingCount = 0;

        for (const studentData of realStudents) {
            try {
                const student = await prisma.student.create({
                    data: studentData
                });
                console.log(`✅ Created: ${student.name} (${student.studentId})`);
                insertedCount++;
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log(`ℹ️  Student ${studentData.studentId} already exists`);
                    existingCount++;
                } else {
                    console.log(`❌ Error creating ${studentData.name}: ${error.message}`);
                }
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`   ✅ Inserted: ${insertedCount} students`);
        console.log(`   ℹ️  Already existed: ${existingCount} students`);
        console.log(`   📝 Total attempted: ${realStudents.length} students`);

        // Get final count
        const totalStudents = await prisma.student.count();
        console.log(`   🎓 Total students in database: ${totalStudents}`);

        console.log('\n🎉 Real student data insertion complete!');

    } catch (error) {
        console.error('❌ Error inserting students:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

insertRealStudents();