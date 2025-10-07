# 🎓 Student Schema Fix

## 🚨 Issue Identified
**Error:** `The column Student.studentId does not exist in the current database`

## 🔍 Root Cause
The production database is missing the `studentId` column in the Student table, even though:
- ✅ Migration files show it should exist
- ✅ Local schema includes the field
- ❌ Production database doesn't have it

## 🛠️ Immediate Fix Options

### Option 1: Run Missing Migrations (Recommended)
```bash
# On production server
cd server/api
npx prisma migrate deploy --schema=./config/db/prisma/schema.prisma
```

### Option 2: Manual Database Fix
If migrations fail, manually add the missing column:

```sql
-- Connect to production database and run:
ALTER TABLE "Student" ADD COLUMN "studentId" TEXT;
UPDATE "Student" SET "studentId" = 'STU' || LPAD(id::text, 6, '0') WHERE "studentId" IS NULL;
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentId_key" UNIQUE ("studentId");
```

### Option 3: Schema Workaround (Temporary)
Remove `studentId` from schema temporarily:

```prisma
model Student {
  id             Int                 @id @default(autoincrement())
  // studentId      String              @unique  // COMMENTED OUT
  name           String
  email          String              @unique
  // ... rest of fields
}
```

## 🚀 Deployment Steps

### Step 1: Check Current Database Structure
```bash
# On production, check what columns exist:
psql $DATABASE_URL -c "\d Student"
```

### Step 2: Apply Fix
Choose one of the options above based on what you find.

### Step 3: Regenerate Prisma Client
```bash
npx prisma generate --schema=./config/db/prisma/schema.prisma
```

### Step 4: Restart Server
```bash
# Restart the application
pm2 restart all
```

## 🧪 Test After Fix
```bash
curl -X POST https://attendance-fullstack.onrender.com/api/student-auth/login \
-H "Content-Type: application/json" \
-d '{"email":"student@university.edu","password":"password"}'
```

## 📊 Expected Result
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": {
    "id": 1,
    "name": "Test Student",
    "email": "student@university.edu",
    "department": "Computer Science",
    "class": "CS-101",
    "status": "Active"
  }
}
```

## 🎯 Impact
Once fixed:
- ✅ Student login will work
- ✅ QR attendance marking will work
- ✅ Hybrid mode will be fully functional
- ✅ All student-related endpoints accessible

The quickest fix is **Option 1** (run migrations) if possible! 🚀