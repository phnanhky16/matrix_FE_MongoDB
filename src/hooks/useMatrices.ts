import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { matrixApi } from '../api/matrix.api';
import type { MatrixRequest, CreateMatrixWithQuestionsRequest } from '../types/api.types';

export const useMatrices = () => {
  return useQuery({
    queryKey: ['matrices'],
    queryFn: () => matrixApi.getAll().then(res => res.data),
  });
};

export const useMatrix = (id: number) => {
  return useQuery({
    queryKey: ['matrices', id],
    queryFn: () => matrixApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useMatricesByExam = (examId: number) => {
  return useQuery({
    queryKey: ['matrices', 'exam', examId],
    queryFn: () => matrixApi.getByExam(examId).then(res => res.data),
    enabled: !!examId,
  });
};

export const useCreateMatrix = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: MatrixRequest) => matrixApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matrices'] });
      toast.success('Matrix created successfully');
    },
    onError: () => {
      toast.error('Failed to create matrix');
    },
  });
};

export const useCreateMatrixWithQuestions = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateMatrixWithQuestionsRequest) => matrixApi.createWithQuestions(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['matrices'] });
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      const data = response.data;
      toast.success(
        `✅ Success! Created "${data.matrixName}" with ${data.totalQuestions} questions. ` +
        `Exam "${data.examName}" has been created with ${data.totalMarks} total marks.`
      );
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Failed to create matrix with questions';
      if (error.response?.status === 403) {
        toast.error('Access denied. Please ensure you have TEACHER role permissions.');
      } else if (error.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
      } else {
        toast.error(message);
      }
      console.error('Matrix creation error:', error);
    },
  });
};

export const useUpdateMatrix = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MatrixRequest> }) => 
      matrixApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matrices'] });
      toast.success('Matrix updated successfully');
    },
    onError: () => {
      toast.error('Failed to update matrix');
    },
  });
};

export const useDeleteMatrix = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => matrixApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matrices'] });
      toast.success('Matrix deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete matrix');
    },
  });
};
