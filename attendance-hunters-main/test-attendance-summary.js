// Test attendance summary endpoint
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

async function testAttendanceSummary() {
    console.log('🧪 Testing Attendance Summary Endpoint...\n');
    
    try {
        // Login first
        const login = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            body: {
                email: 'staff@university.edu',
                password: 'staff123'
            }
        });
        
        if (login.status !== 200) {
            console.log('❌ Login failed');
            return;
        }
        
        const token = login.data.token;
        console.log('✅ Login successful\n');
        
        // Test attendance summary
        const summary = await makeRequest('https://attendance-fullstack.onrender.com/api/attendance/summary', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (summary.status === 200) {
            console.log('✅ Attendance Summary - SUCCESS!');
            console.log('📊 Summary Data:');
            console.log(`   Today's Attendance: ${summary.data.todayAttendance}%`);
            console.log(`   Present Students: ${summary.data.presentStudents}`);
            console.log(`   Total Students: ${summary.data.totalStudents}`);
            console.log(`   Alerts: ${summary.data.alerts}`);
        } else {
            console.log(`❌ Attendance Summary - Failed (${summary.status})`);
            console.log(`   Error: ${summary.data.error || 'Unknown error'}`);
        }
        
    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }
}

testAttendanceSummary();