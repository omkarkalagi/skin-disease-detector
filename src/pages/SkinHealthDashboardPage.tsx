import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  LinearProgress,
  CircularProgress,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Tooltip,
  Fab,
  Badge,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Notifications as NotificationIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  PhotoCamera as CameraIcon,
  Assessment as AssessmentIcon,
  Spa as SpaIcon,
  LocalHospital as TreatmentIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Favorite as HeartIcon,
  WaterDrop as HydrationIcon,
  WbSunny as SunIcon,
  NightsStay as SleepIcon,
  FitnessCenter as ExerciseIcon,
  Restaurant as NutritionIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SkinHealthDashboardPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [notifications, setNotifications] = useState(true);
  const [openAddEntry, setOpenAddEntry] = useState(false);
  const [skinScore, setSkinScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate loading and data animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setSkinScore(85);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const healthMetrics = [
    {
      title: 'Skin Health Score',
      value: skinScore,
      max: 100,
      color: '#4caf50',
      icon: <HeartIcon />,
      trend: '+5%',
      trendUp: true,
      description: 'Overall skin condition assessment'
    },
    {
      title: 'Hydration Level',
      value: 78,
      max: 100,
      color: '#2196f3',
      icon: <HydrationIcon />,
      trend: '+2%',
      trendUp: true,
      description: 'Skin moisture and hydration'
    },
    {
      title: 'Sun Protection',
      value: 92,
      max: 100,
      color: '#ff9800',
      icon: <SunIcon />,
      trend: '+8%',
      trendUp: true,
      description: 'UV protection compliance'
    },
    {
      title: 'Sleep Quality',
      value: 65,
      max: 100,
      color: '#9c27b0',
      icon: <SleepIcon />,
      trend: '-3%',
      trendUp: false,
      description: 'Sleep impact on skin health'
    }
  ];

  const recentActivities = [
    {
      type: 'scan',
      title: 'Skin Analysis Completed',
      description: 'No concerning areas detected',
      time: '2 hours ago',
      status: 'success',
      icon: <AssessmentIcon />
    },
    {
      type: 'treatment',
      title: 'Applied Moisturizer',
      description: 'Evening skincare routine',
      time: '5 hours ago',
      status: 'info',
      icon: <SpaIcon />
    },
    {
      type: 'reminder',
      title: 'Sunscreen Reminder',
      description: 'Time to reapply SPF 30+',
      time: '1 day ago',
      status: 'warning',
      icon: <SunIcon />
    },
    {
      type: 'appointment',
      title: 'Dermatologist Visit',
      description: 'Scheduled for next week',
      time: '3 days ago',
      status: 'info',
      icon: <TreatmentIcon />
    }
  ];

  const upcomingTasks = [
    {
      title: 'Morning Skincare Routine',
      time: '8:00 AM',
      completed: true,
      priority: 'high'
    },
    {
      title: 'Apply Sunscreen',
      time: '9:00 AM',
      completed: true,
      priority: 'high'
    },
    {
      title: 'Hydration Check',
      time: '2:00 PM',
      completed: false,
      priority: 'medium'
    },
    {
      title: 'Evening Skincare',
      time: '9:00 PM',
      completed: false,
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#2196f3';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      default: return '#4caf50';
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading your skin health dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" className="gradient-text">
            Skin Health Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Period</InputLabel>
              <Select
                value={selectedPeriod}
                label="Period"
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
            <IconButton color="primary">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Track your skin health journey and get personalized insights
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Health Metrics */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {healthMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  className="hover-card"
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: metric.color, mr: 2 }}>
                        {metric.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {metric.value}%
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {metric.trendUp ? (
                            <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16 }} />
                          ) : (
                            <TrendingDownIcon sx={{ color: '#f44336', fontSize: 16 }} />
                          )}
                          <Typography 
                            variant="caption" 
                            sx={{ color: metric.trendUp ? '#4caf50' : '#f44336' }}
                          >
                            {metric.trend}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" fontWeight="medium" gutterBottom>
                      {metric.title}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: metric.color,
                          borderRadius: 4
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {metric.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Activities
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddEntry(true)}
                  size="small"
                >
                  Add Entry
                </Button>
              </Box>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            bgcolor: getStatusColor(activity.status),
                            width: 40,
                            height: 40
                          }}
                        >
                          {activity.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight="medium">
                            {activity.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip
                        label={activity.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(activity.status),
                          color: 'white',
                          textTransform: 'capitalize'
                        }}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Tasks */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Today's Tasks
              </Typography>
              <List>
                {upcomingTasks.map((task, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <IconButton size="small">
                        {task.completed ? (
                          <CheckIcon sx={{ color: '#4caf50' }} />
                        ) : (
                          <ScheduleIcon sx={{ color: getPriorityColor(task.priority) }} />
                        )}
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.7 : 1
                          }}
                        >
                          {task.title}
                        </Typography>
                      }
                      secondary={task.time}
                    />
                    <Chip
                      label={task.priority}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: getPriorityColor(task.priority),
                        color: getPriorityColor(task.priority),
                        fontSize: '0.7rem'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<CameraIcon />}
                onClick={() => navigate('/detect')}
                sx={{ bgcolor: '#ff6b6b' }}
              >
                Scan Skin
              </Button>
              <Button
                variant="contained"
                startIcon={<AssessmentIcon />}
                onClick={() => navigate('/symptom-checker')}
                sx={{ bgcolor: '#4ecdc4' }}
              >
                Symptom Check
              </Button>
              <Button
                variant="contained"
                startIcon={<SpaIcon />}
                onClick={() => navigate('/skin-care-tips')}
                sx={{ bgcolor: '#45b7d1' }}
              >
                Care Tips
              </Button>
              <Button
                variant="contained"
                startIcon={<TreatmentIcon />}
                onClick={() => navigate('/treatments')}
                sx={{ bgcolor: '#96ceb4' }}
              >
                Treatments
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: '#667eea',
          '&:hover': { bgcolor: '#5a67d8' }
        }}
        onClick={() => setOpenAddEntry(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Entry Dialog */}
      <Dialog open={openAddEntry} onClose={() => setOpenAddEntry(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Health Entry</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Entry Type"
              select
              margin="normal"
              defaultValue="routine"
            >
              <MenuItem value="routine">Skincare Routine</MenuItem>
              <MenuItem value="symptom">Symptom</MenuItem>
              <MenuItem value="treatment">Treatment</MenuItem>
              <MenuItem value="note">General Note</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              margin="normal"
              placeholder="Describe your skin health activity..."
            />
            <FormControlLabel
              control={<Switch />}
              label="Set reminder for tomorrow"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEntry(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAddEntry(false)}>
            Add Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SkinHealthDashboardPage;