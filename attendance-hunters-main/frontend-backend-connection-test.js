const https = require('https');
const fs = require('fs');

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
                'User-Agent': 'Frontend-Backend-Test/1.0',
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

// Test results storage
const testResults = {
    working: [],
    broken: [],
    warnings: [],
    summary: {}
};

function addResult(category, functionality, status, details) {
    testResults[category].push({
        functionality,
        status,
        details,
        timestamp: new Date().toISOString()
    });
}

async function testAuthenticationFlow() {
    console.log('🔐 Testing Authentication Flow');
    console.log('=' .repeat(40));

    try {
        // Test admin login endpoint
        console.log('👤 Testing Admin Login...');
        const adminLoginResponse = await testEndpoint('/auth/login', 'POST', {
            email: 'admin@test.com',
            password: 'wrongpassword'
        });

        if (adminLoginResponse.status === 401 || adminLoginResponse.status === 400) {
            console.log('✅ Admin login endpoint working (correctly rejecting invalid credentials)');
            addResult('working', 'Admin Authentication', 'WORKING', 'Endpoint responds correctly to invalid credentials');
        } else {
            console.log(`❌ Admin login unexpected response: ${adminLoginResponse.status}`);
            addResult('broken', 'Admin Authentication', 'BROKEN', `Unexpected status: ${adminLoginResponse.status}`);
        }

        // Test student login endpoint
        console.log('🎓 Testing Student Login...');
        const studentLoginResponse = await testEndpoint('/student-auth/login', 'POST', {
            email: 'student@test.com',
            password: 'wrongpassword'
        });

        if (studentLoginResponse.status === 401 || studentLoginResponse.status === 400) {
            console.log('✅ Student login endpoint working (correctly rejecting invalid credentials)');
            addResult('working', 'Student Authentication', 'WORKING', 'Endpoint responds correctly to invalid credentials');
        } else {
            console.log(`❌ Student login unexpected response: ${studentLoginResponse.status}`);
            addResult('broken', 'Student Authentication', 'BROKEN', `Unexpected status: ${studentLoginResponse.status}`);
        }

    } catch (error) {
        console.log(`❌ Authentication test failed: ${error.message}`);
        addResult('broken', 'Authentication Flow', 'BROKEN', error.message);
    }
}

async function testStudentManagement() {
    console.log('\n👥 Testing Student Management');
    console.log('=' .repeat(40));

    try {
        // Test getting all students
        console.log('📚 Testing Get All Students...');
        const studentsResponse = await testEndpoint('/students');
        
        if (studentsResponse.status === 200) {
            if (studentsResponse.data && studentsResponse.data.students) {
                const students = studentsResponse.data.students;
                console.log(`✅ Students API working - Found ${students.length} students`);
                addResult('working', 'Get All Students', 'WORKING', `${students.length} students retrieved successfully`);

                // Test class filtering
                if (students.length > 0) {
                    const sampleClass = students[0].class;
                    console.log(`🔍 Testing class filter with: ${sampleClass}`);
                    
                    const filteredResponse = await testEndpoint(`/students?class=${encodeURIComponent(sampleClass)}`);
                    if (filteredResponse.status === 200 && filteredResponse.data.students) {
                        console.log(`✅ Class filtering working - ${filteredResponse.data.students.length} students in class`);
                        addResult('working', 'Student Class Filtering', 'WORKING', `Filter by class returns ${filteredResponse.data.students.length} students`);
                    } else {
                        console.log(`❌ Class filtering failed: ${filteredResponse.status}`);
                        addResult('broken', 'Student Class Filtering', 'BROKEN', `Status: ${filteredResponse.status}`);
                    }
                }

                // Check data structure
                const sampleStudent = students[0];
                const requiredFields = ['id', 'studentId', 'name', 'email', 'department', 'class'];
                const missingFields = requiredFields.filter(field => !sampleStudent[field]);
                
                if (missingFields.length === 0) {
                    console.log('✅ Student data structure complete');
                    addResult('working', 'Student Data Structure', 'WORKING', 'All required fields present');
                } else {
                    console.log(`⚠️  Missing fields in student data: ${missingFields.join(', ')}`);
                    addResult('warnings', 'Student Data Structure', 'WARNING', `Missing fields: ${missingFields.join(', ')}`);
                }

            } else {
                console.log('❌ Students API returns invalid data structure');
                addResult('broken', 'Get All Students', 'BROKEN', 'Invalid response structure');
            }
        } else {
            console.log(`❌ Students API failed: ${studentsResponse.status}`);
            addResult('broken', 'Get All Students', 'BROKEN', `HTTP ${studentsResponse.status}`);
        }

    } catch (error) {
        console.log(`❌ Student management test failed: ${error.message}`);
        addResult('broken', 'Student Management', 'BROKEN', error.message);
    }
}

