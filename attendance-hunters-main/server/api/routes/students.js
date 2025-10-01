const express = require('express');
const prisma = require('../db');
const { verifyToken, adminOnly } = require('../src/middlewares');

const router = express.Router();

// Get all students
router.get('/', verifyToken, async (req, res) => {
    try {
        const { department, year, section, status, class: className } = req.query;
        
        let where = {};
        if (department) where.department = department;
        if (year) where.year = year;
        if (section) where.section = section;
        if (status) where.status = status;
        if (className) where.class = { contains: className, mode: 'insensitive' };

        const students = await prisma.student.findMany({
            where,
            include: {
                attendance: {
                    select: {
                        status: true,
                        date: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate attendance percentage for each student
        const studentsWithAttendance = students.map(student => {
            const totalClasses = student.attendance.length;
            const presentClasses = student.attendance.filter(a => a.status === 'present').length;
            const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
            
            return {
                ...student,
                attendancePercentage,
                totalClasses,
                presentClasses
            };
        });

        res.json({ students: studentsWithAttendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new student
router.post('/', verifyToken, adminOnly, async (req, res) => {
    try {
        const { 
            studentId, 
            name, 
            email, 
            phone, 
            department, 
            class: studentClass, 
            section, 
            year,
            gpa 
        } = req.body;

        // Check if student ID or email already exists
        const existingStudent = await prisma.student.findFirst({
            where: {
                OR: [
                    { studentId },
                    { email }
                ]
            }
        });

        if (existingStudent) {
            return res.status(400).json({ 
                error: 'Student with this ID or email already exists' 
            });
        }

        const student = await prisma.student.create({
            data: {
                studentId,
                name,
                email,
                phone,
                department,
                class: studentClass,
                section,
                year,
                gpa: gpa ? parseFloat(gpa) : 0.0
            }
        });

        res.status(201).json({
            message: 'Student created successfully',
            student
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update student
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Remove id from updates if present
        delete updates.id;
        
        // Convert gpa to float if present
        if (updates.gpa) {
            updates.gpa = parseFloat(updates.gpa);
        }

        const student = await prisma.student.update({
            where: { id: parseInt(id) },
            data: updates
        });

        res.json({
            message: 'Student updated successfully',
            student
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(400).json({ error: error.message });
    }
});

// Get student attendance history
router.get('/:id/attendance', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, classId } = req.query;

        let where = { studentId: parseInt(id) };
        
        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            };
        }
        
        if (classId) {
            where.classId = classId;
        }

        const attendance = await prisma.studentAttendance.findMany({
            where,
            orderBy: { date: 'desc' },
            take: 100
        });

        // Get student info
        const student = await prisma.student.findUnique({
            where: { id: parseInt(id) },
            select: { name: true, studentId: true, department: true, class: true }
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Calculate summary
        const totalClasses = attendance.length;
        const presentClasses = attendance.filter(a => a.status === 'present').length;
        const absentClasses = attendance.filter(a => a.status === 'absent').length;
        const lateClasses = attendance.filter(a => a.status === 'late').length;
        const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

        res.json({
            student,
            attendance,
            summary: {
                totalClasses,
                presentClasses,
                absentClasses,
                lateClasses,
                attendancePercentage
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get students by class
router.get('/by-class/:className', verifyToken, async (req, res) => {
    try {
        const { className } = req.params;
        
        const students = await prisma.student.findMany({
            where: {
                class: { contains: className, mode: 'insensitive' }
            },
            include: {
                attendance: {
                    select: {
                        status: true,
                        date: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        });

        // Calculate attendance percentage for each student
        const studentsWithAttendance = students.map(student => {
            const totalClasses = student.attendance.length;
            const presentClasses = student.attendance.filter(a => a.status === 'present').length;
            const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
            
            return {
                ...student,
                attendancePercentage,
                totalClasses,
                presentClasses
            };
        });

        res.json({ 
            students: studentsWithAttendance,
            className,
            totalStudents: studentsWithAttendance.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete student (optional - uncomment if needed)
/*
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;

        // Delete related attendance records first
        await prisma.studentAttendance.deleteMany({
            where: { studentId: parseInt(id) }
        });

        // Delete student
        await prisma.student.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(400).json({ error: error.message });
    }
});
*/

module.exports = router;