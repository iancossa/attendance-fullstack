-- Add employeeId to User table if not exists
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "employeeId" TEXT;

-- Add studentId and userId to Student table
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "studentId" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "userId" INTEGER;

-- Create unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "User_employeeId_key" ON "User"("employeeId");
CREATE UNIQUE INDEX IF NOT EXISTS "Student_studentId_key" ON "Student"("studentId");
CREATE UNIQUE INDEX IF NOT EXISTS "Student_userId_key" ON "Student"("userId");

-- Add foreign key constraint
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Update existing students with generated studentIds (if needed)
UPDATE "Student" SET "studentId" = 'CS2024' || LPAD(id::text, 3, '0') WHERE "studentId" IS NULL;