async function testClassManagement() {
    console.log('\n🏫 Testing Class Management');
    console.log('=' .repeat(40));

    try {
        console.log('📋 Testing Get All Classes...');
        const classesResponse = await testEndpoint('/classes');
        
        if (classesResponse.status === 200) {
            if (classesResponse.data && classesResponse.data.classes) {
                const classes = classesResponse.data.classes;
                console.log(`✅ Classes API working - Found ${classes.length} classes`);
                addResult('working', 'Get All Classes', 'WORKING', `${classes.length} classes retrieved successfully`);

                if (classes.length > 0) {
                    const sampleClass = classes[0];
                    const requiredFields = ['id', 'name', 'code'];
                    const missingFields = requiredFields.filter(field => !sampleClass[field]);
                    
                    if (missingFields.length === 0) {
                        console.log('✅ Class data structure complete');
                        addResult('working', 'Class Data Structure', 'WORKING', 'All required fields present');
                    } else {
                        console.log(`⚠️  Missing fields in class data: ${missingFields.join(', ')}`);
                        addResult('warnings', 'Class Data Structure', 'WARNING', `Missing fields: ${missingFields.join(', ')}`);
                    }
                }
            } else {
                console.log('❌ Classes API returns invalid data structure');
                addResult('broken', 'Get All Classes', 'BROKEN', 'Invalid response structure');
            }
        } else {
            console.log(`❌ Classes API failed: ${classesResponse.status}`);
            addResult('broken', 'Get All Classes', 'BROKEN', `HTTP ${classesResponse.status}`);
        }

    } catch (error) {
        console.log(`❌ Class management test failed: ${error.message}`);
        addResult('broken', 'Class Management', 'BROKEN', error.message);
    }
}

async function testQRAttendanceFlow() {
    console.log('\n📱 Testing QR Attendance Flow');
    console.log('=' .repeat(40));

    try {
        // Test QR generation
        console.log('🔄 Testing QR Generation...');
        const qrResponse = await testEndpoint('/qr/generate', 'POST', {
            classId: 'TEST-001',
            className: 'Frontend Test Class',
            latitude: 40.7128,
            longitude: -74.0060
        });

        if (qrResponse.status === 200 && qrResponse.data.sessionId) {
            const sessionId = qrResponse.data.sessionId;
            console.log(`✅ QR Generation working - Session: ${sessionId}`);
            addResult('working', 'QR Generation', 'WORKING', `Session created: ${sessionId}`);

            // Test session status
            console.log('📊 Testing Session Status...');
            const statusResponse = await testEndpoint(`/qr/session/${sessionId}`);
            
            if (statusResponse.status === 200) {
                console.log('✅ QR Session Status working');
                addResult('working', 'QR Session Status', 'WORKING', 'Session status retrieved successfully');

                // Test QR data structure
                const requiredQRFields = ['sessionId', 'qrData', 'expiresAt', 'className'];
                const missingQRFields = requiredQRFields.filter(field => !qrResponse.data[field]);
                
                if (missingQRFields.length === 0) {
                    console.log('✅ QR data structure complete');
                    addResult('working', 'QR Data Structure', 'WORKING', 'All required fields present');
                } else {
                    console.log(`⚠️  Missing fields in QR data: ${missingQRFields.join(', ')}`);
                    addResult('warnings', 'QR Data Structure', 'WARNING', `Missing fields: ${missingQRFields.join(', ')}`);
                }

                // Test attendance marking (will fail without valid student, but endpoint should respond)
                console.log('✅ Testing QR Attendance Marking...');
                const markResponse = await testEndpoint(`/qr/mark/${sessionId}`, 'POST', {
                    studentId: 'TEST-STUDENT',
                    studentName: 'Test Student',
                    latitude: 40.7128,
                    longitude: -74.0060
                });

                if (markResponse.status === 403 || markResponse.status === 404) {
                    console.log('✅ QR Attendance Marking endpoint working (correctly rejecting invalid student)');
                    addResult('working', 'QR Attendance Marking', 'WORKING', 'Endpoint responds correctly to invalid student');
                } else {
                    console.log(`⚠️  QR Attendance Marking unexpected response: ${markResponse.status}`);
                    addResult('warnings', 'QR Attendance Marking', 'WARNING', `Unexpected status: ${markResponse.status}`);
                }

            } else {
                console.log(`❌ QR Session Status failed: ${statusResponse.status}`);
                addResult('broken', 'QR Session Status', 'BROKEN', `HTTP ${statusResponse.status}`);
            }

        } else {
            console.log(`❌ QR Generation failed: ${qrResponse.status}`);
            addResult('broken', 'QR Generation', 'BROKEN', `HTTP ${qrResponse.status}`);
        }

    } catch (error) {
        console.log(`❌ QR attendance test failed: ${error.message}`);
        addResult('broken', 'QR Attendance Flow', 'BROKEN', error.message);
    }
}

