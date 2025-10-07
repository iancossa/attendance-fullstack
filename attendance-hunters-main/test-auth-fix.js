const https = require('https');

const API_BASE = 'https://attendance-fullstack.onrender.com/api';

function testLogin(email, password) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ email, password });
        
        const options = {
            hostname: 'attendance-fullstack.onrender.com',
            port: 443,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsedData = responseData ? JSON.parse(responseData) : {};
                    resolve({
                        status: res.statusCode,
                        data: parsedData,
                        raw: responseData
                    });
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        data: responseData,
                        raw: responseData
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

async function testAuthenticationFix() {
    console.log('🔐 Testing Authentication Fix');
    console.log('=' .repeat(40));

    const testCredentials = [
        { email: 'admin@test.com', password: 'password' },
        { email: 'test@example.com', password: 'password' },
        { email: 'ahiry@rpa.com', password: 'password' },
        { email: 'admin@test.com', password: 'admin123' },
        { email: 'test@example.com', password: 'test123' }
    ];

    for (const creds of testCredentials) {
        try {
            console.log(`\n🧪 Testing: ${creds.email} / ${creds.password}`);
            
            const response = await testLogin(creds.email, creds.password);
            
            console.log(`   Status: ${response.status}`);
            
            if (response.status === 200) {
                console.log('   ✅ LOGIN SUCCESS!');
                console.log(`   Token: ${response.data.token ? 'Generated' : 'Missing'}`);
                console.log(`   User: ${response.data.user?.name} (${response.data.user?.role})`);
            } else if (response.status === 401) {
                console.log('   ❌ Invalid credentials (expected for wrong password)');
            } else if (response.status === 400) {
                console.log('   ⚠️  Validation error');
                if (response.data.details) {
                    console.log(`   Details: ${JSON.stringify(response.data.details)}`);
                }
            } else {
                console.log(`   ❌ Unexpected status: ${response.status}`);
                console.log(`   Response: ${JSON.stringify(response.data)}`);
            }
            
        } catch (error) {
            console.log(`   ❌ Connection error: ${error.message}`);
        }
    }

    console.log('\n🎯 Authentication Fix Test Complete!');
}

testAuthenticationFix();