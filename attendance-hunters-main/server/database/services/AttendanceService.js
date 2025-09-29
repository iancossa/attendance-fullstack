const AttendanceRecord = require('../models/AttendanceRecord');
const QRSession = require('../models/QRSession');
const User = require('../models/User');

class AttendanceService {
  static async markAttendance(sessionId, studentData) {
    const session = await QRSession.findBySessionId(sessionId);
    if (!session) {
      throw new Error('QR session not found or expired');
    }

    if (new Date() > new Date(session.expires_at)) {
      throw new Error('QR session has expired');
    }

    const student = await User.findByEmail(studentData.email) || 
                   await User.findById(studentData.studentId);
    if (!student || student.role !== 'student') {
      throw new Error('Student not found');
    }

    const existingRecord = await AttendanceRecord.findByStudentAndDate(
      student.id, 
      session.class_id, 
      session.session_date
    );
    if (existingRecord) {
      throw new Error('Attendance already marked');
    }

    const attendanceRecord = await AttendanceRecord.create({
      student_id: student.id,
      class_id: session.class_id,
      session_date: session.session_date,
      status: 'present',
      method: 'qr',
      qr_session_id: sessionId
    });

    await QRSession.incrementScanCount(sessionId);

    return {
      attendanceRecord,
      student: {
        id: student.id,
        name: student.name,
        student_id: student.student_id,
        department: student.department
      }
    };
  }

  static async getStudentAttendance(studentId, filters = {}) {
    const records = await AttendanceRecord.findByStudent(studentId, filters);
    const summary = await AttendanceRecord.getAttendanceSummary(studentId);
    
    return {
      records,
      summary
    };
  }

  static async recordManualAttendance(attendanceData) {
    const existingRecord = await AttendanceRecord.findByStudentAndDate(
      attendanceData.student_id,
      attendanceData.class_id,
      attendanceData.session_date
    );

    if (existingRecord) {
      throw new Error('Attendance already recorded for this date');
    }

    return await AttendanceRecord.create({
      ...attendanceData,
      method: 'manual'
    });
  }
}

module.exports = AttendanceService;