async function testAttendanceManagement() {
    console.log('\n📊 Testing Attendance Management');
    console.log('=' .repeat(40));

    try {
        // Test attendance records endpoint
        console.log('📈 Testing Get Attendance Records...');
        const attendanceResponse = await testEndpoint('/attendance');
        
        if (attendanceResponse.status === 200) {
            console.log('✅ Attendance records endpoint working');
            addResult('working', 'Get Attendance Records', 'WORKING', 'Endpoint responds successfully');
        } else if (attendanceResponse.status === 401) {
            console.log('⚠️  Attendance records requires authentication (expected)');
            addResult('warnings', 'Get Attendance Records', 'WARNING', 'Requires authentication');
        } else {
            console.log(`❌ Attendance records failed: ${attendanceResponse.status}`);
            addResult('broken', 'Get Attendance Records', 'BROKEN', `HTTP ${attendanceResponse.status}`);
        }

    } catch (error) {
        console.log(`❌ Attendance management test failed: ${error.message}`);
        addResult('broken', 'Attendance Management', 'BROKEN', error.message);
    }
}

async function testCORSAndHeaders() {
    console.log('\n🌐 Testing CORS and Headers');
    console.log('=' .repeat(40));

    try {
        // Test CORS headers
        console.log('🔗 Testing CORS Headers...');
        const corsResponse = await testEndpoint('/students', 'GET', null, {
            'Origin': 'http://localhost:3000'
        });

        if (corsResponse.headers['access-control-allow-origin']) {
            console.log('✅ CORS headers present');
            addResult('working', 'CORS Configuration', 'WORKING', 'CORS headers configured');
        } else {
            console.log('⚠️  CORS headers not found');
            addResult('warnings', 'CORS Configuration', 'WARNING', 'CORS headers may not be configured');
        }

        // Test content type
        if (corsResponse.headers['content-type'] && corsResponse.headers['content-type'].includes('application/json')) {
            console.log('✅ JSON content type correct');
            addResult('working', 'Content Type Headers', 'WORKING', 'JSON content type set correctly');
        } else {
            console.log('⚠️  Content type may not be set correctly');
            addResult('warnings', 'Content Type Headers', 'WARNING', 'Content type headers may be incorrect');
        }

    } catch (error) {
        console.log(`❌ CORS test failed: ${error.message}`);
        addResult('broken', 'CORS and Headers', 'BROKEN', error.message);
    }
}

function analyzeFrontendBackendIntegration() {
    console.log('\n🔄 Frontend-Backend Integration Analysis');
    console.log('=' .repeat(50));

    // Check frontend service configuration
    const frontendServices = [
        'studentService.getAllStudents()',
        'classService.getAllClasses()',
        'qrService.generateQRSession()',
        'authService.login()',
        'studentAuthService.login()'
    ];

    console.log('📋 Frontend Services Expected:');
    frontendServices.forEach(service => {
        console.log(`   - ${service}`);
    });

    // API endpoints that should work with frontend
    const criticalEndpoints = [
        { endpoint: '/students', frontend: 'ManualModePage, HybridModePage' },
        { endpoint: '/classes', frontend: 'ClassesPage, AttendancePage' },
        { endpoint: '/qr/generate', frontend: 'QRModePage' },
        { endpoint: '/qr/session/:id', frontend: 'QRModePage' },
        { endpoint: '/auth/login', frontend: 'LoginPage' },
        { endpoint: '/student-auth/login', frontend: 'StudentLoginPage' }
    ];

    console.log('\n🎯 Critical Frontend-Backend Connections:');
    criticalEndpoints.forEach(item => {
        const isWorking = testResults.working.some(result => 
            result.functionality.toLowerCase().includes(item.endpoint.split('/')[1])
        );
        const isBroken = testResults.broken.some(result => 
            result.functionality.toLowerCase().includes(item.endpoint.split('/')[1])
        );

        if (isWorking) {
            console.log(`   ✅ ${item.endpoint} → ${item.frontend}`);
        } else if (isBroken) {
            console.log(`   ❌ ${item.endpoint} → ${item.frontend}`);
        } else {
            console.log(`   ⚠️  ${item.endpoint} → ${item.frontend} (Unknown)`);
        }
    });
}

