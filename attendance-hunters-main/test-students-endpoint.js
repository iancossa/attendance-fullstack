const fetch = require('node-fetch');

async function testStudentsEndpoint() {
    console.log('🧪 Testing Students API Endpoint...\n');
    
    try {
        // First, try to login as admin to get a token
        console.log('1. Attempting admin login...');
        const loginResponse = await fetch('https://attendance-fullstack.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@test.com',
                password: 'admin123'
            })
        });
        
        if (!loginResponse.ok) {
            console.log('❌ Admin login failed, trying with test credentials...');
            
            // Try with different credentials
            const altLoginResponse = await fetch('https://attendance-fullstack.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            });
            
            if (!altLoginResponse.ok) {
                console.log('❌ Alternative login also failed');
                console.log('📝 Testing students endpoint without authentication...\n');
                
                // Test students endpoint without auth
                const studentsResponse = await fetch('https://attendance-fullstack.onrender.com/api/students');
                console.log('Students endpoint status:', studentsResponse.status);
                
                if (studentsResponse.status === 401) {
                    console.log('✅ Endpoint properly protected (401 Unauthorized)');
                } else {
                    const studentsData = await studentsResponse.text();
                    console.log('Response:', studentsData);
                }
                return;
            }
            
            const altLoginData = await altLoginResponse.json();
            console.log('✅ Alternative login successful');
            
            // Test students endpoint with token
            console.log('2. Testing students endpoint with token...');
            const studentsResponse = await fetch('https://attendance-fullstack.onrender.com/api/students', {
                headers: {
                    'Authorization': `Bearer ${altLoginData.token}`
                }
            });
            
            console.log('Students endpoint status:', studentsResponse.status);
            const studentsData = await studentsResponse.json();
            console.log('Students data:', JSON.stringify(studentsData, null, 2));
            return;
        }
        
        const loginData = await loginResponse.json();
        console.log('✅ Admin login successful');
        
        // Test students endpoint with admin token
        console.log('2. Testing students endpoint with admin token...');
        const studentsResponse = await fetch('https://attendance-fullstack.onrender.com/api/students', {
            headers: {
                'Authorization': `Bearer ${loginData.token}`
            }
        });
        
        console.log('Students endpoint status:', studentsResponse.status);
        const studentsData = await studentsResponse.json();
        console.log('Students data:', JSON.stringify(studentsData, null, 2));
        
    } catch (error) {
        console.error('🚨 Test failed:', error.message);
    }
}

testStudentsEndpoint();