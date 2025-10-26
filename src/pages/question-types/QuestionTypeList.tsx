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
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuestionTypes, useCreateQuestionType, useUpdateQuestionType, useDeleteQuestionType } from '../../hooks/useQuestionTypes';
import { formatDate } from '../../utils/formatters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import type { QuestionTypeResponse } from '../../types/api.types';

const questionTypeSchema = z.object({
  typeName: z.string().min(1, 'Type name is required'),
  description: z.string().optional(),
});

type QuestionTypeFormData = z.infer<typeof questionTypeSchema>;

export const QuestionTypeList = () => {
  const { data: questionTypes = [], isLoading } = useQuestionTypes();
  const createMutation = useCreateQuestionType();
  const updateMutation = useUpdateQuestionType();
  const deleteMutation = useDeleteQuestionType();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<QuestionTypeResponse | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionTypeFormData>({
    resolver: zodResolver(questionTypeSchema),
    defaultValues: {
      typeName: '',
      description: '',
    },
  });

  const handleOpen = (type?: QuestionTypeResponse) => {
    if (type) {
      reset({
        typeName: type.typeName,
        description: type.description || '',
      });
      setSelectedType(type);
    } else {
      reset({
        typeName: '',
        description: '',
      });
      setSelectedType(undefined);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedType(undefined);
    reset();
  };

  const onSubmit = (data: QuestionTypeFormData) => {
    const payload = {
      typeName: data.typeName,
      description: data.description || undefined,
    };

    if (selectedType) {
      updateMutation.mutate(
        { id: selectedType.questionTypeId, data: payload },
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
    if (window.confirm('Are you sure you want to delete this question type?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading question types..." />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Question Types
        </Typography>
        <Button variant="contained" startIcon={<Add />} size="large" onClick={() => handleOpen()}>
          Add Question Type
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionTypes.length > 0 ? (
              questionTypes.map((type: QuestionTypeResponse) => (
                <TableRow key={type.questionTypeId} hover>
                  <TableCell>{type.questionTypeId}</TableCell>
                  <TableCell>{type.typeName}</TableCell>
                  <TableCell>{type.description || 'N/A'}</TableCell>
                  <TableCell>{formatDate(type.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="info" onClick={() => handleOpen(type)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(type.questionTypeId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState
                    title="No question types found"
                    description="Click 'Add Question Type' to create your first type"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedType ? 'Edit Question Type' : 'Add New Question Type'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="typeName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Type Name"
                  required
                  error={!!errors.typeName}
                  helperText={errors.typeName?.message}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {selectedType ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
