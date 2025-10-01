const https = require('https');

const API_BASE = 'https://attendance-fullstack.onrender.com/api';

// Test function to make HTTP requests
function testEndpoint(endpoint, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(API_BASE + endpoint);
        
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Health-Check/1.0',
                ...headers
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
                        headers: res.headers,
                        data: parsedData,
                        raw: responseData
                    });
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data: responseData,
                        raw: responseData
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data && method !== 'GET') {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function checkAPIHealth() {
    console.log('🏥 Backend API Health Check');
    console.log('=' .repeat(50));
    console.log(`🌐 Base URL: ${API_BASE}\n`);

    const tests = [
        {
            name: 'Server Health',
            endpoint: '/health',
            method: 'GET'
        },
        {
            name: 'Students Endpoint',
            endpoint: '/students',
            method: 'GET'
        },
        {
            name: 'Classes Endpoint', 
            endpoint: '/classes',
            method: 'GET'
        },
        {
            name: 'Auth Endpoint',
            endpoint: '/auth/login',
            method: 'POST',
            data: { email: 'test@test.com', password: 'test' }
        },
        {
            name: 'Student Auth Endpoint',
            endpoint: '/student-auth/login',
            method: 'POST',
            data: { email: 'test@test.com', password: 'test' }
        },
        {
            name: 'QR Generate Endpoint',
            endpoint: '/qr/generate',
            method: 'POST',
            data: { classId: 'TEST-001', className: 'Test Class' }
        }
    ];

    let healthyEndpoints = 0;
    let totalEndpoints = tests.length;

    for (const test of tests) {
        try {
            console.log(`🧪 Testing: ${test.name}`);
            console.log(`   ${test.method} ${test.endpoint}`);
            
            const startTime = Date.now();
            const response = await testEndpoint(test.endpoint, test.method, test.data);
            const responseTime = Date.now() - startTime;
            
            console.log(`   Status: ${response.status}`);
            console.log(`   Response Time: ${responseTime}ms`);
            
            if (response.status >= 200 && response.status < 500) {
                console.log(`   ✅ ${test.name} - OK`);
                healthyEndpoints++;
                
                // Show sample data for successful responses
                if (response.status === 200 && response.data) {
                    if (test.endpoint === '/students' && response.data.students) {
                        console.log(`   📊 Students found: ${response.data.students.length}`);
                    } else if (test.endpoint === '/classes' && response.data.classes) {
                        console.log(`   📊 Classes found: ${response.data.classes.length}`);
                    } else if (test.endpoint === '/qr/generate' && response.data.sessionId) {
                        console.log(`   📊 QR Session: ${response.data.sessionId}`);
                    }
                }
            } else {
                console.log(`   ❌ ${test.name} - Error ${response.status}`);
                if (response.data && response.data.error) {
                    console.log(`   Error: ${response.data.error}`);
                }
            }
            
        } catch (error) {
            console.log(`   ❌ ${test.name} - Connection Error`);
            console.log(`   Error: ${error.message}`);
        }
        
        console.log(''); // Empty line for readability
    }

    // Summary
    console.log('📋 Health Check Summary');
    console.log('=' .repeat(30));
    console.log(`✅ Healthy Endpoints: ${healthyEndpoints}/${totalEndpoints}`);
    console.log(`📊 Health Score: ${Math.round((healthyEndpoints/totalEndpoints) * 100)}%`);
    
    if (healthyEndpoints === totalEndpoints) {
        console.log('🎉 All systems operational!');
    } else if (healthyEndpoints > totalEndpoints * 0.7) {
        console.log('⚠️  Most systems operational, some issues detected');
    } else {
        console.log('🚨 Multiple system failures detected');
    }

    return {
        healthy: healthyEndpoints,
        total: totalEndpoints,
        score: Math.round((healthyEndpoints/totalEndpoints) * 100)
    };
}

// Test specific student functionality
async function testStudentFunctionality() {
    console.log('\n🎓 Testing Student Functionality');
    console.log('=' .repeat(40));

    try {
        // Test getting all students
        console.log('📚 Testing student retrieval...');
        const studentsResponse = await testEndpoint('/students');
        
        if (studentsResponse.status === 200 && studentsResponse.data.students) {
            const students = studentsResponse.data.students;
            console.log(`✅ Found ${students.length} students in database`);
            
            if (students.length > 0) {
                const sampleStudent = students[0];
                console.log(`📋 Sample student: ${sampleStudent.name} (${sampleStudent.studentId})`);
                console.log(`   Department: ${sampleStudent.department}`);
                console.log(`   Class: ${sampleStudent.class}`);
                console.log(`   Status: ${sampleStudent.status}`);
            }

            // Test filtering by class
            const uniqueClasses = [...new Set(students.map(s => s.class))];
            console.log(`📊 Unique classes: ${uniqueClasses.length}`);
            console.log(`   Classes: ${uniqueClasses.slice(0, 5).join(', ')}${uniqueClasses.length > 5 ? '...' : ''}`);

            // Test class filtering
            if (uniqueClasses.length > 0) {
                const testClass = uniqueClasses[0];
                console.log(`\n🔍 Testing class filter: ${testClass}`);
                const classFilterResponse = await testEndpoint(`/students?class=${encodeURIComponent(testClass)}`);
                
                if (classFilterResponse.status === 200) {
                    const filteredStudents = classFilterResponse.data.students;
                    console.log(`✅ Class filter working: ${filteredStudents.length} students in ${testClass}`);
                } else {
                    console.log(`❌ Class filter failed: ${classFilterResponse.status}`);
                }
            }

        } else {
            console.log(`❌ Failed to retrieve students: ${studentsResponse.status}`);
            if (studentsResponse.data && studentsResponse.data.error) {
                console.log(`   Error: ${studentsResponse.data.error}`);
            }
        }

    } catch (error) {
        console.log(`❌ Student functionality test failed: ${error.message}`);
    }
}

// Test QR functionality
async function testQRFunctionality() {
    console.log('\n📱 Testing QR Functionality');
    console.log('=' .repeat(35));

    try {
        // Test QR generation
        console.log('🔄 Testing QR generation...');
        const qrResponse = await testEndpoint('/qr/generate', 'POST', {
            classId: 'TEST-001',
            className: 'Health Check Test Class',
            latitude: 40.7128,
            longitude: -74.0060
        });

        if (qrResponse.status === 200 && qrResponse.data.sessionId) {
            const sessionId = qrResponse.data.sessionId;
            console.log(`✅ QR generation successful: ${sessionId}`);
            console.log(`   Expires in: ${qrResponse.data.expiresIn} seconds`);
            console.log(`   Class: ${qrResponse.data.className}`);

            // Test session status
            console.log('\n🔍 Testing session status...');
            const statusResponse = await testEndpoint(`/qr/session/${sessionId}`);
            
            if (statusResponse.status === 200) {
                console.log(`✅ Session status working`);
                console.log(`   Active: ${statusResponse.data.isActive}`);
                console.log(`   Time left: ${statusResponse.data.timeLeft}s`);
                console.log(`   Attendees: ${statusResponse.data.totalMarked}`);
            } else {
                console.log(`❌ Session status failed: ${statusResponse.status}`);
            }

        } else {
            console.log(`❌ QR generation failed: ${qrResponse.status}`);
            if (qrResponse.data && qrResponse.data.error) {
                console.log(`   Error: ${qrResponse.data.error}`);
            }
        }

    } catch (error) {
        console.log(`❌ QR functionality test failed: ${error.message}`);
    }
}

// Main execution
async function main() {
    console.log('🚀 Starting Production API Health Check...\n');
    
    const healthResult = await checkAPIHealth();
    await testStudentFunctionality();
    await testQRFunctionality();
    
    console.log('\n🏁 Health Check Complete!');
    console.log(`Final Score: ${healthResult.score}%`);
    
    if (healthResult.score >= 80) {
        console.log('🎉 Production API is healthy and ready!');
        process.exit(0);
    } else {
        console.log('⚠️  Production API has issues that need attention');
        process.exit(1);
    }
}

main().catch(error => {
    console.error('💥 Health check failed:', error);
    process.exit(1);
});