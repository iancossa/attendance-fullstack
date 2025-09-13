// Test login with created user
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

async function testLogin() {
    console.log('🧪 Testing Login with Created Users...\n');
    
    try {
        // Test student login
        console.log('1. Testing Student Login');
        const studentLogin = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            body: {
                email: 'student@university.edu',
                password: 'student123'
            }
        });
        
        if (studentLogin.status === 200) {
            console.log('✅ Student Login - SUCCESS!');
            console.log(`   Token: ${studentLogin.data.token ? 'Generated' : 'Missing'}`);
            console.log(`   User: ${studentLogin.data.user?.name || 'Unknown'}`);
            console.log(`   Role: ${studentLogin.data.user?.role || 'Unknown'}\n`);
        } else {
            console.log(`❌ Student Login - Failed (${studentLogin.status})`);
            console.log(`   Error: ${studentLogin.data.error || 'Unknown error'}\n`);
        }
        
        // Test staff login
        console.log('2. Testing Staff Login');
        const staffLogin = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            body: {
                email: 'staff@university.edu',
                password: 'staff123'
            }
        });
        
        if (staffLogin.status === 200) {
            console.log('✅ Staff Login - SUCCESS!');
            console.log(`   Token: ${staffLogin.data.token ? 'Generated' : 'Missing'}`);
            console.log(`   User: ${staffLogin.data.user?.name || 'Unknown'}`);
            console.log(`   Role: ${staffLogin.data.user?.role || 'Unknown'}\n`);
        } else {
            console.log(`❌ Staff Login - Failed (${staffLogin.status})`);
            console.log(`   Error: ${staffLogin.data.error || 'Unknown error'}\n`);
        }
        
        console.log('📋 Login Test Complete!');
        console.log('   Frontend can now use these credentials for testing');
        
    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }
}

testLogin();