const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const { verifyToken, adminOnly } = require('../src/middlewares');

const router = express.Router();
const prisma = new PrismaClient();

// Get all departments
router.get('/', verifyToken, async (req, res) => {
    try {
        const { type, status } = req.query;
        
        let where = {};
        if (type) where.type = type;
        if (status) where.status = status;

        const departments = await prisma.department.findMany({
            where,
            include: {
                faculties: {
                    select: {
                        id: true,
                        name: true,
                        position: true,
                        status: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ departments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get department by ID (View Details)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const department = await prisma.department.findUnique({
            where: { id: parseInt(id) },
            include: {
                faculties: {
                    select: {
                        id: true,
                        employeeId: true,
                        name: true,
                        email: true,
                        phone: true,
                        position: true,
                        qualification: true,
                        experience: true,
                        status: true,
                        joinDate: true
                    }
                }
            }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json({ department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new department (Add Department)
router.post('/', verifyToken, adminOnly, async (req, res) => {
    try {
        const { 
            name, 
            code, 
            head, 
            email, 
            phone, 
            type, 
            programs,
            description,
            location,
            budget
        } = req.body;

        // Check if department code already exists
        const existingDept = await prisma.department.findUnique({
            where: { code }
        });

        if (existingDept) {
            return res.status(400).json({ 
                error: 'Department with this code already exists' 
            });
        }

        const department = await prisma.department.create({
            data: {
                name,
                code,
                head,
                email,
                phone,
                type,
                programs: programs ? parseInt(programs) : 0,
                description,
                location,
                budget: budget ? parseFloat(budget) : 0.0
            }
        });

        res.status(201).json({
            message: 'Department created successfully',
            department
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update department (Edit Department)
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Remove id from updates if present
        delete updates.id;
        
        // Convert numeric fields
        if (updates.programs) updates.programs = parseInt(updates.programs);
        if (updates.budget) updates.budget = parseFloat(updates.budget);

        const department = await prisma.department.update({
            where: { id: parseInt(id) },
            data: updates
        });

        res.json({
            message: 'Department updated successfully',
            department
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(400).json({ error: error.message });
    }
});

// Get department faculty (Manage Faculty)
router.get('/:id/faculty', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const faculties = await prisma.faculty.findMany({
            where: { departmentId: parseInt(id) },
            orderBy: { createdAt: 'desc' }
        });

        const department = await prisma.department.findUnique({
            where: { id: parseInt(id) },
            select: { name: true, code: true }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json({ 
            department,
            faculties,
            totalFaculty: faculties.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add faculty to department
router.post('/:id/faculty', verifyToken, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            employeeId, 
            name, 
            email, 
            phone, 
            position, 
            qualification, 
            experience,
            salary 
        } = req.body;

        // Check if department exists
        const department = await prisma.department.findUnique({
            where: { id: parseInt(id) }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Check if employee ID already exists
        const existingFaculty = await prisma.faculty.findUnique({
            where: { employeeId }
        });

        if (existingFaculty) {
            return res.status(400).json({ 
                error: 'Faculty with this employee ID already exists' 
            });
        }

        const faculty = await prisma.faculty.create({
            data: {
                employeeId,
                name,
                email,
                phone,
                department: department.name,
                departmentId: parseInt(id),
                position,
                qualification,
                experience: experience ? parseInt(experience) : 0,
                salary: salary ? parseFloat(salary) : 0.0
            }
        });

        // Update department faculty count
        await prisma.department.update({
            where: { id: parseInt(id) },
            data: { faculty: { increment: 1 } }
        });

        res.status(201).json({
            message: 'Faculty added successfully',
            faculty
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update faculty in department
router.put('/:id/faculty/:facultyId', verifyToken, adminOnly, async (req, res) => {
    try {
        const { id, facultyId } = req.params;
        const updates = req.body;

        // Remove ids from updates
        delete updates.id;
        delete updates.departmentId;
        
        // Convert numeric fields
        if (updates.experience) updates.experience = parseInt(updates.experience);
        if (updates.salary) updates.salary = parseFloat(updates.salary);

        const faculty = await prisma.faculty.update({
            where: { 
                id: parseInt(facultyId),
                departmentId: parseInt(id)
            },
            data: updates
        });

        res.json({
            message: 'Faculty updated successfully',
            faculty
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Faculty not found' });
        }
        res.status(400).json({ error: error.message });
    }
});

// Department settings/statistics
router.get('/:id/settings', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const department = await prisma.department.findUnique({
            where: { id: parseInt(id) },
            include: {
                faculties: {
                    select: {
                        status: true,
                        position: true,
                        salary: true
                    }
                }
            }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Calculate statistics
        const activeFaculty = department.faculties.filter(f => f.status === 'Active').length;
        const totalSalary = department.faculties.reduce((sum, f) => sum + (f.salary || 0), 0);
        const avgSalary = activeFaculty > 0 ? totalSalary / activeFaculty : 0;

        const positionCounts = department.faculties.reduce((acc, f) => {
            acc[f.position] = (acc[f.position] || 0) + 1;
            return acc;
        }, {});

        const settings = {
            department: {
                id: department.id,
                name: department.name,
                code: department.code,
                head: department.head,
                type: department.type,
                status: department.status,
                budget: department.budget,
                location: department.location
            },
            statistics: {
                totalFaculty: department.faculties.length,
                activeFaculty,
                totalPrograms: department.programs,
                totalStudents: department.students,
                totalSalaryBudget: totalSalary,
                averageSalary: Math.round(avgSalary),
                positionBreakdown: positionCounts
            }
        };

        res.json({ settings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete department
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;

        // Check if department has faculty
        const facultyCount = await prisma.faculty.count({
            where: { departmentId: parseInt(id) }
        });

        if (facultyCount > 0) {
            return res.status(400).json({ 
                error: 'Cannot delete department with existing faculty members' 
            });
        }

        await prisma.department.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;