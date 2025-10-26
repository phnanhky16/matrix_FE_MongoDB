import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { questionTypeApi } from '../api/questionType.api';
import type { QuestionTypeRequest } from '../types/api.types';

export const useQuestionTypes = () => {
  return useQuery({
    queryKey: ['questionTypes'],
    queryFn: () => questionTypeApi.getAll().then((res) => res.data),
  });
};

export const useQuestionType = (id: number) => {
  return useQuery({
    queryKey: ['questionTypes', id],
    queryFn: () => questionTypeApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateQuestionType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: QuestionTypeRequest) => questionTypeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionTypes'] });
      toast.success('Question type created successfully');
    },
    onError: () => {
      toast.error('Failed to create question type');
    },
  });
};

export const useUpdateQuestionType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: QuestionTypeRequest }) =>
      questionTypeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionTypes'] });
      toast.success('Question type updated successfully');
    },
    onError: () => {
      toast.error('Failed to update question type');
    },
  });
};

export const useDeleteQuestionType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => questionTypeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionTypes'] });
      toast.success('Question type deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete question type');
    },
  });
};
