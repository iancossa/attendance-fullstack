require('dotenv').config();
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function testDatabase() {
    try {
        console.log('🔍 Testing database connection...');
        
        // Test connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');
        
        // Count students
        const studentCount = await prisma.student.count();
        console.log(`📊 Total students in database: ${studentCount}`);
        
        // Get first student
        const firstStudent = await prisma.student.findFirst();
        if (firstStudent) {
            console.log('👤 Sample student:', {
                id: firstStudent.id,
                name: firstStudent.name,
                email: firstStudent.email,
                studentId: firstStudent.studentId
            });
        } else {
            console.log('⚠️ No students found in database');
        }
        
        // Check if Student table exists and get schema
        const tableInfo = await prisma.$queryRaw`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'Student' 
            ORDER BY ordinal_position;
        `;
        console.log('📋 Student table schema:', tableInfo);
        
    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        console.error('Full error:', error);
    } finally {
        await prisma.$disconnect();
        console.log('🔌 Database disconnected');
    }
}

testDatabase();