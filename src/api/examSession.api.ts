import api from './axios.config';
import type { 
  StartExamRequest, 
  ExamSessionResponse, 
  SubmitAnswerRequest, 
  StudentAnswerResponse
} from '../types/api.types';

export const examSessionApi = {
  // Start a new exam session
  startExam: (data: StartExamRequest) =>
    api.post<ExamSessionResponse>('/api/exam-sessions/start', data),

  // Get current active session
  getCurrentSession: (studentEmail: string) =>
    api.get<ExamSessionResponse>(`/api/exam-sessions/current?studentEmail=${encodeURIComponent(studentEmail)}`),

  // Get session by ID
  getSessionById: (sessionId: string, studentEmail: string) =>
    api.get<ExamSessionResponse>(`/api/exam-sessions/${sessionId}?studentEmail=${encodeURIComponent(studentEmail)}`),

  // Submit/update an answer
  submitAnswer: (data: SubmitAnswerRequest) =>
    api.post<StudentAnswerResponse>('/api/exam-sessions/submit-answer', data),

  // Get all answers for a session
  getSessionAnswers: (sessionId: string, studentEmail: string) =>
    api.get<StudentAnswerResponse[]>(`/api/exam-sessions/${sessionId}/answers?studentEmail=${encodeURIComponent(studentEmail)}`),

  // Submit exam (final submission)
  submitExam: (sessionId: string, studentEmail: string) =>
    api.post<ExamSessionResponse>(`/api/exam-sessions/${sessionId}/submit?studentEmail=${encodeURIComponent(studentEmail)}`),

  // Get my exam sessions (history)
  getMySessions: (studentEmail: string) =>
    api.get<ExamSessionResponse[]>(`/api/exam-sessions/my-sessions?studentEmail=${encodeURIComponent(studentEmail)}`),
};
