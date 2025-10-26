import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { pageHeaderStyles, pageTitleStyles } from '../../theme/commonStyles';

interface PageHeaderProps {
  title: string;
  icon?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  subtitle?: string;
}

export const PageHeader = ({ 
  title, 
  icon, 
  buttonText, 
  onButtonClick,
  subtitle 
}: PageHeaderProps) => {
  return (
    <>
      <Box sx={pageHeaderStyles}>
        <Box>
          <Typography variant="h3" component="h1" sx={pageTitleStyles}>
            {icon} {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {buttonText && onButtonClick && (
          <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            onClick={onButtonClick}
            sx={{ 
              px: 3,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </>
  );
};
