import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, IconButton, Chip, Avatar, Paper, Fab, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, Rating, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CameraAlt as CameraIcon, Upload as UploadIcon, Science as ScienceIcon, LocalHospital as TreatmentIcon, Assessment as AssessmentIcon, Spa as SpaIcon, Speed as SpeedIcon, Security as SecurityIcon, Star as StarIcon, Close as CloseIcon, PlayArrow as PlayIcon, Info as InfoIcon, } from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [stats, setStats] = useState({ users: 0, accuracy: 0, conditions: 0 });

  // Animate stats on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ users: 50000, accuracy: 95, conditions: 15 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Live Camera Detection',
      description: 'Real-time skin analysis using your device camera with instant results',
      icon: <CameraIcon sx={{ fontSize: 48, color: '#ff6b6b' }} />,
      image: '/images/live-detection.jpg',
      route: '/detect',
      badge: 'Popular',
      rating: 4.8,
      features: ['Real-time analysis', 'Instant results', 'No upload needed', 'Mobile optimized']
    },
    {
      title: 'Upload Image Analysis',
      description: 'Upload high-quality photos for detailed skin condition analysis',
      icon: <UploadIcon sx={{ fontSize: 48, color: '#4ecdc4' }} />,
      image: '/images/upload-analysis.jpg',
      route: '/upload',
      badge: 'Precise',
      rating: 4.9,
      features: ['High resolution', 'Multiple formats', 'Detailed reports', 'Save history']
    },
    {
      title: 'AI Symptom Checker',
      description: 'Interactive questionnaire for preliminary skin condition assessment',
      icon: <AssessmentIcon sx={{ fontSize: 48, color: '#45b7d1' }} />,
      image: '/images/symptom-checker.jpg',
      route: '/symptom-checker',
      badge: 'New',
      rating: 4.7,
      features: ['Step-by-step guide', 'Multiple symptoms', 'Instant results', 'Recommendations']
    },
    {
      title: 'Skin Care Tips',
      description: 'Personalized skincare routines and expert advice for healthy skin',
      icon: <SpaIcon sx={{ fontSize: 48, color: '#96ceb4' }} />,
      image: '/images/skincare-tips.jpg',
      route: '/skin-care-tips',
      badge: 'Essential',
      rating: 4.9,
      features: ['Daily routines', 'Seasonal care', 'Condition-specific', 'Expert advice']
    },
    {
      title: 'AI Training Dashboard',
      description: 'Watch our AI model train and improve with real-time progress tracking',
      icon: <ScienceIcon sx={{ fontSize: 48, color: '#feca57' }} />,
      image: '/images/ai-training.jpg',
      route: '/training',
      badge: 'Advanced',
      rating: 4.6,
      features: ['Live training', 'Progress tracking', 'Model insights', 'Performance metrics']
    },
    {
      title: 'Treatment Guide',
      description: 'Comprehensive treatment information and medication recommendations',
      icon: <TreatmentIcon sx={{ fontSize: 48, color: '#ff9ff3' }} />,
      image: '/images/treatment-guide.jpg',
      route: '/treatments',
      badge: 'Complete',
      rating: 4.8,
      features: ['Medical treatments', 'Home remedies', 'Lifestyle advice', 'Prevention tips']
    }
  ];

  const statsData = [
    {
      value: stats.users,
      suffix: '+',
      label: 'Happy Users',
      icon: <StarIcon color="primary" />,
      color: '#ff6b6b'
    },
    {
      value: stats.accuracy,
      suffix: '%',
      label: 'Accuracy Rate',
      icon: <SpeedIcon color="success" />,
      color: '#4ecdc4'
    },
    {
      value: stats.conditions,
      suffix: '+',
      label: 'Conditions Detected',
      icon: <SecurityIcon color="warning" />,
      color: '#45b7d1'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Chip
                  label="AI-Powered Dermatology"
                  sx={{
                    mb: 3,
                    fontSize: '0.9rem',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '& .MuiChip-label': { fontWeight: 'bold' }
                  }}
                />
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Advanced Skin Disease Detection
                </Typography>
                <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6 }}>
                  Get instant, accurate skin analysis with our AI-powered platform.
                  <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>Early detection saves lives.</span>
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CameraIcon />}
                    onClick={() => navigate('/detect')}
                    sx={{
                      bgcolor: '#ff6b6b',
                      color: 'white',
                      fontSize: '1.1rem',
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        bgcolor: '#ff5252',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Live Detection
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayIcon />}
                    onClick={() => setShowDemo(true)}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontSize: '1.1rem',
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        borderColor: '#4ecdc4',
                        bgcolor: 'rgba(78, 205, 196, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Watch Demo
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {statsData.map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: stat.color, mr: 1 }}>
                          {stat.icon}
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 'bold',
                            background: `linear-gradient(45deg, ${stat.color}, #ffffff)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {typeof stat.value === 'number' && stat.value > 1000
                            ? `${(stat.value / 1000).toFixed(0)}k`
                            : stat.value
                          }{stat.suffix}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-skin-analysis.jpg"
                alt="Skin Analysis"
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'rotate(2deg)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(0deg) scale(1.02)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Powerful Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Comprehensive skin health analysis tools designed for accuracy and ease of use
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    bgcolor: `linear-gradient(90deg, ${index % 2 === 0 ? '#ff6b6b' : '#4ecdc4'}, ${index % 3 === 0 ? '#45b7d1' : '#96ceb4'})`,
                  }
                }}
                onClick={() => setSelectedFeature(feature)}
              >
                {feature.badge && (
                  <Chip
                    label={feature.badge}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                      bgcolor: feature.badge === 'New' ? '#ff6b6b' : feature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
                      color: 'white',
                    }}
                  />
                )}

                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: -8,
                        borderRadius: '50%',
                        bgcolor: `${feature.badge === 'New' ? '#ff6b6b' : feature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1'}15`,
                        transform: 'scale(0.8)',
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        '.MuiCard-root:hover &': {
                          opacity: 1,
                          transform: 'scale(1)',
                        }
                      }}
                    />
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: `${feature.badge === 'New' ? '#ff6b6b' : feature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1'}`,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Rating value={feature.rating} readOnly size="small" />
                    <Typography variant="caption" sx={{ ml: 1, color: 'primary.main' }}>
                      ({feature.rating})
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(feature.route);
                    }}
                    sx={{
                      borderColor: `${feature.badge === 'New' ? '#ff6b6b' : feature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1'}`,
                      color: `${feature.badge === 'New' ? '#ff6b6b' : feature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1'}`,
                      '&:hover': {
                        borderColor: `${feature.badge === 'New' ? '#ff5252' : feature.badge === 'Popular' ? '#45b7d1' : '#36a2a8'}`,
                        bgcolor: `${feature.badge === 'New' ? '#ff6b6b' : feature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1'}15`,
                      }
                    }}
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Simple steps to get your skin analysis
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '1',
                title: 'Capture or Upload',
                description: 'Use your camera for live detection or upload a clear photo of the affected area',
                icon: <CameraIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />,
                bgColor: 'rgba(255, 107, 107, 0.1)',
                borderColor: '#ff6b6b'
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our advanced AI model analyzes the image using deep learning algorithms',
                icon: <ScienceIcon sx={{ fontSize: 40, color: '#4ecdc4' }} />,
                bgColor: 'rgba(78, 205, 196, 0.1)',
                borderColor: '#4ecdc4'
              },
              {
                step: '3',
                title: 'Get Results',
                description: 'Receive instant results with confidence scores and detailed explanations',
                icon: <AssessmentIcon sx={{ fontSize: 40, color: '#45b7d1' }} />,
                bgColor: 'rgba(69, 183, 209, 0.1)',
                borderColor: '#45b7d1'
              },
              {
                step: '4',
                title: 'Treatment Guidance',
                description: 'Access comprehensive treatment information and professional recommendations',
                icon: <TreatmentIcon sx={{ fontSize: 40, color: '#96ceb4' }} />,
                bgColor: 'rgba(150, 206, 180, 0.1)',
                borderColor: '#96ceb4'
              }
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    position: 'relative',
                    border: `2px solid ${step.borderColor}30`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: step.borderColor,
                      bgcolor: step.bgColor,
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: step.borderColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {step.step}
                  </Box>

                  <Box sx={{ mt: 3, mb: 2 }}>
                    {step.icon}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {step.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Feature Details Dialog */}
      <Dialog
        open={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'visible',
          }
        }}
      >
        {selectedFeature && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedFeature.icon}
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {selectedFeature.title}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setSelectedFeature(null)}
                sx={{
                  bgcolor: 'rgba(0,0,0,0.05)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {selectedFeature.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Key Features:
                  </Typography>

                  <List dense>
                    {selectedFeature.features.map((feature: string, index: number) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <StarIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate(selectedFeature.route);
                        setSelectedFeature(null);
                      }}
                      sx={{
                        bgcolor: selectedFeature.badge === 'New' ? '#ff6b6b' :
                                selectedFeature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
                        '&:hover': {
                          bgcolor: selectedFeature.badge === 'New' ? '#ff5252' :
                                  selectedFeature.badge === 'Popular' ? '#45b7d1' : '#36a2a8',
                        }
                      }}
                    >
                      Try This Feature
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Demo Dialog */}
      <Dialog
        open={showDemo}
        onClose={() => setShowDemo(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 'bold' }}>
            SkinSight AI Demo
          </Typography>
          <IconButton onClick={() => setShowDemo(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              See how SkinSight AI works in action
            </Typography>
            <Box
              component="img"
              src="/images/demo-preview.jpg"
              alt="Demo Preview"
              sx={{
                width: '100%',
                maxWidth: 500,
                borderRadius: 2,
                mt: 3,
                mb: 3,
                boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Watch our AI analyze skin conditions with real-time detection and comprehensive reporting
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDemo(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => navigate('/detect')}
            sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}
          >
            Try Live Detection
          </Button>
        </DialogActions>
      </Dialog>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 3,
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Join thousands of users who trust SkinSight AI for their skin health monitoring
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CameraIcon />}
              onClick={() => navigate('/detect')}
              sx={{
                bgcolor: '#ff6b6b',
                color: 'white',
                fontSize: '1.1rem',
                py: 1.5,
                px: 4,
                '&:hover': {
                  bgcolor: '#ff5252',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Live Detection
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/symptom-checker')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontSize: '1.1rem',
                py: 1.5,
                px: 4,
                '&:hover': {
                  borderColor: '#4ecdc4',
                  bgcolor: 'rgba(78, 205, 196, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Try Symptom Checker
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
