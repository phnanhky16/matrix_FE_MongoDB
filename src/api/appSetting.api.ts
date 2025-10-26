import api from './axios.config';
import type { AppSettingRequest, AppSettingResponse } from '../types/api.types';

export const appSettingApi = {
  getAll: () => 
    api.get<AppSettingResponse[]>('/api/app-settings'),
  
  getById: (id: number) => 
    api.get<AppSettingResponse>(`/api/app-settings/${id}`),
  
  create: (data: AppSettingRequest) => 
    api.post<AppSettingResponse>('/api/app-settings', data),
  
  update: (id: number, data: Partial<AppSettingRequest>) => 
    api.put<AppSettingResponse>(`/api/app-settings/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/app-settings/${id}`),
};
