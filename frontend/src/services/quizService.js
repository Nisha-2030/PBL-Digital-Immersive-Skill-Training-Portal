import apiClient from './api';

export const getQuizByTopic = (topicId) => apiClient.get(`/quiz/${topicId}`);
export const createQuiz = (data) => apiClient.post('/quiz', data);
export const updateQuiz = (id, data) => apiClient.put(`/quiz/${id}`, data);
export const deleteQuiz = (id) => apiClient.delete(`/quiz/${id}`);
export const submitQuiz = (quizId, answers) =>
  apiClient.post(`/quiz/${quizId}/submit`, { answers });
