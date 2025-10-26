import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateStudent, useUpdateStudent } from '../../hooks/useStudents';
import { STATUS_OPTIONS } from '../../utils/constants';
import type { StudentResponse, StudentRequest } from '../../types/api.types';

const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  phone: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormDialogProps {
  open: boolean;
  onClose: () => void;
  student?: StudentResponse;
}

export const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onClose,
  student,
}) => {
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    values: student
      ? {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone || '',
          status: student.status,
          password: '',
        }
      : undefined,
  });

  const onSubmit = (data: StudentFormData) => {
    const payload: StudentRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password || 'password123',
      phone: data.phone,
    };

    if (student) {
      updateMutation.mutate(
        { id: student.studentId, data: payload },
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{student ? 'Edit Student' : 'Create Student'}</DialogTitle>
        <DialogContent>
          <TextField
            {...register('firstName')}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            autoFocus
          />
          <TextField
            {...register('lastName')}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            {...register('email')}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={!!student}
          />
          {!student && (
            <TextField
              {...register('password')}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
          <TextField
            {...register('phone')}
            label="Phone (Optional)"
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <Controller
            name="status"
            control={control}
            defaultValue="ACTIVE"
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                margin="normal"
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {student ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
