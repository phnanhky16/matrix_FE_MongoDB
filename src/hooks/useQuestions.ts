import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { questionApi } from '../api/question.api';
import type { QuestionRequest } from '../types/api.types';

export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: () => questionApi.getAll().then(res => res.data),
  });
};

export const useQuestion = (id: number) => {
  return useQuery({
    queryKey: ['questions', id],
    queryFn: () => questionApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useQuestionsByLesson = (lessonId: number) => {
  return useQuery({
    queryKey: ['questions', 'lesson', lessonId],
    queryFn: () => questionApi.getByLesson(lessonId).then(res => res.data),
    enabled: !!lessonId,
  });
};

export const useSearchQuestions = (searchText: string) => {
  return useQuery({
    queryKey: ['questions', 'search', searchText],
    queryFn: () => questionApi.search(searchText).then(res => res.data),
    enabled: searchText.length > 0,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: QuestionRequest) => questionApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('Question created successfully');
    },
    onError: () => {
      toast.error('Failed to create question');
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<QuestionRequest> }) => 
      questionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('Question updated successfully');
    },
    onError: () => {
      toast.error('Failed to update question');
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => questionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('Question deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete question');
    },
  });
};
