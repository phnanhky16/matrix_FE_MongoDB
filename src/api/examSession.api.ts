import apiClient from './axios.config';
import type { 
  StartExamRequest, 
  ExamSessionResponse, 
  SubmitAnswerRequest, 
  StudentAnswerResponse,
  MatrixQuestionResponse
} from '../types/api.types';

export const examSessionApi = {
  // Start a new exam session
  startExam: (data: StartExamRequest) =>
    apiClient.post<ExamSessionResponse>('/api/exam-sessions/start', data).then((res: any) => res.data),

  // Get active exam session (for resume)
  getActiveSession: () =>
    apiClient.get<ExamSessionResponse>('/api/exam-sessions/active').then((res: any) => res.data),

  // Submit/update an answer
  submitAnswer: (data: SubmitAnswerRequest) =>
    apiClient.post<StudentAnswerResponse>('/api/exam-sessions/answer', data).then((res: any) => res.data),

  // Get all answers for a session
  getSessionAnswers: (sessionId: number) =>
    apiClient.get<StudentAnswerResponse[]>(`/api/exam-sessions/${sessionId}/answers`).then((res: any) => res.data),

  // Submit exam (final submission)
  submitExam: (sessionId: number) =>
    apiClient.post<ExamSessionResponse>(`/api/exam-sessions/${sessionId}/submit`).then((res: any) => res.data),

  // Get my exam history
  getMySessions: () =>
    apiClient.get<ExamSessionResponse[]>('/api/exam-sessions/my-sessions').then((res: any) => res.data),

  // Get questions for a matrix (student view - no correct answers)
  getMatrixQuestions: (matrixId: number) =>
    apiClient.get<MatrixQuestionResponse[]>(`/api/matrices/${matrixId}/questions`).then((res: any) => res.data),
};
