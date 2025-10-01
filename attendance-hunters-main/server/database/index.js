// Database layer exports
const User = require('./models/User');
const AttendanceRecord = require('./models/AttendanceRecord');
const AttendanceSession = require('./models/AttendanceSession');
const QRSession = require('./models/QRSession');
const Class = require('./models/Class');
const ClassEnrollment = require('./models/ClassEnrollment');
const Department = require('./models/Department');
const AbsenceJustification = require('./models/AbsenceJustification');
const Notification = require('./models/Notification');
const StudentRiskTracking = require('./models/StudentRiskTracking');
const StudentAlert = require('./models/StudentAlert');
const Report = require('./models/Report');
const ReportTemplate = require('./models/ReportTemplate');
const StudentPoints = require('./models/StudentPoints');
const Achievement = require('./models/Achievement');
const StudentAchievement = require('./models/StudentAchievement');
const StudentStreak = require('./models/StudentStreak');
const LeaderboardRanking = require('./models/LeaderboardRanking');
const Message = require('./models/Message');
const MessageRecipient = require('./models/MessageRecipient');

const AuthService = require('./services/AuthService');
const AttendanceService = require('./services/AttendanceService');

const { pool, prisma } = require('./config/database');

module.exports = {
  // Core Models
  User,
  Admin: require('./models/Admin'),
  Staff: require('./models/Staff'),
  Student: require('./models/Student'),
  AttendanceRecord,
  AttendanceSession,
  QRSession,
  Class,
  ClassEnrollment,
  Department,
  AbsenceJustification,
  Notification,
  StudentRiskTracking,
  StudentAlert,
  
  // Reports
  Report,
  ReportTemplate,
  
  // Gamification
  StudentPoints,
  Achievement,
  StudentAchievement,
  StudentStreak,
  LeaderboardRanking,
  
  // Messaging
  Message,
  MessageRecipient,
  
  // Services
  AuthService,
  AttendanceService,
  
  // Database connections
  pool,
  prisma
};