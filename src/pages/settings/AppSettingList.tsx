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
import { Add, Edit, Delete, Settings } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppSettings, useCreateAppSetting, useUpdateAppSetting, useDeleteAppSetting } from '../../hooks/useAppSettings';
import { formatDateTime } from '../../utils/formatters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import type { AppSettingResponse } from '../../types/api.types';

const appSettingSchema = z.object({
  settingKey: z.string().min(1, 'Setting key is required'),
  settingValue: z.string().min(1, 'Setting value is required'),
  description: z.string().optional(),
});

type AppSettingFormData = z.infer<typeof appSettingSchema>;

export const AppSettingList = () => {
  const { data: settings = [], isLoading } = useAppSettings();
  const createMutation = useCreateAppSetting();
  const updateMutation = useUpdateAppSetting();
  const deleteMutation = useDeleteAppSetting();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<AppSettingResponse | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppSettingFormData>({
    resolver: zodResolver(appSettingSchema),
    defaultValues: {
      settingKey: '',
      settingValue: '',
      description: '',
    },
  });

  const handleOpen = (setting?: AppSettingResponse) => {
    if (setting) {
      reset({
        settingKey: setting.settingKey,
        settingValue: setting.settingValue,
        description: setting.description || '',
      });
      setSelectedSetting(setting);
    } else {
      reset({
        settingKey: '',
        settingValue: '',
        description: '',
      });
      setSelectedSetting(undefined);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedSetting(undefined);
    reset();
  };

  const onSubmit = (data: AppSettingFormData) => {
    const payload = {
      settingKey: data.settingKey,
      settingValue: data.settingValue,
      description: data.description || undefined,
    };

    if (selectedSetting) {
      updateMutation.mutate(
        { id: selectedSetting.settingId, data: payload },
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
    if (window.confirm('Are you sure you want to delete this setting?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading settings..." />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Settings fontSize="large" color="primary" />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Application Settings
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} size="large" onClick={() => handleOpen()}>
          Add Setting
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settings.length > 0 ? (
              settings.map((setting: AppSettingResponse) => (
                <TableRow key={setting.settingId} hover>
                  <TableCell>{setting.settingId}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" fontFamily="monospace">
                      {setting.settingKey}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {setting.settingValue.length > 50
                        ? `${setting.settingValue.substring(0, 50)}...`
                        : setting.settingValue}
                    </Typography>
                  </TableCell>
                  <TableCell>{setting.description || 'N/A'}</TableCell>
                  <TableCell>{formatDateTime(setting.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="info" onClick={() => handleOpen(setting)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(setting.settingId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    title="No settings found"
                    description="Click 'Add Setting' to configure application settings"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedSetting ? 'Edit Setting' : 'Add New Setting'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="settingKey"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Setting Key"
                  required
                  placeholder="e.g., APP_NAME, MAX_UPLOAD_SIZE"
                  disabled={!!selectedSetting}
                  error={!!errors.settingKey}
                  helperText={errors.settingKey?.message || (selectedSetting ? 'Key cannot be changed' : '')}
                />
              )}
            />
            <Controller
              name="settingValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Setting Value"
                  required
                  multiline
                  rows={2}
                  error={!!errors.settingValue}
                  helperText={errors.settingValue?.message}
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
            {selectedSetting ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
