import api from './axios.config';
import type { LessonRequest, LessonResponse } from '../types/api.types';

export const lessonApi = {
  getAll: () => 
    api.get<LessonResponse[]>('/api/lessons'),
  
  getById: (id: number) => 
    api.get<LessonResponse>(`/api/lessons/${id}`),
  
  getByGrade: (gradeId: number) => 
    api.get<LessonResponse[]>(`/api/lessons/grade/${gradeId}`),
  
  create: (data: LessonRequest) => 
    api.post<LessonResponse>('/api/lessons', data),
  
  update: (id: number, data: Partial<LessonRequest>) => 
    api.put<LessonResponse>(`/api/lessons/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/lessons/${id}`),
};
