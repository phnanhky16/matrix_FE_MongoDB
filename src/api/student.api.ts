import api from './axios.config';
import type { StudentRequest, StudentResponse } from '../types/api.types';

export const studentApi = {
  getAll: () => 
    api.get<StudentResponse[]>('/api/students'),
  
  getById: (id: number) => 
    api.get<StudentResponse>(`/api/students/${id}`),
  
  getMe: () => 
    api.get<StudentResponse>('/api/students/me'),
  
  create: (data: StudentRequest) => 
    api.post<StudentResponse>('/api/students', data),
  
  update: (id: number, data: Partial<StudentRequest>) => 
    api.put<StudentResponse>(`/api/students/${id}`, data),
  
  updateMe: (data: Partial<StudentRequest>) => 
    api.put<StudentResponse>('/api/students/me', data),
  
  delete: (id: number) => 
    api.delete(`/api/students/${id}`),
};
