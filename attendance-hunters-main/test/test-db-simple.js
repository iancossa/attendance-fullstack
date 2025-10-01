require('dotenv').config({ path: './server/api/.env' });

async function testDatabase() {
    console.log('🔍 Testing Database Connection...\n');
    
    const databaseUrl = process.env.DATABASE_URL;
    console.log('📋 Database URL:', databaseUrl ? 'Found' : 'Missing');
    
    if (!databaseUrl) {
        console.log('❌ No DATABASE_URL found in .env file');
        return;
    }
    
    try {
        const { PrismaClient } = require('./server/api/generated/prisma');
        const prisma = new PrismaClient();
        
        console.log('🔌 Attempting to connect...');
        await prisma.$connect();
        console.log('✅ Database connection successful!');
        
        // Test a simple query
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('✅ Database query successful:', result);
        
        await prisma.$disconnect();
        console.log('🎉 Database is online and working!');
        
    } catch (error) {
        console.log('❌ Database connection failed:');
        console.log('   Error:', error.message);
        
        if (error.message.includes("Can't reach database server")) {
            console.log('\n💡 Possible issues:');
            console.log('   - Database server is offline');
            console.log('   - Network connectivity issues');
            console.log('   - Database credentials expired');
            console.log('   - Firewall blocking connection');
        }
    }
}

testDatabase();