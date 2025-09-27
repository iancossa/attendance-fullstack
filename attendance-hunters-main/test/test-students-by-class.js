const { PrismaClient } = require('../server/api/generated/prisma');

const prisma = new PrismaClient();

async function testStudentsByClass() {
    try {
        console.log('🧪 Testing Students API with Class Filter...\n');

        // Test 1: Get students from CS-301 class
        console.log('📚 Test 1: Students in CS-301 class');
        const cs301Students = await prisma.student.findMany({
            where: {
                class: { contains: 'CS-301', mode: 'insensitive' }
            },
            select: {
                studentId: true,
                name: true,
                class: true,
                department: true,
                section: true
            }
        });
        
        console.log(`Found ${cs301Students.length} students:`);
        cs301Students.forEach(student => {
            console.log(`  - ${student.name} (${student.studentId}) - ${student.class}`);
        });

        // Test 2: Get students from MATH-201 class
        console.log('\n📚 Test 2: Students in MATH-201 class');
        const mathStudents = await prisma.student.findMany({
            where: {
                class: { contains: 'MATH-201', mode: 'insensitive' }
            },
            select: {
                studentId: true,
                name: true,
                class: true,
                department: true,
                section: true
            }
        });
        
        console.log(`Found ${mathStudents.length} students:`);
        mathStudents.forEach(student => {
            console.log(`  - ${student.name} (${student.studentId}) - ${student.class}`);
        });

        // Test 3: Get all unique classes
        console.log('\n📚 Test 3: All unique classes in database');
        const allStudents = await prisma.student.findMany({
            select: { class: true },
            distinct: ['class']
        });
        
        console.log(`Found ${allStudents.length} unique classes:`);
        allStudents.forEach(student => {
            console.log(`  - ${student.class}`);
        });

        console.log('\n✅ Students API test complete!');

    } catch (error) {
        console.error('❌ Error testing students API:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testStudentsByClass();