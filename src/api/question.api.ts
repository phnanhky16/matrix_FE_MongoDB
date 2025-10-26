import api from './axios.config';
import type { QuestionRequest, QuestionResponse } from '../types/api.types';

export const questionApi = {
  getAll: () => 
    api.get<QuestionResponse[]>('/api/questions'),
  
  getById: (id: number) => 
    api.get<QuestionResponse>(`/api/questions/${id}`),
  
  getByLesson: (lessonId: number) => 
    api.get<QuestionResponse[]>(`/api/questions/lesson/${lessonId}`),
  
  getByLevel: (levelId: number) => 
    api.get<QuestionResponse[]>(`/api/questions/level/${levelId}`),
  
  getByType: (typeId: number) => 
    api.get<QuestionResponse[]>(`/api/questions/type/${typeId}`),
  
  search: (text: string) => 
    api.get<QuestionResponse[]>(`/api/questions/search?text=${encodeURIComponent(text)}`),
  
  create: (data: QuestionRequest) => 
    api.post<QuestionResponse>('/api/questions', data),
  
  update: (id: number, data: Partial<QuestionRequest>) => 
    api.put<QuestionResponse>(`/api/questions/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/questions/${id}`),
};
