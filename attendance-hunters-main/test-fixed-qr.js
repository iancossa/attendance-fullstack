#!/usr/bin/env node

/**
 * Test Fixed QR Endpoint - Test email and student ID formats
 */

const https = require('https');

function makeRequest(url, options, data) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });
        
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function testFixedQR() {
    console.log('🧪 Testing Fixed QR Endpoint\n');

    try {
        // 1. Generate QR Session
        console.log('1️⃣ Generating QR session...');
        const qrResponse = await makeRequest('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            classId: 'FIXED_TEST',
            className: 'Fixed QR Test'
        });

        if (qrResponse.status !== 200) {
            console.log('❌ QR generation failed:', qrResponse.data);
            return;
        }

        const sessionId = qrResponse.data.sessionId;
        console.log('✅ Session created:', sessionId);

        // 2. Test different student identification methods
        const testCases = [
            {
                name: 'Email Format (Mobile App Style)',
                studentId: 'alice.johnson@university.edu',
                studentName: 'Alice Johnson'
            },
            {
                name: 'Student ID Format',
                studentId: 'CS2024001',
                studentName: 'Alice Johnson'
            },
            {
                name: 'Name Fallback',
                studentId: 'unknown_id',
                studentName: 'Bob Smith'
            },
            {
                name: 'Invalid Student',
                studentId: 'nonexistent@email.com',
                studentName: 'Unknown Student'
            }
        ];

        for (const testCase of testCases) {
            console.log(`\n2️⃣ Testing: ${testCase.name}`);
            console.log(`   Input: ${testCase.studentId} / ${testCase.studentName}`);
            
            const response = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, {
                studentId: testCase.studentId,
                studentName: testCase.studentName
            });
            
            console.log(`   Status: ${response.status}`);
            
            if (response.status === 200) {
                console.log(`   ✅ Success: ${response.data.message}`);
                console.log(`   👤 Student: ${response.data.studentName} (${response.data.studentId})`);
                console.log(`   📝 Attendance ID: ${response.data.attendanceId}`);
            } else {
                console.log(`   ❌ Failed: ${response.data.error || response.data}`);
                if (response.data.suggestion) {
                    console.log(`   💡 Suggestion: ${response.data.suggestion}`);
                }
            }
        }

        // 3. Check final session status
        console.log('\n3️⃣ Final session status...');
        const statusResponse = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/session/${sessionId}`, {
            method: 'GET'
        });
        
        console.log(`📊 Total attendees: ${statusResponse.data.totalMarked}`);
        if (statusResponse.data.attendees?.length > 0) {
            console.log('👥 Attendees:');
            statusResponse.data.attendees.forEach(a => {
                console.log(`   - ${a.studentName} (${a.studentId})`);
            });
        }

        console.log('\n🎉 QR Endpoint Fix Test Complete!');
        console.log('\n📋 Summary:');
        console.log('   - Email format should now work for mobile apps');
        console.log('   - Student ID format still works');
        console.log('   - Name fallback provides additional flexibility');
        console.log('   - Better error messages for debugging');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testFixedQR();