function generateReport() {
    console.log('\n📊 COMPREHENSIVE FRONTEND-BACKEND CONNECTION REPORT');
    console.log('=' .repeat(60));

    const totalTests = testResults.working.length + testResults.broken.length + testResults.warnings.length;
    const successRate = Math.round((testResults.working.length / totalTests) * 100);

    console.log(`\n🎯 OVERALL HEALTH SCORE: ${successRate}%`);
    console.log(`📈 Total Tests: ${totalTests}`);
    console.log(`✅ Working: ${testResults.working.length}`);
    console.log(`❌ Broken: ${testResults.broken.length}`);
    console.log(`⚠️  Warnings: ${testResults.warnings.length}`);

    console.log('\n✅ WORKING FUNCTIONALITIES:');
    console.log('=' .repeat(30));
    testResults.working.forEach(result => {
        console.log(`   ✅ ${result.functionality}`);
        console.log(`      ${result.details}`);
    });

    console.log('\n❌ BROKEN FUNCTIONALITIES:');
    console.log('=' .repeat(30));
    if (testResults.broken.length === 0) {
        console.log('   🎉 No broken functionalities detected!');
    } else {
        testResults.broken.forEach(result => {
            console.log(`   ❌ ${result.functionality}`);
            console.log(`      ${result.details}`);
        });
    }

    console.log('\n⚠️  WARNINGS & RECOMMENDATIONS:');
    console.log('=' .repeat(35));
    if (testResults.warnings.length === 0) {
        console.log('   ✨ No warnings - everything looks good!');
    } else {
        testResults.warnings.forEach(result => {
            console.log(`   ⚠️  ${result.functionality}`);
            console.log(`      ${result.details}`);
        });
    }

    console.log('\n🔧 FRONTEND INTEGRATION STATUS:');
    console.log('=' .repeat(35));
    console.log('   📱 Manual Attendance Mode: ' + (testResults.working.some(r => r.functionality.includes('Students')) ? '✅ READY' : '❌ BLOCKED'));
    console.log('   📱 QR Attendance Mode: ' + (testResults.working.some(r => r.functionality.includes('QR')) ? '✅ READY' : '❌ BLOCKED'));
    console.log('   📱 Hybrid Attendance Mode: ' + (testResults.working.some(r => r.functionality.includes('Students')) ? '✅ READY' : '❌ BLOCKED'));
    console.log('   🔐 Authentication System: ' + (testResults.working.some(r => r.functionality.includes('Authentication')) ? '✅ READY' : '❌ BLOCKED'));

    console.log('\n💡 RECOMMENDATIONS:');
    console.log('=' .repeat(20));
    
    if (successRate >= 90) {
        console.log('   🎉 Excellent! Your API is production-ready.');
        console.log('   🚀 All major functionalities are working correctly.');
    } else if (successRate >= 70) {
        console.log('   👍 Good! Most functionalities are working.');
        console.log('   🔧 Address the broken items to improve reliability.');
    } else {
        console.log('   ⚠️  Needs attention! Several critical issues detected.');
        console.log('   🚨 Fix broken functionalities before production use.');
    }

    // Save detailed report to file
    const reportData = {
        timestamp: new Date().toISOString(),
        healthScore: successRate,
        totalTests,
        results: testResults,
        summary: {
            working: testResults.working.length,
            broken: testResults.broken.length,
            warnings: testResults.warnings.length
        }
    };

    fs.writeFileSync('frontend-backend-connection-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Detailed report saved to: frontend-backend-connection-report.json');

    return reportData;
}

async function main() {
    console.log('🚀 FRONTEND-BACKEND CONNECTION TEST');
    console.log('🌐 API Base: ' + API_BASE);
    console.log('⏰ Started: ' + new Date().toLocaleString());
    console.log('=' .repeat(60));

    try {
        await testAuthenticationFlow();
        await testStudentManagement();
        await testClassManagement();
        await testQRAttendanceFlow();
        await testAttendanceManagement();
        await testCORSAndHeaders();
        
        analyzeFrontendBackendIntegration();
        const report = generateReport();

        console.log('\n🏁 TEST COMPLETED SUCCESSFULLY!');
        
        if (report.healthScore >= 80) {
            console.log('🎉 Your frontend-backend connection is healthy!');
            process.exit(0);
        } else {
            console.log('⚠️  Your frontend-backend connection needs attention.');
            process.exit(1);
        }

    } catch (error) {
        console.error('💥 Test execution failed:', error);
        process.exit(1);
    }
}

main();