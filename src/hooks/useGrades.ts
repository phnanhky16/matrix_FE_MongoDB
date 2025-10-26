import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { gradeApi } from '../api/grade.api';
import type { GradeRequest } from '../types/api.types';

export const useGrades = () => {
  return useQuery({
    queryKey: ['grades'],
    queryFn: () => gradeApi.getAll().then((res) => res.data),
  });
};

export const useGrade = (id: number) => {
  return useQuery({
    queryKey: ['grades', id],
    queryFn: () => gradeApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useGradesBySubject = (subjectId: number) => {
  return useQuery({
    queryKey: ['grades', 'subject', subjectId],
    queryFn: () => gradeApi.getBySubject(subjectId).then((res) => res.data),
    enabled: !!subjectId,
  });
};

export const useCreateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GradeRequest) => gradeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
      toast.success('Grade created successfully');
    },
    onError: () => {
      toast.error('Failed to create grade');
    },
  });
};

export const useUpdateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GradeRequest }) =>
      gradeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
      toast.success('Grade updated successfully');
    },
    onError: () => {
      toast.error('Failed to update grade');
    },
  });
};

export const useDeleteGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => gradeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
      toast.success('Grade deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete grade');
    },
  });
};
