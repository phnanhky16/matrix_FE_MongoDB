import api from './axios.config';
import type { SubjectRequest, SubjectResponse } from '../types/api.types';

export const subjectApi = {
  getAll: () => 
    api.get<SubjectResponse[]>('/api/subjects'),
  
  getById: (id: string) => 
    api.get<SubjectResponse>(`/api/subjects/${id}`),
  
  search: (name: string) => 
    api.get<SubjectResponse[]>(`/api/subjects/search?name=${encodeURIComponent(name)}`),
  
  create: (data: SubjectRequest) => 
    api.post<SubjectResponse>('/api/subjects', data),
  
  update: (id: string, data: Partial<SubjectRequest>) => 
    api.put<SubjectResponse>(`/api/subjects/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/subjects/${id}`),
};
