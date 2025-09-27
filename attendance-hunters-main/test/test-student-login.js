// Test student login credentials
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

async function testStudentLogins() {
    console.log('🧪 Testing Student Login Credentials...\n');
    
    const students = [
        { email: 'alice.johnson@university.edu', name: 'Alice Johnson' },
        { email: 'bob.smith@university.edu', name: 'Bob Smith' },
        { email: 'jane.smith@university.edu', name: 'Jane Smith' },
        { email: 'mike.johnson@university.edu', name: 'Mike Johnson' }
    ];
    
    for (const student of students) {
        try {
            console.log(`Testing login for ${student.name}...`);
            
            const loginResponse = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
                method: 'POST',
                body: {
                    email: student.email,
                    password: 'student123'
                }
            });
            
            if (loginResponse.status === 200) {
                console.log(`✅ SUCCESS: ${student.name} can login`);
                console.log(`   Email: ${student.email}`);
                console.log(`   Password: student123`);
                console.log(`   Token: ${loginResponse.data.token ? 'Generated' : 'Missing'}`);
                console.log(`   Role: ${loginResponse.data.user?.role || 'Unknown'}\n`);
            } else {
                console.log(`❌ FAILED: ${student.name} login failed`);
                console.log(`   Status: ${loginResponse.status}`);
                console.log(`   Error: ${loginResponse.data.error || 'Unknown error'}\n`);
            }
            
        } catch (error) {
            console.log(`❌ ERROR: ${student.name} - ${error.message}\n`);
        }
    }
    
    console.log('📋 STUDENT LOGIN SUMMARY:');
    console.log('All students use password: student123');
    console.log('Select "Student" tab on login page');
}

testStudentLogins();