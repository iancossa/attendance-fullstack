#!/usr/bin/env node

/**
 * Check Student Data - Identify the student ID mismatch issue
 */

async function checkStudentData() {
    console.log('🔍 Checking Student Data for QR Issue\n');

    try {
        const { PrismaClient } = require('../server/api/generated/prisma');
        const prisma = new PrismaClient();
        await prisma.$connect();

        // Get all students to see the data structure
        console.log('1️⃣ Current student data in database:');
        const students = await prisma.student.findMany({ take: 10 });
        
        console.log(`📊 Found ${students.length} students:\n`);
        students.forEach((s, i) => {
            console.log(`${i+1}. Name: ${s.name}`);
            console.log(`   Student ID: ${s.studentId}`);
            console.log(`   Email: ${s.email}`);
            console.log(`   Status: ${s.status}`);
            console.log('');
        });

        // Check if alice.johnson@university.edu exists
        console.log('2️⃣ Checking for alice.johnson@university.edu...');
        const alice = await prisma.student.findUnique({
            where: { email: 'alice.johnson@university.edu' }
        });

        if (alice) {
            console.log('✅ Alice Johnson found:');
            console.log(`   Database ID: ${alice.id}`);
            console.log(`   Student ID: ${alice.studentId}`);
            console.log(`   Email: ${alice.email}`);
            console.log(`   Name: ${alice.name}`);
        } else {
            console.log('❌ Alice Johnson NOT found in database');
            console.log('💡 This explains why QR scanning with email fails!');
        }

        // Check recent attendance records
        console.log('\n3️⃣ Recent attendance records:');
        const recent = await prisma.studentAttendance.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { student: true }
        });

        console.log(`📋 Last ${recent.length} attendance records:\n`);
        recent.forEach((r, i) => {
            console.log(`${i+1}. ${r.student.name} (${r.student.studentId})`);
            console.log(`   Class: ${r.classId}`);
            console.log(`   Status: ${r.status}`);
            console.log(`   Date: ${r.createdAt}`);
            console.log('');
        });

        await prisma.$disconnect();

        console.log('🔍 ISSUE IDENTIFIED:');
        console.log('   - Mobile app likely sends email as studentId');
        console.log('   - Database expects studentId codes (STU001, CS2024001)');
        console.log('   - Need to modify QR endpoint to handle both formats');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkStudentData();