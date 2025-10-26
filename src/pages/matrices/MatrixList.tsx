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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  FormHelperText,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useMatrices, useCreateMatrixWithQuestions, useUpdateMatrix, useDeleteMatrix } from '../../hooks/useMatrices';
import { useExams } from '../../hooks/useExams';
import { useLessons } from '../../hooks/useLessons';
import { useLevels } from '../../hooks/useLevels';
import { formatDate } from '../../utils/formatters';
import { 
  pageContainerStyles, 
  pageHeaderStyles, 
  pageTitleStyles, 
  tableContainerStyles,
  tableRowStyles,
  actionButtonStyles,
  loadingOverlayStyles,
  dialogTitleStyles,
  formSectionStyles,
  emptyStateStyles,
} from '../../theme/commonStyles';
import type { MatrixResponse, CreateMatrixWithQuestionsRequest } from '../../types/api.types';

const matrixWithQuestionsSchema = z.object({
  examName: z.string().min(1, 'Exam name is required'),
  examDescription: z.string().optional(),
  durationMinutes: z.number().min(1, 'Duration must be at least 1 minute').optional(),
  passingMarks: z.number().min(0, 'Passing marks must be positive').optional(),
  examDate: z.string().optional(),
  matrixName: z.string().min(1, 'Matrix name is required'),
  matrixDescription: z.string().optional(),
  lessonIds: z.array(z.number()).optional(),
  levelIds: z.array(z.number()).optional(),
  questionsPerLesson: z.number().min(1).optional(),
  easyQuestions: z.number().min(0).optional(),
  mediumQuestions: z.number().min(0).optional(),
  hardQuestions: z.number().min(0).optional(),
});

type MatrixWithQuestionsFormData = z.infer<typeof matrixWithQuestionsSchema>;

