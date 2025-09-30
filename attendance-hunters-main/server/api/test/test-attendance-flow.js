const fetch = require('node-fetch');

async function testAttendanceFlow() {
    try {
        console.log('🧪 Testing Complete Attendance Flow...\n');

        // 1. Test student login
        console.log('1️⃣ Testing student login...');
        const loginResponse = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'alice.johnson@university.edu',
                password: 'student123'
            })
        });

        if (!loginResponse.ok) {
            console.log('❌ Student login failed');
            return;
        }

        const loginData = await loginResponse.json();
        console.log('✅ Student login successful:', loginData.student.name);

        // 2. Generate QR session
        console.log('\n2️⃣ Generating QR session...');
        const qrResponse = await fetch('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                classId: 'CS101',
                className: 'Computer Science 101'
            })
        });

        const qrData = await qrResponse.json();
        console.log('✅ QR session created:', qrData.sessionId);

        // 3. Mark attendance
        console.log('\n3️⃣ Marking attendance...');
        const markResponse = await fetch(`https://attendance-fullstack.onrender.com/api/qr/mark/${qrData.sessionId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: loginData.student.studentId,
                studentName: loginData.student.name
            })
        });

        const markData = await markResponse.json();
        if (markResponse.ok) {
            console.log('✅ Attendance marked:', markData.studentName);
        } else {
            console.log('❌ Attendance marking failed:', markData.error);
        }

        // 4. Check session status
        console.log('\n4️⃣ Checking session status...');
        const statusResponse = await fetch(`https://attendance-fullstack.onrender.com/api/qr/session/${qrData.sessionId}`);
        const statusData = await statusResponse.json();
        console.log('✅ Session status:', {
            attendees: statusData.attendees?.length || 0,
            timeLeft: statusData.timeLeft
        });

        // 5. Test database records
        console.log('\n5️⃣ Checking database records...');
        const { PrismaClient } = require('../generated/prisma');
        const prisma = new PrismaClient();
        
        const attendanceRecords = await prisma.studentAttendance.findMany({
            where: { studentId: loginData.student.id },
            include: { student: true },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        console.log('✅ Recent attendance records:');
        attendanceRecords.forEach(record => {
            console.log(`   - ${record.student.name}: ${record.status} at ${record.createdAt.toLocaleString()}`);
        });

        await prisma.$disconnect();

        console.log('\n🎉 Complete attendance flow test successful!');

    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

testAttendanceFlow();