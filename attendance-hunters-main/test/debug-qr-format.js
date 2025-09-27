// Debug QR format issue
const https = require('https');

function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });
        
        req.on('error', reject);
        
        if (options.body) {
            req.write(JSON.stringify(options.body));
        }
        
        req.end();
    });
}

async function debugQRFormat() {
    console.log('🔍 Debugging QR Format Issue...\n');
    
    try {
        const qrGen = await makeRequest('https://attendance-fullstack.onrender.com/api/qr/generate', {
            method: 'POST',
            body: { classId: 'DEBUG', className: 'Debug Test' }
        });
        
        console.log('QR Generation Response:');
        console.log('Status:', qrGen.status);
        console.log('Full Response:', JSON.stringify(qrGen.data, null, 2));
        
        if (qrGen.data.qrData) {
            console.log('\nQR Data Analysis:');
            console.log('Raw QR Data:', qrGen.data.qrData);
            console.log('Type:', typeof qrGen.data.qrData);
            console.log('Length:', qrGen.data.qrData.length);
            
            // Try to parse as URL
            try {
                const url = new URL(qrGen.data.qrData);
                console.log('✅ Valid URL format');
                console.log('Protocol:', url.protocol);
                console.log('Host:', url.host);
                console.log('Pathname:', url.pathname);
                console.log('Search params:', url.searchParams.toString());
            } catch (urlError) {
                console.log('❌ Not a valid URL:', urlError.message);
                
                // Check if it's the old format
                if (qrGen.data.qrData.includes('attendance://')) {
                    console.log('📝 Detected old attendance:// format');
                    console.log('This format needs manual parsing');
                }
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

debugQRFormat();