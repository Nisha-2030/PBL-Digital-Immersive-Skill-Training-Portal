import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? ((completed / total) * 100).toFixed(2) : 0;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-text">
          Progress: {completed}/{total}
        </span>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
