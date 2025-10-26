import api from './axios.config';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterStudentRequest,
  RegisterTeacherRequest
} from '../types/auth.types';

export const authApi = {
  login: (data: LoginRequest) => 
    api.post<LoginResponse>('/api/auth/login', data),
  
  registerStudent: (data: RegisterStudentRequest) => 
    api.post('/api/auth/register/student', data),
  
  registerTeacher: (data: RegisterTeacherRequest) => 
    api.post('/api/auth/register/teacher', data),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
