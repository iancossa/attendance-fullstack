const fetch = require('node-fetch');

async function testQRAPI() {
    try {
        console.log('🧪 Testing QR API...\n');

        // 1. Generate QR session
        console.log('1️⃣ Generating QR session...');
        const qrResponse = await fetch('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                classId: 'TEST101',
                className: 'Test Class'
            })
        });

        if (!qrResponse.ok) {
            console.log('❌ QR generation failed:', await qrResponse.text());
            return;
        }

        const qrData = await qrResponse.json();
        console.log('✅ QR session created:', qrData.sessionId);
        console.log('📱 QR Data format:', qrData.qrData.substring(0, 100) + '...');

        // Parse QR data to see structure
        try {
            const parsedQR = JSON.parse(qrData.qrData);
            console.log('📋 QR Content:', {
                type: parsedQR.type,
                sessionId: parsedQR.sessionId,
                className: parsedQR.className,
                apiUrl: parsedQR.apiUrl
            });
        } catch (e) {
            console.log('📋 QR Data (raw):', qrData.qrData);
        }

        // 2. Test session status
        console.log('\n2️⃣ Checking session status...');
        const statusResponse = await fetch(`https://attendance-fullstack.onrender.com/api/qr/session/${qrData.sessionId}`);
        const statusData = await statusResponse.json();
        console.log('✅ Session status:', {
            isActive: statusData.isActive,
            timeLeft: statusData.timeLeft,
            attendees: statusData.attendees?.length || 0
        });

        // 3. Test marking attendance
        console.log('\n3️⃣ Testing attendance marking...');
        const markResponse = await fetch(`https://attendance-fullstack.onrender.com/api/qr/mark/${qrData.sessionId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId: 'CS2024001',
                studentName: 'Alice Johnson'
            })
        });

        const markData = await markResponse.json();
        if (markResponse.ok) {
            console.log('✅ Attendance marked successfully:', markData.studentName);
        } else {
            console.log('❌ Attendance marking failed:', markData.error);
        }

        // 4. Check updated session status
        console.log('\n4️⃣ Checking updated session...');
        const updatedStatusResponse = await fetch(`https://attendance-fullstack.onrender.com/api/qr/session/${qrData.sessionId}`);
        const updatedStatusData = await updatedStatusResponse.json();
        console.log('✅ Updated session:', {
            attendees: updatedStatusData.attendees?.length || 0,
            totalMarked: updatedStatusData.totalMarked
        });

        if (updatedStatusData.attendees?.length > 0) {
            console.log('👥 Attendees:');
            updatedStatusData.attendees.forEach(attendee => {
                console.log(`   - ${attendee.studentName} (${attendee.studentId})`);
            });
        }

        console.log('\n🎉 QR API test completed successfully!');

    } catch (error) {
        console.error('❌ QR API test error:', error.message);
    }
}

testQRAPI();