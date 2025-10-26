import api from './axios.config';
import type { ExamRequest, ExamResponse } from '../types/api.types';
import type { ExamStatus } from '../types/common.types';

export const examApi = {
  getAll: () => 
    api.get<ExamResponse[]>('/api/exams'),
  
  getById: (id: number) => 
    api.get<ExamResponse>(`/api/exams/${id}`),
  
  getByStatus: (status: ExamStatus) => 
    api.get<ExamResponse[]>(`/api/exams/status/${status}`),
  
  create: (data: ExamRequest) => 
    api.post<ExamResponse>('/api/exams', data),
  
  update: (id: number, data: Partial<ExamRequest>) => 
    api.put<ExamResponse>(`/api/exams/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/exams/${id}`),
};
