import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/student-dashboard');
    }
    return null;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>📚 Exam-Priority Digital Immersive Skill Training Portal</h1>
        <p className="subtitle">
          Prepare for competitive exams with focused, high-priority topics
        </p>

        <div className="features">
          <div className="feature">
            <h3>🎯 Targeted Learning</h3>
            <p>Focus on High and Medium priority topics that matter most</p>
          </div>
          <div className="feature">
            <h3>📊 Track Progress</h3>
            <p>Monitor your learning journey with detailed progress tracking</p>
          </div>
          <div className="feature">
            <h3>❓ Quiz Practice</h3>
            <p>Test your knowledge with topic-wise quizzes and instant feedback</p>
          </div>
        </div>

        <div className="cta-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/student-login')}
          >
            Student Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/admin-login')}
          >
            Admin Login
          </button>
        </div>

        <div className="exams-info">
          <h3>Supported Exams:</h3>
          <ul>
            <li>RRB (Railway Recruitment Board)</li>
            <li>TNPSC (Tamil Nadu Public Service Commission)</li>
            <li>SSC (Staff Selection Commission)</li>
            <li>Banking Exams</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
