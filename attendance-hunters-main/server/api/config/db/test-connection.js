require('dotenv').config();
const { Pool } = require('pg');

// Test direct PostgreSQL connection
async function testPostgreSQLConnection() {
    console.log('🔍 Testing PostgreSQL Connection...\n');
    
    // Extract connection details from DATABASE_URL for pg client
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
        console.error('❌ DATABASE_URL not found in .env file');
        return false;
    }
    
    try {
        // Use environment variables directly for pg connection
        const pool = new Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT,
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        });

        console.log('📋 Connection Details:');
        console.log(`   Host: ${process.env.PG_HOST}`);
        console.log(`   Port: ${process.env.PG_PORT}`);
        console.log(`   Database: ${process.env.PG_DATABASE}`);
        console.log(`   User: ${process.env.PG_USER}\n`);

        const client = await pool.connect();
        console.log('✅ PostgreSQL connection successful!');

        // Test basic query
        const result = await client.query('SELECT version(), current_database(), current_user, NOW()');
        console.log('📊 Database Info:');
        console.log(`   Version: ${result.rows[0].version.split(' ').slice(0, 2).join(' ')}`);
        console.log(`   Current Database: ${result.rows[0].current_database}`);
        console.log(`   Current User: ${result.rows[0].current_user}`);
        console.log(`   Server Time: ${result.rows[0].now}\n`);

        client.release();
        await pool.end();
        return true;
        
    } catch (error) {
        console.error('❌ PostgreSQL connection failed:');
        console.error(`   Error: ${error.message}\n`);
        return false;
    }
}

// Test Prisma connection
async function testPrismaConnection() {
    console.log('🔍 Testing Prisma Connection...\n');
    
    try {
        const { PrismaClient } = require('../../generated/prisma');
        const prisma = new PrismaClient();

        // Test connection
        await prisma.$connect();
        console.log('✅ Prisma connection successful!');

        // Test query
        const result = await prisma.$queryRaw`SELECT version(), current_database(), current_user, NOW()`;
        console.log('📊 Prisma Database Info:');
        console.log(`   Version: ${result[0].version.split(' ').slice(0, 2).join(' ')}`);
        console.log(`   Current Database: ${result[0].current_database}`);
        console.log(`   Current User: ${result[0].current_user}`);
        console.log(`   Server Time: ${result[0].now}\n`);

        await prisma.$disconnect();
        return true;
        
    } catch (error) {
        console.error('❌ Prisma connection failed:');
        console.error(`   Error: ${error.message}`);
        
        if (error.message.includes('generate')) {
            console.error('   💡 Try running: npx prisma generate');
        }
        if (error.message.includes('migrate')) {
            console.error('   💡 Try running: npx prisma migrate dev');
        }
        console.log('');
        return false;
    }
}

// Main test function
async function runConnectionTests() {
    console.log('🚀 Starting Database Connection Tests\n');
    console.log('=' .repeat(50));
    
    const pgSuccess = await testPostgreSQLConnection();
    console.log('=' .repeat(50));
    const prismaSuccess = await testPrismaConnection();
    console.log('=' .repeat(50));
    
    console.log('📋 Test Summary:');
    console.log(`   PostgreSQL (pg): ${pgSuccess ? '✅ Connected' : '❌ Failed'}`);
    console.log(`   Prisma: ${prismaSuccess ? '✅ Connected' : '❌ Failed'}`);
    
    if (pgSuccess && prismaSuccess) {
        console.log('\n🎉 All connections successful! Your API is ready to use PostgreSQL.');
    } else {
        console.log('\n⚠️  Some connections failed. Check the errors above.');
    }
}

// Run the tests
runConnectionTests().catch(console.error);