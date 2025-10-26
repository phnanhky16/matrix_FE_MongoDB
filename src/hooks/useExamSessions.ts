import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { examSessionApi } from '../api/examSession.api';
import type { StartExamRequest, SubmitAnswerRequest } from '../types/api.types';
import { toast } from 'react-toastify';

// Get active exam session
export const useActiveSession = () => {
  return useQuery({
    queryKey: ['activeSession'],
    queryFn: examSessionApi.getActiveSession,
    retry: false, // Don't retry if no active session (404 is expected)
  });
};

// Get session answers
export const useSessionAnswers = (sessionId: number) => {
  return useQuery({
    queryKey: ['sessionAnswers', sessionId],
    queryFn: () => examSessionApi.getSessionAnswers(sessionId),
    enabled: !!sessionId,
  });
};

// Get my exam history
export const useMySessions = () => {
  return useQuery({
    queryKey: ['mySessions'],
    queryFn: examSessionApi.getMySessions,
  });
};

// Get matrix questions (for exam taking)
export const useMatrixQuestions = (matrixId: number) => {
  return useQuery({
    queryKey: ['matrixQuestions', matrixId],
    queryFn: () => examSessionApi.getMatrixQuestions(matrixId),
    enabled: !!matrixId,
  });
};

// Start exam mutation
export const useStartExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StartExamRequest) => examSessionApi.startExam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeSession'] });
      toast.success('Exam started successfully!');
    },
    onError: () => {
      toast.error('Failed to start exam');
    },
  });
};

// Submit answer mutation
export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitAnswerRequest) => examSessionApi.submitAnswer(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['sessionAnswers', variables.sessionId] 
      });
      // Don't show toast for auto-save to avoid spam
    },
    onError: () => {
      toast.error('Failed to save answer');
    },
  });
};

// Submit exam mutation
export const useSubmitExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: number) => examSessionApi.submitExam(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeSession'] });
      queryClient.invalidateQueries({ queryKey: ['mySessions'] });
      queryClient.invalidateQueries({ queryKey: ['examResults'] });
      toast.success('Exam submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit exam');
    },
  });
};
