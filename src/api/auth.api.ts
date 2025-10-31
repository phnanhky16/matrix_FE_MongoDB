import api from './axios.config';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest
} from '../types/auth.types';

export const authApi = {
  // Teacher login
  login: (data: LoginRequest) => 
    api.post<LoginResponse>('/api/auth/login', data),
  
  // Teacher registration (single endpoint)
  register: (data: RegisterRequest) => 
    api.post<LoginResponse>('/api/auth/register', data),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
