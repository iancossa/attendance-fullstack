# Absence Justification & Smart Notifications Implementation Plan

## 🎯 Overview
Implementation plan for absence justification workflow and intelligent notification system to enhance student-staff alignment and engagement.

## 📋 Phase 1: Database Schema Extensions

### 1.1 Absence Justification Tables
```sql
-- Add to schema.prisma
model AbsenceJustification {
  id          Int      @id @default(autoincrement())
  studentId   Int
  classId     String
  date        DateTime
  reason      String
  description String?
  status      String   @default("pending") // pending, approved, rejected
  documents   String[] // file paths
  submittedAt DateTime @default(now())
  reviewedAt  DateTime?
  reviewedBy  Int?
  reviewNote  String?
  student     Student  @relation(fields: [studentId], references: [id])
  reviewer    User?    @relation(fields: [reviewedBy], references: [id])
}

model Notification {
  id        Int      @id @default(autoincrement())
  userId    Int
  type      String   // absence_reminder, justification_status, attendance_alert
  title     String
  message   String
  read      Boolean  @default(false)
  priority  String   @default("normal") // low, normal, high, urgent
  data      Json?    // additional context
  createdAt DateTime @default(now())
  expiresAt DateTime?
}
```

### 1.2 Update Existing Models
```sql
-- Extend StudentAttendance
model StudentAttendance {
  // ... existing fields
  justificationId Int?
  justification   AbsenceJustification? @relation(fields: [justificationId], references: [id])
}
```

## 📱 Phase 2: Frontend Components

### 2.1 Core Components Structure
```
src/components/
├── justification/
│   ├── JustificationForm.tsx
│   ├── JustificationList.tsx
│   ├── JustificationModal.tsx
│   └── JustificationStatus.tsx
├── notifications/
│   ├── NotificationCenter.tsx
│   ├── NotificationBell.tsx
│   ├── NotificationItem.tsx
│   └── SmartReminders.tsx
└── ui/
    ├── file-upload.tsx
    └── status-badge.tsx
```

### 2.2 Student Justification Form
```tsx
// components/justification/JustificationForm.tsx
interface JustificationFormProps {
  attendanceId: string;
  onSubmit: (data: JustificationData) => void;
}

interface JustificationData {
  reason: string;
  description: string;
  documents: File[];
}
```

### 2.3 Staff Review Interface
```tsx
// components/justification/JustificationReview.tsx
interface JustificationReviewProps {
  justifications: AbsenceJustification[];
  onApprove: (id: string, note?: string) => void;
  onReject: (id: string, note: string) => void;
}
```

### 2.4 Smart Notification System
```tsx
// components/notifications/NotificationCenter.tsx
interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}
```

## 🔧 Phase 3: Backend API Endpoints

### 3.1 Justification Routes
```javascript
// routes/justifications.js
POST   /api/justifications              // Submit justification
GET    /api/justifications              // Get user's justifications
GET    /api/justifications/pending      // Get pending reviews (staff)
PUT    /api/justifications/:id/approve  // Approve justification
PUT    /api/justifications/:id/reject   // Reject justification
POST   /api/justifications/:id/documents // Upload documents
```

### 3.2 Notification Routes
```javascript
// routes/notifications.js
GET    /api/notifications               // Get user notifications
POST   /api/notifications/mark-read     // Mark as read
POST   /api/notifications/send          // Send notification
GET    /api/notifications/settings      // Get notification preferences
PUT    /api/notifications/settings      // Update preferences
```

### 3.3 Smart Alert System
```javascript
// services/alertService.js
- Absence pattern detection
- Automatic reminder scheduling
- Escalation workflows
- Engagement metrics tracking
```

## 📊 Phase 4: Pages & Navigation

### 4.1 Student Pages
```
pages/justification/
├── SubmitJustificationPage.tsx    // Submit new justification
├── MyJustificationsPage.tsx       // View submitted justifications
└── JustificationStatusPage.tsx    // Track status updates
```

### 4.2 Staff Pages
```
pages/justification/
├── ReviewJustificationsPage.tsx   // Review pending justifications
├── JustificationReportsPage.tsx   // Analytics & reports
└── JustificationSettingsPage.tsx  // Configure policies
```

### 4.3 Navigation Updates
```tsx
// Update StudentSidebar.tsx & StaffSidebar.tsx
- Add "Justifications" menu item
- Add notification bell with badge
- Add quick access to pending reviews (staff)
```

