# EZTIME - Employee Time Management POC ⏱️

### 🔗 [לחץ כאן לצפייה במערכת החיה (Live Demo)](https://eztime-poc.vercel.app)

---

## 📝 אודות הפרויקט
מערכת הוכחת היתכנות (POC) שפותחה כחלק ממטלת בית עבור חברת "אחזקות א'". המערכת מבצעת אוטומציה של חוקי עבודה מורכבים (מדרגות שכר, משמרות לילה, חוסרים) ומציגה אותם בממשק משתמש מודרני ודרך API ייעודי.

## 🚀 תכונות מרכזיות (Key Features)

- **עיבוד נתונים חכם:** חישוב אוטומטי של מדרגות שכר (100%, 125%, 150%) בהתאם לשעות עבודה יומיות.
- **ניהול משמרות לילה:** זיהוי אוטומטי של משמרות לילה (22:00-06:00) ועדכון תקן השעות ל-7 שעות בהתאם לחוק הישראלי.
- **ניתוח חוסרים:** הצגת פערים בזמן אמת בין שעות ביצוע לתקן יומי נדרש.
- **API Backend:** חשיפת נתוני הניתוח בפורמט JSON עבור אפליקציות צד-שלישי (בונוס).

## 🛠️ טכנולוגיות (Tech Stack)

### Frontend
- **React.js & Vite** | **Tailwind CSS** | **Lucide-React**

### Backend (Bonus Task)
- **Node.js & Express** | **CORS**

### Deployment & DevOps
- **Vercel** (Live Hosting) | **Git & GitHub**



## 💻 הרצה מקומית (Installation & Setup)

1. **שכפול המאגר:**
   ```bash
   git clone [https://github.com/BadashIdo/EZtime-poc.git](https://github.com/BadashIdo/EZtime-poc.git)
   cd eztime-app

   2. **התקנת תלויות:**
   npm install
   3. **הרצת הFRONT:**
   npm run dev
   4. **הרצת ה-API Server (Backend):**
   node server.js
   
