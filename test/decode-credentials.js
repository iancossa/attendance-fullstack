require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl) {
    // Remove the prisma+ prefix and decode
    const cleanUrl = databaseUrl.replace('prisma+postgres://', 'postgres://');
    
    try {
        const url = new URL(cleanUrl);
        
        console.log('🔍 Extracted Database Credentials:');
        console.log('================================');
        console.log(`PG_USER=${url.username || 'postgres'}`);
        console.log(`PG_HOST=${url.hostname}`);
        console.log(`PG_PORT=${url.port}`);
        console.log(`PG_DATABASE=${url.pathname.split('/')[1] || 'template1'}`);
        console.log(`PG_PASSWORD=${url.password || 'postgres'}`);
        console.log('================================');
        
    } catch (error) {
        console.error('Error parsing DATABASE_URL:', error.message);
    }
} else {
    console.log('DATABASE_URL not found in .env file');
}