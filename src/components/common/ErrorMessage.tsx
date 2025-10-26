import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon, Refresh } from '@mui/icons-material';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 2,
        textAlign: 'center',
      }}
    >
      <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
      <Typography variant="h6" fontWeight="bold">
        Oops!
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth="400px">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" startIcon={<Refresh />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Box>
  );
};
