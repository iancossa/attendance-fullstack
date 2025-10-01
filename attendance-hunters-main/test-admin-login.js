const fetch = require('node-fetch');

async function testAdminLogin() {
    console.log('🧪 Testing Admin Login...\n');
    
    const admins = [
        { email: 'eldomacuacua@gmail.com', name: 'Eldo Macuacua' },
        { email: 'ian@university.edu', name: 'Ian Silva' },
        { email: 'joaquim@university.edu', name: 'Joaquim Santos' }
    ];
    
    for (const admin of admins) {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: admin.email,
                    password: 'admin123'
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ ${admin.name} login successful`);
                console.log(`   Role: ${data.user.role}`);
                console.log(`   Token: ${data.token ? 'Generated' : 'Missing'}`);
            } else {
                const error = await response.json();
                console.log(`❌ ${admin.name} login failed:`, error.error);
            }
        } catch (error) {
            console.log(`❌ ${admin.name} login error:`, error.message);
        }
        console.log('');
    }
}

testAdminLogin();