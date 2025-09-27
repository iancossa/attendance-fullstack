// Test QR code format
const https = require('https');

function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });
        
        req.on('error', reject);
        
        if (options.body) {
            req.write(JSON.stringify(options.body));
        }
        
        req.end();
    });
}

async function testQRFormat() {
    console.log('🧪 Testing QR Code Format...\n');
    
    try {
        // Generate QR code
        const qrResponse = await makeRequest('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            body: {
                classId: 'CS301',
                className: 'Data Structures and Algorithms'
            }
        });
        
        if (qrResponse.status === 200) {
            console.log('✅ QR Generation - SUCCESS!');
            console.log(`   Session ID: ${qrResponse.data.sessionId}`);
            console.log(`   Class: ${qrResponse.data.className}`);
            console.log(`   Expires In: ${qrResponse.data.expiresIn} seconds\n`);
            
            console.log('📱 QR Data Format:');
            try {
                const qrData = JSON.parse(qrResponse.data.qrData);
                console.log('   Type:', qrData.type);
                console.log('   Session ID:', qrData.sessionId);
                console.log('   Class Name:', qrData.className);
                console.log('   API URL:', qrData.apiUrl);
                console.log('   Expires At:', qrData.expiresAt);
                console.log('   Timestamp:', qrData.timestamp);
                
                console.log('\n📋 Mobile App Instructions:');
                console.log('   1. Parse QR data as JSON');
                console.log('   2. Extract sessionId and apiUrl');
                console.log('   3. POST to apiUrl with student data');
                console.log('   4. Body: { "studentId": "STU001", "studentName": "Student Name" }');
                
            } catch (e) {
                console.log('   Raw QR Data:', qrResponse.data.qrData);
            }
            
        } else {
            console.log(`❌ QR Generation - Failed (${qrResponse.status})`);
            console.log(`   Error: ${qrResponse.data.error || 'Unknown error'}`);
        }
        
    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }
}

testQRFormat();