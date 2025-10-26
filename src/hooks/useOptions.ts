import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { optionApi } from '../api/option.api';
import type { OptionRequest } from '../types/api.types';

export const useOptions = () => {
  return useQuery({
    queryKey: ['options'],
    queryFn: () => optionApi.getAll().then((res) => res.data),
  });
};

export const useOption = (id: number) => {
  return useQuery({
    queryKey: ['options', id],
    queryFn: () => optionApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useOptionsByQuestion = (questionId: number) => {
  return useQuery({
    queryKey: ['options', 'question', questionId],
    queryFn: () => optionApi.getByQuestion(questionId).then((res) => res.data),
    enabled: !!questionId,
  });
};

export const useCreateOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OptionRequest) => optionApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options'] });
      toast.success('Option created successfully');
    },
    onError: () => {
      toast.error('Failed to create option');
    },
  });
};

export const useUpdateOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: OptionRequest }) =>
      optionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options'] });
      toast.success('Option updated successfully');
    },
    onError: () => {
      toast.error('Failed to update option');
    },
  });
};

export const useDeleteOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => optionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options'] });
      toast.success('Option deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete option');
    },
  });
};
