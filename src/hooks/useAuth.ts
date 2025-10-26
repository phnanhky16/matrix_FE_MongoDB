import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, RegisterStudentRequest, RegisterTeacherRequest } from '../types/auth.types';

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      const { token, email, role } = response.data;
      // Generate a temporary userId from email hash (or wait for backend to include it)
      const userId = email.split('@')[0].length; // Temporary: use email length as ID
      setAuth({ userId, email, role, token }, token);
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    },
  });

  const registerStudentMutation = useMutation({
    mutationFn: (data: RegisterStudentRequest) => authApi.registerStudent(data),
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });

  const registerTeacherMutation = useMutation({
    mutationFn: (data: RegisterTeacherRequest) => authApi.registerTeacher(data),
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });

  const logout = () => {
    clearAuth();
    authApi.logout();
    queryClient.clear();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    registerStudent: registerStudentMutation.mutate,
    registerTeacher: registerTeacherMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegisteringStudent: registerStudentMutation.isPending,
    isRegisteringTeacher: registerTeacherMutation.isPending,
  };
};
