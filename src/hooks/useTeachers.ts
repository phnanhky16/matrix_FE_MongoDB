import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { teacherApi } from '../api/teacher.api';
import type { TeacherRequest } from '../types/api.types';

export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: () => teacherApi.getAll().then(res => res.data),
  });
};

export const useTeacher = (id: number) => {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: () => teacherApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TeacherRequest) => teacherApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher created successfully');
    },
    onError: () => {
      toast.error('Failed to create teacher');
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TeacherRequest> }) => 
      teacherApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher updated successfully');
    },
    onError: () => {
      toast.error('Failed to update teacher');
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => teacherApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Teacher deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete teacher');
    },
  });
};
