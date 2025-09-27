// Test production API login
const axios = require('axios');

const PRODUCTION_API = 'https://attendance-fullstack.onrender.com/api';

async function testProductionLogin() {
    try {
        console.log('🧪 Testing Production API Login...\n');
        
        // Test 1: Health check
        console.log('1. Testing API Health Check');
        try {
            const healthResponse = await axios.get('https://attendance-fullstack.onrender.com/health');
            console.log('✅ Health Check - Success');
            console.log(`   Status: ${healthResponse.data.status}`);
            console.log(`   Database: ${healthResponse.data.database}\n`);
        } catch (error) {
            console.log('❌ Health Check - Failed:', error.message);
            console.log('   API might be down or starting up\n');
        }

        // Test 2: API Documentation
        console.log('2. Testing API Documentation');
        try {
            const docsResponse = await axios.get(`${PRODUCTION_API}`);
            console.log('✅ API Docs - Success');
            console.log(`   Message: ${docsResponse.data.message}`);
            console.log(`   Version: ${docsResponse.data.version}\n`);
        } catch (error) {
            console.log('❌ API Docs - Failed:', error.response?.status || error.message);
        }

        // Test 3: Login attempt (will fail without valid credentials but shows endpoint works)
        console.log('3. Testing Login Endpoint');
        try {
            const loginResponse = await axios.post(`${PRODUCTION_API}/auth/login`, {
                email: 'test@example.com',
                password: 'testpassword'
            });
            console.log('✅ Login endpoint responded');
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('✅ Login Endpoint - Working (401 Unauthorized expected)');
                console.log('   This means the endpoint is accessible and processing requests');
            } else {
                console.log('❌ Login Endpoint - Error:', error.response?.status || error.message);
                console.log('   Response:', error.response?.data);
            }
        }

        // Test 4: Register endpoint
        console.log('\n4. Testing Register Endpoint');
        try {
            const registerResponse = await axios.post(`${PRODUCTION_API}/auth/register`, {
                email: 'test@example.com',
                password: 'testpassword',
                name: 'Test User',
                employeeId: 'TEST001'
            });
            console.log('✅ Register - Success');
        } catch (error) {
            if (error.response?.status === 400) {
                console.log('✅ Register Endpoint - Working (400 Bad Request expected)');
                console.log('   Error:', error.response?.data?.error);
            } else {
                console.log('❌ Register Endpoint - Error:', error.response?.status || error.message);
            }
        }

        console.log('\n📋 Production API Status:');
        console.log('   Base URL: https://attendance-fullstack.onrender.com/api');
        console.log('   Frontend should now connect to production backend');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testProductionLogin();