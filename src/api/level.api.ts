import api from './axios.config';
import type { LevelRequest, LevelResponse } from '../types/api.types';

export const levelApi = {
  getAll: () => 
    api.get<LevelResponse[]>('/api/levels'),
  
  getById: (id: string) => 
    api.get<LevelResponse>(`/api/levels/${id}`),
  
  create: (data: LevelRequest) => 
    api.post<LevelResponse>('/api/levels', data),
  
  update: (id: string, data: Partial<LevelRequest>) => 
    api.put<LevelResponse>(`/api/levels/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/levels/${id}`),
};
