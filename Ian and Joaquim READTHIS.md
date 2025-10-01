# Database Structure - Ian and Joaquim READ THIS

## 🏗️ **New Database Architecture**

The database has been **completely restructured** from a unified users table to **separated normalized tables**:

### **Before (Old Structure):**
```
users (unified) - All user types in one table with role-specific fields
```

### **After (New Structure):**
```
users (common fields only)
├── admins (admin-specific fields)
├── staff (staff-specific fields) 
└── students (student-specific fields)
```

## 📊 **Why This Change?**

1. **Database Normalization** - Eliminates NULL fields for different user types
2. **Better Performance** - Smaller tables, faster queries
3. **Cleaner Relationships** - Clear foreign key references
4. **Scalability** - Easy to add role-specific fields without affecting other roles
5. **Data Integrity** - Proper constraints and validation per role

## 🗂️ **Database Location**

**Separate Database Layer:** `server/database/`
```
server/database/
├── config/database.js          # Connection setup
├── models/                     # 22 database models
│   ├── User.js                 # Common user fields
│   ├── Admin.js                # Admin management
│   ├── Staff.js                # Staff with employee_id
│   ├── Student.js              # Students with student_id
│   ├── AttendanceRecord.js     # Attendance tracking
│   └── ... (18 more models)
├── services/                   # Business logic
├── migrations/                 # Database schema
├── prisma/schema.prisma        # Prisma ORM schema
└── index.js                    # Main exports
```

## 🔌 **How to Connect to API**

### **Option 1: Import Database Layer**
```javascript
// In your API routes
const { User, Student, Staff, AttendanceRecord } = require('../database');

// Example usage
const student = await Student.findByStudentId('CS2024001');
const attendance = await AttendanceRecord.create({
  student_id: student.id,
  class_id: classId,
  status: 'present'
});
```

### **Option 2: Use Both Systems**
```javascript
// Keep existing API Prisma for compatibility
const { PrismaClient } = require('./api/generated/prisma');

// Use new database layer for new features
const { Student, AttendanceService } = require('./database');

// Gradually migrate endpoints
```

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
cd server/database
npm install
```

### **2. Run Migrations**
```bash
# Apply new database structure
npx prisma migrate deploy
npx prisma generate
```

### **3. Use in API**
```javascript
// Example: Student login
const { Student, User, AuthService } = require('../database');

app.post('/api/student-auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user first
  const user = await User.findByEmail(email);
  if (!user || user.role !== 'student') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Get student details
  const student = await Student.findByUserId(user.id);
  
  // Authenticate
  const result = await AuthService.login(email, password);
  res.json({ ...result, student });
});
```

## 📋 **Key Models to Use**

### **Authentication:**
- `User.findByEmail(email)` - Find any user
- `Student.findByStudentId(id)` - Find student by student ID
- `Staff.findByEmployeeId(id)` - Find staff by employee ID
- `AuthService.login(email, password)` - Handle authentication

### **Attendance:**
- `AttendanceRecord.create(data)` - Record attendance
- `AttendanceService.markAttendance(sessionId, studentData)` - QR attendance
- `Student.getAttendanceSummary(studentId)` - Get attendance stats

### **Classes & Enrollment:**
- `Class.findAll()` - Get all classes with faculty info
- `ClassEnrollment.findByClass(classId)` - Get enrolled students
- `Department.findAll()` - Get departments with head info

## ⚠️ **Important Notes**

1. **Foreign Keys Changed:**
   - Classes now reference `staff.id` (not users.id)
   - Attendance records reference `students.id` and `staff.id`
   - All relationships updated accordingly

2. **Data Access Pattern:**
   ```javascript
   // OLD: Direct user lookup
   const user = await User.findById(id);
   
   // NEW: Role-specific lookup
   const student = await Student.findByUserId(userId);
   const user = student.user; // Get user data via relation
   ```

3. **Migration Required:**
   - Run migration 006 to restructure existing data
   - Update API endpoints to use new models
   - Test all authentication flows

## 🔄 **Migration Strategy**

1. **Phase 1:** Keep both systems running
2. **Phase 2:** Update critical endpoints (auth, attendance)
3. **Phase 3:** Migrate remaining endpoints
4. **Phase 4:** Remove old unified structure

## ⚠️ **CRITICAL WARNING - MIP (Most Important Point)**

🚨  **The frontend expects the new separated table structure. Using the old unified users table will cause system-wide failures.**

## 📞 **Need Help?**
+91 8141139042 -> Eldo A. Macuacua

The database layer is **production-ready** with:
- ✅ All 22 models implemented
- ✅ Proper relationships and constraints
- ✅ Complete migration scripts
- ✅ Prisma schema updated
- ✅ Business logic services
