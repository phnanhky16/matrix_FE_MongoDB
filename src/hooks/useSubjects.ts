import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { subjectApi } from '../api/subject.api';
import type { SubjectRequest } from '../types/api.types';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectApi.getAll().then(res => res.data),
  });
};

export const useSubject = (id: number) => {
  return useQuery({
    queryKey: ['subjects', id],
    queryFn: () => subjectApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SubjectRequest) => subjectApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Subject created successfully');
    },
    onError: () => {
      toast.error('Failed to create subject');
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SubjectRequest> }) => 
      subjectApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Subject updated successfully');
    },
    onError: () => {
      toast.error('Failed to update subject');
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => subjectApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Subject deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete subject');
    },
  });
};
