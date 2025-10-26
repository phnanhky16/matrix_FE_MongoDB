import { useQuery } from '@tanstack/react-query';
import { examResultApi } from '../api/examResult.api';

// Get result by session ID
export const useExamResultBySession = (sessionId: number) => {
  return useQuery({
    queryKey: ['examResult', 'session', sessionId],
    queryFn: () => examResultApi.getResultBySession(sessionId),
    enabled: !!sessionId,
  });
};

// Get all my results
export const useMyResults = () => {
  return useQuery({
    queryKey: ['examResults'],
    queryFn: examResultApi.getMyResults,
  });
};

// Get result by ID
export const useExamResult = (resultId: number) => {
  return useQuery({
    queryKey: ['examResult', resultId],
    queryFn: () => examResultApi.getResultById(resultId),
    enabled: !!resultId,
  });
};
