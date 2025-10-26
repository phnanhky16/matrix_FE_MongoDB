import api from './axios.config';
import type { OptionRequest, OptionResponse } from '../types/api.types';

export const optionApi = {
  getAll: () => 
    api.get<OptionResponse[]>('/api/options'),
  
  getById: (id: number) => 
    api.get<OptionResponse>(`/api/options/${id}`),
  
  getByQuestion: (questionId: number) => 
    api.get<OptionResponse[]>(`/api/options/question/${questionId}`),
  
  create: (data: OptionRequest) => 
    api.post<OptionResponse>('/api/options', data),
  
  update: (id: number, data: Partial<OptionRequest>) => 
    api.put<OptionResponse>(`/api/options/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/options/${id}`),
};
