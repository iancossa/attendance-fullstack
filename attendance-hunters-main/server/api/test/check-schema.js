const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function checkDatabaseSchema() {
    try {
        console.log('🔍 Checking database schema for geofencing columns...\n');

        // Check if StudentAttendance table exists and get its structure
        const result = await prisma.$queryRaw`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'StudentAttendance' 
            AND table_schema = 'public'
            ORDER BY ordinal_position;
        `;

        console.log('📋 StudentAttendance table columns:');
        result.forEach(col => {
            console.log(`   ${col.column_name} (${col.data_type}) - ${col.is_nullable === 'YES' ? 'nullable' : 'required'}`);
        });

        // Check for specific geofencing columns
        const geofenceColumns = ['studentLatitude', 'studentLongitude', 'distanceFromClass', 'locationVerified'];
        const existingColumns = result.map(col => col.column_name);
        
        console.log('\n🎯 Geofencing columns status:');
        geofenceColumns.forEach(col => {
            const exists = existingColumns.includes(col);
            console.log(`   ${col}: ${exists ? '✅ EXISTS' : '❌ MISSING'}`);
        });

        // Test basic StudentAttendance creation
        console.log('\n🧪 Testing basic attendance record creation...');
        
        // First check if any students exist
        const studentCount = await prisma.student.count();
        console.log(`   Students in database: ${studentCount}`);
        
        if (studentCount === 0) {
            console.log('   ⚠️ No students found - QR scanning will fail');
            console.log('   💡 Run: node server/api/insert-real-students.js');
        } else {
            // Test with a sample student
            const testStudent = await prisma.student.findFirst();
            console.log(`   Test student: ${testStudent.name} (${testStudent.studentId})`);
            
            // Try creating a test attendance record
            const testData = {
                studentId: testStudent.id,
                classId: 'TEST_SCHEMA_CHECK',
                status: 'present',
                timestamp: new Date().toISOString()
            };
            
            const testRecord = await prisma.studentAttendance.create({
                data: testData
            });
            
            console.log(`   ✅ Basic attendance creation works: ${testRecord.id}`);
            
            // Clean up test record
            await prisma.studentAttendance.delete({
                where: { id: testRecord.id }
            });
            console.log('   🧹 Test record cleaned up');
        }

        console.log('\n📊 Schema compatibility summary:');
        const missingColumns = geofenceColumns.filter(col => !existingColumns.includes(col));
        
        if (missingColumns.length === 0) {
            console.log('   ✅ All geofencing columns exist - full functionality available');
        } else {
            console.log(`   ⚠️ Missing columns: ${missingColumns.join(', ')}`);
            console.log('   💡 QR attendance will work but geofencing data won\'t be stored');
            console.log('   🔧 To add missing columns, update schema.prisma and run: npx prisma db push');
        }

    } catch (error) {
        console.error('❌ Schema check failed:', error.message);
        
        if (error.message.includes('StudentAttendance')) {
            console.log('💡 StudentAttendance table might not exist');
            console.log('🔧 Run: npx prisma db push');
        }
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabaseSchema();