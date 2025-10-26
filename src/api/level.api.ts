import api from './axios.config';
import type { LevelRequest, LevelResponse } from '../types/api.types';

export const levelApi = {
  getAll: () => 
    api.get<LevelResponse[]>('/api/levels'),
  
  getById: (id: number) => 
    api.get<LevelResponse>(`/api/levels/${id}`),
  
  create: (data: LevelRequest) => 
    api.post<LevelResponse>('/api/levels', data),
  
  update: (id: number, data: Partial<LevelRequest>) => 
    api.put<LevelResponse>(`/api/levels/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/levels/${id}`),
};
