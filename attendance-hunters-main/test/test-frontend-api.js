// Test frontend API integration
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testLogin() {
    console.log('🧪 Testing Frontend API Integration\n');
    
    // Test student login
    console.log('1️⃣ Testing Student Login...');
    try {
        const response = await fetch(`${API_BASE}/student-auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'alice.johnson@university.edu',
                password: 'student123'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('   ✅ Student login successful');
            console.log(`   👤 Student: ${data.student.name}`);
            console.log(`   🎫 Token: ${data.token ? 'Generated' : 'Missing'}`);
        } else {
            console.log('   ❌ Student login failed:', response.status);
        }
    } catch (error) {
        console.log('   ❌ Student login error:', error.message);
    }
    
    // Test staff login
    console.log('\n2️⃣ Testing Staff Login...');
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'staff@university.edu',
                password: 'staff123'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('   ✅ Staff login successful');
            console.log(`   👤 User: ${data.user.name}`);
            console.log(`   🎫 Token: ${data.token ? 'Generated' : 'Missing'}`);
        } else {
            console.log('   ❌ Staff login failed:', response.status);
        }
    } catch (error) {
        console.log('   ❌ Staff login error:', error.message);
    }
    
    // Test admin login
    console.log('\n3️⃣ Testing Admin Login...');
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@university.edu',
                password: 'admin123'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('   ✅ Admin login successful');
            console.log(`   👤 User: ${data.user.name}`);
            console.log(`   🎫 Token: ${data.token ? 'Generated' : 'Missing'}`);
        } else {
            console.log('   ❌ Admin login failed:', response.status);
        }
    } catch (error) {
        console.log('   ❌ Admin login error:', error.message);
    }
    
    console.log('\n🎉 Frontend API integration test complete!');
}

testLogin();