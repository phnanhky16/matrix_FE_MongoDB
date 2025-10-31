import api from './axios.config';
import type { LessonRequest, LessonResponse } from '../types/api.types';

export const lessonApi = {
  getAll: () => 
    api.get<LessonResponse[]>('/api/lessons'),
  
  getById: (id: string) => 
    api.get<LessonResponse>(`/api/lessons/${id}`),
  
  getByGrade: (gradeId: string) => 
    api.get<LessonResponse[]>(`/api/lessons/grade/${gradeId}`),
  
  search: (title: string) => 
    api.get<LessonResponse[]>(`/api/lessons/search?title=${encodeURIComponent(title)}`),
  
  create: (data: LessonRequest) => 
    api.post<LessonResponse>('/api/lessons', data),
  
  update: (id: string, data: Partial<LessonRequest>) => 
    api.put<LessonResponse>(`/api/lessons/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/lessons/${id}`),
};
