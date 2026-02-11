# API Testing Guide & cURL Examples

## Base URL
```
http://localhost:5000/api
```

## Authorization Header
For protected routes, include:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Student Registration
```bash
curl -X POST http://localhost:5000/api/auth/student/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### 2. Student Login
```bash
curl -X POST http://localhost:5000/api/auth/student/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 4. Get Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Exam Management (Admin Only)

### 1. Get All Exams
```bash
curl -X GET http://localhost:5000/api/exams
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "RRB",
    "description": "Railway Recruitment Board",
    "subjects": []
  }
]
```

### 2. Get Exam by ID
```bash
curl -X GET http://localhost:5000/api/exams/507f1f77bcf86cd799439012
```

### 3. Create Exam (Admin)
```bash
curl -X POST http://localhost:5000/api/exams \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "SSC",
    "description": "Staff Selection Commission"
  }'
```

### 4. Update Exam (Admin)
```bash
curl -X PUT http://localhost:5000/api/exams/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "SSC Updated",
    "description": "Updated description"
  }'
```

### 5. Delete Exam (Admin)
```bash
curl -X DELETE http://localhost:5000/api/exams/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Subject Management

### 1. Get Subjects by Exam
```bash
curl -X GET http://localhost:5000/api/exams/507f1f77bcf86cd799439012/subjects
```

### 2. Create Subject (Admin)
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Reasoning",
    "exam": "507f1f77bcf86cd799439012"
  }'
```

### 3. Update Subject (Admin)
```bash
curl -X PUT http://localhost:5000/api/subjects/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Reasoning Updated"
  }'
```

### 4. Delete Subject (Admin)
```bash
curl -X DELETE http://localhost:5000/api/subjects/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Topic Management

### 1. Get All Topics
```bash
curl -X GET http://localhost:5000/api/subjects/507f1f77bcf86cd799439013/topics
```

### 2. Get High & Medium Priority Topics Only
```bash
curl -X GET http://localhost:5000/api/subjects/507f1f77bcf86cd799439013/topics/filtered
```

### 3. Create Topic (Admin)
```bash
curl -X POST http://localhost:5000/api/topics \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Analogy",
    "subject": "507f1f77bcf86cd799439013",
    "priority": "High",
    "studyMaterial": "Analogy is a type of reasoning where..."
  }'
```

### 4. Update Topic (Admin)
```bash
curl -X PUT http://localhost:5000/api/topics/507f1f77bcf86cd799439015 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Analogy Updated",
    "priority": "Medium",
    "studyMaterial": "Updated notes..."
  }'
```

### 5. Delete Topic (Admin)
```bash
curl -X DELETE http://localhost:5000/api/topics/507f1f77bcf86cd799439015 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Quiz Management

### 1. Get Quiz by Topic
```bash
curl -X GET http://localhost:5000/api/quiz/507f1f77bcf86cd799439015
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439019",
  "topic": "507f1f77bcf86cd799439015",
  "questions": [
    {
      "text": "Cat is to Kitten as Dog is to?",
      "options": ["Puppy", "Calf", "Foal", "Kid"],
      "correctAnswer": 0,
      "explanation": "A kitten is a young cat..."
    }
  ]
}
```

### 2. Create Quiz (Admin)
```bash
curl -X POST http://localhost:5000/api/quiz \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "topic": "507f1f77bcf86cd799439015",
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
        "explanation": "Birds fly in air, fish swim in water."
      }
    ]
  }'
```

### 3. Submit Quiz Answers (Student)
```bash
curl -X POST http://localhost:5000/api/quiz/507f1f77bcf86cd799439019/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "answers": [0, 1]
  }'
```

