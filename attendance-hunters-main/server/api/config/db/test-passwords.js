require('dotenv').config();
const { Pool } = require('pg');

const commonPasswords = ['', 'postgres', 'admin', 'password', '123456', 'root'];

async function testPassword(password) {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'template1',
        password: password,
        port: 5432,
    });

    try {
        const client = await pool.connect();
        console.log(`✅ Password "${password || '(empty)'}" works!`);
        client.release();
        await pool.end();
        return true;
    } catch (error) {
        console.log(`❌ Password "${password || '(empty)'}" failed`);
        return false;
    }
}

async function findCorrectPassword() {
    console.log('🔍 Testing common PostgreSQL passwords...\n');
    
    for (const password of commonPasswords) {
        const success = await testPassword(password);
        if (success) {
            console.log(`\n🎉 Found working password: "${password || '(empty)'}"`);
            console.log(`\nUpdate your .env file with:`);
            console.log(`PG_PASSWORD=${password}`);
            return;
        }
    }
    
    console.log('\n❌ None of the common passwords worked.');
    console.log('💡 You may need to reset your PostgreSQL password or check your installation.');
}

findCorrectPassword();