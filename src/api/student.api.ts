import api from './axios.config';
import type { StudentRequest, StudentResponse } from '../types/api.types';

export const studentApi = {
  getAll: () => 
    api.get<StudentResponse[]>('/api/students'),
  
  getById: (id: string) => 
    api.get<StudentResponse>(`/api/students/${id}`),
  
  search: (name: string) => 
    api.get<StudentResponse[]>(`/api/students/search?name=${encodeURIComponent(name)}`),
  
  create: (data: StudentRequest) => 
    api.post<StudentResponse>('/api/students', data),
  
  update: (id: string, data: Partial<StudentRequest>) => 
    api.put<StudentResponse>(`/api/students/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/students/${id}`),
};
