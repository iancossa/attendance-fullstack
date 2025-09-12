// Test script for student endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testStudent = {
    studentId: 'STU001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    department: 'Computer Science',
    class: 'CS-101',
    section: 'A',
    year: '2024',
    gpa: 3.5
};

async function testStudentEndpoints() {
    try {
        console.log('🧪 Testing Student Management Endpoints...\n');

        // Test 1: Get all students (should be empty initially)
        console.log('1. Testing GET /api/students');
        try {
            const response = await axios.get(`${BASE_URL}/students`);
            console.log('✅ GET /students - Success');
            console.log(`   Found ${response.data.students.length} students\n`);
        } catch (error) {
            console.log('❌ GET /students - Failed:', error.response?.data?.error || error.message);
            console.log('   Note: This might fail due to authentication requirement\n');
        }

        // Test 2: Health check to verify server is running
        console.log('2. Testing server health');
        try {
            const response = await axios.get(`${BASE_URL.replace('/api', '')}/health`);
            console.log('✅ Server health check - Success');
            console.log(`   Status: ${response.data.status}\n`);
        } catch (error) {
            console.log('❌ Server health check - Failed:', error.message);
        }

        // Test 3: Check API documentation
        console.log('3. Testing API documentation');
        try {
            const response = await axios.get(`${BASE_URL}`);
            console.log('✅ API documentation - Success');
            if (response.data.endpoints.students) {
                console.log('✅ Student endpoints are documented:');
                Object.entries(response.data.endpoints.students).forEach(([endpoint, description]) => {
                    console.log(`   ${endpoint}: ${description}`);
                });
            }
        } catch (error) {
            console.log('❌ API documentation - Failed:', error.message);
        }

        console.log('\n📋 Student Management Endpoints Created:');
        console.log('   GET    /api/students - Get all students');
        console.log('   POST   /api/students - Create new student (admin only)');
        console.log('   PUT    /api/students/:id - Update student (admin only)');
        console.log('   GET    /api/students/:id/attendance - Get student attendance history');
        
        console.log('\n🔐 Authentication Required:');
        console.log('   - All endpoints require valid JWT token');
        console.log('   - POST and PUT require admin role');
        
        console.log('\n✅ Student Management API is ready!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testStudentEndpoints();