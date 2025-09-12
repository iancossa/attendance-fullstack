// Test QR endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testQREndpoints() {
    try {
        console.log('🧪 Testing QR Code Endpoints...\n');

        // Test QR generation
        console.log('1. Testing QR Generation');
        const response = await axios.post(`${BASE_URL}/qr/generate`, {
            classId: 'CS101',
            className: 'Computer Science 101'
        });
        
        console.log('✅ QR Generation - Success');
        console.log(`   Session ID: ${response.data.sessionId}`);
        console.log(`   QR Data: ${response.data.qrData}`);
        console.log(`   Expires In: ${response.data.expiresIn} seconds\n`);
        
        const sessionId = response.data.sessionId;
        
        // Test marking attendance
        console.log('2. Testing Mark Attendance');
        const markResponse = await axios.post(`${BASE_URL}/qr/mark/${sessionId}`, {
            studentId: 'STU001',
            studentName: 'John Doe'
        });
        
        console.log('✅ Mark Attendance - Success');
        console.log(`   Student: ${markResponse.data.studentName}`);
        console.log(`   Marked At: ${markResponse.data.markedAt}\n`);
        
        console.log('✅ QR Code system is working!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testQREndpoints();