# Exam-Priority Digital Immersive Skill Training Portal

A complete MERN-stack web application for competitive exam preparation with role-based access control, topic-wise quizzes, and progress tracking.

## 🎯 Features

### Student Features
- ✅ User registration and login
- ✅ Select target exam (RRB, TNPSC, SSC, Banking)
- ✅ View subjects and topics for selected exam
- ✅ Filter topics by priority (High & Medium only)
- ✅ Access concise, exam-oriented study material
- ✅ Mark topics as completed
- ✅ Attend topic-wise quizzes with instant feedback
- ✅ Track learning progress with visual indicators
- ✅ View quiz explanations for each question

### Admin Features
- ✅ Secure admin login (no public registration)
- ✅ Dashboard overview
- ✅ Create, read, update, delete exams
- ✅ Manage subjects per exam
- ✅ Manage topics with priority levels (High/Medium/Low)
- ✅ Create and manage quiz questions
- ✅ View all registered students
- ✅ Block/unblock student accounts
- ✅ Delete student accounts and data

## 🏗️ Project Structure

```
exam-priority-portal/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Exam.js
│   │   │   ├── Subject.js
│   │   │   ├── Topic.js
│   │   │   ├── Quiz.js
│   │   │   └── Progress.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── examController.js
│   │   │   ├── quizController.js
│   │   │   └── progressController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── examRoutes.js
│   │   │   ├── quizRoutes.js
│   │   │   └── progressRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── roleMiddleware.js
│   │   ├── config/
│   │   │   └── database.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   ├── Navigation.css
│   │   │   ├── Card.js
│   │   │   ├── Card.css
│   │   │   ├── ProgressBar.js
│   │   │   ├── ProgressBar.css
│   │   │   ├── QuizComponent.js
│   │   │   └── QuizComponent.css
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── StudentLogin.js
│   │   │   ├── StudentRegister.js
│   │   │   ├── AdminLogin.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── StudentDashboard.css
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminDashboard.css
│   │   │   └── Auth.css
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── examService.js
│   │   │   ├── quizService.js
│   │   │   └── progressService.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React.js 18+ with modern UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **HTTP Client**: Axios

## 📋 Prerequisites

1. **Node.js** (v14+ recommended)
2. **MongoDB** (running locally or connection string)
3. **npm** or **yarn**

## 🚀 Installation & Setup

### Step 1: Clone/Download the Project
```bash
cd exam-priority-portal
```

### Step 2: Setup Backend

#### 2.1 Navigate to backend directory
```bash
cd backend
npm install
```

#### 2.2 Create .env file
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

**Edit .env:**
```
MONGODB_URI=mongodb://localhost:27017/exam-priority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

#### 2.3 Ensure MongoDB is running
```bash
# On Windows (if using local MongoDB)
mongod

# Or use MongoDB Atlas (cloud) by updating MONGODB_URI in .env
```

#### 2.4 Start backend server
```bash
npm run dev
# or
npm start
```

Backend will run on: **http://localhost:5000**

### Step 3: Setup Frontend

#### 3.1 Navigate to frontend directory
```bash
cd frontend
npm install
```

#### 3.2 Create .env file
```bash
cp .env.example .env
```

**.env should contain:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.3 Start frontend development server
```bash
npm start
```

Frontend will open at: **http://localhost:3000**

## 📝 API Routes Documentation

### Authentication Routes
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/student/register` | Register new student | ❌ |
| POST | `/api/auth/student/login` | Login as student | ❌ |
| POST | `/api/auth/admin/login` | Login as admin | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |

### Exam Routes
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/exams` | Get all exams | Any |
| GET | `/api/exams/:id` | Get exam by ID | Any |
| POST | `/api/exams` | Create exam | Admin |
| PUT | `/api/exams/:id` | Update exam | Admin |
| DELETE | `/api/exams/:id` | Delete exam | Admin |

### Subject Routes
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/exams/:examId/subjects` | Get exam subjects | Any |
| POST | `/api/subjects` | Create subject | Admin |
| PUT | `/api/subjects/:id` | Update subject | Admin |
| DELETE | `/api/subjects/:id` | Delete subject | Admin |

### Topic Routes
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/subjects/:subjectId/topics` | Get all topics | Any |
| GET | `/api/subjects/:subjectId/topics/filtered` | Get High/Medium priority topics | Any |
| POST | `/api/topics` | Create topic | Admin |
| PUT | `/api/topics/:id` | Update topic | Admin |
| DELETE | `/api/topics/:id` | Delete topic | Admin |

