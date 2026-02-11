# MongoDB Schema & Sample Data

## Database Name
```
exam-priority
```

## Collections & Schema

### 1. users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,        // unique
  password: String,     // bcrypt hashed
  role: "student" | "admin",
  isBlocked: Boolean,
  targetExam: ObjectId,  // reference to Exam
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$sampleHashedPassword",
  "role": "student",
  "isBlocked": false,
  "targetExam": ObjectId("507f1f77bcf86cd799439012"),
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

### 2. exams
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  subjects: [ObjectId],  // references to Subject
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data:**
```json
[
  {
    "_id": ObjectId("507f1f77bcf86cd799439012"),
    "name": "RRB",
    "description": "Railway Recruitment Board Examination",
    "subjects": [
      ObjectId("507f1f77bcf86cd799439013"),
      ObjectId("507f1f77bcf86cd799439014")
    ],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439020"),
    "name": "SSC",
    "description": "Staff Selection Commission",
    "subjects": [ObjectId("507f1f77bcf86cd799439021")],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439030"),
    "name": "TNPSC",
    "description": "Tamil Nadu Public Service Commission",
    "subjects": [ObjectId("507f1f77bcf86cd799439031")],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439040"),
    "name": "Banking",
    "description": "Banking Sector Exams",
    "subjects": [ObjectId("507f1f77bcf86cd799439041")],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  }
]
```

