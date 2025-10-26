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
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useOptions, useCreateOption, useUpdateOption, useDeleteOption } from '../../hooks/useOptions';
import { useQuestions } from '../../hooks/useQuestions';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import type { OptionResponse } from '../../types/api.types';

const optionSchema = z.object({
  optionText: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean(),
  optionOrder: z.number().min(1, 'Option order must be at least 1'),
  questionId: z.number().min(1, 'Question is required'),
});

type OptionFormData = z.infer<typeof optionSchema>;

export const OptionList = () => {
  const { data: options = [], isLoading } = useOptions();
  const { data: questions = [] } = useQuestions();
  const createMutation = useCreateOption();
  const updateMutation = useUpdateOption();
  const deleteMutation = useDeleteOption();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionResponse | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OptionFormData>({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      optionText: '',
      isCorrect: false,
      optionOrder: 1,
      questionId: 0,
    },
  });

  const handleOpen = (option?: OptionResponse) => {
    if (option) {
      // Find the questionId by matching the questionText with the questions list
      const matchingQuestion = questions.find(q => q.questionText === option.questionText);
      reset({
        optionText: option.optionText,
        isCorrect: option.isCorrect,
        optionOrder: option.optionOrder,
        questionId: option.questionId || matchingQuestion?.questionId || 0,
      });
      setSelectedOption(option);
    } else {
      reset({
        optionText: '',
        isCorrect: false,
        optionOrder: 1,
        questionId: 0,
      });
      setSelectedOption(undefined);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedOption(undefined);
    reset();
  };

  const onSubmit = (data: OptionFormData) => {
    if (selectedOption) {
      updateMutation.mutate(
        { id: selectedOption.optionId, data },
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
    if (window.confirm('Are you sure you want to delete this option?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading options..." />;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Question Options
        </Typography>
        <Button variant="contained" startIcon={<Add />} size="large" onClick={() => handleOpen()}>
          Add Option
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Option Text</TableCell>
              <TableCell>Question</TableCell>
              <TableCell align="center">Order</TableCell>
              <TableCell align="center">Correct</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options.length > 0 ? (
              options.map((option: OptionResponse) => (
                <TableRow key={option.optionId} hover>
                  <TableCell>{option.optionId}</TableCell>
                  <TableCell>
                    {option.optionText.length > 100
                      ? `${option.optionText.substring(0, 100)}...`
                      : option.optionText}
                  </TableCell>
                  <TableCell>
                    {option.questionText.length > 50
                      ? `${option.questionText.substring(0, 50)}...`
                      : option.questionText}
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={option.optionOrder} size="small" color="default" />
                  </TableCell>
                  <TableCell align="center">
                    {option.isCorrect ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="disabled" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="info" onClick={() => handleOpen(option)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(option.optionId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    title="No options found"
                    description="Click 'Add Option' to create answer choices for questions"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedOption ? 'Edit Option' : 'Add New Option'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="questionId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.questionId}>
                  <InputLabel>Question *</InputLabel>
                  <Select {...field} label="Question *">
                    <MenuItem value={0}>
                      <em>Select Question</em>
                    </MenuItem>
                    {questions.map((question) => (
                      <MenuItem key={question.questionId} value={question.questionId}>
                        {question.questionText.length > 60
                          ? `${question.questionText.substring(0, 60)}...`
                          : question.questionText}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.questionId && <FormHelperText>{errors.questionId.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="optionText"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Option Text"
                  required
                  multiline
                  rows={3}
                  error={!!errors.optionText}
                  helperText={errors.optionText?.message}
                />
              )}
            />
            <Controller
              name="optionOrder"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Option Order"
                  type="number"
                  required
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  error={!!errors.optionOrder}
                  helperText={errors.optionOrder?.message}
                />
              )}
            />
            <Controller
              name="isCorrect"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="This is the correct answer"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {selectedOption ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
