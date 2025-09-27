#!/usr/bin/env node

/**
 * Simple Database Test - Check QR Attendance Saving
 */

async function testDatabase() {
    console.log('🔍 Testing Database Operations for QR Attendance\n');

    try {
        // Import Prisma client
        const { PrismaClient } = require('../server/api/generated/prisma');
        const prisma = new PrismaClient();

        console.log('1️⃣ Connecting to database...');
        await prisma.$connect();
        console.log('   ✅ Connected successfully');

        // Check students
        console.log('\n2️⃣ Checking students...');
        const students = await prisma.student.findMany({ take: 3 });
        console.log(`   📊 Found ${students.length} students`);
        
        if (students.length === 0) {
            console.log('   ❌ NO STUDENTS FOUND - This is the problem!');
            console.log('   💡 Run: cd server/api && node insert-real-students.js');
            return;
        }

        students.forEach(s => {
            console.log(`   - ${s.name} (${s.studentId}) - ${s.email}`);
        });

        // Test attendance creation
        console.log('\n3️⃣ Testing attendance creation...');
        const testStudent = students[0];
        
        const attendanceData = {
            studentId: testStudent.id, // Database ID, not studentId
            classId: 'TEST_' + Date.now(),
            status: 'present',
            timestamp: new Date().toISOString()
        };

        console.log('   📝 Creating attendance record...');
        const attendance = await prisma.studentAttendance.create({
            data: attendanceData
        });
        
        console.log('   ✅ Attendance created with ID:', attendance.id);

        // Verify it was saved
        console.log('\n4️⃣ Verifying saved record...');
        const saved = await prisma.studentAttendance.findUnique({
            where: { id: attendance.id },
            include: { student: true }
        });

        console.log('   ✅ Record verified:');
        console.log(`      Student: ${saved.student.name}`);
        console.log(`      Class: ${saved.classId}`);
        console.log(`      Status: ${saved.status}`);
        console.log(`      Date: ${saved.date}`);

        // Check recent records
        console.log('\n5️⃣ Recent attendance records...');
        const recent = await prisma.studentAttendance.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { student: true }
        });

        console.log(`   📋 Last ${recent.length} records:`);
        recent.forEach((r, i) => {
            console.log(`      ${i+1}. ${r.student.name} - ${r.classId} - ${r.status}`);
        });

        await prisma.$disconnect();
        console.log('\n🎉 Database operations working correctly!');

        // Now test the QR endpoint logic
        console.log('\n6️⃣ Testing QR endpoint student lookup...');
        await prisma.$connect();
        
        // This is what the QR endpoint does
        const studentByStudentId = await prisma.student.findUnique({
            where: { studentId: testStudent.studentId }
        });

        if (!studentByStudentId) {
            console.log('   ❌ CRITICAL ISSUE: Student lookup by studentId fails!');
            console.log(`   🔍 Searching for: ${testStudent.studentId}`);
            console.log('   💡 This explains why QR scanning fails');
        } else {
            console.log('   ✅ Student lookup works correctly');
            console.log(`   👤 Found: ${studentByStudentId.name}`);
        }

        await prisma.$disconnect();

    } catch (error) {
        console.error('\n❌ Database test failed:');
        console.error('   Error:', error.message);
        
        if (error.code === 'P1001') {
            console.log('\n💡 Database connection issue:');
            console.log('   - Check DATABASE_URL in server/api/config/db/.env');
            console.log('   - Verify database server is running');
        }
        
        if (error.code === 'P2002') {
            console.log('\n💡 Unique constraint violation - data already exists');
        }
    }
}

testDatabase();