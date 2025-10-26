export const API_BASE_URL = 'http://localhost:8080/api';

export const APP_NAME = 'Matrix Exam System';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  SUBJECTS: '/subjects',
  EXAMS: '/exams',
  QUESTIONS: '/questions',
  PROFILE: '/profile',
} as const;

export const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
] as const;

export const EXAM_STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
] as const;

export const ROLE_OPTIONS = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'TEACHER', label: 'Teacher' },
] as const;
