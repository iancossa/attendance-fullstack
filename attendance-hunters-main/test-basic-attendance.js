// Test basic attendance endpoint
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

async function testBasicAttendance() {
    console.log('🧪 Testing Basic Attendance Endpoints...\n');
    
    try {
        // Login
        const login = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            body: { email: 'staff@university.edu', password: process.env.TEST_STAFF_PASSWORD || 'defaultpass' }
        });
        
        const token = login.data.token;
        console.log('✅ Login successful\n');
        
        // Test basic attendance endpoint
        const attendance = await makeRequest('https://attendance-fullstack.onrender.com/api/attendance', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log(`📊 GET /api/attendance: ${attendance.status}`);
        if (attendance.status === 200) {
            console.log(`   Records: ${attendance.data.records?.length || 0}`);
        } else {
            console.log(`   Error: ${attendance.data.error}`);
        }
        
        // Test summary endpoint
        const summary = await makeRequest('https://attendance-fullstack.onrender.com/api/attendance/summary', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log(`📊 GET /api/attendance/summary: ${summary.status}`);
        if (summary.status === 200) {
            console.log('   ✅ Summary endpoint working');
        } else {
            console.log(`   ❌ Error: ${summary.data.error || 'Not found'}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testBasicAttendance();