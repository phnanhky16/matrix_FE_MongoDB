// API DTOs for Matrix Exam System

// ============ Student ============
export interface StudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface StudentResponse {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

// ============ Teacher ============
export interface TeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface TeacherResponse {
  teacherId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Subject ============
export interface SubjectRequest {
  subjectName: string;
  subjectCode: string;
}

export interface SubjectResponse {
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Grade ============
export interface GradeRequest {
  gradeLevel: string;
  gradeName: string;
  description: string;
  subjectId: number;
}

export interface GradeResponse {
  gradeId: number;
  gradeLevel: string;
  gradeName: string;
  description: string;
  subjectId: number;
  subjectName: string;
  createdAt: string;
  updatedAt: string;
}

// Lesson
export interface LessonRequest {
  lessonTitle: string;
  lessonContent: string;
  lessonOrder: number;
  learningObjectives: string;
  gradeId: number;
}

export interface LessonResponse {
  lessonId: number;
  lessonTitle: string;
  lessonContent: string;
  lessonOrder: number;
  learningObjectives: string;
  gradeId: number;
  gradeName: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Question Type ============
export interface QuestionTypeRequest {
  typeName: string;
  description?: string;
}

export interface QuestionTypeResponse {
  questionTypeId: number;
  typeName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Level ============
export interface LevelRequest {
  levelName: string;
  difficultyScore: number;
  description: string;
}

export interface LevelResponse {
  levelId: number;
  levelName: string;
  difficultyScore: number;
  description: string;
  createdAt: string;
}

// Question
export interface QuestionRequest {
  questionText: string;
  correctAnswer: string;
  marks: number;
  explanation: string;
  lessonId: number;
  questionTypeId: number;
  levelId: number;
}

export interface QuestionResponse {
  questionId: number;
  questionText: string;
  correctAnswer: string;
  marks: number;
  explanation: string;
  lessonId: number;
  lessonTitle: string;
  questionTypeId: number;
  questionTypeName: string;
  levelId: number;
  levelName: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Option ============
export interface OptionRequest {
  optionText: string;
  isCorrect: boolean;
  optionOrder: number;
  questionId: number;
}

export interface OptionResponse {
  optionId: number;
  optionText: string;
  isCorrect: boolean;
  optionOrder: number;
  questionId?: number;
  questionText: string;
  createdAt: string;
}

// ============ Exam ============
export interface ExamRequest {
  examName: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  examDate: string; // ISO 8601
}

export interface ExamResponse {
  examId: number;
  examName: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  examDate: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Matrix ============
export interface MatrixRequest {
  matrixName: string;
  description: string;
  totalQuestions: number;
  examId: number;
}

export interface CreateMatrixWithQuestionsRequest {
  examName: string;
  examDescription?: string;
  durationMinutes?: number;
  passingMarks?: number;
  examDate?: string; // ISO-8601
  matrixName: string;
  matrixDescription?: string;
  lessonIds?: number[];
  levelIds?: number[];
  questionsPerLesson?: number;
  easyQuestions?: number;
  mediumQuestions?: number;
  hardQuestions?: number;
}

export interface MatrixWithQuestionsResponse {
  matrixId: number;
  matrixName: string;
  description: string;
  totalQuestions: number;
  examId: number;
  examName: string;
  durationMinutes?: number;
  totalMarks: number;
  passingMarks?: number;
  questions: {
    questionId: number;
    questionText: string;
    levelName: string;
    lessonTitle: string;
    marks: number;
    questionOrder: number;
  }[];
}

export interface MatrixResponse {
  matrixId: number;
  matrixName: string;
  description: string;
  totalQuestions: number;
  examId: number;
  examName: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Exam Session ============
export interface StartExamRequest {
  examId: number;
  matrixId: number;
}

export interface ExamSessionResponse {
  sessionId: number;
  studentId: number;
  examId: number;
  examName: string;
  matrixId: number;
  matrixName: string;
  startTime: string;
  endTime: string | null;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'SUBMITTED';
  timeSpent: number; // seconds
  duration: number;  // minutes
  totalQuestions: number;
}

// ============ Student Answer ============
export interface SubmitAnswerRequest {
  sessionId: number;
  questionId: number;
  selectedOptionId: number | null;
  textAnswer: string | null;
}

export interface StudentAnswerResponse {
  answerId: number;
  sessionId: number;
  questionId: number;
  questionText: string;
  selectedOptionId: number | null;
  selectedOptionText: string | null;
  textAnswer: string | null;
  isCorrect: boolean | null;
  answeredAt: string;
}

// ============ Exam Result ============
export interface ExamResultResponse {
  resultId: number;
  sessionId: number;
  studentId: number;
  studentName: string;
  examId: number;
  examName: string;
  score: number;
  percentage: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  passed: boolean;
  feedback: string;
  timeSpent: number;
  completedAt: string;
  questionResults: QuestionResultDetail[];
}

export interface QuestionResultDetail {
  questionId: number;
  questionText: string;
  questionType: string;
  marks: number;
  selectedOptionId: number | null;
  selectedOptionText: string | null;
  textAnswer: string | null;
  isCorrect: boolean | null;
  correctOptionId: number | null;
  correctOptionText: string | null;
  allOptions: OptionDetail[];
}

export interface OptionDetail {
  optionId: number;
  optionText: string;
  isCorrect: boolean;
  optionOrder: number;
}

// ============ Matrix Questions (Student View) ============
export interface MatrixQuestionResponse {
  questionId: number;
  questionText: string;
  questionType: string;
  marks: number;
  questionOrder: number;
  options: QuestionOptionResponse[];
}

export interface QuestionOptionResponse {
  optionId: number;
  optionText: string;
  optionOrder: number;
}

// ============ App Settings ============
export interface AppSettingRequest {
  settingKey: string;
  settingValue: string;
  description?: string;
}

export interface AppSettingResponse {
  settingId: number;
  settingKey: string;
  settingValue: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
