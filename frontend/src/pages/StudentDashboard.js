import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import QuizComponent from '../components/QuizComponent';
import { getAllExams, getExamById, getHighMediumTopics } from '../services/examService';
import { getStudentProgress, updateTargetExam, recordQuizAttempt, markTopicComplete } from '../services/progressService';
import { getQuizByTopic } from '../services/quizService';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const examsResponse = await getAllExams();
      setExams(examsResponse.data);
      
      const progressResponse = await getStudentProgress();
      setProgress(progressResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleSelectExam = async (examId) => {
    try {
      setSelectedExam(examId);
      const exam = await getExamById(examId);
      setSubjects(exam.data.subjects || []);
      setSelectedSubject(null);
      setTopics([]);
      
      await updateTargetExam(examId);
    } catch (error) {
      console.error('Error selecting exam:', error);
    }
  };

  const handleSelectSubject = async (subjectId) => {
    try {
      setSelectedSubject(subjectId);
      const topicsResponse = await getHighMediumTopics(subjectId);
      setTopics(topicsResponse.data || []);
      setSelectedTopic(null);
    } catch (error) {
      console.error('Error loading topics:', error);
    }
  };

  const handleSelectTopic = async (topicId) => {
    try {
      setSelectedTopic(topicId);
      const quizResponse = await getQuizByTopic(topicId);
      setQuiz(quizResponse.data);
      setShowQuiz(false);
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
  };

  const handleMarkComplete = async (topicId) => {
    try {
      await markTopicComplete(topicId);
      const progressResponse = await getStudentProgress();
      setProgress(progressResponse.data);
      alert('Topic marked as completed!');
    } catch (error) {
      console.error('Error marking topic:', error);
    }
  };

  const handleQuizSubmit = async (result) => {
    try {
      await recordQuizAttempt(selectedTopic, {
        score: result.score,
        totalQuestions: result.totalQuestions,
        answers: [],
      });
      const progressResponse = await getStudentProgress();
      setProgress(progressResponse.data);
    } catch (error) {
      console.error('Error recording quiz attempt:', error);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📚 Student Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
      </div>

      {progress && (
        <Card title="📈 Your Progress">
          <ProgressBar
            completed={progress.completedTopics}
            total={progress.totalTopics}
          />
          <p>
            Completed Topics: <strong>{progress.completedTopics}</strong> / {progress.totalTopics}
          </p>
        </Card>
      )}

      <div className="dashboard-grid">
        <div className="sidebar">
          <Card title="📋 Select Exam">
            <div className="exam-list">
              {exams.map((exam) => (
                <button
                  key={exam._id}
                  className={`list-btn ${selectedExam === exam._id ? 'active' : ''}`}
                  onClick={() => handleSelectExam(exam._id)}
                >
                  {exam.name}
                </button>
              ))}
            </div>
          </Card>

          {selectedExam && subjects.length > 0 && (
            <Card title="📖 Subjects">
              <div className="subject-list">
                {subjects.map((subject) => (
                  <button
                    key={subject._id}
                    className={`list-btn ${selectedSubject === subject._id ? 'active' : ''}`}
                    onClick={() => handleSelectSubject(subject._id)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="main-content">
          {selectedSubject && topics.length > 0 && (
            <Card title="📌 Topics (High & Medium Priority)">
              <div className="topic-list">
                {topics.map((topic) => (
                  <div key={topic._id} className="topic-item">
                    <div className="topic-header">
                      <h4>{topic.name}</h4>
                      <span className={`priority-badge ${topic.priority.toLowerCase()}`}>
                        {topic.priority}
                      </span>
                    </div>
                    <div className="topic-buttons">
                      <button
                        className="btn-small btn-view"
                        onClick={() => handleSelectTopic(topic._id)}
                      >
                        View Material
                      </button>
                      <button
                        className="btn-small btn-complete"
                        onClick={() => handleMarkComplete(topic._id)}
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {selectedTopic && quiz && !showQuiz && (
            <>
              <Card title="📚 Study Material">
                <div className="material-container">
                  <h4>Study Notes & Concepts:</h4>
                  <div className="material-content">
                    {quiz.topic?.studyMaterial || 'No material added yet.'}
                  </div>
                </div>
              </Card>

              {quiz.topic?.videos && quiz.topic.videos.length > 0 && (
                <Card title="🎥 Video Lectures">
                  <div className="video-list">
                    {quiz.topic.videos.map((video, idx) => (
                      <div key={idx} className="video-item">
                        <h4>{video.title}</h4>
                        <p>Duration: {video.duration}</p>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn-small btn-view">
                          Watch Video
                        </a>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <Card title="❓ Take Quiz">
                <p>Review the material and videos above, then test your knowledge!</p>
                <button
                  className="btn-primary-full"
                  onClick={() => setShowQuiz(true)}
                >
                  Start Quiz
                </button>
              </Card>
            </>
          )}

          {showQuiz && quiz && (
            <QuizComponent quiz={quiz} onSubmit={handleQuizSubmit} />
          )}

          {!selectedTopic && (
            <Card title="💡 Getting Started">
              <p>Select a topic from the list to view study material and take quizzes.</p>
              <p>Topics shown are <strong>High</strong> and <strong>Medium</strong> priority only - focus on these first!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
