import api from './axios.config';
import type { OptionRequest, OptionResponse } from '../types/api.types';

export const optionApi = {
  getAll: () => 
    api.get<OptionResponse[]>('/api/options'),
  
  getById: (id: string) => 
    api.get<OptionResponse>(`/api/options/${id}`),
  
  getByQuestion: (questionId: string) => 
    api.get<OptionResponse[]>(`/api/options/question/${questionId}`),
  
  create: (data: OptionRequest) => 
    api.post<OptionResponse>('/api/options', data),
  
  update: (id: string, data: Partial<OptionRequest>) => 
    api.put<OptionResponse>(`/api/options/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/options/${id}`),
};
