import api from './axios.config';
import type { QuestionRequest, QuestionResponse } from '../types/api.types';

export const questionApi = {
  getAll: () => 
    api.get<QuestionResponse[]>('/api/questions'),
  
  getById: (id: string) => 
    api.get<QuestionResponse>(`/api/questions/${id}`),
  
  getByLesson: (lessonId: string) => 
    api.get<QuestionResponse[]>(`/api/questions/lesson/${lessonId}`),
  
  getByLevel: (levelId: string) => 
    api.get<QuestionResponse[]>(`/api/questions/level/${levelId}`),
  
  search: (text: string) => 
    api.get<QuestionResponse[]>(`/api/questions/search?text=${encodeURIComponent(text)}`),
  
  create: (data: QuestionRequest) => 
    api.post<QuestionResponse>('/api/questions', data),
  
  update: (id: string, data: Partial<QuestionRequest>) => 
    api.put<QuestionResponse>(`/api/questions/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/questions/${id}`),
};