### 3. subjects
```javascript
{
  _id: ObjectId,
  name: String,
  exam: ObjectId,        // reference to Exam
  topics: [ObjectId],    // references to Topic
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data:**
```json
[
  {
    "_id": ObjectId("507f1f77bcf86cd799439013"),
    "name": "Reasoning",
    "exam": ObjectId("507f1f77bcf86cd799439012"),
    "topics": [
      ObjectId("507f1f77bcf86cd799439015"),
      ObjectId("507f1f77bcf86cd799439016")
    ],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439014"),
    "name": "Mathematics",
    "exam": ObjectId("507f1f77bcf86cd799439012"),
    "topics": [ObjectId("507f1f77bcf86cd799439017")],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  }
]
```

### 4. topics
```javascript
{
  _id: ObjectId,
  name: String,
  subject: ObjectId,     // reference to Subject
  priority: "High" | "Medium" | "Low",
  studyMaterial: String, // HTML or plain text
  quizzes: [ObjectId],   // references to Quiz
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data:**
```json
[
  {
    "_id": ObjectId("507f1f77bcf86cd799439015"),
    "name": "Analogy",
    "subject": ObjectId("507f1f77bcf86cd799439013"),
    "priority": "High",
    "studyMaterial": "Analogy is a type of reasoning based on similarity...",
    "quizzes": [ObjectId("507f1f77bcf86cd799439019")],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439016"),
    "name": "Classification",
    "subject": ObjectId("507f1f77bcf86cd799439013"),
    "priority": "Medium",
    "studyMaterial": "Classification is the process of grouping...",
    "quizzes": [],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439017"),
    "name": "Arithmetic",
    "subject": ObjectId("507f1f77bcf86cd799439014"),
    "priority": "High",
    "studyMaterial": "Basic arithmetic includes addition, subtraction...",
    "quizzes": [],
    "createdAt": ISODate("2024-01-10T00:00:00Z"),
    "updatedAt": ISODate("2024-01-10T00:00:00Z")
  }
]
```

### 5. quizzes
```javascript
{
  _id: ObjectId,
  topic: ObjectId,       // reference to Topic
  questions: [
    {
      text: String,
      options: [String, String, String, String],
      correctAnswer: Number (0-3),
      explanation: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439019"),
  "topic": ObjectId("507f1f77bcf86cd799439015"),
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
      "explanation": "Birds fly in air, fish swim in water. The mode of movement is different."
    },
    {
      "text": "Book is to Author as Building is to?",
      "options": ["Student", "Architect", "Engineer", "Worker"],
      "correctAnswer": 1,
      "explanation": "A book is created by an author, similarly a building is designed by an architect."
    }
  ],
  "createdAt": ISODate("2024-01-10T00:00:00Z"),
  "updatedAt": ISODate("2024-01-10T00:00:00Z")
}
```

### 6. progresses
```javascript
{
  _id: ObjectId,
  student: ObjectId,     // reference to User
  topic: ObjectId,       // reference to Topic
  isCompleted: Boolean,
  quizAttempts: [
    {
      score: Number,
      totalQuestions: Number,
      attemptedAt: Date,
      answers: [Number]
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Sample Data:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439050"),
  "student": ObjectId("507f1f77bcf86cd799439011"),
  "topic": ObjectId("507f1f77bcf86cd799439015"),
  "isCompleted": true,
  "quizAttempts": [
    {
      "score": 3,
      "totalQuestions": 3,
      "attemptedAt": ISODate("2024-01-15T11:00:00Z"),
      "answers": [0, 1, 1]
    },
    {
      "score": 3,
      "totalQuestions": 3,
      "attemptedAt": ISODate("2024-01-15T12:00:00Z"),
      "answers": [0, 1, 1]
    }
  ],
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T12:00:00Z")
}
```

## Inserting Sample Data

### Using MongoDB Shell
```bash
mongosh

use exam-priority

# Insert exams
db.exams.insertMany([
  {
    "name": "RRB",
    "description": "Railway Recruitment Board",
    "subjects": []
  },
  {
    "name": "SSC",
    "description": "Staff Selection Commission",
    "subjects": []
  },
  {
    "name": "TNPSC",
    "description": "Tamil Nadu Public Service Commission",
    "subjects": []
  },
  {
    "name": "Banking",
    "description": "Banking Sector Exams",
    "subjects": []
  }
])

# Insert subjects
db.subjects.insertMany([
  {
    "name": "Reasoning",
    "exam": ObjectId("exam_id"),
    "topics": []
  },
  {
    "name": "Mathematics",
    "exam": ObjectId("exam_id"),
    "topics": []
  },
  {
    "name": "English",
    "exam": ObjectId("exam_id"),
    "topics": []
  }
])

# Insert topics
db.topics.insertMany([
  {
    "name": "Analogy",
    "subject": ObjectId("subject_id"),
    "priority": "High",
    "studyMaterial": "Analogy is a method of comparing two similar things...",
    "quizzes": []
  },
  {
    "name": "Classification",
    "subject": ObjectId("subject_id"),
    "priority": "Medium",
    "studyMaterial": "Classification involves grouping items based on common properties...",
    "quizzes": []
  }
])

# Insert quiz
db.quizzes.insertOne({
  "topic": ObjectId("topic_id"),
  "questions": [
    {
      "text": "Cat is to Kitten as Dog is to?",
      "options": ["Puppy", "Calf", "Foal", "Kid"],
      "correctAnswer": 0,
      "explanation": "A kitten is a young cat, similarly a puppy is a young dog."
    }
  ]
})
```

## Indexing

For better performance, create indexes:

```bash
mongosh exam-priority

# User indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

# Subject indexes
db.subjects.createIndex({ exam: 1 })

# Topic indexes
db.topics.createIndex({ subject: 1 })
db.topics.createIndex({ priority: 1 })

# Progress indexes
db.progresses.createIndex({ student: 1, topic: 1 }, { unique: true })
db.progresses.createIndex({ student: 1 })
```

## Querying Examples

```javascript
// Find all high priority topics
db.topics.find({ priority: "High" })

// Find student's progress
db.progresses.find({ student: ObjectId("student_id") })

// Find completed topics
db.progresses.find({ student: ObjectId("student_id"), isCompleted: true })

// Find all students
db.users.find({ role: "student" })

// Find blocked students
db.users.find({ role: "student", isBlocked: true })

// Get exam with all subjects
db.exams.findOne({ _id: ObjectId("exam_id") })
  .aggregate([
    {
      $lookup: {
        from: "subjects",
        localField: "subjects",
        foreignField: "_id",
        as: "subjectData"
      }
    }
  ])
```

## Backup & Restore

```bash
# Backup
mongodump --db exam-priority --out ./backup

# Restore
mongorestore --db exam-priority ./backup/exam-priority
```
