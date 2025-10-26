import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { studentApi } from '../api/student.api';
import type { StudentRequest } from '../types/api.types';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => studentApi.getAll().then(res => res.data),
  });
};

export const useStudent = (id: number) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => studentApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: StudentRequest) => studentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student created successfully');
    },
    onError: () => {
      toast.error('Failed to create student');
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentRequest> }) => 
      studentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student updated successfully');
    },
    onError: () => {
      toast.error('Failed to update student');
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => studentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete student');
    },
  });
};
