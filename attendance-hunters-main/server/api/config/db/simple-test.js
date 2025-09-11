require('dotenv').config();

console.log('🔍 Environment Variables:');
console.log('========================');
console.log('PG_USER:', process.env.PG_USER);
console.log('PG_HOST:', process.env.PG_HOST);
console.log('PG_PORT:', process.env.PG_PORT);
console.log('PG_DATABASE:', process.env.PG_DATABASE);
console.log('PG_PASSWORD:', process.env.PG_PASSWORD ? '***' : 'undefined');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'defined' : 'undefined');
console.log('========================\n');

// Test if PostgreSQL is running
const net = require('net');

function testPort(host, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        
        socket.setTimeout(3000);
        
        socket.on('connect', () => {
            console.log(`✅ Port ${port} is open on ${host}`);
            socket.destroy();
            resolve(true);
        });
        
        socket.on('timeout', () => {
            console.log(`❌ Port ${port} timeout on ${host}`);
            socket.destroy();
            resolve(false);
        });
        
        socket.on('error', (err) => {
            console.log(`❌ Port ${port} is closed on ${host} - ${err.message}`);
            resolve(false);
        });
        
        socket.connect(port, host);
    });
}

async function checkConnectivity() {
    console.log('🔍 Testing Port Connectivity:');
    
    const port51213 = await testPort('localhost', 51213);
    const port51214 = await testPort('localhost', 51214);
    const port51215 = await testPort('localhost', 51215);
    const port5432 = await testPort('localhost', 5432);
    
    console.log('\n📋 Port Status Summary:');
    console.log(`   51213: ${port51213 ? '✅ Open' : '❌ Closed'}`);
    console.log(`   51214: ${port51214 ? '✅ Open' : '❌ Closed'}`);
    console.log(`   51215: ${port51215 ? '✅ Open' : '❌ Closed'}`);
    console.log(`   5432:  ${port5432 ? '✅ Open' : '❌ Closed'}`);
    
    if (!port51213 && !port51214 && !port51215 && !port5432) {
        console.log('\n⚠️  No PostgreSQL ports are open. Is PostgreSQL running?');
        console.log('💡 Try starting PostgreSQL or check if it\'s running on a different port.');
    }
}

checkConnectivity();