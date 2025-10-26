import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { levelApi } from '../api/level.api';
import type { LevelRequest } from '../types/api.types';

export const useLevels = () => {
  return useQuery({
    queryKey: ['levels'],
    queryFn: () => levelApi.getAll().then((res) => res.data),
  });
};

export const useLevel = (id: number) => {
  return useQuery({
    queryKey: ['levels', id],
    queryFn: () => levelApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LevelRequest) => levelApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levels'] });
      toast.success('Level created successfully');
    },
    onError: () => {
      toast.error('Failed to create level');
    },
  });
};

export const useUpdateLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LevelRequest }) =>
      levelApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levels'] });
      toast.success('Level updated successfully');
    },
    onError: () => {
      toast.error('Failed to update level');
    },
  });
};

export const useDeleteLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => levelApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levels'] });
      toast.success('Level deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete level');
    },
  });
};
