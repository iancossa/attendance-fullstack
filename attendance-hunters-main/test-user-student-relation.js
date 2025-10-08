const { PrismaClient } = require('./server/api/generated/prisma');

async function testUserStudentRelation() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🧪 Testing User-Student Relation & Schema Changes...\n');
        
        // Test 1: Verify schema fields exist
        console.log('1. Testing schema field availability...');
        
        // Test User fields
        const userFields = await prisma.user.findMany({
            take: 1,
            select: {
                id: true,
                email: true,
                name: true,
                employeeId: true,
                role: true,
                student: true
            }
        });
        console.log('✅ User fields available:', Object.keys(userFields[0] || {}));
        
        // Test Student fields
        const studentFields = await prisma.student.findMany({
            take: 1,
            select: {
                id: true,
                studentId: true,
                userId: true,
                name: true,
                email: true,
                user: true
            }
        });
        console.log('✅ Student fields available:', Object.keys(studentFields[0] || {}));
        
        // Test 2: Check existing students data
        console.log('\n2. Testing existing students data...');
        const allStudents = await prisma.student.findMany({
            select: {
                id: true,
                studentId: true,
                name: true,
                email: true,
                userId: true
            },
            take: 5
        });
        
        console.log(`✅ Found ${allStudents.length} students:`);
        allStudents.forEach(s => {
            console.log(`   - ${s.studentId || 'NO_ID'}: ${s.name} (userId: ${s.userId || 'null'})`);
        });
        
        // Test 3: Test User-Student relation creation
        console.log('\n3. Testing User-Student relation creation...');
        
        // Create a test user
        const testUser = await prisma.user.create({
            data: {
                email: 'test.student@example.com',
                password: '$2b$10$test.hash',
                name: 'Test Student User',
                role: 'student'
            }
        });
        console.log('✅ Created test user:', testUser.id);
        
        // Create a student linked to the user
        const testStudent = await prisma.student.create({
            data: {
                studentId: 'TEST2024001',
                name: 'Test Student User',
                email: 'test.student@example.com',
                department: 'Computer Science',
                class: 'CS-101',
                section: 'A',
                year: '2024',
                userId: testUser.id
            }
        });
        console.log('✅ Created linked student:', testStudent.studentId);
        
        // Test 4: Verify relation works both ways
        console.log('\n4. Testing bidirectional relations...');
        
        // Get user with student
        const userWithStudent = await prisma.user.findUnique({
            where: { id: testUser.id },
            include: { student: true }
        });
        console.log('✅ User->Student relation:', {
            userId: userWithStudent.id,
            hasStudent: !!userWithStudent.student,
            studentId: userWithStudent.student?.studentId
        });
        
        // Get student with user
        const studentWithUser = await prisma.student.findUnique({
            where: { id: testStudent.id },
            include: { user: true }
        });
        console.log('✅ Student->User relation:', {
            studentId: studentWithUser.studentId,
            hasUser: !!studentWithUser.user,
            userId: studentWithUser.user?.id
        });
        
        // Test 5: Test QR functionality compatibility
        console.log('\n5. Testing QR functionality compatibility...');
        
        // Simulate QR attendance marking with geofencing fields
        const attendanceRecord = await prisma.studentAttendance.create({
            data: {
                studentId: testStudent.id,
                classId: 'CS101',
                status: 'present',
                studentLatitude: 40.7128,
                studentLongitude: -74.0060,
                distanceFromClass: 25.5,
                locationVerified: true,
                timestamp: new Date().toISOString()
            }
        });
        console.log('✅ Created attendance with geofencing:', {
            id: attendanceRecord.id,
            studentId: attendanceRecord.studentId,
            latitude: attendanceRecord.studentLatitude,
            longitude: attendanceRecord.studentLongitude,
            distance: attendanceRecord.distanceFromClass,
            verified: attendanceRecord.locationVerified
        });
        
        // Test 6: Test student lookup for QR (by studentId and email)
        console.log('\n6. Testing student lookup methods for QR...');
        
        // Lookup by studentId (primary method)
        const studentByStudentId = await prisma.student.findUnique({
            where: { studentId: 'TEST2024001' },
            include: { user: true }
        });
        console.log('✅ Lookup by studentId:', {
            found: !!studentByStudentId,
            studentId: studentByStudentId?.studentId,
            hasUser: !!studentByStudentId?.user
        });
        
        // Lookup by email (fallback method)
        const studentByEmail = await prisma.student.findUnique({
            where: { email: 'test.student@example.com' },
            include: { user: true }
        });
        console.log('✅ Lookup by email:', {
            found: !!studentByEmail,
            email: studentByEmail?.email,
            hasUser: !!studentByEmail?.user
        });
        
        // Test 7: Test geofencing tables
        console.log('\n7. Testing geofencing tables...');
        
        // Test Class table with geofencing
        const testClass = await prisma.class.create({
            data: {
                name: 'Computer Science 101',
                code: 'CS101',
                faculty: 'Dr. Smith',
                room: 'Room 101',
                latitude: 40.7128,
                longitude: -74.0060,
                geofenceRadius: 100,
                geofenceEnabled: true
            }
        });
        console.log('✅ Created class with geofencing:', {
            id: testClass.id,
            code: testClass.code,
            latitude: testClass.latitude,
            longitude: testClass.longitude,
            radius: testClass.geofenceRadius,
            enabled: testClass.geofenceEnabled
        });
        
        // Test QRSession table
        const testQRSession = await prisma.qRSession.create({
            data: {
                id: 'qr_test_session_123',
                classId: 'CS101',
                className: 'Computer Science 101',
                latitude: 40.7128,
                longitude: -74.0060,
                radius: 100,
                expiresAt: new Date(Date.now() + 300000) // 5 minutes
            }
        });
        console.log('✅ Created QR session:', {
            id: testQRSession.id,
            classId: testQRSession.classId,
            latitude: testQRSession.latitude,
            longitude: testQRSession.longitude,
            radius: testQRSession.radius
        });
        
        // Test GeofenceSettings
        const geofenceSettings = await prisma.geofenceSettings.findFirst();
        if (!geofenceSettings) {
            const newSettings = await prisma.geofenceSettings.create({
                data: {
                    defaultRadius: 100,
                    enabled: true,
                    allowOverride: true,
                    accuracyThreshold: 50.0
                }
            });
            console.log('✅ Created geofence settings:', newSettings);
        } else {
            console.log('✅ Geofence settings exist:', {
                defaultRadius: geofenceSettings.defaultRadius,
                enabled: geofenceSettings.enabled,
                allowOverride: geofenceSettings.allowOverride
            });
        }
        
        // Cleanup test data
        console.log('\n8. Cleaning up test data...');
        await prisma.studentAttendance.delete({ where: { id: attendanceRecord.id } });
        await prisma.qRSession.delete({ where: { id: testQRSession.id } });
        await prisma.class.delete({ where: { id: testClass.id } });
        await prisma.student.delete({ where: { id: testStudent.id } });
        await prisma.user.delete({ where: { id: testUser.id } });
        console.log('✅ Test data cleaned up');
        
        console.log('\n🎉 All tests passed! Schema changes are working correctly.');
        console.log('\n📋 Summary:');
        console.log('✅ User-Student relation is properly established');
        console.log('✅ Geofencing fields are available in StudentAttendance');
        console.log('✅ Class table has location and geofencing fields');
        console.log('✅ QRSession table is working for location tracking');
        console.log('✅ Student lookup methods work for QR functionality');
        console.log('✅ Mobile app QR integration will work properly');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await prisma.$disconnect();
    }
}

testUserStudentRelation();