import api from './axios.config';
import type { SubjectRequest, SubjectResponse } from '../types/api.types';

export const subjectApi = {
  getAll: () => 
    api.get<SubjectResponse[]>('/api/subjects'),
  
  getById: (id: number) => 
    api.get<SubjectResponse>(`/api/subjects/${id}`),
  
  create: (data: SubjectRequest) => 
    api.post<SubjectResponse>('/api/subjects', data),
  
  update: (id: number, data: Partial<SubjectRequest>) => 
    api.put<SubjectResponse>(`/api/subjects/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/subjects/${id}`),
};
