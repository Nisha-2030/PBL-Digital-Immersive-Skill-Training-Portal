import React, { useState } from 'react';
import './QuizComponent.css';
import { submitQuiz } from '../services/quizService';

const QuizComponent = ({ quiz, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitQuiz(quiz._id, Object.values(answers));
      setResult(response.data);
      setSubmitted(true);
      if (onSubmit) {
        onSubmit(response.data);
      }
    } catch (error) {
      alert('Error submitting quiz: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted && result) {
    return (
      <div className="quiz-result">
        <h2>Quiz Results</h2>
        <div className="result-summary">
          <p>
            <strong>Score: {result.score}/{result.totalQuestions}</strong>
          </p>
          <p>
            <strong>Percentage: {result.percentage}%</strong>
          </p>
        </div>

        <div className="result-details">
          {result.results.map((res, index) => (
            <div key={index} className={`result-item ${res.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-question">{index + 1}. {res.questionText}</div>
              <div className="result-answer">
                <p>
                  Your Answer: <strong>{res.userAnswer}</strong>
                </p>
                {!res.isCorrect && (
                  <p>
                    Correct Answer: <strong>{res.correctAnswer}</strong>
                  </p>
                )}
              </div>
              <div className="result-explanation">
                <strong>Explanation:</strong> {res.explanation}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => window.location.reload()} className="btn-primary">
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Topic Quiz</h2>
      {quiz.questions && quiz.questions.length > 0 ? (
        <>
          <div className="questions">
            {quiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="question">
                <h4>
                  Q{qIndex + 1}: {question.text}
                </h4>
                <div className="options">
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} className="option">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        onChange={() => handleAnswerChange(qIndex, oIndex)}
                        checked={answers[qIndex] === oIndex}
                        disabled={submitted}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!submitted && (
            <button
              onClick={handleSubmit}
              className="btn-primary"
              disabled={
                loading || Object.keys(answers).length < quiz.questions.length
              }
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
};

export default QuizComponent;
