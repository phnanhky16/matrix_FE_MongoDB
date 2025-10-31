import api from './axios.config';
import type { MatrixRequest, MatrixResponse, CreateMatrixWithQuestionsRequest, MatrixWithQuestionsResponse } from '../types/api.types';

export const matrixApi = {
  getAll: () => 
    api.get<MatrixResponse[]>('/api/matrices'),
  
  getById: (id: string) => 
    api.get<MatrixResponse>(`/api/matrices/${id}`),
  
  getByExam: (examId: string) => 
    api.get<MatrixResponse[]>(`/api/matrices/exam/${examId}`),
  
  search: (name: string) => 
    api.get<MatrixResponse[]>(`/api/matrices/search?name=${encodeURIComponent(name)}`),
  
  create: (data: MatrixRequest) => 
    api.post<MatrixResponse>('/api/matrices', data),

  createWithQuestions: (data: CreateMatrixWithQuestionsRequest) => 
    api.post<MatrixWithQuestionsResponse>('/api/matrices/with-questions', data),
  
  update: (id: string, data: Partial<MatrixRequest>) => 
    api.put<MatrixResponse>(`/api/matrices/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/matrices/${id}`),
};
