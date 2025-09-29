const AttendanceRecord = require('../models/AttendanceRecord');
const QRSession = require('../models/QRSession');
const Student = require('../models/Student');
const GeofencingService = require('./GeofencingService');

class AttendanceService {
  static async markAttendance(sessionId, studentData) {
    const session = await QRSession.findBySessionId(sessionId);
    if (!session) {
      throw new Error('QR session not found or expired');
    }

    if (new Date() > new Date(session.expires_at)) {
      throw new Error('QR session has expired');
    }

    const student = await Student.findByEmail(studentData.email) || 
                   await Student.findById(studentData.studentId);
    if (!student) {
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

    // Validate location if provided
    let locationData = {};
    if (studentData.latitude && studentData.longitude) {
      const validation = await GeofencingService.validateLocation(
        studentData.latitude, 
        studentData.longitude, 
        session.class_id,
        session.latitude,
        session.longitude,
        session.geofence_radius
      );
      locationData = {
        student_latitude: studentData.latitude,
        student_longitude: studentData.longitude,
        distance_from_class: validation.distance,
        location_verified: validation.valid
      };
    }

    const attendanceRecord = await AttendanceRecord.create({
      student_id: student.id,
      class_id: session.class_id,
      session_date: session.session_date,
      status: 'present',
      method: 'qr',
      qr_session_id: sessionId,
      ...locationData
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