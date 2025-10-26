import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  School,
  People,
  Quiz,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';
import { pageContainerStyles, pageTitleStyles, cardStyles, statsIconBoxStyles } from '../../theme/commonStyles';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color,
  trend 
}: { 
  title: string; 
  value: number; 
  icon: React.ReactNode; 
  color: string;
  trend?: string;
}) => (
  <Card sx={{ ...cardStyles }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography 
          color="text.secondary" 
          gutterBottom 
          variant="overline" 
          sx={{ 
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            mb: 0,
          }}
        >
          {title}
        </Typography>
        <Box sx={statsIconBoxStyles(color)}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h3" component="div" fontWeight="bold" sx={{ mb: 1 }}>
        {value.toLocaleString()}
      </Typography>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
          <Typography variant="caption" color="success.main" fontWeight={600}>
            {trend}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <Container maxWidth="lg" sx={pageContainerStyles}>
      {/* Welcome Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" component="h1" sx={pageTitleStyles} gutterBottom>
          Welcome back, {user?.firstName || user?.email}! 👋
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight={400}>
          Here's what's happening with your exams today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={156}
            icon={<People sx={{ fontSize: 28 }} />}
            color="#2563eb"
            trend="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value={24}
            icon={<School sx={{ fontSize: 28 }} />}
            color="#10b981"
            trend="+5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Exams"
            value={42}
            icon={<Assignment sx={{ fontSize: 28 }} />}
            color="#f59e0b"
            trend="+18%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Questions"
            value={328}
            icon={<Quiz sx={{ fontSize: 28 }} />}
            color="#ef4444"
            trend="+24%"
          />
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Card sx={cardStyles}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
            📊 Recent Activities
          </Typography>
          <Box 
            sx={{ 
              py: 6,
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: 'rgba(241, 245, 249, 0.5)',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No recent activities to display
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
