import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Chip,
  Avatar,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Rating,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingIcon,
  HealthAndSafety as HealthIcon,
  Psychology as PsychologyIcon,
  LocalHospital as HospitalIcon,
  Restaurant as DietIcon,
  FitnessCenter as ExerciseIcon,
  Spa as SpaIcon,
  WbSunny as SunIcon,
  Bed as SleepIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SkinHealthTrackerPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [healthScore, setHealthScore] = useState(85);
  const [progressData, setProgressData] = useState({
    skinHealth: 85,
    hydration: 78,
    sleep: 82,
    exercise: 65,
    diet: 72,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const healthTips = [
    {
      category: 'Daily Routine',
      icon: <SpaIcon color="primary" />,
      tips: [
        'Cleanse your skin twice daily',
        'Apply moisturizer within 3 minutes of showering',
        'Use sunscreen every morning (SPF 30+)',
        'Remove makeup before bed',
      ],
    },
    {
      category: 'Nutrition',
      icon: <DietIcon color="success" />,
      tips: [
        'Eat foods rich in antioxidants (berries, leafy greens)',
        'Include omega-3 fatty acids (fish, nuts)',
        'Stay hydrated (8+ glasses of water daily)',
        'Limit processed sugars and dairy if acne-prone',
      ],
    },
    {
      category: 'Lifestyle',
      icon: <ExerciseIcon color="secondary" />,
      tips: [
        'Get 7-9 hours of quality sleep',
        'Exercise regularly (150 minutes/week)',
        'Manage stress through meditation or yoga',
        'Avoid smoking and limit alcohol',
      ],
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          🩺 Skin Health Tracker
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Monitor your skin health journey with personalized insights and progress tracking
        </Typography>
      </Box>

      {/* Health Score Overview */}
      <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '8px solid',
                    borderColor: 'grey.200',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '8px solid transparent',
                    borderTopColor: healthScore > 80 ? 'success.main' : healthScore > 60 ? 'warning.main' : 'error.main',
                    transform: `rotate(${(healthScore / 100) * 360}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {healthScore}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" gutterBottom>
                Overall Health Score
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {healthScore > 80 ? 'Excellent' : healthScore > 60 ? 'Good' : 'Needs Improvement'}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Progress Overview
            </Typography>

            <Grid container spacing={2}>
              {Object.entries(progressData).map(([key, value]) => (
                <Grid item xs={6} sm={3} key={key}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={value}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: value > 80 ? 'success.main' : value > 60 ? 'warning.main' : 'error.main',
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {value}%
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.8rem', md: '1rem' },
              minHeight: 64,
            }
          }}
        >
          <Tab icon={<AssessmentIcon />} label="Health Metrics" />
          <Tab icon={<TimelineIcon />} label="Progress Tracking" />
          <Tab icon={<FavoriteIcon />} label="Recommendations" />
          <Tab icon={<CalendarIcon />} label="Health Journal" />
        </Tabs>
      </Paper>

      {/* Health Metrics Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Today's Metrics
                </Typography>

                <Grid container spacing={3}>
                  {[
                    { label: 'Skin Moisture', value: 78, unit: '%', color: 'info' },
                    { label: 'UV Exposure', value: 45, unit: 'min', color: 'warning' },
                    { label: 'Sleep Quality', value: 82, unit: '%', color: 'success' },
                    { label: 'Water Intake', value: 6, unit: 'glasses', color: 'primary' },
                  ].map((metric, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          bgcolor: `${metric.color}.light`,
                          color: `${metric.color}.contrastText`,
                        }}
                      >
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                          {metric.value}
                        </Typography>
                        <Typography variant="body2">
                          {metric.label}
                        </Typography>
                        <Typography variant="caption">
                          {metric.unit}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Quick Actions
                </Typography>

                <List>
                  {[
                    { label: 'Log Water Intake', icon: <DietIcon />, action: () => {} },
                    { label: 'Record Sleep', icon: <SleepIcon />, action: () => {} },
                    { label: 'Track Exercise', icon: <ExerciseIcon />, action: () => {} },
                    { label: 'Add Skin Notes', icon: <HealthIcon />, action: () => {} },
                  ].map((action, index) => (
                    <ListItem button key={index} onClick={action.action}>
                      <ListItemIcon>
                        {action.icon}
                      </ListItemIcon>
                      <ListItemText primary={action.label} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Progress Tracking Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  30-Day Progress
                </Typography>

                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    📊 Interactive progress chart coming soon...
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Weekly Goals
                </Typography>

                <List>
                  {[
                    { goal: 'Drink 8 glasses of water daily', progress: 85 },
                    { goal: 'Apply sunscreen every day', progress: 92 },
                    { goal: 'Get 7+ hours of sleep', progress: 78 },
                    { goal: 'Exercise 3+ times per week', progress: 65 },
                  ].map((goal, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{goal.goal}</Typography>
                        <Typography variant="body2">{goal.progress}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={goal.progress} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Recommendations Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={4}>
          {healthTips.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {category.icon}
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                      {category.category}
                    </Typography>
                  </Box>

                  <List dense>
                    {category.tips.map((tip, tipIndex) => (
                      <ListItem key={tipIndex} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <FavoriteIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Health Journal Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Daily Journal Entry
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="How does your skin feel today? Any changes or concerns?"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary">
                    Save Entry
                  </Button>
                  <Button variant="outlined">
                    Add Photo
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Recent Entries
                </Typography>

                <List>
                  {[
                    { date: 'Today', preview: 'Skin feels dry in T-zone area...' },
                    { date: 'Yesterday', preview: 'Applied new moisturizer, seems better...' },
                    { date: '2 days ago', preview: 'Mild redness after sun exposure...' },
                  ].map((entry, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={entry.date}
                        secondary={entry.preview}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <HealthIcon />
      </Fab>
    </Container>
  );
};

export default SkinHealthTrackerPage;
