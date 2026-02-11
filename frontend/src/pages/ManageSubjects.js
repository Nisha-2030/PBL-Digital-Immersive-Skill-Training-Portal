import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ManageSubjects.css';
import Card from '../components/Card';
import {
  getSubjectsByExam,
  createSubject,
  deleteSubject,
  getTopicsBySubject
} from '../services/examService';

const ManageSubjects = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [subjectForm, setSubjectForm] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [examName, setExamName] = useState('');

  useEffect(() => {
    loadSubjects();
  }, [examId]);

  const loadSubjects = async () => {
    try {
      const response = await getSubjectsByExam(examId);
      setSubjects(response.data);
      if (response.data.length > 0) {
        setExamName(response.data[0].exam?.name || 'Exam');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading subjects:', error);
      setLoading(false);
    }
  };

  const handleAddSubject = async () => {
    if (!subjectForm.name.trim()) {
      alert('Please enter subject name');
      return;
    }
    try {
      await createSubject({ name: subjectForm.name, exam: examId });
      setSubjectForm({ name: '' });
      loadSubjects();
      alert('Subject created successfully!');
    } catch (error) {
      alert('Error creating subject: ' + error.message);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm('Delete this subject?')) {
      try {
        await deleteSubject(subjectId);
        loadSubjects();
        alert('Subject deleted!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleManageTopic = (subjectId) => {
    navigate(`/manage-topics/${subjectId}`);
  };

  if (loading) {
    return <div className="manage-loading">Loading...</div>;
  }

  return (
    <div className="manage-subjects-container">
      <div className="manage-header">
        <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>📚 Manage Subjects - {examName}</h1>
        <p>Create and manage subjects for this exam</p>
      </div>

      <div className="manage-content">
        <div className="create-section">
          <Card title="➕ Create New Subject">
            <div className="form-group">
              <input
                type="text"
                placeholder="Subject Name (e.g., Maths, English, Reasoning)"
                value={subjectForm.name}
                onChange={(e) => setSubjectForm({ name: e.target.value })}
              />
            </div>
            <button className="btn-primary btn-full" onClick={handleAddSubject}>
              Create Subject
            </button>
          </Card>
        </div>

        <div className="list-section">
          <h2>📖 All Subjects</h2>
          {subjects.length > 0 ? (
            <div className="subjects-grid">
              {subjects.map((subject) => (
                <div key={subject._id} className="subject-card">
                  <div className="subject-header">
                    <h3>{subject.name}</h3>
                    <span className="topic-count">{subject.topics?.length || 0} Topics</span>
                  </div>
                  <div className="subject-actions">
                    <button 
                      className="btn-manage"
                      onClick={() => handleManageTopic(subject._id)}
                    >
                      📌 Manage Topics
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteSubject(subject._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No subjects yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSubjects;
