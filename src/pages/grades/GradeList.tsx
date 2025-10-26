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
import { useGrades, useCreateGrade, useUpdateGrade, useDeleteGrade } from '../../hooks/useGrades';
import { useSubjects } from '../../hooks/useSubjects';
import { formatDate } from '../../utils/formatters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import type { GradeResponse } from '../../types/api.types';

const gradeSchema = z.object({
  gradeLevel: z.string().min(1, 'Grade level is required'),
  gradeName: z.string().min(1, 'Grade name is required'),
  description: z.string().min(1, 'Description is required'),
  subjectId: z.number().min(1, 'Subject is required'),
});

type GradeFormData = z.infer<typeof gradeSchema>;

export const GradeList = () => {
  const { data: grades = [], isLoading } = useGrades();
  const { data: subjects = [] } = useSubjects();
  const createMutation = useCreateGrade();
  const updateMutation = useUpdateGrade();
  const deleteMutation = useDeleteGrade();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<GradeResponse | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      gradeLevel: '',
      gradeName: '',
      description: '',
      subjectId: 0,
    },
  });

  const handleOpen = (grade?: GradeResponse) => {
    if (grade) {
      reset({
        gradeLevel: grade.gradeLevel,
        gradeName: grade.gradeName,
        description: grade.description,
        subjectId: grade.subjectId,
      });
      setSelectedGrade(grade);
    } else {
      reset({
        gradeLevel: '',
        gradeName: '',
        description: '',
        subjectId: 0,
      });
      setSelectedGrade(undefined);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedGrade(undefined);
    reset();
  };

  const onSubmit = (data: GradeFormData) => {
    if (selectedGrade) {
      updateMutation.mutate(
        { id: selectedGrade.gradeId, data },
        {
          onSuccess: () => handleClose(),
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => handleClose(),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading grades..." />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Grades
        </Typography>
        <Button variant="contained" startIcon={<Add />} size="large" onClick={() => handleOpen()}>
          Add Grade
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Grade Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.length > 0 ? (
              grades.map((grade: GradeResponse) => (
                <TableRow key={grade.gradeId} hover>
                  <TableCell>{grade.gradeId}</TableCell>
                  <TableCell>{grade.gradeLevel}</TableCell>
                  <TableCell>{grade.gradeName}</TableCell>
                  <TableCell>{grade.description.length > 50 ? `${grade.description.substring(0, 50)}...` : grade.description}</TableCell>
                  <TableCell>{grade.subjectName || 'N/A'}</TableCell>
                  <TableCell>{formatDate(grade.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => handleOpen(grade)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(grade.gradeId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState title="No grades found" description="Click 'Add Grade' to create your first grade" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedGrade ? 'Edit Grade' : 'Add New Grade'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="gradeLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Grade Level"
                  placeholder="e.g., 10, 11, 12"
                  required
                  error={!!errors.gradeLevel}
                  helperText={errors.gradeLevel?.message}
                />
              )}
            />
            <Controller
              name="gradeName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Grade Name"
                  placeholder="e.g., Grade 10, Grade 11"
                  required
                  error={!!errors.gradeName}
                  helperText={errors.gradeName?.message}
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
                  placeholder="e.g., High school grade 10"
                  required
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Controller
              name="subjectId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.subjectId}>
                  <InputLabel>Subject *</InputLabel>
                  <Select {...field} label="Subject *">
                    <MenuItem value={0}>
                      <em>Select Subject</em>
                    </MenuItem>
                    {subjects.map((subject) => (
                      <MenuItem key={subject.subjectId} value={subject.subjectId}>
                        {subject.subjectName} ({subject.subjectCode})
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.subjectId && <FormHelperText>{errors.subjectId.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {selectedGrade ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
