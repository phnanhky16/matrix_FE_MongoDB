import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { appSettingApi } from '../api/appSetting.api';
import type { AppSettingRequest } from '../types/api.types';

export const useAppSettings = () => {
  return useQuery({
    queryKey: ['appSettings'],
    queryFn: () => appSettingApi.getAll().then((res) => res.data),
  });
};

export const useAppSetting = (id: number) => {
  return useQuery({
    queryKey: ['appSettings', id],
    queryFn: () => appSettingApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateAppSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppSettingRequest) => appSettingApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appSettings'] });
      toast.success('Setting created successfully');
    },
    onError: () => {
      toast.error('Failed to create setting');
    },
  });
};

export const useUpdateAppSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AppSettingRequest }) =>
      appSettingApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appSettings'] });
      toast.success('Setting updated successfully');
    },
    onError: () => {
      toast.error('Failed to update setting');
    },
  });
};

export const useDeleteAppSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => appSettingApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appSettings'] });
      toast.success('Setting deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete setting');
    },
  });
};
