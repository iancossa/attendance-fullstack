require('dotenv').config({ path: './config/db/.env' });
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function verifyDatabaseData() {
    try {
        console.log('🔍 Verifying Database Data...\n');

        // Get all students
        const students = await prisma.student.findMany({
            orderBy: { name: 'asc' }
        });

        console.log('👥 STUDENTS IN DATABASE:');
        console.log('========================');
        students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.name} (${student.studentId})`);
            console.log(`   📧 ${student.email}`);
            console.log(`   🏫 ${student.department} - ${student.class}`);
            console.log(`   📊 GPA: ${student.gpa} | Status: ${student.status}`);
            console.log('');
        });

        // Get all attendance records
        const attendanceRecords = await prisma.studentAttendance.findMany({
            include: {
                student: true
            },
            orderBy: { date: 'desc' }
        });

        console.log('\n📊 ATTENDANCE RECORDS:');
        console.log('======================');
        attendanceRecords.forEach((record, index) => {
            const date = record.date.toISOString().split('T')[0];
            console.log(`${index + 1}. ${record.student.name} - ${record.status.toUpperCase()}`);
            console.log(`   📅 ${date} | ⏰ ${record.timestamp || 'N/A'} | 📚 ${record.classId}`);
            console.log('');
        });

        // Statistics
        const totalStudents = students.length;
        const totalAttendance = attendanceRecords.length;
        const presentCount = attendanceRecords.filter(r => r.status === 'present').length;
        const absentCount = attendanceRecords.filter(r => r.status === 'absent').length;
        const lateCount = attendanceRecords.filter(r => r.status === 'late').length;

        console.log('\n📈 DATABASE STATISTICS:');
        console.log('=======================');
        console.log(`👥 Total Students: ${totalStudents}`);
        console.log(`📊 Total Attendance Records: ${totalAttendance}`);
        console.log(`✅ Present: ${presentCount}`);
        console.log(`❌ Absent: ${absentCount}`);
        console.log(`⏰ Late: ${lateCount}`);

        // Department breakdown
        const departmentStats = {};
        students.forEach(student => {
            if (!departmentStats[student.department]) {
                departmentStats[student.department] = 0;
            }
            departmentStats[student.department]++;
        });

        console.log('\n🏫 STUDENTS BY DEPARTMENT:');
        console.log('==========================');
        Object.entries(departmentStats).forEach(([dept, count]) => {
            console.log(`${dept}: ${count} students`);
        });

        console.log('\n✅ Database verification completed successfully!');

    } catch (error) {
        console.error('❌ Error verifying database:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the verification
verifyDatabaseData();