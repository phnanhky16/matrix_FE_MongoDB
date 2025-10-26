import { Box, Typography } from '@mui/material';
import { Inbox } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data available',
  description = 'There is nothing to display here yet.',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        gap: 2,
        textAlign: 'center',
      }}
    >
      <Inbox sx={{ fontSize: 60, color: 'text.disabled' }} />
      <Typography variant="h6" fontWeight="bold" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" maxWidth="400px">
        {description}
      </Typography>
    </Box>
  );
};
