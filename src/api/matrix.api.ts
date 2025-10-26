import api from './axios.config';
import type { MatrixRequest, MatrixResponse, CreateMatrixWithQuestionsRequest, MatrixWithQuestionsResponse } from '../types/api.types';

export const matrixApi = {
  getAll: () => 
    api.get<MatrixResponse[]>('/api/matrices'),
  
  getById: (id: number) => 
    api.get<MatrixResponse>(`/api/matrices/${id}`),
  
  getByExam: (examId: number) => 
    api.get<MatrixResponse[]>(`/api/matrices/exam/${examId}`),
  
  search: (name: string) => 
    api.get<MatrixResponse[]>(`/api/matrices/search?name=${encodeURIComponent(name)}`),
  
  create: (data: MatrixRequest) => 
    api.post<MatrixResponse>('/api/matrices', data),

  createWithQuestions: (data: CreateMatrixWithQuestionsRequest) => 
    api.post<MatrixWithQuestionsResponse>('/api/matrices/create-with-questions', data),
  
  update: (id: number, data: Partial<MatrixRequest>) => 
    api.put<MatrixResponse>(`/api/matrices/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/matrices/${id}`),
};
