const express = require('express');
const router = express.Router();
const htmlPdf = require('html-pdf-node');

// Generate attendance report
router.post('/generate', async (req, res) => {
  try {
    const { reportType, dateRange, classId } = req.body;
    
    // Mock data - replace with actual database queries
    const reportData = {
      title: `Attendance Report - ${reportType}`,
      generatedDate: new Date().toLocaleDateString(),
      dateRange: dateRange || 'Last 30 days',
      totalStudents: 150,
      averageAttendance: 94.7,
      classes: [
        { name: 'CS-101', present: 28, total: 30, percentage: 93.3 },
        { name: 'MATH-201', present: 25, total: 28, percentage: 89.3 },
        { name: 'PHY-301', present: 22, total: 25, percentage: 88.0 }
      ],
      students: [
        { id: 1, name: 'John Doe', attendance: 95, present: 19, total: 20 },
        { id: 2, name: 'Jane Smith', attendance: 90, present: 18, total: 20 },
        { id: 3, name: 'Bob Johnson', attendance: 85, present: 17, total: 20 }
      ]
    };

    const htmlContent = generateReportHTML(reportData);
    
    const options = {
      format: 'A4',
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    };

    const file = { content: htmlContent };
    const pdfBuffer = await htmlPdf.generatePdf(file, options);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="attendance-report-${Date.now()}.pdf"`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

function generateReportHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Attendance Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 14px; }
        .summary { display: flex; justify-content: space-around; margin: 30px 0; }
        .summary-item { text-align: center; }
        .summary-value { font-size: 32px; font-weight: bold; color: #2563eb; }
        .summary-label { font-size: 14px; color: #666; margin-top: 5px; }
        .section { margin: 30px 0; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: bold; }
        .percentage { font-weight: bold; }
        .high { color: #16a34a; }
        .medium { color: #ea580c; }
        .low { color: #dc2626; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">${data.title}</div>
        <div class="subtitle">Generated on ${data.generatedDate} | Period: ${data.dateRange}</div>
      </div>

      <div class="summary">
        <div class="summary-item">
          <div class="summary-value">${data.totalStudents}</div>
          <div class="summary-label">Total Students</div>
        </div>
        <div class="summary-item">
          <div class="summary-value">${data.averageAttendance}%</div>
          <div class="summary-label">Average Attendance</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Class Attendance Summary</div>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Present</th>
              <th>Total</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            ${data.classes.map(cls => `
              <tr>
                <td>${cls.name}</td>
                <td>${cls.present}</td>
                <td>${cls.total}</td>
                <td class="percentage ${cls.percentage >= 90 ? 'high' : cls.percentage >= 80 ? 'medium' : 'low'}">${cls.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Student Attendance Details</div>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Present</th>
              <th>Total Classes</th>
              <th>Attendance %</th>
            </tr>
          </thead>
          <tbody>
            ${data.students.map(student => `
              <tr>
                <td>${student.name}</td>
                <td>${student.present}</td>
                <td>${student.total}</td>
                <td class="percentage ${student.attendance >= 90 ? 'high' : student.attendance >= 80 ? 'medium' : 'low'}">${student.attendance}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>This report was automatically generated by the Attendance Management System</p>
      </div>
    </body>
    </html>
  `;
}

module.exports = router;