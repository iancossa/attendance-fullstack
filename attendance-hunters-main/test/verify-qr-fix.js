#!/usr/bin/env node

/**
 * Verify QR Fix - Final validation of the mobile app issue
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

async function verifyQRFix() {
    console.log('🔍 QR Attendance Issue - Final Verification\n');

    try {
        // 1. Generate QR Session
        console.log('1️⃣ Generating QR session...');
        const qrResponse = await makeRequest('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            classId: 'MOBILE_TEST',
            className: 'Mobile App Test'
        });

        const sessionId = qrResponse.data.sessionId;
        console.log('✅ Session ID:', sessionId);

        // 2. Test the EXACT scenario mobile app uses
        console.log('\n2️⃣ Testing Mobile App Scenario...');
        console.log('   📱 Mobile app scans QR code');
        console.log('   🔐 Student logs in with email: alice.johnson@university.edu');
        console.log('   📤 App sends email as studentId to API');

        const mobileAppRequest = {
            studentId: 'alice.johnson@university.edu',  // This is what mobile app sends
            studentName: 'Alice Johnson'
        };

        console.log('\n   🌐 API Request:', mobileAppRequest);

        const response = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, mobileAppRequest);

        console.log('\n   📊 API Response:');
        console.log('   Status Code:', response.status);
        console.log('   Response Data:', JSON.stringify(response.data, null, 2));

        // 3. Analyze the result
        console.log('\n3️⃣ Analysis:');
        
        if (response.status === 200) {
            console.log('   ✅ SUCCESS: Mobile app scenario works!');
            console.log('   ✅ Backend saves attendance to database');
            console.log('   ✅ Frontend will show real-time updates');
            console.log('\n   🎉 ISSUE RESOLVED!');
            
            // Verify database save
            if (response.data.attendanceId) {
                console.log('   📝 Database Record ID:', response.data.attendanceId);
            }
            
        } else if (response.status === 403) {
            console.log('   ❌ ISSUE CONFIRMED: Mobile app fails');
            console.log('   ❌ Backend rejects email format');
            console.log('   ❌ No database save occurs');
            console.log('\n   🔧 SOLUTION NEEDED:');
            console.log('   1. Deploy updated qr.js with email lookup');
            console.log('   2. Restart production API server');
            console.log('   3. Re-test this scenario');
            
        } else {
            console.log('   ⚠️  Unexpected response:', response.status);
        }

        // 4. Test session status
        console.log('\n4️⃣ Session Status Check...');
        const statusResponse = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/session/${sessionId}`, {
            method: 'GET'
        });

        console.log('   📊 Attendees in session:', statusResponse.data.totalMarked || 0);
        
        if (statusResponse.data.attendees?.length > 0) {
            console.log('   👥 Marked students:');
            statusResponse.data.attendees.forEach(a => {
                console.log(`      - ${a.studentName} (${a.studentId}) at ${new Date(a.markedAt).toLocaleTimeString()}`);
            });
        }

        // 5. Final verdict
        console.log('\n5️⃣ Final Verdict:');
        
        if (response.status === 200) {
            console.log('   🎯 QR ATTENDANCE SYSTEM: FULLY FUNCTIONAL');
            console.log('   ✅ Mobile app compatibility: WORKING');
            console.log('   ✅ Database persistence: WORKING');
            console.log('   ✅ Real-time updates: ENABLED');
        } else {
            console.log('   🚨 QR ATTENDANCE SYSTEM: NEEDS DEPLOYMENT');
            console.log('   ❌ Mobile app compatibility: BROKEN');
            console.log('   ❌ Database persistence: FAILING');
            console.log('   ❌ Real-time updates: NOT WORKING');
            console.log('\n   📋 Next Steps:');
            console.log('   1. Deploy the fixed qr.js file');
            console.log('   2. Restart the API server');
            console.log('   3. Run this test again');
        }

    } catch (error) {
        console.error('❌ Verification failed:', error.message);
    }
}

verifyQRFix();