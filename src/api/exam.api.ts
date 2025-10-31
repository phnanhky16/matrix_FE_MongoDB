import api from './axios.config';
import type { ExamRequest, ExamResponse } from '../types/api.types';

export const examApi = {
  getAll: () => 
    api.get<ExamResponse[]>('/api/exams'),
  
  getById: (id: string) => 
    api.get<ExamResponse>(`/api/exams/${id}`),
  
  search: (name: string) => 
    api.get<ExamResponse[]>(`/api/exams/search?name=${encodeURIComponent(name)}`),
  
  create: (data: ExamRequest) => 
    api.post<ExamResponse>('/api/exams', data),
  
  update: (id: string, data: Partial<ExamRequest>) => 
    api.put<ExamResponse>(`/api/exams/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/exams/${id}`),
};
