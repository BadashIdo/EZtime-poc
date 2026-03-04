import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// נתונים לדוגמה מתוך הפרויקט שלך
const mockData = {
    empId: "E1001",
    name: "דנה אלון",
    date: "2026-02-04",
    totalHours: 12.00,
    shortage: 0,
    maxRate: 87,
    h100: 7.00,
    h125: 2.00,
    h150: 3.00,
    totalSalary: 1174.50,
    isNightShift: true,
    shifts: [
        { role: "מחסנאי", company: "חברת בת ב", start: "07:15", end: "16:15", hours: 9, nightHours: 0 },
        { role: "קופאי", company: "חברת בת ה", start: "17:00", end: "20:00", hours: 3, nightHours: 2.5 }
    ]
};

// ה-Endpoint שלנו
app.get('/api/timesheet/:employeeId/:date', (req, res) => {
    const { employeeId, date } = req.params;

    if (employeeId === "E1001" && date === "2026-02-04") {
        res.json({
            success: true,
            message: "נתוני שעות עובדו בהצלחה",
            data: mockData
        });
    } else {
        res.status(404).json({ success: false, message: "לא נמצאו דיווחים לעובד זה בתאריך המבוקש." });
    }
});

app.listen(PORT, () => {
    console.log(`✅ API Server is running on http://localhost:${PORT}`);
    console.log(`👉 Test here: http://localhost:${PORT}/api/timesheet/E1001/2026-02-04`);
});