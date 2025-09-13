#!/usr/bin/env node

/**
 * Test QR Endpoint - Check API Response and Database Saving
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

async function testQREndpoint() {
    console.log('🧪 Testing QR Endpoint API Calls\n');

    try {
        // 1. Generate QR Session
        console.log('1️⃣ Generating QR session...');
        const qrResponse = await makeRequest('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            classId: 'TEST_API',
            className: 'API Test Class'
        });

        if (qrResponse.status !== 200) {
            console.log('❌ QR generation failed:', qrResponse.status, qrResponse.data);
            return;
        }

        console.log('✅ QR session created:', qrResponse.data.sessionId);
        const sessionId = qrResponse.data.sessionId;

        // 2. Test with valid student
        console.log('\n2️⃣ Testing with valid student...');
        const markResponse = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            studentId: 'STU001', // From our database test
            studentName: 'John Doe'
        });

        console.log('📊 Mark attendance response:');
        console.log('   Status:', markResponse.status);
        console.log('   Data:', markResponse.data);

        if (markResponse.status === 200) {
            console.log('✅ Attendance marked successfully!');
            
            // 3. Check session status
            console.log('\n3️⃣ Checking session status...');
            const statusResponse = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/session/${sessionId}`, {
                method: 'GET'
            });
            
            console.log('📊 Session status:');
            console.log('   Attendees:', statusResponse.data.attendees?.length || 0);
            console.log('   Total marked:', statusResponse.data.totalMarked);
            
            if (statusResponse.data.attendees?.length > 0) {
                console.log('👥 Attendees list:');
                statusResponse.data.attendees.forEach(a => {
                    console.log(`   - ${a.studentName} (${a.studentId}) at ${a.markedAt}`);
                });
            }
        } else {
            console.log('❌ Attendance marking failed!');
            console.log('   This explains why mobile app shows success but backend doesn\'t save');
        }

        // 4. Test with different student IDs to find the issue
        console.log('\n4️⃣ Testing different student formats...');
        
        const testStudents = [
            { studentId: 'CS2024001', name: 'Alice Johnson' },
            { studentId: 'alice.johnson@university.edu', name: 'Alice Johnson' },
            { studentId: 'STU002', name: 'Jane Smith' }
        ];

        for (const student of testStudents) {
            console.log(`\n   Testing ${student.studentId}...`);
            const testResponse = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, student);
            
            console.log(`   Status: ${testResponse.status}`);
            if (testResponse.status !== 200) {
                console.log(`   Error: ${testResponse.data.error || testResponse.data}`);
            } else {
                console.log(`   ✅ Success: ${testResponse.data.message}`);
            }
        }

        console.log('\n🔍 Analysis:');
        console.log('   - If status 200: Database saving works, issue is elsewhere');
        console.log('   - If status 403: Student not found in database');
        console.log('   - If status 404: QR session expired/invalid');
        console.log('   - If status 409: Duplicate attendance');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testQREndpoint();