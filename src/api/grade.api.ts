import api from './axios.config';
import type { GradeRequest, GradeResponse } from '../types/api.types';

export const gradeApi = {
  getAll: () => 
    api.get<GradeResponse[]>('/api/grades'),
  
  getById: (id: string) => 
    api.get<GradeResponse>(`/api/grades/${id}`),
  
  getBySubject: (subjectId: string) => 
    api.get<GradeResponse[]>(`/api/grades/subject/${subjectId}`),
  
  create: (data: GradeRequest) => 
    api.post<GradeResponse>('/api/grades', data),
  
  update: (id: string, data: Partial<GradeRequest>) => 
    api.put<GradeResponse>(`/api/grades/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/grades/${id}`),
};
