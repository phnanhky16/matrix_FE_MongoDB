import type { SxProps, Theme } from '@mui/material/styles';

// Page Container Styles
export const pageContainerStyles: SxProps<Theme> = {
  mt: 4,
  mb: 4,
};

// Page Header Styles
export const pageHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
  flexWrap: 'wrap',
  gap: 2,
};

// Page Title Styles
export const pageTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  mb: 0,
};

// Table Container Styles
export const tableContainerStyles: SxProps<Theme> = {
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  borderRadius: 3,
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  transition: 'box-shadow 0.3s ease',
};

// Table Row Hover Styles
export const tableRowStyles: SxProps<Theme> = {
  '&:hover': {
    backgroundColor: 'rgba(37, 99, 235, 0.04)',
  },
  transition: 'background-color 0.2s ease',
};

// Action Button Styles
export const actionButtonStyles = (color: string): SxProps<Theme> => ({
  color,
  '&:hover': {
    backgroundColor: `${color}15`,
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease',
});

// Status Badge Styles
export const statusBadgeStyles = (status: string): SxProps<Theme> => {
  const statusColors: Record<string, { bg: string; color: string }> = {
    ACTIVE: { bg: '#dcfce7', color: '#166534' },
    INACTIVE: { bg: '#fee2e2', color: '#991b1b' },
    DRAFT: { bg: '#fef3c7', color: '#92400e' },
    PUBLISHED: { bg: '#dbeafe', color: '#1e40af' },
    SCHEDULED: { bg: '#e0e7ff', color: '#3730a3' },
  };

  const colors = statusColors[status] || { bg: '#f1f5f9', color: '#475569' };

  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.75rem',
    px: 1.5,
    py: 0.5,
    borderRadius: 1.5,
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };
};

// Card Styles
export const cardStyles: SxProps<Theme> = {
  height: '100%',
  borderRadius: 3,
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    transform: 'translateY(-4px)',
  },
};

// Dialog Styles
export const dialogTitleStyles: SxProps<Theme> = {
  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  color: 'white',
  fontWeight: 600,
};

// Form Section Styles
export const formSectionStyles: SxProps<Theme> = {
  mb: 3,
  p: 2.5,
  borderRadius: 2,
  backgroundColor: 'rgba(241, 245, 249, 0.5)',
  border: '1px solid #e2e8f0',
};

// Empty State Styles
export const emptyStateStyles: SxProps<Theme> = {
  py: 8,
  textAlign: 'center',
  color: 'text.secondary',
};

// Loading Overlay Styles
export const loadingOverlayStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
};

// Stats Card Icon Box Styles
export const statsIconBoxStyles = (color: string): SxProps<Theme> => ({
  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
  borderRadius: 2.5,
  p: 1.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: `0 4px 12px ${color}40`,
});

// Search Box Styles
export const searchBoxStyles: SxProps<Theme> = {
  backgroundColor: 'white',
  borderRadius: 2,
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
  },
};

// Badge Styles
export const badgeStyles = (color: string, bgColor: string): SxProps<Theme> => ({
  backgroundColor: bgColor,
  color,
  px: 1.5,
  py: 0.5,
  borderRadius: 1.5,
  fontSize: '0.75rem',
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
});
