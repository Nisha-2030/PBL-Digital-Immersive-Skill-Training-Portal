import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ManageContent.css';
import Card from '../components/Card';
import {
  getTopicsBySubject,
  createTopic,
  updateTopic
} from '../services/examService';
import {
  createQuiz,
  deleteQuiz,
  getQuizByTopic
} from '../services/quizService';

const ManageContent = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('material');

  // Form states
  const [materialForm, setMaterialForm] = useState('');
  const [videoForm, setVideoForm] = useState({ title: '', url: '', duration: '' });
  const [quizForm, setQuizForm] = useState({ title: '', questions: '', answers: '' });
  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    loadContent();
  }, [topicId]);

  const loadContent = async () => {
    try {
      // In a real app, you'd fetch the topic by ID
      // For now, we'll initialize empty
      setMaterialForm('');
      setVideos([]);
      const quizzesRes = await getQuizByTopic(topicId);
      setQuizzes(quizzesRes.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading content:', error);
      setLoading(false);
    }
  };

  const handleSaveMaterial = async () => {
    try {
      // Update topic with material
      await updateTopic(topicId, { studyMaterial: materialForm });
      alert('Material saved successfully!');
    } catch (error) {
      alert('Error saving material: ' + error.message);
    }
  };

  const handleAddVideo = async () => {
    if (!videoForm.title || !videoForm.url) {
      alert('Please fill in title and URL');
      return;
    }
    try {
      setVideos([...videos, { ...videoForm, _id: Date.now() }]);
      setVideoForm({ title: '', url: '', duration: '' });
      alert('Video added!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteVideo = (videoId) => {
    setVideos(videos.filter(v => v._id !== videoId));
  };

  const handleAddQuiz = async () => {
    if (!quizForm.title || !quizForm.questions) {
      alert('Please fill in title and questions');
      return;
    }
    try {
      await createQuiz({ ...quizForm, topic: topicId });
      setQuizForm({ title: '', questions: '', answers: '' });
      loadContent();
      alert('Quiz created!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Delete this quiz?')) {
      try {
        await deleteQuiz(quizId);
        loadContent();
        alert('Quiz deleted!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  if (loading) {
    return <div className="manage-loading">Loading...</div>;
  }

  return (
    <div className="manage-content-container">
      <div className="manage-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back to Topics
        </button>
        <h1>✏️ Edit Topic Content</h1>
        <p>Add material, videos, and quizzes for this topic</p>
      </div>

      <div className="content-tabs">
        <button 
          className={`tab-btn ${activeTab === 'material' ? 'active' : ''}`}
          onClick={() => setActiveTab('material')}
        >
          📚 Material
        </button>
        <button 
          className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          🎥 Videos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          ❓ Quizzes
        </button>
      </div>

      <div className="manage-content">
        {activeTab === 'material' && (
          <div className="material-layout">
            <div className="material-section">
              <Card title="📚 Study Material & Notes">
                <div className="material-editor">
                  <textarea
                    placeholder="Enter study material, notes, formulas, concepts, etc."
                    value={materialForm}
                    onChange={(e) => setMaterialForm(e.target.value)}
                    rows="20"
                  ></textarea>
                </div>
                <button className="btn-primary btn-full" onClick={handleSaveMaterial}>
                  💾 Save Material
                </button>
              </Card>
            </div>

            {materialForm && (
              <div className="preview-section">
                <Card title="📖 Preview">
                  <div className="material-preview">
                    {materialForm}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="tab-content">
            <Card title="🎥 Add Video Lecture">
              <div className="form-group">
                <label>Video Title</label>
                <input
                  type="text"
                  placeholder="e.g., Algebra Basics - Part 1"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Video URL</label>
                <input
                  type="text"
                  placeholder="Paste YouTube or Google Drive link"
                  value={videoForm.url}
                  onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 15:30"
                  value={videoForm.duration}
                  onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                />
              </div>
              <button className="btn-primary btn-full" onClick={handleAddVideo}>
                ➕ Add Video
              </button>
            </Card>

            <Card title="🎥 Videos List">
              {videos.length > 0 ? (
                <div className="videos-list">
                  {videos.map((video) => (
                    <div key={video._id} className="video-item">
                      <div className="video-info">
                        <h4>{video.title}</h4>
                        <p>Duration: {video.duration}</p>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn-small btn-view">
                          Watch
                        </a>
                      </div>
                      <button 
                        className="btn-delete-small"
                        onClick={() => handleDeleteVideo(video._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-msg">No videos yet. Add one above!</p>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="tab-content">
            <Card title="❓ Create Quiz">
              <div className="form-group">
                <label>Quiz Title</label>
                <input
                  type="text"
                  placeholder="e.g., Algebra Quiz 1"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Questions (comma-separated)</label>
                <textarea
                  placeholder="Q1? , Q2? , Q3?"
                  value={quizForm.questions}
                  onChange={(e) => setQuizForm({ ...quizForm, questions: e.target.value })}
                  rows="4"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Answers (in same order, comma-separated)</label>
                <textarea
                  placeholder="A1 , A2 , A3"
                  value={quizForm.answers}
                  onChange={(e) => setQuizForm({ ...quizForm, answers: e.target.value })}
                  rows="4"
                ></textarea>
              </div>
              <button className="btn-primary btn-full" onClick={handleAddQuiz}>
                ➕ Create Quiz
              </button>
            </Card>

            <Card title="❓ Quizzes List">
              {quizzes.length > 0 ? (
                <div className="quizzes-list">
                  {quizzes.map((quiz) => (
                    <div key={quiz._id} className="quiz-item">
                      <div className="quiz-info">
                        <h4>{quiz.title}</h4>
                        <p>{quiz.questions?.length || 0} questions</p>
                      </div>
                      <button 
                        className="btn-delete-small"
                        onClick={() => handleDeleteQuiz(quiz._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-msg">No quizzes yet. Create one above!</p>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContent;