## 🔔 Phase 5: Smart Notifications & Alerts

### 5.1 Notification Types
```typescript
interface NotificationTypes {
  ABSENCE_REMINDER: 'absence_reminder';
  JUSTIFICATION_SUBMITTED: 'justification_submitted';
  JUSTIFICATION_APPROVED: 'justification_approved';
  JUSTIFICATION_REJECTED: 'justification_rejected';
  ATTENDANCE_PATTERN_ALERT: 'attendance_pattern_alert';
  CLASS_REMINDER: 'class_reminder';
  DEADLINE_REMINDER: 'deadline_reminder';
}
```

### 5.2 Smart Alert Rules
```typescript
interface AlertRules {
  consecutiveAbsences: number;      // Trigger after X absences
  attendanceThreshold: number;     // Below X% attendance
  justificationDeadline: number;   // Hours to submit justification
  reminderFrequency: number;       // Hours between reminders
}
```

### 5.3 Engagement Features
```typescript
interface EngagementFeatures {
  attendanceStreaks: boolean;
  justificationReminders: boolean;
  classNotifications: boolean;
  performanceAlerts: boolean;
  parentNotifications: boolean;
}
```

## 🛠️ Phase 6: Implementation Steps

### Step 1: Database Setup (1 day)
- [ ] Update Prisma schema
- [ ] Create migration files
- [ ] Run database migrations
- [ ] Seed test data

### Step 2: Backend API (2 days)
- [ ] Create justification routes
- [ ] Implement notification system
- [ ] Add file upload handling
- [ ] Create alert service
- [ ] Add validation middleware

### Step 3: Core Components (2 days)
- [ ] Build justification form
- [ ] Create notification center
- [ ] Implement file upload component
- [ ] Add status tracking components

### Step 4: Student Interface (1 day)
- [ ] Submit justification page
- [ ] View justifications page
- [ ] Notification integration
- [ ] Mobile responsiveness

### Step 5: Staff Interface (1 day)
- [ ] Review justifications page
- [ ] Approval/rejection workflow
- [ ] Bulk actions
- [ ] Analytics dashboard

### Step 6: Smart Alerts (1 day)
- [ ] Pattern detection algorithms
- [ ] Automated reminder system
- [ ] Escalation workflows
- [ ] Performance monitoring

## 📁 File Structure Changes

### New Files to Create
```
server/
├── api/
│   ├── routes/
│   │   ├── justifications.js
│   │   └── notifications.js
│   └── services/
│       ├── alertService.js
│       ├── notificationService.js
│       └── fileUploadService.js
└── web/
    ├── src/
    │   ├── components/
    │   │   ├── justification/
    │   │   └── notifications/
    │   ├── pages/
    │   │   └── justification/
    │   ├── services/
    │   │   ├── justificationService.ts
    │   │   └── notificationService.ts
    │   └── hooks/
    │       ├── useJustifications.ts
    │       └── useNotifications.ts
```

## 🎨 UI/UX Considerations

### Design Principles
- **Minimal friction**: Quick justification submission
- **Clear status**: Visual progress indicators
- **Smart defaults**: Pre-filled forms when possible
- **Mobile-first**: Touch-friendly interfaces
- **Accessibility**: Screen reader compatible

### Key Features
- Drag-and-drop file upload
- Real-time status updates
- Push notifications
- Offline form saving
- Bulk operations for staff

## 🔒 Security & Validation

### File Upload Security
- File type validation
- Size limits (5MB per file)
- Virus scanning
- Secure storage paths

### Data Validation
- Input sanitization
- Role-based access control
- Rate limiting
- Audit logging

## 📈 Success Metrics

### Student Engagement
- Justification submission rate
- Response time to notifications
- Attendance improvement after alerts

### Staff Efficiency
- Review processing time
- Approval/rejection ratios
- Workload distribution

### System Performance
- Notification delivery rate
- Alert accuracy
- User satisfaction scores

## 🚀 Deployment Checklist

- [ ] Database migrations tested
- [ ] API endpoints documented
- [ ] Frontend components tested
- [ ] File upload configured
- [ ] Notification service deployed
- [ ] Alert rules configured
- [ ] User permissions set
- [ ] Mobile responsiveness verified

---

**Estimated Timeline**: 8 days
**Priority**: High
**Dependencies**: Existing authentication system, file storage setup

This implementation will transform absence management from reactive to proactive, keeping students and staff aligned through intelligent notifications and streamlined justification workflows.