**Response:**
```json
{
  "score": 2,
  "totalQuestions": 2,
  "percentage": "100.00",
  "results": [
    {
      "questionText": "Cat is to Kitten as Dog is to?",
      "userAnswer": "Puppy",
      "correctAnswer": "Puppy",
      "explanation": "A kitten is a young cat...",
      "isCorrect": true
    },
    {
      "questionText": "Bird is to Flying as Fish is to?",
      "userAnswer": "Swimming",
      "correctAnswer": "Swimming",
      "explanation": "Birds fly in air, fish swim in water.",
      "isCorrect": true
    }
  ]
}
```

### 4. Update Quiz (Admin)
```bash
curl -X PUT http://localhost:5000/api/quiz/507f1f77bcf86cd799439019 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "questions": [
      {
        "text": "Updated Question",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "explanation": "Explanation"
      }
    ]
  }'
```

### 5. Delete Quiz (Admin)
```bash
curl -X DELETE http://localhost:5000/api/quiz/507f1f77bcf86cd799439019 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Progress Tracking

### 1. Get Student Progress
```bash
curl -X GET http://localhost:5000/api/progress \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "completedTopics": 2,
  "totalTopics": 5,
  "progressPercentage": "40.00",
  "progress": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "student": "507f1f77bcf86cd799439011",
      "topic": "507f1f77bcf86cd799439015",
      "isCompleted": true,
      "quizAttempts": [
        {
          "score": 3,
          "totalQuestions": 3,
          "attemptedAt": "2024-01-15T11:00:00Z"
        }
      ]
    }
  ]
}
```

### 2. Mark Topic as Completed
```bash
curl -X POST http://localhost:5000/api/mark-complete/:studentId/:topicId \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 3. Record Quiz Attempt
```bash
curl -X POST http://localhost:5000/api/quiz-attempt/507f1f77bcf86cd799439015 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "score": 3,
    "totalQuestions": 3,
    "answers": [0, 1, 1]
  }'
```

### 4. Set Target Exam
```bash
curl -X POST http://localhost:5000/api/target-exam \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "examId": "507f1f77bcf86cd799439012"
  }'
```

---

## Student Management (Admin Only)

### 1. Get All Students
```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Block Student
```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011/block \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Unblock Student
```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011/unblock \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden: Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Exam not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error message"
}
```

---

## Testing with Postman

1. Import this collection
2. Set `{{base_url}}` = `http://localhost:5000/api`
3. Set `{{token}}` = JWT token from login
4. Test each endpoint

---

## Testing with JavaScript (Axios)

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register student
async function registerStudent() {
  try {
    const response = await api.post('/auth/student/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    console.log('Token:', response.data.token);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

registerStudent();
```

---

## Quick Reference Table

| Operation | Method | Endpoint | Protected |
|-----------|--------|----------|-----------|
| Register Student | POST | /auth/student/register | ❌ |
| Login Student | POST | /auth/student/login | ❌ |
| Login Admin | POST | /auth/admin/login | ❌ |
| Get Profile | GET | /auth/profile | ✅ |
| List Exams | GET | /exams | ❌ |
| Get Exam | GET | /exams/:id | ❌ |
| Create Exam | POST | /exams | ✅ Admin |
| Update Exam | PUT | /exams/:id | ✅ Admin |
| Delete Exam | DELETE | /exams/:id | ✅ Admin |
| List Subjects | GET | /exams/:examId/subjects | ❌ |
| Create Subject | POST | /subjects | ✅ Admin |
| List Topics | GET | /subjects/:subjectId/topics | ❌ |
| Get Filtered Topics | GET | /subjects/:subjectId/topics/filtered | ❌ |
| Create Topic | POST | /topics | ✅ Admin |
| Get Quiz | GET | /quiz/:topicId | ❌ |
| Submit Quiz | POST | /quiz/:id/submit | ✅ Student |
| Get Progress | GET | /progress | ✅ Student |
| Mark Complete | POST | /mark-complete/:studentId/:topicId | ✅ |
| List Students | GET | /students | ✅ Admin |
| Block Student | PUT | /students/:studentId/block | ✅ Admin |
