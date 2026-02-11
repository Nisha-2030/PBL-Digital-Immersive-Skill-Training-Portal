# Frontend Setup Guide

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm start
```

Application will open at: `http://localhost:3000`

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── Navigation.js
│   ├── Card.js
│   ├── ProgressBar.js
│   └── QuizComponent.js
├── pages/           # Full page components
│   ├── Home.js
│   ├── StudentLogin.js
│   ├── StudentRegister.js
│   ├── AdminLogin.js
│   ├── StudentDashboard.js
│   └── AdminDashboard.js
├── services/        # API communication
│   ├── api.js
│   ├── authService.js
│   ├── examService.js
│   ├── quizService.js
│   └── progressService.js
├── context/         # React Context
│   └── AuthContext.js
├── App.js           # Main app component with routing
└── index.js         # Entry point
```

## Running the Application

### Start Frontend
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Features Overview

### 🏠 Home Page
- Landing page with information
- Access to student/admin login
- Quick links to key exam boards

### 🔐 Authentication
- **Student Registration**: Create new account
- **Student Login**: Sign in with email/password
- **Admin Login**: Secure admin access
- **JWT Protection**: Tokens stored in localStorage
- **Auto-logout**: Redirects on token expiration

### 👨‍🎓 Student Dashboard
- Select target exam
- View subjects for chosen exam
- Browse topics (High & Medium priority only)
- Read concise study material
- Attempt topic-wise quizzes
- View instant results with explanations
- Track progress visually
- Mark topics as completed

### 👨‍💼 Admin Dashboard
- **Manage Exams**: CRUD operations
- **Manage Subjects**: Add/edit/delete per exam
- **Manage Topics**: Set priority levels
- **Manage Quizzes**: Create questions with options
- **Student Management**: View, block, unblock, delete students
- **Dashboard Stats**: Overview of system

## Component Guide

### Navigation
- Displays app title and navigation links
- Shows current user and role
- Logout button

### Card Component
- Reusable container for content
- Clean, modern styling
- Consistent spacing and shadows

### ProgressBar Component
- Visual progress indicator
- Shows completed vs total topics
- Percentage calculation

### QuizComponent
- Question display with options
- Answer validation
- Detailed results with explanations
- Score calculation

## Services

### API Service (api.js)
- Axios instance with base URL
- Automatic JWT token injection
- CORS-enabled

### Auth Service (authService.js)
- Student registration
- Student login
- Admin login
- Profile retrieval

### Exam Service (examService.js)
- Exam list/details
- Subject management
- Topic filtering (High/Medium priority)

### Quiz Service (quizService.js)
- Get quiz by topic
- Submit quiz answers
- Quiz CRUD operations

### Progress Service (progressService.js)
- Get student progress
- Mark topic complete
- Record quiz attempts
- Student management (admin)

## Page Workflows

### Student Workflow
1. Register/Login
2. Select target exam
3. Choose subject
4. View topics (auto-filtered to High/Medium only)
5. Read study material
6. Take quiz
7. View results and explanations
8. Track progress

### Admin Workflow
1. Login with admin credentials
2. Create/manage exams
3. Create/manage subjects
4. Create/manage topics with priority
5. Create quizzes with questions
6. View and manage students
7. Block/unblock or delete students

## Styling

- **CSS Framework**: Custom CSS with modern design
- **Colors**: 
  - Primary: #3498db (Blue)
  - Success: #27ae60 (Green)
  - Danger: #e74c3c (Red)
  - Dark: #2c3e50 (Dark Gray)
- **Responsive**: Mobile-friendly design
- **Fonts**: System fonts + Segoe UI

## Error Handling

- API errors displayed to user
- Authentication errors redirect to login
- Failed operations show alert messages
- Network errors handled gracefully

## Local Storage

- **token**: JWT authentication token
- **user**: User object with role and details

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Set environment variables

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| REACT_APP_API_URL | http://localhost:5000/api | Backend API URL |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Components are optimized with React best practices
- Images lazy-loaded when available
- Minimal re-renders using proper state management
- API calls optimized to reduce requests

## Common Issues

### Backend Connection Error
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Verify CORS is enabled in backend

### Login Not Working
- Clear localStorage and refresh browser
- Verify user exists in database
- Check password is correct
- Look for error message in console

### Progress Not Updating
- Verify student is logged in
- Check network tab for API errors
- Ensure topic exists in subject
- Validate quiz submission response

## Development Services

### Running with Backend
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Set up environment variables
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Create admin account
6. ✅ Add sample exams/topics
7. ✅ Register student account
8. ✅ Start learning!
