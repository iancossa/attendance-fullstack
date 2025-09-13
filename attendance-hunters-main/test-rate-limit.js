#!/usr/bin/env node

/**
 * Test Rate Limiting - Verify API doesn't get overwhelmed
 */

const https = require('https');

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, { method: 'GET' }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function testRateLimit() {
    console.log('🧪 Testing Rate Limiting for QR Session Polling\n');

    try {
        // 1. Generate a session first
        console.log('1️⃣ Creating test session...');
        const sessionId = 'qr_test_' + Date.now();
        
        // Use an existing session ID from logs
        const testSessionId = 'qr_1757758611331_0958z4jf0';
        
        console.log('📋 Testing with session:', testSessionId);

        // 2. Make rapid requests to test rate limiting
        console.log('\n2️⃣ Making rapid requests (should trigger rate limit)...');
        
        const requests = [];
        for (let i = 0; i < 10; i++) {
            requests.push(
                makeRequest(`https://attendance-fullstack.onrender.com/api/qr/session/${testSessionId}`)
                    .then(response => ({ request: i + 1, ...response }))
            );
        }

        const results = await Promise.all(requests);
        
        console.log('\n📊 Results:');
        results.forEach(result => {
            const status = result.status === 200 ? '✅' : 
                          result.status === 429 ? '🚫' : '❌';
            console.log(`   Request ${result.request}: ${status} Status ${result.status}`);
            
            if (result.status === 429) {
                console.log(`      Rate limited: ${result.data.error}`);
            }
        });

        // 3. Check if rate limiting is working
        const rateLimited = results.some(r => r.status === 429);
        const successful = results.filter(r => r.status === 200).length;
        
        console.log('\n3️⃣ Analysis:');
        console.log(`   Successful requests: ${successful}/10`);
        console.log(`   Rate limiting active: ${rateLimited ? '✅ YES' : '❌ NO'}`);
        
        if (rateLimited) {
            console.log('   🎉 Rate limiting is working - API protected from spam');
        } else {
            console.log('   ⚠️  Rate limiting may need adjustment');
        }

        // 4. Test normal polling interval
        console.log('\n4️⃣ Testing normal polling (5 second intervals)...');
        
        for (let i = 0; i < 3; i++) {
            const response = await makeRequest(`https://attendance-fullstack.onrender.com/api/qr/session/${testSessionId}`);
            console.log(`   Poll ${i + 1}: Status ${response.status} - ${response.data.totalMarked || 0} attendees`);
            
            if (i < 2) {
                console.log('   ⏳ Waiting 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        console.log('\n🎯 Recommendations:');
        console.log('   - Frontend should poll every 5-10 seconds (not 2 seconds)');
        console.log('   - Rate limiting prevents API overload');
        console.log('   - Sessions auto-expire after 5 minutes');
        console.log('   - Use WebSockets for real-time updates in production');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testRateLimit();