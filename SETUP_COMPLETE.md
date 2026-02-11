# Complete Setup Instructions

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v14+ installed
- MongoDB installed or MongoDB Atlas account
- npm or yarn package manager

### Step-by-Step Setup

## Backend Setup (API Server)

### 1. Navigate to Backend Directory
```bash
cd exam-priority-portal/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file:
```bash
# Copy from example
cp .env.example .env

# Edit .env with your values
```

**Edit `.env` with:**
```env
MONGODB_URI=mongodb://localhost:27017/exam-priority
JWT_SECRET=your_super_secret_jwt_key_12345_change_in_production
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB
**Windows:**
```bash
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas (Cloud):**
- Create account: https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update MONGODB_URI in .env

### 5. Start Backend Server
```bash
# Development mode (auto-reload)
npm run dev

# Or production mode
npm start
```

**Expected Output:**
```
✓ MongoDB connected
✓ Server running on http://localhost:5000
```

### 6. Test Backend
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"Server is running"}`

---

## Frontend Setup (React App)

### 1. Navigate to Frontend Directory
```bash
cd exam-priority-portal/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file:
```bash
cp .env.example .env
```

**`.env` should contain:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view exam-priority-frontend in the browser.
  Local:            http://localhost:3000
```

Browser will automatically open to http://localhost:3000

---

## 🎯 Testing the Application

### Option 1: Student Registration & Login

1. **Go to** http://localhost:3000
2. **Click** "Student Login"
3. **Click** "Create an account" link
4. **Register** with:
   - Name: Your Name
   - Email: student@example.com
   - Password: password123
5. **Auto-redirects** to Student Dashboard

### Option 2: Admin Login (Setup Required)

First, create admin in MongoDB:

**Using MongoDB Compass (GUI):**
1. Connect to `mongodb://localhost:27017`
2. Database: `exam-priority`
3. Collection: `users`
4. Insert document:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$sampleHashedPassword",
  "role": "admin",
  "isBlocked": false,
  "targetExam": null
}
```

**Or using MongoDB Shell:**
```bash
mongosh

use exam-priority
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: <bcrypt_hashed_password>,
  role: "admin",
  isBlocked: false,
  targetExam: null
})
```

Then login at: http://localhost:3000/admin-login

---

## 📚 Creating Sample Data (As Admin)

### 1. Login as Admin
- Navigate to Admin Dashboard
- Click "Exams & Curriculum" tab

### 2. Create Exam
1. Fill exam name: "RRB"
2. Description: "Railway Recruitment Board"
3. Click "Create Exam"

### 3. Create Subject
1. Click "Manage" on the exam
2. Fill subject name: "Reasoning"
3. Click "Add Subject"

### 4. Create Topic
1. Click "Edit" on the subject
2. Topic name: "Analogy"
3. Priority: "High"
4. Study material: "Write detailed notes..."
5. Click "Add Topic"

### 5. Create Quiz (Create in MongoDB)

Insert quiz document in `quizzes` collection:
```json
{
  "topic": ObjectId("topic_id_here"),
  "questions": [
    {
      "text": "Cat is to Kitten as Dog is to?",
      "options": ["Puppy", "Calf", "Foal", "Kid"],
      "correctAnswer": 0,
      "explanation": "A kitten is a young cat, similarly a puppy is a young dog."
    },
    {
      "text": "Bird is to Flying as Fish is to?",
      "options": ["Running", "Swimming", "Walking", "Jumping"],
      "correctAnswer": 1,
      "explanation": "Birds fly in the air, fish swim in water."
    }
  ]
}
```

---

## 🧪 Testing Student Features

1. **Register/Login** as student
2. **Dashboard opens** with navigation
3. **Select Exam**: Choose "RRB"
4. **Select Subject**: Choose "Reasoning"
5. **View Topics**: "Analogy" appears (High priority)
6. **View Material**: Study notes display
7. **Start Quiz**: Answer questions
8. **View Results**: Score and explanations
9. **Mark Complete**: Button to mark topic done
10. **Progress**: Visually update

---

## 📊 Project Structure Review

```
exam-priority-portal/
│
├── backend/
│   ├── src/
│   │   ├── models/           # Database schema
│   │   ├── controllers/       # Request logic
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth, validation
│   │   ├── config/            # DB connection
│   │   └── server.js          # Main app
│   ├── package.json
│   ├── .env.example
│   └── .env                   # ← Create this
│
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API calls
│   │   ├── context/           # Auth state
│   │   ├── App.js             # Router
│   │   └── index.js           # Entry
│   ├── package.json
│   ├── .env.example
│   └── .env                   # ← Create this
│
├── README.md                  # Full documentation
├── BACKEND_SETUP.md          # Backend guide
├── FRONTEND_SETUP.md         # Frontend guide
└── SETUP_COMPLETE.md         # This file

```

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend `.env` configured
- [ ] Backend server running (port 5000)
- [ ] Frontend `.env` configured
- [ ] Frontend running (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Health check works: curl localhost:5000/api/health
- [ ] Can register student
- [ ] Can login as student
- [ ] Can create exam (as admin)
- [ ] Can create subject (as admin)
- [ ] Can create topic (as admin)
- [ ] Student can see filtered topics
- [ ] Can take quiz and see results

---

## 🔍 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check MongoDB connection
# In .env verify: MONGODB_URI=mongodb://localhost:27017/exam-priority
```

### Frontend Won't Connect
```bash
# Check API URL in frontend/.env
# REACT_APP_API_URL=http://localhost:5000/api

# Clear browser cache
# Ctrl+Shift+Delete and clear all
```

### MongoDB Connection Error
```bash
# Test connection
mongosh --eval "db.adminCommand('ping')"

# Or use Atlas connection string
# mongodb+srv://user:password@cluster.mongodb.net/exam-priority
```

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001

# Update frontend/.env
REACT_APP_API_URL=http://localhost:5001/api
```

---

## 🎨 Accessing Different Sections

| Route | Purpose | Access |
|-------|---------|--------|
| / | Home | Public |
| /student-login | Student Login | Public |
| /student-register | Registration | Public |
| /admin-login | Admin Login | Public |
| /student-dashboard | Student Area | Logged in (Student) |
| /admin-dashboard | Admin Panel | Logged in (Admin) |

---

## 🔐 Security Notes

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Store passwords safely** - bcrypt hashed
4. **Admin accounts** - Create only via database
5. **Token expiry** - Set to 7 days
6. **CORS configured** - Cross-origin requests allowed

---

## 📱 Mobile Testing

Frontend is responsive. Test on:
- Chrome DevTools (Ctrl+Shift+I)
- Toggle device toolbar (Ctrl+Shift+M)
- Test at 320px, 768px, and 1920px widths

---

## 🚀 Production Deployment

See individual setup guides:
- Backend: `BACKEND_SETUP.md`
- Frontend: `FRONTEND_SETUP.md`
- Main: `README.md`

---

## 📞 Support

For issues:
1. Check console (F12) for errors
2. Check backend logs (terminal)
3. Verify all .env files are correct
4. Ensure ports 3000 and 5000 are available
5. Check MongoDB connection

---

## ✨ Next Steps

1. ✅ Complete setup
2. ✅ Test all pages
3. ✅ Create sample data
4. ✅ Test student flow
5. ✅ Test admin features
6. ✅ Customize as needed
7. ✅ Deploy to production

**Happy Learning! 🎓**
