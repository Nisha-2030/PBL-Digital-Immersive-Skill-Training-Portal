import apiClient from './api';

export const registerStudent = (data) => apiClient.post('/auth/student/register', data);
export const loginStudent = (data) => apiClient.post('/auth/student/login', data);
export const loginAdmin = (data) => apiClient.post('/auth/admin/login', data);
export const getProfile = () => apiClient.get('/auth/profile');
