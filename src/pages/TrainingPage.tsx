import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingIcon,
  Science as ScienceIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Medication as MedicationIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

interface TrainingProgress {
  isTraining: boolean;
  progress: number;
  status: string;
  accuracy?: number;
  loss?: number;
  epoch?: number;
  totalEpochs?: number;
}

interface DiseaseStats {
  name: string;
  count: number;
  accuracy: number;
  color: string;
}

const TrainingPage = () => {
  const [trainingProgress, setTrainingProgress] = useState<TrainingProgress>({
    isTraining: false,
    progress: 0,
    status: 'idle'
  });
  const [trainingHistory, setTrainingHistory] = useState<any[]>([]);
  const [diseaseStats, setDiseaseStats] = useState<DiseaseStats[]>([]);
  const [trainingConfig, setTrainingConfig] = useState({
    epochs: 100,
    samples: 10000,
    learningRate: 0.01,
    batchSize: 32
  });
  const [showResults, setShowResults] = useState(false);
  const [lastTrainingResults, setLastTrainingResults] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Training progress chart data
  const progressChartData = {
    labels: trainingHistory.map((_, index) => `Epoch ${index + 1}`),
    datasets: [
      {
        label: 'Training Accuracy',
        data: trainingHistory.map(h => h.accuracy || 0),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Training Loss',
        data: trainingHistory.map(h => h.loss || 0),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      }
    ]
  };

  const accuracyChartData = {
    labels: diseaseStats.map(d => d.name),
    datasets: [
      {
        data: diseaseStats.map(d => d.accuracy),
        backgroundColor: diseaseStats.map(d => d.color),
        borderColor: diseaseStats.map(d => '#fff'),
        borderWidth: 2,
      }
    ]
  };

  useEffect(() => {
    if (trainingProgress.isTraining) {
      intervalRef.current = setInterval(fetchTrainingProgress, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [trainingProgress.isTraining]);

  const fetchTrainingProgress = async () => {
    try {
      const response = await fetch('/api/training/progress');
      const data = await response.json();
      setTrainingProgress(data);

      if (data.history) {
        setTrainingHistory(data.history);
      }
    } catch (error) {
      console.error('Failed to fetch training progress:', error);
    }
  };

  const startTraining = async () => {
    try {
      setTrainingProgress({
        isTraining: true,
        progress: 0,
        status: 'starting'
      });

      const response = await fetch('/api/training/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainingConfig),
      });

      const result = await response.json();

      if (result.success) {
        setLastTrainingResults(result);
        setShowResults(true);
        fetchDiseaseStats();
      }
    } catch (error) {
      console.error('Failed to start training:', error);
      setTrainingProgress({
        isTraining: false,
        progress: 0,
        status: 'error'
      });
    }
  };

  const stopTraining = async () => {
    try {
      await fetch('/api/training/stop', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to stop training:', error);
    }
  };

  const fetchDiseaseStats = async () => {
    try {
      const response = await fetch('/api/training/stats');
      const data = await response.json();
      setDiseaseStats(data);
    } catch (error) {
      console.error('Failed to fetch disease stats:', error);
    }
  };

  const handleConfigChange = (field: string, value: any) => {
    setTrainingConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        AI Model Training Center
      </Typography>

      <Grid container spacing={4}>
        {/* Training Controls */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <ScienceIcon sx={{ mr: 1 }} />
                Training Configuration
              </Typography>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Training Epochs"
                  type="number"
                  value={trainingConfig.epochs}
                  onChange={(e) => handleConfigChange('epochs', parseInt(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Training Samples"
                  type="number"
                  value={trainingConfig.samples}
                  onChange={(e) => handleConfigChange('samples', parseInt(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Learning Rate"
                  type="number"
                  inputProps={{
                    step: "0.001"
                  }}
                  value={trainingConfig.learningRate}
                  onChange={(e) => handleConfigChange('learningRate', parseFloat(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Batch Size"
                  type="number"
                  value={trainingConfig.batchSize}
                  onChange={(e) => handleConfigChange('batchSize', parseInt(e.target.value))}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayIcon />}
                  onClick={startTraining}
                  disabled={trainingProgress.isTraining}
                  fullWidth
                >
                  Start Training
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<StopIcon />}
                  onClick={stopTraining}
                  disabled={!trainingProgress.isTraining}
                  fullWidth
                >
                  Stop Training
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Training Progress */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Training Progress
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {trainingProgress.progress.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={trainingProgress.progress}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={trainingProgress.status}
                  color={trainingProgress.status === 'training' ? 'primary' : 'default'}
                  size="small"
                />
              </Box>

              {trainingProgress.epoch && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Epoch
                  </Typography>
                  <Typography variant="body2">
                    {trainingProgress.epoch} / {trainingProgress.totalEpochs}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Disease Statistics */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <AnalyticsIcon sx={{ mr: 1 }} />
                Disease Coverage
              </Typography>

              <Box sx={{ height: 200, mt: 2 }}>
                <Doughnut
                  data={{
                    labels: diseaseStats.map(d => d.name),
                    datasets: [{
                      data: diseaseStats.map(d => d.count),
                      backgroundColor: diseaseStats.map(d => d.color),
                      borderWidth: 2,
                      borderColor: '#fff'
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 10,
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Training Charts */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Progress Chart */}
            <Grid item xs={12}>
              <Card sx={{ height: 400 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <TrendingIcon sx={{ mr: 1 }} />
                    Training Progress Over Time
                  </Typography>

                  <Box sx={{ height: 300 }}>
                    <Line
                      data={progressChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100
                          }
                        },
                        plugins: {
                          legend: {
                            position: 'top',
                          }
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Accuracy Distribution */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 350 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Disease Detection Accuracy
                  </Typography>

                  <Box sx={{ height: 250 }}>
                    <Doughnut
                      data={accuracyChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              padding: 8,
                              font: {
                                size: 9
                              }
                            }
                          }
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Training Statistics */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 350 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Training Statistics
                  </Typography>

                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total Diseases"
                        secondary={`${diseaseStats.length} conditions covered`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Training Samples"
                        secondary={`${trainingConfig.samples.toLocaleString()} generated`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AnalyticsIcon color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Model Accuracy"
                        secondary={lastTrainingResults ? `${lastTrainingResults.accuracy.toFixed(1)}%` : 'Not available'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ScienceIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Neural Network"
                        secondary="128-64-32 hidden layers"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Training Results Dialog */}
      <Dialog open={showResults} onClose={() => setShowResults(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <CheckIcon color="success" sx={{ mr: 1 }} />
          Training Completed Successfully!
        </DialogTitle>
        <DialogContent>
          {lastTrainingResults && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Model training completed with {lastTrainingResults.accuracy.toFixed(1)}% accuracy!
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Training Summary
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Accuracy"
                        secondary={`${lastTrainingResults.accuracy.toFixed(2)}%`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Training Samples"
                        secondary={lastTrainingResults.samples.toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Epochs"
                        secondary={lastTrainingResults.epochs}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Training Time"
                        secondary={`${Math.floor((Date.now() - new Date(lastTrainingResults.trainingTime).getTime()) / 1000)}s`}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Model Capabilities
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Disease Classification" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Severity Assessment" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Treatment Recommendations" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Real-time Detection" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResults(false)}>Close</Button>
          <Button variant="contained" onClick={() => setShowResults(false)}>
            Continue to Detection
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TrainingPage;
