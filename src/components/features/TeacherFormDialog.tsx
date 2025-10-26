import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { TeacherResponse, TeacherRequest } from '../../types/api.types';
import { useCreateTeacher, useUpdateTeacher } from '../../hooks/useTeachers';

const teacherSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface TeacherFormDialogProps {
  open: boolean;
  onClose: () => void;
  teacher?: TeacherResponse;
}

export const TeacherFormDialog: React.FC<TeacherFormDialogProps> = ({
  open,
  onClose,
  teacher,
}) => {
  const createMutation = useCreateTeacher();
  const updateMutation = useUpdateTeacher();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (teacher) {
      reset({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    }
  }, [teacher, reset, open]);

  const onSubmit = (data: TeacherFormData) => {
    const payload: TeacherRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password || 'password123',
    };

    if (teacher) {
      updateMutation.mutate(
        { id: teacher.teacherId, data: payload },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{teacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                required
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                required
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          {!teacher && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  required={!teacher}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {teacher ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
