const fetch = require('node-fetch');

async function testStudentLogin() {
    try {
        console.log('🧪 Testing Student Login API...\n');

        // Test with Alice Johnson
        const loginData = {
            email: 'alice.johnson@university.edu',
            password: process.env.TEST_STUDENT_PASSWORD || 'defaultpass'
        };

        console.log('📧 Testing login for:', loginData.email);

        const response = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Login successful!');
            console.log('📋 Student Data:');
            console.log(`   Name: ${data.student.name}`);
            console.log(`   Email: ${data.student.email}`);
            console.log(`   Student ID: ${data.student.studentId}`);
            console.log(`   Department: ${data.student.department}`);
            console.log(`   Class: ${data.student.class}`);
            console.log(`   GPA: ${data.student.gpa}`);
            console.log(`   Status: ${data.student.status}`);
            console.log(`🔑 Token: ${data.token.substring(0, 20)}...`);

            // Test profile endpoint
            console.log('\n🔍 Testing profile endpoint...');
            const profileResponse = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/profile', {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });

            const profileData = await profileResponse.json();
            if (profileResponse.ok) {
                console.log('✅ Profile fetch successful!');
                console.log(`   Profile Name: ${profileData.student.name}`);
            } else {
                console.log('❌ Profile fetch failed:', profileData.error);
            }

        } else {
            console.log('❌ Login failed:', data.error);
        }

        // Test with another student
        console.log('\n🧪 Testing with Bob Smith...');
        const loginData2 = {
            email: 'bob.smith@university.edu',
            password: process.env.TEST_STUDENT_PASSWORD || 'defaultpass'
        };

        const response2 = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': 'test-token'
            },
            body: JSON.stringify(loginData2)
        });

        const data2 = await response2.json();
        if (response2.ok) {
            console.log('✅ Bob Smith login successful!');
            console.log(`   Name: ${data2.student.name}`);
            console.log(`   Department: ${data2.student.department}`);
        } else {
            console.log('❌ Bob Smith login failed:', data2.error);
        }

    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

testStudentLogin();