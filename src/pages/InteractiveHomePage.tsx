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
  IconButton,
  Chip,
  Avatar,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
  Skeleton,
  Alert,
  Snackbar,
  Slide,
  Zoom,
  Fade,
  Grow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  CameraAlt as CameraIcon,
  Upload as UploadIcon,
  Science as ScienceIcon,
  LocalHospital as TreatmentIcon,
  Assessment as AssessmentIcon,
  Spa as SpaIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Info as InfoIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  ThumbUp as LikeIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [stats, setStats] = useState({ users: 0, accuracy: 0, conditions: 0 });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [likedFeatures, setLikedFeatures] = useState<Set<number>>(new Set());

  // Animate stats on load with staggered animation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setStats({ users: 50000, accuracy: 95, conditions: 15 });
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: 1,
      title: 'Live Camera Detection',
      description: 'Real-time skin analysis using your device camera with instant results',
      icon: <CameraIcon sx={{ fontSize: 48, color: '#ff6b6b' }} />,
      image: '/images/live-detection.jpg',
      route: '/detect',
      badge: 'Popular',
      rating: 4.8,
      features: ['Real-time analysis', 'Instant results', 'No upload needed', 'Mobile optimized'],
      trending: true,
      views: 12500,
    },
    {
      id: 2,
      title: 'Upload Image Analysis',
      description: 'Upload high-quality photos for detailed skin condition analysis',
      icon: <UploadIcon sx={{ fontSize: 48, color: '#4ecdc4' }} />,
      image: '/images/upload-analysis.jpg',
      route: '/upload',
      badge: 'Precise',
      rating: 4.9,
      features: ['High resolution', 'Multiple formats', 'Detailed reports', 'Save history'],
      trending: false,
      views: 8900,
    },
    {
      id: 3,
      title: 'AI Symptom Checker',
      description: 'Interactive questionnaire for preliminary skin condition assessment',
      icon: <AssessmentIcon sx={{ fontSize: 48, color: '#45b7d1' }} />,
      image: '/images/symptom-checker.jpg',
      route: '/symptom-checker',
      badge: 'New',
      rating: 4.7,
      features: ['Step-by-step guide', 'Multiple symptoms', 'Instant results', 'Recommendations'],
      trending: true,
      views: 15600,
    },
    {
      id: 4,
      title: 'Skin Care Tips',
      description: 'Personalized skincare routines and expert advice for healthy skin',
      icon: <SpaIcon sx={{ fontSize: 48, color: '#96ceb4' }} />,
      image: '/images/skincare-tips.jpg',
      route: '/skin-care-tips',
      badge: 'Essential',
      rating: 4.9,
      features: ['Daily routines', 'Seasonal care', 'Condition-specific', 'Expert advice'],
      trending: false,
      views: 11200,
    },
    {
      id: 5,
      title: 'AI Training Dashboard',
      description: 'Watch our AI model train and improve with real-time progress tracking',
      icon: <ScienceIcon sx={{ fontSize: 48, color: '#feca57' }} />,
      image: '/images/ai-training.jpg',
      route: '/training',
      badge: 'Advanced',
      rating: 4.6,
      features: ['Live training', 'Progress tracking', 'Model insights', 'Performance metrics'],
      trending: false,
      views: 4300,
    },
    {
      id: 6,
      title: 'Treatment Guide',
      description: 'Comprehensive treatment information and medication recommendations',
      icon: <TreatmentIcon sx={{ fontSize: 48, color: '#ff9ff3' }} />,
      image: '/images/treatment-guide.jpg',
      route: '/treatments',
      badge: 'Complete',
      rating: 4.8,
      features: ['Medical treatments', 'Home remedies', 'Lifestyle advice', 'Prevention tips'],
      trending: true,
      views: 9800,
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

  const handleLikeFeature = (featureId: number) => {
    setLikedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });

    setSnackbar({
      open: true,
      message: likedFeatures.has(featureId) ? 'Removed from favorites' : 'Added to favorites',
      severity: 'success'
    });
  };

  const handleShareFeature = (feature: any) => {
    if (navigator.share) {
      navigator.share({
        title: feature.title,
        text: feature.description,
        url: window.location.origin + feature.route,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + feature.route);
      setSnackbar({
        open: true,
        message: 'Link copied to clipboard!',
        severity: 'info'
      });
    }
  };

  return (
    <Box>
      {/* Hero Section with Enhanced Animations */}
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
            animation: 'pulse 4s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 107, 107, 0.1)',
            animation: 'float 6s ease-in-out infinite',
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Zoom in={true} timeout={1000}>
                  <Chip
                    label="AI-Powered Dermatology"
                    sx={{
                      mb: 3,
                      fontSize: '0.9rem',
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '& .MuiChip-label': { fontWeight: 'bold' },
                      animation: 'bounce 2s ease-in-out infinite',
                    }}
                  />
                </Zoom>

                <Fade in={true} timeout={1500}>
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
                      animation: 'gradient 3s ease-in-out infinite alternate',
                    }}
                  >
                    Advanced Skin Disease Detection
                  </Typography>
                </Fade>

                <Slide direction="up" in={true} timeout={2000}>
                  <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6 }}>
                    Get instant, accurate skin analysis with our AI-powered platform.
                    <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>Early detection saves lives.</span>
                  </Typography>
                </Slide>

                <Grow in={true} timeout={2500}>
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
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                        '&:hover': {
                          bgcolor: '#ff5252',
                          transform: 'translateY(-2px) scale(1.05)',
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
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(255,255,255,0.1)',
                          borderRadius: 'inherit',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        },
                        '&:hover::before': {
                          opacity: 1,
                        },
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
                </Grow>

                <Fade in={true} timeout={3000}>
                  <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {statsData.map((stat, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ color: stat.color, mr: 1, animation: 'pulse 2s ease-in-out infinite' }}>
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
                              animation: loading ? 'countUp 2s ease-out forwards' : 'none',
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
                </Fade>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={2000}>
                <Box
                  component="img"
                  src="/images/hero-skin-analysis.jpg"
                  alt="Skin Analysis"
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transform: 'rotate(2deg)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(0deg) scale(1.02)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                    }
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section with Enhanced Interactivity */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Fade in={true} timeout={1000}>
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
          </Fade>

          <Slide direction="up" in={true} timeout={1500}>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Comprehensive skin health analysis tools designed for accuracy and ease of use
            </Typography>
          </Slide>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Zoom in={true} timeout={1000 + (index * 200)}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover::before': {
                      transform: 'scaleX(1)',
                    }
                  }}
                  onClick={() => setSelectedFeature(feature)}
                >
                  {feature.badge && (
                    <Fade in={true} timeout={2000 + (index * 100)}>
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
                          animation: feature.trending ? 'bounce 1s ease-in-out infinite' : 'none',
                        }}
                      />
                    </Fade>
                  )}

                  {feature.trending && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: '#ff6b6b',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        animation: 'pulse 2s ease-in-out infinite',
                      }}
                    >
                      🔥 Trending
                    </Box>
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
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        ({feature.rating})
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      <ViewIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {feature.views.toLocaleString()} views
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Tooltip title={likedFeatures.has(feature.id) ? 'Remove from favorites' : 'Add to favorites'}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeFeature(feature.id);
                          }}
                          sx={{
                            color: likedFeatures.has(feature.id) ? '#ff6b6b' : 'text.secondary',
                            '&:hover': {
                              bgcolor: 'rgba(255, 107, 107, 0.1)',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <FavoriteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Share this feature">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareFeature(feature);
                          }}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              bgcolor: 'rgba(78, 205, 196, 0.1)',
                              transform: 'scale(1.1)',
                              color: '#4ecdc4',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <ShareIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

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
                            transform: 'translateY(-1px)',
                          }
                        }}
                      >
                        Try Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Interactive Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        TransitionComponent={Slide}
        sx={{
          '& .MuiSnackbarContent-root': {
            bgcolor: snackbar.severity === 'success' ? 'success.main' : 'info.main',
          }
        }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Enhanced Feature Details Dialog */}
      <Dialog
        open={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'visible',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '10px solid white',
            }
          }
        }}
      >
        {selectedFeature && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    mr: 2,
                    p: 1,
                    borderRadius: '50%',
                    bgcolor: `${selectedFeature.badge === 'New' ? '#ff6b6b' : selectedFeature.badge === 'Popular' ? '#4ecdc4' : '#45b7d1'}20`,
                  }}
                >
                  {selectedFeature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {selectedFeature.title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={() => handleLikeFeature(selectedFeature.id)}
                  sx={{
                    color: likedFeatures.has(selectedFeature.id) ? '#ff6b6b' : 'text.secondary',
                    '&:hover': { bgcolor: 'rgba(255, 107, 107, 0.1)' }
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleShareFeature(selectedFeature)}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { bgcolor: 'rgba(78, 205, 196, 0.1)', color: '#4ecdc4' }
                  }}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton onClick={() => setSelectedFeature(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Fade in={true} timeout={500}>
                    <Box
                      component="img"
                      src={selectedFeature.image}
                      alt={selectedFeature.title}
                      sx={{
                        width: '100%',
                        borderRadius: 2,
                        mb: 3,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  </Fade>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Slide direction="left" in={true} timeout={700}>
                    <Box>
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

                      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Rating value={selectedFeature.rating} readOnly size="small" />
                        <Typography variant="body2">
                          {selectedFeature.rating} out of 5 stars
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ViewIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {selectedFeature.views.toLocaleString()} people have used this feature
                        </Typography>
                      </Box>

                      <Grow in={true} timeout={1000}>
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
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                              }
                            }}
                          >
                            Try This Feature Now
                          </Button>
                        </Box>
                      </Grow>
                    </Box>
                  </Slide>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Floating Action Button with Enhanced Interactions */}
      <Tooltip title="Quick Access to Live Detection" placement="left">
        <Fab
          color="primary"
          size="large"
          onClick={() => navigate('/detect')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            bgcolor: '#ff6b6b',
            '&:hover': {
              bgcolor: '#ff5252',
              transform: 'scale(1.1)',
              boxShadow: '0 8px 20px rgba(255, 107, 107, 0.4)',
            },
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          <CameraIcon />
        </Fab>
      </Tooltip>

      {/* Loading Skeleton */}
      {loading && (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={28} width="80%" />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default HomePage;
