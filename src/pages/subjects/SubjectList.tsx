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
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '../../hooks/useSubjects';
import { formatDate } from '../../utils/formatters';
import type { SubjectResponse, SubjectRequest } from '../../types/api.types';

const subjectSchema = z.object({
  subjectName: z.string().min(1, 'Subject name is required'),
  subjectCode: z.string().min(1, 'Subject code is required'),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

export const SubjectList = () => {
  const [open, setOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectResponse | null>(null);
  
  const { data: subjects, isLoading } = useSubjects();
  const createMutation = useCreateSubject();
  const updateMutation = useUpdateSubject();
  const deleteMutation = useDeleteSubject();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  const handleOpen = (subject?: SubjectResponse) => {
    if (subject) {
      setEditingSubject(subject);
      reset({
        subjectName: subject.subjectName,
        subjectCode: subject.subjectCode,
      });
    } else {
      setEditingSubject(null);
      reset({ subjectName: '', subjectCode: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSubject(null);
    reset();
  };

  const onSubmit = (data: SubjectFormData) => {
    const payload: SubjectRequest = {
      subjectName: data.subjectName,
      subjectCode: data.subjectCode,
    };

    if (editingSubject) {
      updateMutation.mutate(
        { id: editingSubject.subjectId, data: payload },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: handleClose });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Subjects
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
          onClick={() => handleOpen()}
        >
          Add Subject
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects && subjects.length > 0 ? (
              subjects.map((subject: SubjectResponse) => (
                <TableRow key={subject.subjectId} hover>
                  <TableCell>{subject.subjectId}</TableCell>
                  <TableCell>{subject.subjectName}</TableCell>
                  <TableCell>{subject.subjectCode}</TableCell>
                  <TableCell>{formatDate(subject.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => handleOpen(subject)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(subject.subjectId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary" py={3}>
                    No subjects found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {editingSubject ? 'Edit Subject' : 'Create Subject'}
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register('subjectName')}
              label="Subject Name"
              placeholder="e.g., Mathematics, Physics"
              fullWidth
              margin="normal"
              error={!!errors.subjectName}
              helperText={errors.subjectName?.message}
              autoFocus
            />
            <TextField
              {...register('subjectCode')}
              label="Subject Code"
              placeholder="e.g., MATH101, PHY101"
              fullWidth
              margin="normal"
              error={!!errors.subjectCode}
              helperText={errors.subjectCode?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {editingSubject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
