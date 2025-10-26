import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ExamResponse, ExamRequest } from '../../types/api.types';
import { EXAM_STATUS_OPTIONS } from '../../utils/constants';
import { useCreateExam, useUpdateExam } from '../../hooks/useExams';

const examSchema = z.object({
  examName: z.string().min(1, 'Exam name is required'),
  description: z.string().optional(),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  totalMarks: z.number().min(1, 'Total marks must be at least 1'),
  passingMarks: z.number().min(0, 'Passing marks cannot be negative'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

type ExamFormData = z.infer<typeof examSchema>;

interface ExamFormDialogProps {
  open: boolean;
  onClose: () => void;
  exam?: ExamResponse;
}

export const ExamFormDialog: React.FC<ExamFormDialogProps> = ({
  open,
  onClose,
  exam,
}) => {
  const createMutation = useCreateExam();
  const updateMutation = useUpdateExam();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      examName: '',
      description: '',
      duration: 60,
      totalMarks: 100,
      passingMarks: 50,
      status: 'DRAFT',
    },
  });

  useEffect(() => {
    if (exam) {
      reset({
        examName: exam.examName,
        description: exam.description || '',
        duration: exam.duration,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks,
        status: exam.status,
      });
    } else {
      reset({
        examName: '',
        description: '',
        duration: 60,
        totalMarks: 100,
        passingMarks: 50,
        status: 'DRAFT',
      });
    }
  }, [exam, reset, open]);

  const onSubmit = (data: ExamFormData) => {
    const payload: ExamRequest = {
      examName: data.examName,
      description: data.description || undefined,
      duration: data.duration,
      totalMarks: data.totalMarks,
      passingMarks: data.passingMarks,
      status: data.status,
    };

    if (exam) {
      updateMutation.mutate(
        { id: exam.examId, data: payload },
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
      <DialogTitle>{exam ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="examName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Exam Name"
                required
                error={!!errors.examName}
                helperText={errors.examName?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duration (minutes)"
                type="number"
                required
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                error={!!errors.duration}
                helperText={errors.duration?.message}
              />
            )}
          />
          <Controller
            name="totalMarks"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Total Marks"
                type="number"
                required
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                error={!!errors.totalMarks}
                helperText={errors.totalMarks?.message}
              />
            )}
          />
          <Controller
            name="passingMarks"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Passing Marks"
                type="number"
                required
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                error={!!errors.passingMarks}
                helperText={errors.passingMarks?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
                  {EXAM_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {exam ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
