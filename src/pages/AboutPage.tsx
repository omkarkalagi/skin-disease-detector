import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import { 
  HealthAndSafety as HealthIcon,
  Science as ScienceIcon,
  Security as SecurityIcon,
  Accessibility as AccessibilityIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const AboutPage = () => {
  const features = [
    {
      icon: <HealthIcon color="primary" fontSize="large" />,
      title: 'Advanced AI Technology',
      description: 'Our system uses state-of-the-art deep learning models trained on thousands of skin condition images to provide accurate analysis.'
    },
    {
      icon: <ScienceIcon color="primary" fontSize="large" />,
      title: 'Research-Backed',
      description: 'Developed in collaboration with dermatologists and medical professionals to ensure reliable results.'
    },
    {
      icon: <SecurityIcon color="primary" fontSize="large" />,
      title: 'Privacy First',
      description: 'Your data security is our priority. All images are processed securely and never stored without your permission.'
    },
    {
      icon: <AccessibilityIcon color="primary" fontSize="large" />,
      title: 'User-Friendly',
      description: 'Designed with simplicity in mind, making advanced skin analysis accessible to everyone.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      bio: 'Board-certified dermatologist with over 15 years of experience in dermatology and skin cancer detection.',
      avatar: '/assets/team/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Lead AI Engineer',
      bio: 'Machine learning expert specializing in computer vision and medical image analysis.',
      avatar: '/assets/team/michael.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX/UI Designer',
      bio: 'Passionate about creating intuitive healthcare experiences that put users first.',
      avatar: '/assets/team/emily.jpg'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            About SkinSight AI
          </Typography>
          <Typography variant="h6" align="center" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
            Empowering individuals with AI-powered skin health insights to detect potential skin conditions early and connect with healthcare professionals.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At SkinSight AI, we believe that early detection of skin conditions can save lives. Our mission is to make skin health monitoring accessible to everyone, everywhere. By leveraging cutting-edge artificial intelligence, we provide instant preliminary analysis of skin conditions, helping users identify potential issues early and seek appropriate medical attention.
          </Typography>
          <Typography variant="body1" paragraph>
            We are committed to bridging the gap between technology and healthcare, ensuring that our solutions are not only technologically advanced but also clinically relevant and user-friendly.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Why Choose SkinSight AI?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                  elevation={3}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* How It Works */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, flexShrink: 0 }}>
                  1
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Capture or Upload</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Take a photo using your device's camera or upload an existing image of the skin area you want to analyze.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, flexShrink: 0 }}>
                  2
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AI Analysis</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our advanced AI processes the image and compares it against our database of skin conditions.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, flexShrink: 0 }}>
                  3
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Get Insights</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receive instant analysis, potential conditions, and recommended next steps.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                  elevation={3}
                >
                  <Avatar 
                    src={member.avatar}
                    alt={member.name}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 2,
                      border: '3px solid',
                      borderColor: 'primary.main'
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Disclaimer */}
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'grey.50', borderRadius: 2, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <InfoIcon color="primary" sx={{ mr: 1 }} />
            Important Disclaimer
          </Typography>
          <Typography variant="body1" paragraph>
            SkinSight AI is not a substitute for professional medical advice, diagnosis, or treatment. The information provided by our application is for educational and informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
          </Typography>
          <Typography variant="body1" paragraph>
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read or seen in this application.
          </Typography>
          <Typography variant="body1">
            If you think you may have a medical emergency, call your doctor or emergency services immediately.
          </Typography>
        </Paper>

        {/* Accuracy and Limitations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Accuracy and Limitations
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="High Accuracy" 
                secondary="Our AI model has been trained on thousands of images and achieves high accuracy in detecting various skin conditions." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="Not a Diagnosis" 
                secondary="The results provided by our application are not a medical diagnosis and should not be treated as such." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="warning" />
              </ListItemIcon>
              <ListItemText 
                primary="Limitations" 
                secondary="The accuracy of the analysis may be affected by image quality, lighting conditions, and the specific characteristics of the skin condition." 
              />
            </ListItem>
          </List>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to check your skin health?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Get started with SkinSight AI today and take the first step towards better skin health awareness.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
