import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { examApi } from '../api/exam.api';
import type { ExamRequest } from '../types/api.types';
import type { ExamStatus } from '../types/common.types';

export const useExams = () => {
  return useQuery({
    queryKey: ['exams'],
    queryFn: () => examApi.getAll().then(res => res.data),
  });
};

export const useExam = (id: number) => {
  return useQuery({
    queryKey: ['exams', id],
    queryFn: () => examApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useExamsByStatus = (status: ExamStatus) => {
  return useQuery({
    queryKey: ['exams', 'status', status],
    queryFn: () => examApi.getByStatus(status).then(res => res.data),
    enabled: !!status,
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ExamRequest) => examApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      toast.success('Exam created successfully');
    },
    onError: () => {
      toast.error('Failed to create exam');
    },
  });
};

export const useUpdateExam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ExamRequest> }) => 
      examApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      toast.success('Exam updated successfully');
    },
    onError: () => {
      toast.error('Failed to update exam');
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => examApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      toast.success('Exam deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete exam');
    },
  });
};
