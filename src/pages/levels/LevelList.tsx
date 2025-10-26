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
import { useLevels, useCreateLevel, useUpdateLevel, useDeleteLevel } from '../../hooks/useLevels';
import { formatDate } from '../../utils/formatters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import type { LevelResponse } from '../../types/api.types';

const levelSchema = z.object({
  levelName: z.string().min(1, 'Level name is required'),
  difficultyScore: z.number().min(1, 'Difficulty score must be at least 1').max(5, 'Difficulty score must be at most 5'),
  description: z.string().min(1, 'Description is required'),
});

type LevelFormData = z.infer<typeof levelSchema>;

export const LevelList = () => {
  const { data: levels = [], isLoading } = useLevels();
  const createMutation = useCreateLevel();
  const updateMutation = useUpdateLevel();
  const deleteMutation = useDeleteLevel();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<LevelResponse | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LevelFormData>({
    resolver: zodResolver(levelSchema),
    defaultValues: {
      levelName: '',
      difficultyScore: 1,
      description: '',
    },
  });

  const handleOpen = (level?: LevelResponse) => {
    if (level) {
      reset({
        levelName: level.levelName,
        difficultyScore: level.difficultyScore,
        description: level.description,
      });
      setSelectedLevel(level);
    } else {
      reset({
        levelName: '',
        difficultyScore: 1,
        description: '',
      });
      setSelectedLevel(undefined);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedLevel(undefined);
    reset();
  };

  const onSubmit = (data: LevelFormData) => {
    const payload = {
      levelName: data.levelName,
      difficultyScore: data.difficultyScore,
      description: data.description,
    };

    if (selectedLevel) {
      updateMutation.mutate(
        { id: selectedLevel.levelId, data: payload },
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
    if (window.confirm('Are you sure you want to delete this level?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading levels..." />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Difficulty Levels
        </Typography>
        <Button variant="contained" startIcon={<Add />} size="large" onClick={() => handleOpen()}>
          Add Level
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Level Name</TableCell>
              <TableCell>Difficulty Score</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {levels.length > 0 ? (
              levels.map((level: LevelResponse) => (
                <TableRow key={level.levelId} hover>
                  <TableCell>{level.levelId}</TableCell>
                  <TableCell>{level.levelName}</TableCell>
                  <TableCell>{level.difficultyScore}/5</TableCell>
                  <TableCell>{level.description}</TableCell>
                  <TableCell>{formatDate(level.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="info" onClick={() => handleOpen(level)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(level.levelId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    title="No levels found"
                    description="Click 'Add Level' to create your first difficulty level"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedLevel ? 'Edit Level' : 'Add New Level'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="levelName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Level Name"
                  required
                  placeholder="e.g., Easy, Medium, Hard"
                  error={!!errors.levelName}
                  helperText={errors.levelName?.message}
                />
              )}
            />
            <Controller
              name="difficultyScore"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Difficulty Score"
                  type="number"
                  required
                  inputProps={{ min: 1, max: 5 }}
                  placeholder="1-5 (1=Easiest, 5=Hardest)"
                  error={!!errors.difficultyScore}
                  helperText={errors.difficultyScore?.message || 'Enter a score from 1 to 5'}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
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
                  required
                  multiline
                  rows={3}
                  placeholder="e.g., Basic level questions"
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
            {selectedLevel ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
