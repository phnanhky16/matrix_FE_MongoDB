import apiClient from './axios.config';
import type { ExamResultResponse } from '../types/api.types';

export const examResultApi = {
  // Get result by session ID
  getResultBySession: (sessionId: number) =>
    apiClient.get<ExamResultResponse>(`/api/exam-results/session/${sessionId}`).then((res: any) => res.data),

  // Get all my results
  getMyResults: () =>
    apiClient.get<ExamResultResponse[]>('/api/exam-results/my-results').then((res: any) => res.data),

  // Get result by ID (with detailed breakdown)
  getResultById: (resultId: number) =>
    apiClient.get<ExamResultResponse>(`/api/exam-results/${resultId}`).then((res: any) => res.data),
};
