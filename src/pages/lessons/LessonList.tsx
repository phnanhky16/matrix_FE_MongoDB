import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLessons, useCreateLesson, useUpdateLesson, useDeleteLesson } from '../../hooks/useLessons';
import { useGrades } from '../../hooks/useGrades';
import { formatDate } from '../../utils/formatters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import type { LessonResponse } from '../../types/api.types';

const lessonSchema = z.object({
  lessonTitle: z.string().min(1, 'Lesson title is required'),
  lessonContent: z.string().min(1, 'Lesson content is required'),
  lessonOrder: z.number().min(1, 'Lesson order must be at least 1'),
  learningObjectives: z.string().min(1, 'Learning objectives are required'),
  gradeId: z.number().min(1, 'Grade is required'),
});

type LessonFormData = z.infer<typeof lessonSchema>;

export const LessonList = () => {
  const { data: lessons = [], isLoading } = useLessons();
  const { data: grades = [] } = useGrades();
  const createMutation = useCreateLesson();
  const updateMutation = useUpdateLesson();
  const deleteMutation = useDeleteLesson();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonResponse | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      lessonTitle: '',
      lessonContent: '',
      lessonOrder: 1,
      learningObjectives: '',
      gradeId: 0,
    },
  });

  const handleOpen = (lesson?: LessonResponse) => {
    if (lesson) {
      reset({
        lessonTitle: lesson.lessonTitle,
        lessonContent: lesson.lessonContent,
        lessonOrder: lesson.lessonOrder,
        learningObjectives: lesson.learningObjectives,
        gradeId: lesson.gradeId,
      });
      setSelectedLesson(lesson);
    } else {
      reset({
        lessonTitle: '',
        lessonContent: '',
        lessonOrder: 1,
        learningObjectives: '',
        gradeId: 0,
      });
      setSelectedLesson(undefined);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedLesson(undefined);
    reset();
  };

  const onSubmit = (data: LessonFormData) => {
    const payload = {
      lessonTitle: data.lessonTitle,
      lessonContent: data.lessonContent,
      lessonOrder: data.lessonOrder,
      learningObjectives: data.learningObjectives,
      gradeId: data.gradeId,
    };

    if (selectedLesson) {
      updateMutation.mutate(
        { id: selectedLesson.lessonId, data: payload },
        {
          onSuccess: () => handleClose(),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => handleClose(),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      deleteMutation.mutate(id);
    }
  };

  const getGradeName = (gradeId: number) => {
    const grade = grades.find((g) => g.gradeId === gradeId);
    return grade?.gradeName || 'N/A';
  };

  if (isLoading) return <LoadingSpinner message="Loading lessons..." />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Lessons
        </Typography>
        <Button variant="contained" startIcon={<Add />} size="large" onClick={() => handleOpen()}>
          Add Lesson
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Lesson Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.length > 0 ? (
              lessons.map((lesson: LessonResponse) => (
                <TableRow key={lesson.lessonId} hover>
                  <TableCell>{lesson.lessonId}</TableCell>
                  <TableCell>{lesson.lessonTitle}</TableCell>
                  <TableCell>
                    {lesson.lessonContent.length > 50
                      ? `${lesson.lessonContent.substring(0, 50)}...`
                      : lesson.lessonContent}
                  </TableCell>
                  <TableCell>{lesson.lessonOrder}</TableCell>
                  <TableCell>{getGradeName(lesson.gradeId)}</TableCell>
                  <TableCell>{formatDate(lesson.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => handleOpen(lesson)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(lesson.lessonId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState title="No lessons found" description="Click 'Add Lesson' to create your first lesson" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedLesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="lessonTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Lesson Title"
                  required
                  error={!!errors.lessonTitle}
                  helperText={errors.lessonTitle?.message}
                />
              )}
            />
            <Controller
              name="lessonContent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Lesson Content"
                  required
                  multiline
                  rows={3}
                  error={!!errors.lessonContent}
                  helperText={errors.lessonContent?.message}
                />
              )}
            />
            <Controller
              name="lessonOrder"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Lesson Order"
                  type="number"
                  required
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  error={!!errors.lessonOrder}
                  helperText={errors.lessonOrder?.message}
                />
              )}
            />
            <Controller
              name="learningObjectives"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Learning Objectives"
                  required
                  multiline
                  rows={2}
                  error={!!errors.learningObjectives}
                  helperText={errors.learningObjectives?.message}
                />
              )}
            />
            <Controller
              name="gradeId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.gradeId}>
                  <InputLabel>Grade *</InputLabel>
                  <Select {...field} label="Grade *">
                    <MenuItem value={0}>
                      <em>Select Grade</em>
                    </MenuItem>
                    {grades.map((grade) => (
                      <MenuItem key={grade.gradeId} value={grade.gradeId}>
                        {grade.gradeName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.gradeId && <FormHelperText>{errors.gradeId.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {selectedLesson ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
