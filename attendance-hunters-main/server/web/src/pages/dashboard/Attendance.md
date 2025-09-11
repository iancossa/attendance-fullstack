# Attendance Hunters – Take Attendance Modal

## 🎯 Objective
Provide staff with a **clean, intuitive, and secure modal** for managing attendance.  
The flow allows for multiple modes, with **QR Code attendance** as the primary method.

---

## 1. Trigger
- Staff clicks the **"Take Attendance"** button on the dashboard.  
- A centered **modal window** opens.

---

## 2. Modal Header
- Title: **"Take Attendance – [Course Name]"**  
- Subtitle: Current **Date + Time** (auto-filled).  
- Close button (X) in the top-right corner.

---

## 3. Step 1 – Class & Session Selection
- **Dropdown fields**:
  - Course (e.g., CSE101 – Data Structures).  
  - Section/Batch (A, B, etc.).  
  - Session Type (Lecture / Lab / Seminar).  
- **Date & Time** auto-filled (editable).  
- **Next button** → moves to Step 2.

---

## 4. Step 2 – Mode of Attendance
Staff chooses how attendance will be captured:

1. **QR Code Mode**  
   - Generates a unique, temporary QR code.  
   - Valid for a limited time (e.g., 2–5 minutes).  
   - Students scan using the Attendance Hunters mobile app.

2. **Manual Mode**  
   - Displays the student list with checkboxes.  
   - Options: *Mark All Present* / *Mark Absentees Only*.  

3. **Hybrid Mode**  
   - Starts with QR Code.  
   - Staff can manually adjust unmarked students later.  

- **Generate Attendance Session button** → moves to Step 3.

---

## 5. Step 3 – QR Code Display (QR Mode)
- Large, clear QR Code displayed in the center.  
- **Countdown Timer**: e.g., *"Valid for 3:00 minutes"*.  
- Instruction: *"Students must scan this code with the Attendance Hunters app."*  
- Button: **Regenerate QR** (if needed).  

**Fallback option**: *Switch to Manual Entry* (for emergencies).

---

## 6. Step 4 – Confirmation & Sync
Once the QR expires:
- System closes session automatically.  
- Shows results:  
  - ✅ “Attendance captured for 45 students.”  
  - ⚠️ “3 students unmarked – please review manually.”  
- Options:  
  - **Review & Edit** → Opens student list.  
  - **Save & Close** → Confirms and exits.

---

## 🔐 Security Features
- Each QR Code includes:  
  - Session ID + Timestamp.  
  - Encrypted token (prevents reuse).  
- QR is dynamic and changes every session.  
- Audit logs stored automatically.  

---

## 🎨 UX Notes
- Wizard-style flow: simple **step-by-step modal**.  
- Designed for speed: attendance can be taken in under **30 seconds**.  
- Students receive instant confirmation on their mobile app.  

---

## ✅ Outcome
A **fast, secure, and user-friendly modal** that:  
- Saves staff time.  
- Ensures attendance integrity.  
- Integrates seamlessly with gamification and reporting.
