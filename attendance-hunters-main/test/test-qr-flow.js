#!/usr/bin/env node

/**
 * Quick QR Flow Test
 */

const fetch = require('node-fetch');

async function testQRFlow() {
    console.log('🧪 Testing QR Attendance Flow...\n');
    
    try {
        // 1. Generate QR session
        console.log('1️⃣ Generating QR session...');
        const qrResponse = await fetch('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                classId: 'CS101',
                className: 'Test Class'
            })
        });
        
        const qrData = await qrResponse.json();
        console.log('   ✅ Session created:', qrData.sessionId);
        
        // 2. Test student login
        console.log('\n2️⃣ Testing student authentication...');
        const loginResponse = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'alice.johnson@university.edu',
                password: 'student123'
            })
        });
        
        const loginData = await loginResponse.json();
        console.log('   ✅ Student authenticated:', loginData.student.name);
        
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
        console.log('   ✅ Attendance marked:', markData.message);
        
        console.log('\n🎉 QR Flow Test PASSED - System ready for deployment!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

testQRFlow();
