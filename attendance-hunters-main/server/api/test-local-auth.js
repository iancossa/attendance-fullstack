const { PrismaClient } = require('./generated/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function testLocalAuth() {
    try {
        console.log('🔐 Testing Local Authentication...\n');

        // Test user lookup (should work now)
        console.log('👤 Testing user lookup...');
        const user = await prisma.user.findUnique({ 
            where: { email: 'admin@test.com' } 
        });

        if (user) {
            console.log('✅ User found:', user.name, user.email, user.role);
            
            // Test password comparison
            console.log('\n🔑 Testing password validation...');
            const testPassword = 'password';
            const isValid = await bcrypt.compare(testPassword, user.password);
            
            if (isValid) {
                console.log('✅ Password validation successful');
                
                // Test token generation
                console.log('\n🎫 Testing token generation...');
                const token = jwt.sign({ 
                    id: user.id, 
                    email: user.email, 
                    role: user.role 
                }, JWT_SECRET, { expiresIn: '24h' });
                
                console.log('✅ Token generated:', token.substring(0, 50) + '...');
                
                console.log('\n🎉 LOCAL AUTHENTICATION WORKING!');
                console.log('✅ Schema fix successful');
                console.log('✅ Ready for deployment');
                
            } else {
                console.log('❌ Password validation failed');
            }
        } else {
            console.log('❌ User not found');
        }

    } catch (error) {
        console.error('❌ Local auth test failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testLocalAuth();