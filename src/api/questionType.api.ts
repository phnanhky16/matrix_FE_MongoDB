import api from './axios.config';
import type { QuestionTypeRequest, QuestionTypeResponse } from '../types/api.types';

export const questionTypeApi = {
  getAll: () => 
    api.get<QuestionTypeResponse[]>('/api/question-types'),
  
  getById: (id: number) => 
    api.get<QuestionTypeResponse>(`/api/question-types/${id}`),
  
  create: (data: QuestionTypeRequest) => 
    api.post<QuestionTypeResponse>('/api/question-types', data),
  
  update: (id: number, data: Partial<QuestionTypeRequest>) => 
    api.put<QuestionTypeResponse>(`/api/question-types/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/question-types/${id}`),
};
