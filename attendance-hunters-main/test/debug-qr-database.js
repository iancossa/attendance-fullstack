#!/usr/bin/env node

/**
 * Debug QR Database Saving Issue
 * Tests the complete QR flow and verifies database operations
 */

require('dotenv').config({ path: './server/api/.env' });
const { PrismaClient } = require('../server/api/generated/prisma');

async function debugQRDatabase() {
    console.log('🔍 Debugging QR Database Saving Issue\n');

    try {
        // 1. Test Prisma connection
        console.log('1️⃣ Testing Prisma Connection...');
        const prisma = new PrismaClient();
        
        await prisma.$connect();
        console.log('   ✅ Prisma connected successfully');

        // 2. Check if Student table has data
        console.log('\n2️⃣ Checking Student table...');
        const studentCount = await prisma.student.count();
        console.log(`   📊 Total students in database: ${studentCount}`);
        
        if (studentCount === 0) {
            console.log('   ❌ No students found! This is the problem.');
            console.log('   💡 Run: node server/api/insert-real-students.js');
            return;
        }

        // 3. Get a test student
        const testStudent = await prisma.student.findFirst({
            where: { email: 'alice.johnson@university.edu' }
        });
        
        if (!testStudent) {
            console.log('   ❌ Test student alice.johnson@university.edu not found');
            console.log('   💡 Available students:');
            const students = await prisma.student.findMany({ take: 5 });
            students.forEach(s => console.log(`      - ${s.name} (${s.email})`));
            return;
        }
        
        console.log(`   ✅ Test student found: ${testStudent.name} (ID: ${testStudent.id})`);

        // 4. Check StudentAttendance table structure
        console.log('\n3️⃣ Checking StudentAttendance table...');
        const attendanceCount = await prisma.studentAttendance.count();
        console.log(`   📊 Total attendance records: ${attendanceCount}`);

        // 5. Test manual attendance creation
        console.log('\n4️⃣ Testing manual attendance creation...');
        
        const testAttendance = {
            studentId: testStudent.id,
            classId: 'TEST_CLASS_' + Date.now(),
            status: 'present',
            timestamp: new Date().toISOString()
        };
        
        console.log('   📝 Creating test attendance record:', testAttendance);
        
        const createdAttendance = await prisma.studentAttendance.create({
            data: testAttendance
        });
        
        console.log('   ✅ Test attendance created successfully:', createdAttendance.id);

        // 6. Verify the record was saved
        const savedRecord = await prisma.studentAttendance.findUnique({
            where: { id: createdAttendance.id },
            include: { student: true }
        });
        
        console.log('   ✅ Verified saved record:');
        console.log(`      Student: ${savedRecord.student.name}`);
        console.log(`      Class: ${savedRecord.classId}`);
        console.log(`      Status: ${savedRecord.status}`);
        console.log(`      Date: ${savedRecord.date}`);

        // 7. Test QR API endpoint simulation
        console.log('\n5️⃣ Simulating QR API call...');
        
        // Simulate the exact same operation as in qr.js
        const qrTestData = {
            studentId: testStudent.id,
            classId: 'QR_TEST_' + Date.now(),
            status: 'present',
            timestamp: new Date().toISOString()
        };
        
        console.log('   📝 QR API simulation data:', qrTestData);
        
        const qrAttendance = await prisma.studentAttendance.create({
            data: qrTestData
        });
        
        console.log('   ✅ QR simulation successful:', qrAttendance.id);

        // 8. Check recent attendance records
        console.log('\n6️⃣ Recent attendance records...');
        const recentRecords = await prisma.studentAttendance.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { student: true }
        });
        
        console.log('   📋 Last 5 attendance records:');
        recentRecords.forEach((record, index) => {
            console.log(`      ${index + 1}. ${record.student.name} - ${record.classId} - ${record.status} (${record.createdAt})`);
        });

        // 9. Test the exact QR endpoint logic
        console.log('\n7️⃣ Testing QR endpoint logic...');
        
        // Find student by studentId (not database id)
        const studentByStudentId = await prisma.student.findUnique({
            where: { studentId: testStudent.studentId }
        });
        
        if (!studentByStudentId) {
            console.log('   ❌ PROBLEM FOUND: Student lookup by studentId fails');
            console.log(`   🔍 Looking for studentId: ${testStudent.studentId}`);
            console.log(`   💡 This is likely why QR scanning fails!`);
        } else {
            console.log(`   ✅ Student lookup by studentId works: ${studentByStudentId.name}`);
            
            // Test the exact database operation from QR endpoint
            const qrEndpointTest = await prisma.studentAttendance.create({
                data: {
                    studentId: studentByStudentId.id, // This should be the database ID
                    classId: 'QR_ENDPOINT_TEST',
                    status: 'present',
                    timestamp: new Date().toISOString()
                }
            });
            
            console.log('   ✅ QR endpoint logic test successful:', qrEndpointTest.id);
        }

        await prisma.$disconnect();
        
        console.log('\n🎉 Database operations are working correctly!');
        console.log('\n🔍 If QR scanning still fails, the issue is likely:');
        console.log('   1. Network connectivity to the API');
        console.log('   2. CORS issues');
        console.log('   3. Authentication problems');
        console.log('   4. Frontend not calling the correct endpoint');

    } catch (error) {
        console.error('\n❌ Database test failed:', error);
        console.error('\n🔍 Error details:');
        console.error('   Message:', error.message);
        console.error('   Code:', error.code);
        
        if (error.message.includes('connect')) {
            console.log('\n💡 Database connection issue. Check:');
            console.log('   - DATABASE_URL in .env file');
            console.log('   - Network connectivity');
            console.log('   - Database server status');
        }
        
        if (error.message.includes('generate')) {
            console.log('\n💡 Prisma client issue. Run:');
            console.log('   cd server/api && npx prisma generate');
        }
    }
}

debugQRDatabase();