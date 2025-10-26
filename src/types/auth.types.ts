// Auth types

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string; // "Bearer"
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

export interface RegisterStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  token: string;
}
