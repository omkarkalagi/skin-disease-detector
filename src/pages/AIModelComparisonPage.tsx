import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
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
  LinearProgress,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Science as ScienceIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  CompareArrows as CompareIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
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

const AIModelComparisonPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const models = [
    {
      name: 'SkinSight AI',
      version: 'v3.2',
      accuracy: 96.5,
      speed: 1.2,
      conditions: 18,
      features: ['Real-time analysis', 'Multi-condition detection', 'Treatment recommendations', 'Mobile optimized'],
      strengths: ['Highest accuracy', 'Fastest processing', 'Most conditions covered', 'User-friendly interface'],
      image: '/images/models/skinsight.jpg',
    },
    {
      name: 'DermaNet Pro',
      version: 'v2.8',
      accuracy: 94.2,
      speed: 2.1,
      conditions: 15,
      features: ['Batch processing', 'Advanced filtering', 'API integration', 'Enterprise features'],
      strengths: ['Robust API', 'Batch processing', 'Enterprise support', 'Advanced analytics'],
      image: '/images/models/dermanet.jpg',
    },
    {
      name: 'SkinAI Assistant',
      version: 'v1.9',
      accuracy: 91.8,
      speed: 0.8,
      conditions: 12,
      features: ['Voice commands', 'Smart suggestions', 'Learning mode', 'Offline capability'],
      strengths: ['Voice interface', 'Offline mode', 'Adaptive learning', 'Intuitive design'],
      image: '/images/models/skinai.jpg',
    },
    {
      name: 'MedicalAI Scan',
      version: 'v2.1',
      accuracy: 93.7,
      speed: 1.8,
      conditions: 14,
      features: ['3D modeling', 'Comparison tools', 'Medical reports', 'Integration ready'],
      strengths: ['3D visualization', 'Medical reports', 'Integration APIs', 'Professional tools'],
      image: '/images/models/medicalai.jpg',
    },
  ];

  const benchmarks = [
    { metric: 'Accuracy', skinsight: 96.5, dermanet: 94.2, skinai: 91.8, medicalai: 93.7 },
    { metric: 'Speed (seconds)', skinsight: 1.2, dermanet: 2.1, skinai: 0.8, medicalai: 1.8 },
    { metric: 'Conditions Detected', skinsight: 18, dermanet: 15, skinai: 12, medicalai: 14 },
    { metric: 'User Satisfaction', skinsight: 4.8, dermanet: 4.5, skinai: 4.3, medicalai: 4.6 },
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
          🤖 AI Model Comparison
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Compare leading dermatology AI models and discover why SkinSight AI leads the industry
        </Typography>
      </Box>

      {/* Model Cards */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Featured AI Models
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {models.map((model, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                },
              }}
            >
              {index === 0 && (
                <Chip
                  label="Our Choice"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'success.main',
                    color: 'white',
                  }}
                />
              )}

              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  <ScienceIcon sx={{ fontSize: 40 }} />
                </Avatar>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {model.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Version {model.version}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Accuracy</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {model.accuracy}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={model.accuracy}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: model.accuracy > 95 ? 'success.main' : 'primary.main',
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Key Features:
                  </Typography>
                  <List dense>
                    {model.features.slice(0, 2).map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} primaryTypographyProps={{ variant: 'caption' }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Button variant="outlined" fullWidth>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Comparison Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab icon={<CompareIcon />} label="Performance Comparison" />
          <Tab icon={<AssessmentIcon />} label="Benchmark Results" />
          <Tab icon={<TimelineIcon />} label="Feature Analysis" />
        </Tabs>
      </Paper>

      {/* Performance Comparison */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Side-by-Side Comparison
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Metric</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>SkinSight AI</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>DermaNet Pro</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>SkinAI Assistant</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>MedicalAI Scan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {benchmarks.map((benchmark, index) => (
                        <TableRow key={index}>
                          <TableCell>{benchmark.metric}</TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                              {benchmark.skinsight}{typeof benchmark.skinsight === 'number' && benchmark.metric.includes('Speed') ? 's' : benchmark.metric.includes('Accuracy') || benchmark.metric.includes('Satisfaction') ? '%' : ''}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {benchmark.dermanet}{typeof benchmark.dermanet === 'number' && benchmark.metric.includes('Speed') ? 's' : benchmark.metric.includes('Accuracy') || benchmark.metric.includes('Satisfaction') ? '%' : ''}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {benchmark.skinai}{typeof benchmark.skinai === 'number' && benchmark.metric.includes('Speed') ? 's' : benchmark.metric.includes('Accuracy') || benchmark.metric.includes('Satisfaction') ? '%' : ''}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {benchmark.medicalai}{typeof benchmark.medicalai === 'number' && benchmark.metric.includes('Speed') ? 's' : benchmark.metric.includes('Accuracy') || benchmark.metric.includes('Satisfaction') ? '%' : ''}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Why SkinSight AI?
                </Typography>

                <List>
                  {[
                    'Highest accuracy in the market',
                    'Fastest processing speed',
                    'Most comprehensive condition coverage',
                    'User-friendly mobile interface',
                    'Continuous model improvements',
                  ].map((reason, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <StarIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={reason} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Benchmark Results */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Accuracy Benchmark
                </Typography>

                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    📊 Interactive accuracy comparison chart
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Speed Benchmark
                </Typography>

                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    ⚡ Performance comparison visualization
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Feature Analysis */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={4}>
          {models.map((model, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <ScienceIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {model.name} {model.version}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {model.conditions} conditions • {model.accuracy}% accuracy
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Key Features:
                  </Typography>

                  <List>
                    {model.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                    Strengths:
                  </Typography>

                  <List>
                    {model.strengths.map((strength, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <StarIcon color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={strength} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Industry Recognition */}
      <Paper elevation={3} sx={{ p: 4, mt: 6, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          🏆 Industry Recognition
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                #1
              </Typography>
              <Typography variant="h6" gutterBottom>
                Accuracy Leader
              </Typography>
              <Typography variant="body2">
                Highest accuracy rate among all dermatology AI platforms
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                50K+
              </Typography>
              <Typography variant="h6" gutterBottom>
                Happy Users
              </Typography>
              <Typography variant="body2">
                Trusted by healthcare professionals and patients worldwide
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                18
              </Typography>
              <Typography variant="h6" gutterBottom>
                Conditions
              </Typography>
              <Typography variant="body2">
                Most comprehensive skin condition detection coverage
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* CTA Section */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ready to Experience the Best?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of users who trust SkinSight AI for accurate, fast, and comprehensive skin analysis
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}
          >
            Try SkinSight AI Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderColor: '#4ecdc4', color: '#4ecdc4', '&:hover': { borderColor: '#45b7d1', bgcolor: 'rgba(78, 205, 196, 0.1)' } }}
          >
            Compare Features
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AIModelComparisonPage;
