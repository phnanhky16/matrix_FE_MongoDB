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
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useTeachers, useDeleteTeacher } from '../../hooks/useTeachers';
import { formatDate } from '../../utils/formatters';
import type { TeacherResponse } from '../../types/api.types';
import { TeacherFormDialog } from '../../components/features/TeacherFormDialog';

export const TeacherList = () => {
  const { data: teachers = [], isLoading } = useTeachers();
  const deleteMutation = useDeleteTeacher();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherResponse | undefined>();

  const handleOpen = (teacher?: TeacherResponse) => {
    setSelectedTeacher(teacher);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedTeacher(undefined);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
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
          Teachers
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
          onClick={() => handleOpen()}
        >
          Add Teacher
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers && teachers.length > 0 ? (
              teachers.map((teacher: TeacherResponse) => (
                <TableRow key={teacher.teacherId} hover>
                  <TableCell>{teacher.teacherId}</TableCell>
                  <TableCell>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{formatDate(teacher.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => handleOpen(teacher)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(teacher.teacherId)}
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
                    No teachers found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TeacherFormDialog open={dialogOpen} onClose={handleClose} teacher={selectedTeacher} />
    </Container>
  );
};
