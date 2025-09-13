// Test students API endpoint
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

async function testStudentsAPI() {
    console.log('🧪 Testing Students API...\n');
    
    try {
        // First login to get token
        console.log('1. Getting authentication token...');
        const login = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            body: {
                email: 'staff@university.edu',
                password: 'staff123'
            }
        });
        
        if (login.status !== 200) {
            console.log('❌ Login failed, cannot test students API');
            return;
        }
        
        const token = login.data.token;
        console.log('✅ Authentication successful\n');
        
        // Test get all students
        console.log('2. Testing GET /api/students');
        const students = await makeRequest('https://attendance-fullstack.onrender.com/api/students', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (students.status === 200) {
            console.log('✅ Students API - SUCCESS!');
            console.log(`   Found ${students.data.students?.length || 0} students`);
            
            if (students.data.students && students.data.students.length > 0) {
                console.log('\n📚 Students List:');
                students.data.students.forEach((student, index) => {
                    console.log(`   ${index + 1}. ${student.name} (${student.studentId})`);
                    console.log(`      Department: ${student.department}`);
                    console.log(`      Class: ${student.class}`);
                    console.log(`      Attendance: ${student.attendancePercentage || 0}%\n`);
                });
            }
        } else {
            console.log(`❌ Students API - Failed (${students.status})`);
            console.log(`   Error: ${students.data.error || 'Unknown error'}`);
        }
        
        console.log('✅ Students API test complete!');
        
    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }
}

testStudentsAPI();