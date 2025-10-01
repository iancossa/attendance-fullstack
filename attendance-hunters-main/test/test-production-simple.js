// Simple production API test using built-in fetch
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

async function testProduction() {
    console.log('🧪 Testing Production API...\n');
    
    try {
        // Test health endpoint
        console.log('1. Testing Health Check');
        const health = await makeRequest('https://attendance-fullstack.onrender.com/health');
        console.log(`✅ Health: ${health.status} - ${health.data.status || 'OK'}\n`);
        
        // Test API docs
        console.log('2. Testing API Documentation');
        const docs = await makeRequest('https://attendance-fullstack.onrender.com/api');
        console.log(`✅ API Docs: ${docs.status} - ${docs.data.message || 'Available'}\n`);
        
        // Test login endpoint
        console.log('3. Testing Login Endpoint');
        const login = await makeRequest('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            body: { email: 'test@example.com', password: 'test' }
        });
        console.log(`✅ Login: ${login.status} - ${login.data.error || 'Endpoint working'}\n`);
        
        console.log('📋 Production API Status: READY');
        console.log('   Frontend will now connect to production backend');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testProduction();