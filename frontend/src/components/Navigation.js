import React from 'react';
import './Navigation.css';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">📚 Exam Priority Portal</a>
        </div>
        <div className="nav-menu">
          {user ? (
            <>
              <span className="user-info">{user.name} ({user.role})</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/student-login">Student Login</a>
              <a href="/admin-login">Admin Login</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
