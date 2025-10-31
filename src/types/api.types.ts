// API DTOs for Matrix Exam System
// Updated for MongoDB with string IDs (ObjectId)

// ============ Student ============
export interface StudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface StudentResponse {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
  teacherId: string;
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
  subjectId: string;
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
  subjectId: string;
}

export interface GradeResponse {
  gradeId: string;
  gradeLevel: string;
  gradeName: string;
  description: string;
  subjectId: string;
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
  gradeId: string;
}

export interface LessonResponse {
  lessonId: string;
  lessonTitle: string;
  lessonContent: string;
  lessonOrder: number;
  learningObjectives: string;
  gradeId: string;
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
  questionTypeId: string;
  typeName: string;
  description?: string;
  createdAt: string;
}

// ============ Level ============
export interface LevelRequest {
  levelName: string;
  difficultyScore: number;
  description: string;
}

export interface LevelResponse {
  levelId: string;
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
  explanation?: string;
  lessonId: string;
  questionTypeId: string;
  levelId: string;
}

export interface QuestionResponse {
  questionId: string;
  questionText: string;
  correctAnswer: string;
  marks: number;
  explanation?: string;
  lessonId: string;
  lessonTitle: string;
  questionTypeId: string;
  questionTypeName: string;
  levelId: string;
  levelName: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Option ============
export interface OptionRequest {
  optionText: string;
  isCorrect: boolean;
  optionOrder: number;
  questionId: string;
}

export interface OptionResponse {
  optionId: string;
  optionText: string;
  isCorrect: boolean;
  optionOrder: number;
  questionId?: string;
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
  examId: string;
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
  examId: string;
}

export interface CreateMatrixWithQuestionsRequest {
  examName: string;
  examDescription?: string;
  durationMinutes?: number;
  passingMarks?: number;
  examDate?: string; // ISO-8601
  matrixName: string;
  matrixDescription?: string;
  lessonIds?: string[];
  levelIds?: string[];
  questionsPerLesson?: number;
  easyQuestions?: number;
  mediumQuestions?: number;
  hardQuestions?: number;
}

export interface MatrixWithQuestionsResponse {
  matrixId: string;
  matrixName: string;
  description: string;
  totalQuestions: number;
  examId: string;
  examName: string;
  durationMinutes?: number;
  totalMarks: number;
  passingMarks?: number;
  questions: {
    questionId: string;
    questionText: string;
    levelName: string;
    lessonTitle: string;
    marks: number;
    questionOrder: number;
  }[];
}

export interface MatrixResponse {
  matrixId: string;
  matrixName: string;
  description: string;
  totalQuestions: number;
  examId: string;
  examName: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Exam Session ============
export interface StartExamRequest {
  studentEmail: string;
  examId: string;
  matrixId: string;
}

export interface ExamSessionResponse {
  sessionId: string;
  studentId: string;
  examId: string;
  examName: string;
  matrixId: string;
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
  sessionId: string;
  questionId: string;
  selectedOptionId: string | null;
  textAnswer: string | null;
}

export interface StudentAnswerResponse {
  answerId: string;
  sessionId: string;
  questionId: string;
  questionText: string;
  selectedOptionId: string | null;
  selectedOptionText: string | null;
  textAnswer: string | null;
  isCorrect: boolean | null;
  answeredAt: string;
}

// ============ Exam Result ============
export interface ExamResultResponse {
  resultId: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  examId: string;
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
  questionId: string;
  questionText: string;
  questionType: string;
  marks: number;
  selectedOptionId: string | null;
  selectedOptionText: string | null;
  textAnswer: string | null;
  isCorrect: boolean | null;
  correctOptionId: string | null;
  correctOptionText: string | null;
  allOptions: OptionDetail[];
}

export interface OptionDetail {
  optionId: string;
  optionText: string;
  isCorrect: boolean;
  optionOrder: number;
}

// ============ Matrix Questions (Student View) ============
export interface MatrixQuestionResponse {
  questionId: string;
  questionText: string;
  questionType: string;
  marks: number;
  questionOrder: number;
  options: QuestionOptionResponse[];
}

export interface QuestionOptionResponse {
  optionId: string;
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
  settingId: string;
  settingKey: string;
  settingValue: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
