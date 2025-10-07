const https = require('https');

function testStudentsEndpoint() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'attendance-fullstack.onrender.com',
            port: 443,
            path: '/api/students',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

        req.end();
    });
}

async function testStudentsList() {
    console.log('🧪 Testing Students Endpoint Fix');
    console.log('=' .repeat(40));

    try {
        console.log('📚 Testing GET /api/students...');
        
        const response = await testStudentsEndpoint();
        
        console.log(`Status: ${response.status}`);
        
        if (response.status === 200) {
            console.log('✅ SUCCESS! Students endpoint working');
            
            if (response.data && response.data.students) {
                const students = response.data.students;
                console.log(`📊 Found ${students.length} students`);
                
                if (students.length > 0) {
                    console.log('📋 Sample students:');
                    students.slice(0, 3).forEach(student => {
                        console.log(`  - ${student.name} (${student.email})`);
                        console.log(`    Department: ${student.department}`);
                        console.log(`    Class: ${student.class}`);
                    });
                }
                
                console.log('\n🎉 HYBRID MODE SHOULD NOW WORK!');
                console.log('✅ Student list will load in Manual Review');
                
            } else {
                console.log('⚠️  Response structure unexpected');
                console.log('Data:', JSON.stringify(response.data, null, 2));
            }
            
        } else if (response.status === 401) {
            console.log('❌ Still getting 401 - authentication issue persists');
            console.log('Response:', response.data);
        } else {
            console.log(`❌ Unexpected status: ${response.status}`);
            console.log('Response:', response.data);
        }
        
    } catch (error) {
        console.log(`❌ Connection error: ${error.message}`);
    }

    console.log('\n🎯 Test Complete!');
}

testStudentsList();