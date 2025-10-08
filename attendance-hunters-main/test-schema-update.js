const { PrismaClient } = require('./server/api/generated/prisma');

async function testSchemaUpdate() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🧪 Testing updated schema...\n');
        
        // Test 1: Check if new fields exist in Student table
        console.log('1. Testing Student table structure...');
        const students = await prisma.student.findMany({
            take: 1,
            select: {
                id: true,
                studentId: true,
                userId: true,
                name: true,
                email: true
            }
        });
        console.log('✅ Student fields available:', Object.keys(students[0] || {}));
        
        // Test 2: Check if new fields exist in User table
        console.log('\n2. Testing User table structure...');
        const users = await prisma.user.findMany({
            take: 1,
            select: {
                id: true,
                employeeId: true,
                role: true,
                name: true,
                email: true
            }
        });
        console.log('✅ User fields available:', Object.keys(users[0] || {}));
        
        // Test 3: Check geofencing tables
        console.log('\n3. Testing geofencing tables...');
        
        const geofenceSettings = await prisma.geofenceSettings.findMany({ take: 1 });
        console.log('✅ GeofenceSettings table exists, records:', geofenceSettings.length);
        
        const classes = await prisma.class.findMany({ 
            take: 1,
            select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                geofenceRadius: true,
                geofenceEnabled: true
            }
        });
        console.log('✅ Class geofencing fields available:', Object.keys(classes[0] || {}));
        
        // Test 4: Check StudentAttendance geofencing fields
        console.log('\n4. Testing StudentAttendance geofencing fields...');
        const attendance = await prisma.studentAttendance.findMany({
            take: 1,
            select: {
                id: true,
                studentLatitude: true,
                studentLongitude: true,
                distanceFromClass: true,
                locationVerified: true
            }
        });
        console.log('✅ StudentAttendance geofencing fields available:', Object.keys(attendance[0] || {}));
        
        console.log('\n🎉 Schema update successful! All new fields and tables are available.');
        
    } catch (error) {
        console.error('❌ Schema test failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testSchemaUpdate();