import api from './axios.config';
import type { TeacherRequest, TeacherResponse } from '../types/api.types';

export const teacherApi = {
  getAll: () => 
    api.get<TeacherResponse[]>('/api/teachers'),
  
  getById: (id: number) => 
    api.get<TeacherResponse>(`/api/teachers/${id}`),
  
  getMe: () => 
    api.get<TeacherResponse>('/api/teachers/me'),
  
  create: (data: TeacherRequest) => 
    api.post<TeacherResponse>('/api/teachers', data),
  
  update: (id: number, data: Partial<TeacherRequest>) => 
    api.put<TeacherResponse>(`/api/teachers/${id}`, data),
  
  updateMe: (data: Partial<TeacherRequest>) => 
    api.put<TeacherResponse>('/api/teachers/me', data),
  
  delete: (id: number) => 
    api.delete(`/api/teachers/${id}`),
};
