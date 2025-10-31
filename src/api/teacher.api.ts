import api from './axios.config';
import type { TeacherRequest, TeacherResponse } from '../types/api.types';

export const teacherApi = {
  getAll: () => 
    api.get<TeacherResponse[]>('/api/teachers'),
  
  getById: (id: string) => 
    api.get<TeacherResponse>(`/api/teachers/${id}`),
  
  search: (name: string) => 
    api.get<TeacherResponse[]>(`/api/teachers/search?name=${encodeURIComponent(name)}`),
  
  create: (data: TeacherRequest) => 
    api.post<TeacherResponse>('/api/teachers', data),
  
  update: (id: string, data: Partial<TeacherRequest>) => 
    api.put<TeacherResponse>(`/api/teachers/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/teachers/${id}`),
};
