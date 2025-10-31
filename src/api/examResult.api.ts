import api from './axios.config';
import type { ExamResultResponse } from '../types/api.types';

export const examResultApi = {
  // Get result by session ID
  getResultBySession: (sessionId: string, studentEmail: string) =>
    api.get<ExamResultResponse>(`/api/exam-results/session/${sessionId}?studentEmail=${encodeURIComponent(studentEmail)}`),

  // Calculate and save result (may need to be reimplemented in backend)
  calculateResult: (sessionId: string) =>
    api.post<ExamResultResponse>(`/api/exam-results/calculate/${sessionId}`),
};
