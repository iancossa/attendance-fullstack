const User = require('./User');
const Admin = require('./Admin');
const Staff = require('./Staff');
const Student = require('./Student');
const Class = require('./Class');
const ClassEnrollment = require('./ClassEnrollment');
const AttendanceRecord = require('./AttendanceRecord');
const AttendanceSession = require('./AttendanceSession');
const QRSession = require('./QRSession');
const AbsenceJustification = require('./AbsenceJustification');
const Department = require('./Department');
const Notification = require('./Notification');
const StudentRiskTracking = require('./StudentRiskTracking');
const StudentAlert = require('./StudentAlert');
const StudentPoints = require('./StudentPoints');
const Achievement = require('./Achievement');
const StudentAchievement = require('./StudentAchievement');
const StudentStreak = require('./StudentStreak');
const LeaderboardRanking = require('./LeaderboardRanking');
const GeofenceSettings = require('./GeofenceSettings');
const ClassLocation = require('./ClassLocation');

module.exports = {
  User,
  Admin,
  Staff,
  Student,
  Class,
  ClassEnrollment,
  AttendanceRecord,
  AttendanceSession,
  QRSession,
  AbsenceJustification,
  Department,
  Notification,
  StudentRiskTracking,
  StudentAlert,
  StudentPoints,
  Achievement,
  StudentAchievement,
  StudentStreak,
  LeaderboardRanking,
  GeofenceSettings,
  ClassLocation
};