const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('../generated/prisma');

dotenv.config({ path: './config/db/.env' });

const prisma = new PrismaClient();

async function deployStudentAuth() {
    try {
        console.log('🚀 Deploying Student Authentication System...\n');

        // 1. Check database connection
        console.log('1️⃣ Checking database connection...');
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // 2. Check if password field exists
        console.log('\n2️⃣ Checking database schema...');
        const students = await prisma.student.findFirst();
        if (students && 'password' in students) {
            console.log('✅ Password field exists in Student model');
        } else {
            console.log('❌ Password field missing - run migration first');
            return;
        }

        // 3. Update student passwords
        console.log('\n3️⃣ Updating student passwords...');
        const hashedPassword = await bcrypt.hash('student123', 10);
        const result = await prisma.student.updateMany({
            data: { password: hashedPassword }
        });
        console.log(`✅ Updated ${result.count} students with password "student123"`);

        // 4. Test authentication
        console.log('\n4️⃣ Testing authentication...');
        const testStudent = await prisma.student.findFirst({
            where: { email: { contains: '@university.edu' } }
        });
        
        if (testStudent) {
            const isValid = await bcrypt.compare('student123', testStudent.password);
            if (isValid) {
                console.log(`✅ Authentication test passed for ${testStudent.name}`);
            } else {
                console.log('❌ Authentication test failed');
            }
        }

        // 5. List sample students
        console.log('\n5️⃣ Sample student accounts:');
        const sampleStudents = await prisma.student.findMany({
            take: 5,
            select: { name: true, email: true, studentId: true, department: true }
        });
        
        sampleStudents.forEach(student => {
            console.log(`   📧 ${student.email} (${student.name})`);
            console.log(`      ID: ${student.studentId} | Dept: ${student.department}`);
        });

        console.log('\n🎉 Student Authentication System Deployed Successfully!');
        console.log('\n📋 Next Steps:');
        console.log('   1. Deploy API code with student-auth routes');
        console.log('   2. Deploy frontend with updated authentication');
        console.log('   3. Test login with any student email + password "student123"');

    } catch (error) {
        console.error('❌ Deployment error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

deployStudentAuth();