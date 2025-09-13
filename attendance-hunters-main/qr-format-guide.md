# QR Code Format Guide

## Current QR Data Format
The QR code currently contains:
```
attendance://mark?session=qr_1757738643901_iqp50384j&class=Data Structures and Algorithms
```

## Mobile App Integration

### For Mobile App Developers:

1. **Scan QR Code** and extract the data string
2. **Parse the URL** to get parameters:
   - Extract `session` parameter (e.g., `qr_1757738643901_iqp50384j`)
   - Extract `class` parameter (e.g., `Data Structures and Algorithms`)

3. **Make API Call** to mark attendance:
   ```
   POST https://attendance-fullstack.onrender.com/api/qr/mark/{sessionId}
   Content-Type: application/json
   
   {
     "studentId": "CS2024001",
     "studentName": "Alice Johnson"
   }
   ```

### Example Implementation (JavaScript):

```javascript
// Parse QR data
const qrData = "attendance://mark?session=qr_1757738643901_iqp50384j&class=Data Structures and Algorithms";
const url = new URL(qrData);
const sessionId = url.searchParams.get('session');
const className = url.searchParams.get('class');

// Mark attendance
const response = await fetch(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    studentId: 'CS2024001',
    studentName: 'Alice Johnson'
  })
});

const result = await response.json();
console.log(result.message); // "Attendance marked successfully"
```

### Response Format:
```json
{
  "message": "Attendance marked successfully",
  "studentName": "Alice Johnson",
  "markedAt": "2025-01-13T10:30:45.123Z"
}
```

### Error Responses:
- **404**: Session not found or expired
- **409**: Attendance already marked
- **410**: Session has expired

## Testing the QR System

You can test the QR system by:
1. Generate QR code from the web interface
2. Use the session ID to make a direct API call
3. Check the "Recent Scans" section for updates

## Production API Endpoint
Base URL: `https://attendance-fullstack.onrender.com/api`