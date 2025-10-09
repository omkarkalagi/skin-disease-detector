import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';
import InfoIcon from '@mui/icons-material/Info';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CameraAltIcon fontSize="large" color="primary" />,
      title: 'Live Detection',
      description: 'Use your device camera for real-time skin disease detection.',
      action: 'Start Detection',
      path: '/detect'
    },
    {
      icon: <UploadIcon fontSize="large" color="primary" />,
      title: 'Upload Image',
      description: 'Upload an image of a skin condition for analysis.',
      action: 'Upload Image',
      path: '/upload'
    },
    {
      icon: <InfoIcon fontSize="large" color="primary" />,
      title: 'Learn More',
      description: 'Understand different skin conditions and their treatments.',
      action: 'About Us',
      path: '/about'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 8,
          pb: 6,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            SkinSight AI
          </Typography>
          <Typography variant="h5" align="center" color="inherit" paragraph>
            Advanced AI-powered skin disease detection at your fingertips.
            Get instant analysis and professional insights about your skin condition.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={() => navigate('/detect')}
              startIcon={<CameraAltIcon />}
            >
              Start Detection
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              size="large"
              onClick={() => navigate('/upload')}
              startIcon={<UploadIcon />}
            >
              Upload Image
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                elevation={3}
              >
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => navigate(feature.path)}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Disclaimer */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Important Note
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This application is designed to assist with preliminary skin condition analysis. 
            It is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or other qualified health provider with 
            any questions you may have regarding a medical condition.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
