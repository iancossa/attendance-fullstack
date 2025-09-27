// Test QR generation from frontend perspective
const axios = require('axios');

async function testQRFromFrontend() {
    try {
        console.log('🧪 Testing QR Generation from Frontend Perspective...\n');
        
        const API_BASE_URL = 'http://localhost:5000/api';
        
        console.log('📡 Making request to:', `${API_BASE_URL}/qr/generate`);
        
        const response = await axios.post(`${API_BASE_URL}/qr/generate`, {
            classId: 'CS101',
            className: 'Demo Class'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ QR Generation Success!');
        console.log('📋 Response:', response.data);
        
        // Test if we can get session status
        const sessionId = response.data.sessionId;
        console.log('\n🔍 Testing session status...');
        
        const statusResponse = await axios.get(`${API_BASE_URL}/qr/session/${sessionId}`);
        console.log('✅ Session Status Success!');
        console.log('📋 Status:', statusResponse.data);
        
    } catch (error) {
        console.error('❌ Test Failed:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url
        });
    }
}

testQRFromFrontend();