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
import { useExams, useDeleteExam } from '../../hooks/useExams';
import { formatDate, formatDuration } from '../../utils/formatters';
import type { ExamResponse } from '../../types/api.types';
import { ExamFormDialog } from '../../components/features/ExamFormDialog';

export const ExamList = () => {
  const { data: exams, isLoading } = useExams();
  const deleteMutation = useDeleteExam();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamResponse | undefined>();

  const handleOpen = (exam?: ExamResponse) => {
    setSelectedExam(exam);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedExam(undefined);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
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
          Exams
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
          onClick={() => handleOpen()}
        >
          Create Exam
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Exam Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Total Marks</TableCell>
              <TableCell>Passing Marks</TableCell>
              <TableCell>Exam Date</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams && exams.length > 0 ? (
              exams.map((exam: ExamResponse) => (
                <TableRow key={exam.examId} hover>
                  <TableCell>{exam.examId}</TableCell>
                  <TableCell>{exam.examName}</TableCell>
                  <TableCell>
                    {exam.description.length > 40
                      ? `${exam.description.substring(0, 40)}...`
                      : exam.description}
                  </TableCell>
                  <TableCell>{formatDuration(exam.durationMinutes)}</TableCell>
                  <TableCell>{exam.totalMarks}</TableCell>
                  <TableCell>{exam.passingMarks}</TableCell>
                  <TableCell>{formatDate(exam.examDate)}</TableCell>
                  <TableCell>{formatDate(exam.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => handleOpen(exam)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(exam.examId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="text.secondary" py={3}>
                    No exams found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ExamFormDialog open={dialogOpen} onClose={handleClose} exam={selectedExam} />
    </Container>
  );
};
