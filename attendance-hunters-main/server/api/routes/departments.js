const express = require('express');
const middlewares = require('../src/middlewares');
const { verifyToken, adminOnly } = middlewares;

const router = express.Router();

// Mock data for departments (replace with database when models are ready)
let mockDepartments = [
    {
        id: 1,
        name: 'Computer Science',
        code: 'CS',
        head: 'Dr. John Smith',
        email: 'cs.head@university.edu',
        phone: '+1234567890',
        type: 'Technology',
        programs: 5,
        faculty: 12,
        students: 150,
        status: 'Active',
        description: 'Department of Computer Science and Engineering',
        location: 'Building A, Floor 3',
        budget: 500000,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: 'Mathematics',
        code: 'MATH',
        head: 'Dr. Jane Doe',
        email: 'math.head@university.edu',
        phone: '+1234567891',
        type: 'Science',
        programs: 3,
        faculty: 8,
        students: 100,
        status: 'Active',
        description: 'Department of Mathematics',
        location: 'Building B, Floor 2',
        budget: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

let mockFaculty = [
    {
        id: 1,
        employeeId: 'EMP001',
        name: 'Dr. Alice Johnson',
        email: 'alice.johnson@university.edu',
        phone: '+1234567892',
        department: 'Computer Science',
        departmentId: 1,
        position: 'Professor',
        qualification: 'PhD in Computer Science',
        experience: 10,
        salary: 80000,
        status: 'Active',
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

let nextDeptId = 3;
let nextFacultyId = 2;

// Get all departments
router.get('/', verifyToken, async (req, res) => {
    try {
        const { type, status } = req.query;
        
        let departments = [...mockDepartments];
        
        if (type) {
            departments = departments.filter(d => d.type === type);
        }
        if (status) {
            departments = departments.filter(d => d.status === status);
        }

        // Add faculty info to each department
        departments = departments.map(dept => ({
            ...dept,
            faculties: mockFaculty.filter(f => f.departmentId === dept.id)
        }));

        res.json({ departments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get department by ID (View Details)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const department = mockDepartments.find(d => d.id === parseInt(id));

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        const departmentWithFaculty = {
            ...department,
            faculties: mockFaculty.filter(f => f.departmentId === parseInt(id))
        };

        res.json({ department: departmentWithFaculty });
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
        const existingDept = mockDepartments.find(d => d.code === code);
        if (existingDept) {
            return res.status(400).json({ 
                error: 'Department with this code already exists' 
            });
        }

        const department = {
            id: nextDeptId++,
            name,
            code,
            head,
            email,
            phone,
            type,
            programs: programs ? parseInt(programs) : 0,
            faculty: 0,
            students: 0,
            status: 'Active',
            description,
            location,
            budget: budget ? parseFloat(budget) : 0.0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockDepartments.push(department);

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
        
        const deptIndex = mockDepartments.findIndex(d => d.id === parseInt(id));
        if (deptIndex === -1) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Remove id from updates if present
        delete updates.id;
        
        // Convert numeric fields
        if (updates.programs) updates.programs = parseInt(updates.programs);
        if (updates.budget) updates.budget = parseFloat(updates.budget);
        
        // Update department
        mockDepartments[deptIndex] = {
            ...mockDepartments[deptIndex],
            ...updates,
            updatedAt: new Date()
        };

        res.json({
            message: 'Department updated successfully',
            department: mockDepartments[deptIndex]
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get department faculty (Manage Faculty)
router.get('/:id/faculty', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const department = mockDepartments.find(d => d.id === parseInt(id));
        
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        const faculties = mockFaculty.filter(f => f.departmentId === parseInt(id));

        res.json({ 
            department: { name: department.name, code: department.code },
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

        const department = mockDepartments.find(d => d.id === parseInt(id));
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Check if employee ID already exists
        const existingFaculty = mockFaculty.find(f => f.employeeId === employeeId);
        if (existingFaculty) {
            return res.status(400).json({ 
                error: 'Faculty with this employee ID already exists' 
            });
        }

        const faculty = {
            id: nextFacultyId++,
            employeeId,
            name,
            email,
            phone,
            department: department.name,
            departmentId: parseInt(id),
            position,
            qualification,
            experience: experience ? parseInt(experience) : 0,
            salary: salary ? parseFloat(salary) : 0.0,
            status: 'Active',
            joinDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockFaculty.push(faculty);
        
        // Update department faculty count
        const deptIndex = mockDepartments.findIndex(d => d.id === parseInt(id));
        if (deptIndex !== -1) {
            mockDepartments[deptIndex].faculty += 1;
        }

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
        
        const facultyIndex = mockFaculty.findIndex(f => 
            f.id === parseInt(facultyId) && f.departmentId === parseInt(id)
        );
        
        if (facultyIndex === -1) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        // Remove ids from updates
        delete updates.id;
        delete updates.departmentId;
        
        // Convert numeric fields
        if (updates.experience) updates.experience = parseInt(updates.experience);
        if (updates.salary) updates.salary = parseFloat(updates.salary);

        mockFaculty[facultyIndex] = {
            ...mockFaculty[facultyIndex],
            ...updates,
            updatedAt: new Date()
        };

        res.json({
            message: 'Faculty updated successfully',
            faculty: mockFaculty[facultyIndex]
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Department settings/statistics
router.get('/:id/settings', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const department = mockDepartments.find(d => d.id === parseInt(id));
        
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        const faculties = mockFaculty.filter(f => f.departmentId === parseInt(id));
        
        // Calculate statistics
        const activeFaculty = faculties.filter(f => f.status === 'Active').length;
        const totalSalary = faculties.reduce((sum, f) => sum + (f.salary || 0), 0);
        const avgSalary = activeFaculty > 0 ? totalSalary / activeFaculty : 0;

        const positionCounts = faculties.reduce((acc, f) => {
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
                totalFaculty: faculties.length,
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
        const deptIndex = mockDepartments.findIndex(d => d.id === parseInt(id));
        
        if (deptIndex === -1) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Check if department has faculty
        const facultyCount = mockFaculty.filter(f => f.departmentId === parseInt(id)).length;
        if (facultyCount > 0) {
            return res.status(400).json({ 
                error: 'Cannot delete department with existing faculty members' 
            });
        }

        mockDepartments.splice(deptIndex, 1);
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;