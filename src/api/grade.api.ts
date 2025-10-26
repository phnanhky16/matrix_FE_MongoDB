import api from './axios.config';
import type { GradeRequest, GradeResponse } from '../types/api.types';

export const gradeApi = {
  getAll: () => 
    api.get<GradeResponse[]>('/api/grades'),
  
  getById: (id: number) => 
    api.get<GradeResponse>(`/api/grades/${id}`),
  
  getBySubject: (subjectId: number) => 
    api.get<GradeResponse[]>(`/api/grades/subject/${subjectId}`),
  
  create: (data: GradeRequest) => 
    api.post<GradeResponse>('/api/grades', data),
  
  update: (id: number, data: Partial<GradeRequest>) => 
    api.put<GradeResponse>(`/api/grades/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/grades/${id}`),
};
