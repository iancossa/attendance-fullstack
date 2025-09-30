const fetch = require('node-fetch');

async function testLogin() {
    const baseUrl = 'http://localhost:5000';
    
    // Test credentials from database
    const testCredentials = [
        { email: 'eldomacuacua@gmail.com', password: 'admin123' },
        { email: 'iancossa@gmail.com', password: 'admin123' },
        { email: 'joaquimmagode@gmail.com', password: 'admin123' }
    ];
    
    console.log('🧪 Testing login API...\n');
    
    // First check if server is running
    try {
        const healthResponse = await fetch(`${baseUrl}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Server health:', healthData);
    } catch (error) {
        console.log('❌ Server not running. Please start the server first.');
        console.log('Run: npm start');
        return;
    }
    
    // Test each credential
    for (const cred of testCredentials) {
        console.log(`\n🔐 Testing login for: ${cred.email}`);
        
        try {
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cred)
            });
            
            const data = await response.json();
            
            console.log(`Status: ${response.status}`);
            console.log('Response:', JSON.stringify(data, null, 2));
            
            if (response.ok) {
                console.log('✅ Login successful!');
            } else {
                console.log('❌ Login failed!');
            }
            
        } catch (error) {
            console.log('❌ Request error:', error.message);
        }
    }
}

testLogin();