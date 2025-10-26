import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { lessonApi } from '../api/lesson.api';
import type { LessonRequest } from '../types/api.types';

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: () => lessonApi.getAll().then((res) => res.data),
  });
};

export const useLesson = (id: number) => {
  return useQuery({
    queryKey: ['lessons', id],
    queryFn: () => lessonApi.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useLessonsByGrade = (gradeId: number) => {
  return useQuery({
    queryKey: ['lessons', 'grade', gradeId],
    queryFn: () => lessonApi.getByGrade(gradeId).then((res) => res.data),
    enabled: !!gradeId,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LessonRequest) => lessonApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success('Lesson created successfully');
    },
    onError: () => {
      toast.error('Failed to create lesson');
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LessonRequest }) =>
      lessonApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success('Lesson updated successfully');
    },
    onError: () => {
      toast.error('Failed to update lesson');
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => lessonApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      toast.success('Lesson deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete lesson');
    },
  });
};
