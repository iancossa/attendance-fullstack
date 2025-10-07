// Temporary fix: Update student-auth to work without studentId field

const fs = require('fs');
const path = require('path');

// Read current schema
const schemaPath = path.join(__dirname, 'config/db/prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

console.log('🔧 Creating temporary schema fix...');

// Comment out studentId field temporarily
const updatedSchema = schema.replace(
    'studentId      String              @unique',
    '// studentId      String              @unique  // TEMPORARILY DISABLED'
);

// Write temporary schema
const tempSchemaPath = path.join(__dirname, 'config/db/prisma/schema-temp.prisma');
fs.writeFileSync(tempSchemaPath, updatedSchema);

console.log('✅ Temporary schema created at:', tempSchemaPath);
console.log('📝 To use this schema:');
console.log('1. npx prisma generate --schema=./config/db/prisma/schema-temp.prisma');
console.log('2. Deploy the updated code');
console.log('3. Restart the server');
console.log('\n⚠️  This is a temporary fix. The proper solution is to run migrations in production.');

// Also update the student-auth route to not use studentId
const studentAuthPath = path.join(__dirname, 'routes/student-auth.js');
let studentAuth = fs.readFileSync(studentAuthPath, 'utf8');

// Replace any references to studentId with id
const updatedStudentAuth = studentAuth.replace(
    /student\.studentId/g,
    'student.id'
);

fs.writeFileSync(studentAuthPath + '.temp', updatedStudentAuth);
console.log('✅ Temporary student-auth route created');

console.log('\n🎯 Quick deployment option:');
console.log('1. Copy schema-temp.prisma over schema.prisma');
console.log('2. Copy student-auth.js.temp over student-auth.js');
console.log('3. Regenerate Prisma client');
console.log('4. Deploy');