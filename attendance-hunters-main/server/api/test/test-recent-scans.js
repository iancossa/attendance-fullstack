const fetch = require('node-fetch');

async function testRecentScans() {
    try {
        console.log('🧪 Testing Recent Scans Integration...\n');

        // Test multiple students scanning
        const students = [
            { email: 'alice.johnson@university.edu', name: 'Alice Johnson' },
            { email: 'bob.smith@university.edu', name: 'Bob Smith' },
            { email: 'maya.singh@university.edu', name: 'Maya Singh' }
        ];

        // 1. Generate QR session
        console.log('1️⃣ Generating QR session...');
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

        // 2. Login and mark attendance for each student
        for (const student of students) {
            console.log(`\n2️⃣ Testing ${student.name}...`);
            
            // Login
            const loginResponse = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: student.email,
                    password: 'student123'
                })
            });

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                console.log(`   ✅ ${student.name} logged in`);

                // Mark attendance
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
                    console.log(`   ✅ ${student.name} attendance marked`);
                    
                    // Simulate localStorage update (what happens in frontend)
                    const scanData = {
                        studentId: loginData.student.studentId,
                        studentName: loginData.student.name,
                        markedAt: new Date().toISOString(),
                        status: 'present',
                        sessionId: qrData.sessionId,
                        className: qrData.className
                    };
                    console.log(`   📝 Recent scan data:`, scanData);
                } else {
                    console.log(`   ❌ ${student.name} attendance failed:`, markData.error);
                }
            } else {
                console.log(`   ❌ ${student.name} login failed`);
            }

            // Small delay between students
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 3. Check final session status
        console.log('\n3️⃣ Final session status...');
        const statusResponse = await fetch(`https://attendance-fullstack.onrender.com/api/qr/session/${qrData.sessionId}`);
        const statusData = await statusResponse.json();
        
        console.log('✅ Session summary:');
        console.log(`   Total attendees: ${statusData.attendees?.length || 0}`);
        console.log(`   Time left: ${statusData.timeLeft} seconds`);
        
        if (statusData.attendees) {
            console.log('   Attendees:');
            statusData.attendees.forEach(attendee => {
                console.log(`     - ${attendee.studentName} (${attendee.studentId}) at ${new Date(attendee.markedAt).toLocaleTimeString()}`);
            });
        }

        console.log('\n🎉 Recent scans integration test completed!');
        console.log('\n📋 Frontend Integration:');
        console.log('   - Student scans QR → Attendance marked in database');
        console.log('   - Scan data saved to localStorage');
        console.log('   - QR/Hybrid pages poll localStorage for recent scans');
        console.log('   - Real-time updates every 2 seconds');

    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

testRecentScans();