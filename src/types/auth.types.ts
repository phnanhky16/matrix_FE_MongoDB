// Auth types
// Updated for MongoDB with string IDs

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string; // Optional for teachers
}

export interface AuthUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  token: string;
}