### Quiz Routes
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/quiz/:topicId` | Get quiz by topic | Any |
| POST | `/api/quiz` | Create quiz | Admin |
| PUT | `/api/quiz/:id` | Update quiz | Admin |
| DELETE | `/api/quiz/:id` | Delete quiz | Admin |
| POST | `/api/quiz/:id/submit` | Submit quiz answers | Student |

### Progress Routes
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/progress` | Get student progress | Student |
| GET | `/api/progress/:studentId` | Get specific student progress | Admin/Self |
| POST | `/api/mark-complete/:studentId/:topicId` | Mark topic complete | Student/Admin |
| POST | `/api/quiz-attempt/:topicId` | Record quiz attempt | Student |
| POST | `/api/target-exam` | Set target exam | Student |
| GET | `/api/students` | Get all students | Admin |
| PUT | `/api/students/:studentId/block` | Block student | Admin |
| PUT | `/api/students/:studentId/unblock` | Unblock student | Admin |
| DELETE | `/api/students/:studentId` | Delete student | Admin |

## 🛡️ Default Admin Credentials

To create an admin account manually in MongoDB:

```javascript
// Connect to MongoDB
use exam-priority

// Insert admin user (password: admin123)
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // Hash of 'admin123' using bcrypt
  role: "admin",
  isBlocked: false,
  targetExam: null,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the app's registration and then manually update the role in MongoDB.

## 📊 Database Schema

### User Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "role": "student" | "admin",
  "isBlocked": Boolean,
  "targetExam": ObjectId (ref: Exam),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Exam Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "subjects": [ObjectId] (ref: Subject),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Subject Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "exam": ObjectId (ref: Exam),
  "topics": [ObjectId] (ref: Topic),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Topic Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "subject": ObjectId (ref: Subject),
  "priority": "High" | "Medium" | "Low",
  "studyMaterial": String (HTML or text),
  "quizzes": [ObjectId] (ref: Quiz),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Quiz Collection
```json
{
  "_id": ObjectId,
  "topic": ObjectId (ref: Topic),
  "questions": [
    {
      "text": String,
      "options": [String, String, String, String],
      "correctAnswer": Number (0-3),
      "explanation": String
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

### Progress Collection
```json
{
  "_id": ObjectId,
  "student": ObjectId (ref: User),
  "topic": ObjectId (ref: Topic),
  "isCompleted": Boolean,
  "quizAttempts": [
    {
      "score": Number,
      "totalQuestions": Number,
      "attemptedAt": Date,
      "answers": [Number]
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

## 🎓 Sample Data to Seed

### Create Sample Exam
POST `/api/exams`
```json
{
  "name": "RRB",
  "description": "Railway Recruitment Board Examination"
}
```

### Create Sample Subject
POST `/api/subjects`
```json
{
  "name": "Reasoning",
  "exam": "exam_id_here"
}
```

### Create Sample Topic
POST `/api/topics`
```json
{
  "name": "Analogy",
  "subject": "subject_id_here",
  "priority": "High",
  "studyMaterial": "Analogy is a type of reasoning where we find similarities between two different things..."
}
```

### Create Sample Quiz
POST `/api/quiz`
```json
{
  "topic": "topic_id_here",
  "questions": [
    {
      "text": "Cat is to Kitten as Dog is to?",
      "options": ["Puppy", "Calf", "Foal", "Kid"],
      "correctAnswer": 0,
      "explanation": "A kitten is a young cat, similarly a puppy is a young dog."
    }
  ]
}
```

## 🔐 Security Features

✅ **JWT-based authentication** - Secure token-based access
✅ **bcryptjs password hashing** - Passwords are never stored in plain text
✅ **Role-based access control** - Students can't access admin routes
✅ **Protected API routes** - All sensitive endpoints require authentication
✅ **CORS enabled** - Frontend and backend communicate securely
✅ **Token expiration** - Tokens expire after 7 days

## 🎨 UI Features

✅ **Clean, distraction-free design** - Focus on learning
✅ **Responsive layout** - Works on desktop and mobile
✅ **Progress visualization** - See your learning journey
✅ **Intuitive navigation** - Easy to find topics and quizzes
✅ **Instant quiz feedback** - Know your score immediately
✅ **Color-coded priorities** - High/Medium/Low priority topics
✅ **Status badges** - Track student activity

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is not in use: `lsof -i :5000`
- Verify `.env` file exists with correct URI

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend `.env`
- CORS should be enabled in backend (already is)

### Database connection fails
- Use connection string: `mongodb://localhost:27017/exam-priority`
- Or use MongoDB Atlas cloud: `mongodb+srv://user:pass@cluster.mongodb.net/exam-priority`
- Check MongoDB service is running

### Quiz/Topic not appearing
- Ensure admin has created exam → subject → topic → quiz
- Verify topic priority is "High" or "Medium" (students only see these)

## 📈 Future Enhancements

- [ ] AI-based doubt clarification system
- [ ] Mock test series
- [ ] Performance analytics and insights
- [ ] Adaptive learning paths
- [ ] Discussion forum
- [ ] Video tutorials
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Payment integration for premium content
- [ ] Advanced search and filtering

## 📄 License

This project is open source for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📞 Support

For support, please contact the development team or submit an issue in the repository.

---

**Happy Learning! 🎓**
