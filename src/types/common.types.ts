// Common types

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type Status = 'ACTIVE' | 'INACTIVE';
export type ExamStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