export const MatrixList = () => {
  const [open, setOpen] = useState(false);
  const [editingMatrix, setEditingMatrix] = useState<MatrixResponse | null>(null);
  
  const { data: matrices, isLoading } = useMatrices();
  const { data: exams } = useExams();
  const { data: lessons = [] } = useLessons();
  const { data: levels = [] } = useLevels();
  const createWithQuestionsMutation = useCreateMatrixWithQuestions();
  const updateMutation = useUpdateMatrix();
  const deleteMutation = useDeleteMatrix();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<MatrixWithQuestionsFormData>({
    resolver: zodResolver(matrixWithQuestionsSchema),
    defaultValues: {
      examName: '',
      examDescription: '',
      durationMinutes: 60,
      passingMarks: 50,
      examDate: '',
      matrixName: '',
      matrixDescription: '',
      lessonIds: [],
      levelIds: [],
      questionsPerLesson: 10,
      easyQuestions: 4,
      mediumQuestions: 3,
      hardQuestions: 3,
    },
  });

  const handleOpen = (matrix?: MatrixResponse) => {
    if (matrix) {
      // Editing not supported for complex matrices - show simple message
      toast.info('Matrix editing is not available. Please delete and create a new one.');
      return;
    } else {
      setEditingMatrix(null);
      reset({
        examName: '',
        examDescription: '',
        durationMinutes: 60,
        passingMarks: 50,
        examDate: '',
        matrixName: '',
        matrixDescription: '',
        lessonIds: [],
        levelIds: [],
        questionsPerLesson: 10,
        easyQuestions: 4,
        mediumQuestions: 3,
        hardQuestions: 3,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMatrix(null);
    reset();
  };

  const onSubmit = async (data: MatrixWithQuestionsFormData) => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to create a matrix');
      return;
    }

    console.log('📝 Creating matrix with advanced payload:', data);

    // Use the advanced endpoint with React Query mutation
    createWithQuestionsMutation.mutate(data, {
      onSuccess: () => {
        handleClose(); // Close dialog on success
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this matrix?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={loadingOverlayStyles}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={pageContainerStyles}>
      <Box sx={pageHeaderStyles}>
        <Typography variant="h3" component="h1" sx={pageTitleStyles}>
          📋 Exam Matrices
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
          onClick={() => handleOpen()}
          sx={{ 
            px: 3,
            py: 1.5,
            fontSize: '1rem',
          }}
        >
          Create Matrix
        </Button>
      </Box>

      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Matrix Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Total Questions</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matrices && matrices.length > 0 ? (
              matrices.map((matrix: MatrixResponse) => (
                <TableRow key={matrix.matrixId} sx={tableRowStyles}>
                  <TableCell sx={{ fontWeight: 600 }}>{matrix.matrixId}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {matrix.matrixName}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {matrix.description || <em style={{ color: '#94a3b8' }}>No description</em>}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={matrix.totalQuestions} 
                      size="small" 
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{matrix.examName}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {formatDate(matrix.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" sx={actionButtonStyles('#06b6d4')}>
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpen(matrix)}
                      sx={actionButtonStyles('#2563eb')}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(matrix.matrixId)}
                      sx={actionButtonStyles('#ef4444')}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box sx={emptyStateStyles}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      📭 No matrices found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create your first matrix to get started
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Matrix Dialog - Advanced Form with Auto Question Selection */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={dialogTitleStyles}>
            ✨ Create Matrix with Questions
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Section 1: Exam Information */}
              <Box sx={formSectionStyles}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>1️⃣</span> Exam Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <TextField
                    {...register('examName')}
                    label="Exam Name"
                    fullWidth
                    required
                    error={!!errors.examName}
                    helperText={errors.examName?.message}
                  />
                  <TextField
                    {...register('examDescription')}
                    label="Exam Description"
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.examDescription}
                    helperText={errors.examDescription?.message}
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      {...register('durationMinutes', { valueAsNumber: true })}
                      label="Duration (minutes)"
                      type="number"
                      fullWidth
                      error={!!errors.durationMinutes}
                      helperText={errors.durationMinutes?.message}
                    />
                    <TextField
                      {...register('passingMarks', { valueAsNumber: true })}
                      label="Passing Marks"
                      type="number"
                      fullWidth
                      error={!!errors.passingMarks}
                      helperText={errors.passingMarks?.message}
                    />
                  </Box>
                  <TextField
                    {...register('examDate')}
                    label="Exam Date"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.examDate}
                    helperText={errors.examDate?.message}
                  />
                </Box>
              </Box>

              {/* Section 2: Matrix Information */}
              <Box sx={formSectionStyles}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>2️⃣</span> Matrix Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <TextField
                    {...register('matrixName')}
                    label="Matrix Name"
                    fullWidth
                    required
                    error={!!errors.matrixName}
                    helperText={errors.matrixName?.message}
                  />
                  <TextField
                    {...register('matrixDescription')}
                    label="Matrix Description"
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.matrixDescription}
                    helperText={errors.matrixDescription?.message}
                  />
                </Box>
              </Box>

              {/* Section 3: Question Selection */}
              <Box sx={formSectionStyles}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>3️⃣</span> Question Selection Criteria
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <Controller
                    name="lessonIds"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Select Lessons</InputLabel>
                        <Select
                          {...field}
                          multiple
                          input={<OutlinedInput label="Select Lessons" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {(selected as number[]).map((value) => {
                                const lesson = lessons.find(l => l.lessonId === value);
                                return (
                                  <Chip key={value} label={lesson?.lessonTitle || `Lesson ${value}`} size="small" />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {lessons.map((lesson) => (
                            <MenuItem key={lesson.lessonId} value={lesson.lessonId}>
                              {lesson.lessonTitle}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          Select one or more lessons to pick questions from
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="levelIds"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Select Difficulty Levels</InputLabel>
                        <Select
                          {...field}
                          multiple
                          input={<OutlinedInput label="Select Difficulty Levels" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {(selected as number[]).map((value) => {
                                const level = levels.find(l => l.levelId === value);
                                return (
                                  <Chip key={value} label={level?.levelName || `Level ${value}`} size="small" />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {levels.map((level) => (
                            <MenuItem key={level.levelId} value={level.levelId}>
                              {level.levelName} (Difficulty: {level.difficultyScore})
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          Filter questions by difficulty level
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

                  <TextField
                    {...register('questionsPerLesson', { valueAsNumber: true })}
                    label="Questions Per Lesson"
                    type="number"
                    fullWidth
                    error={!!errors.questionsPerLesson}
                    helperText={errors.questionsPerLesson?.message || "Limit the number of questions from each lesson"}
                  />
                </Box>
              </Box>

              {/* Section 4: Question Distribution by Difficulty */}
              <Box sx={formSectionStyles}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>4️⃣</span> Question Distribution
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Specify exact number of questions for each difficulty level
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    {...register('easyQuestions', { valueAsNumber: true })}
                    label="Easy Questions 🟢"
                    type="number"
                    fullWidth
                    error={!!errors.easyQuestions}
                    helperText={errors.easyQuestions?.message}
                  />
                  <TextField
                    {...register('mediumQuestions', { valueAsNumber: true })}
                    label="Medium Questions 🟡"
                    type="number"
                    fullWidth
                    error={!!errors.mediumQuestions}
                    helperText={errors.mediumQuestions?.message}
                  />
                  <TextField
                    {...register('hardQuestions', { valueAsNumber: true })}
                    label="Hard Questions 🔴"
                    type="number"
                    fullWidth
                    error={!!errors.hardQuestions}
                    helperText={errors.hardQuestions?.message}
                  />
                </Box>
              </Box>

            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} size="large">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createWithQuestionsMutation.isPending}
              size="large"
              sx={{ px: 4 }}
            >
              {createWithQuestionsMutation.isPending ? 'Creating...' : '✨ Create Matrix & Exam'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
