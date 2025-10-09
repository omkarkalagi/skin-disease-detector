import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
  Chip,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  HealthAndSafety as HealthIcon,
  Science as ScienceIcon,
  Security as SecurityIcon,
  Accessibility as AccessibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer & Dermatologist',
      bio: 'Board-certified dermatologist with 15+ years of experience in skin cancer detection and treatment. Leads our medical research and ensures clinical accuracy.',
      image: '/team/sarah.jpg',
      expertise: ['Dermatology', 'Skin Cancer Research', 'Clinical Trials'],
      education: 'MD from Johns Hopkins, Dermatology Residency at Mayo Clinic'
    },
    {
      name: 'Michael Chen',
      role: 'Lead AI/ML Engineer',
      bio: 'Machine learning expert specializing in computer vision and medical image analysis. PhD in Computer Science with focus on deep learning applications in healthcare.',
      image: '/team/michael.jpg',
      expertise: ['Deep Learning', 'Computer Vision', 'Medical AI'],
      education: 'PhD in Computer Science from Stanford University'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Research Scientist',
      bio: 'Dermatopathology specialist with expertise in skin disease classification and digital pathology. Leads our dataset curation and model validation efforts.',
      image: '/team/priya.jpg',
      expertise: ['Dermatopathology', 'Digital Pathology', 'Research Methodology'],
      education: 'MD/PhD in Pathology from Harvard Medical School'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX/UI Designer & Product Manager',
      bio: 'Healthcare UX specialist focused on creating intuitive medical applications. Combines user-centered design with clinical workflow optimization.',
      image: '/team/emily.jpg',
      expertise: ['Healthcare UX', 'Product Design', 'User Research'],
      education: 'MS in Human-Computer Interaction from Carnegie Mellon'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is the AI diagnosis?',
      answer: 'Our AI model has been trained on thousands of clinically verified images and achieves 95%+ accuracy in detecting common skin conditions. However, it should not replace professional medical diagnosis.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we take privacy seriously. Images are processed locally when possible, and all data transmission is encrypted. We never store or share personal medical data without explicit consent.'
    },
    {
      question: 'What skin conditions can be detected?',
      answer: 'Our system can detect over 15 common skin conditions including acne, eczema, psoriasis, melanoma, basal cell carcinoma, and various other dermatological conditions.'
    },
    {
      question: 'Should I rely solely on this app for medical decisions?',
      answer: 'No, this app is designed as a screening tool to help identify potential skin concerns. Always consult with a qualified healthcare professional for proper diagnosis and treatment.'
    },
    {
      question: 'How often should I use this app?',
      answer: 'For general skin monitoring, monthly self-examinations are recommended. If you notice any concerning changes, use the app immediately and consult a healthcare provider.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Research & Development',
      description: 'Started with a small team of dermatologists and AI researchers to explore AI applications in dermatology.'
    },
    {
      year: '2024',
      title: 'Model Development',
      description: 'Developed and trained our initial AI model using a dataset of 50,000+ clinically verified skin images.'
    },
    {
      year: '2024',
      title: 'Clinical Validation',
      description: 'Conducted clinical trials with partner hospitals achieving 95%+ accuracy in skin condition detection.'
    },
    {
      year: '2025',
      title: 'Mobile App Launch',
      description: 'Released our mobile application with real-time camera detection and comprehensive treatment guidance.'
    }
  ];

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          About SkinSight AI
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
          Revolutionizing skin health monitoring through advanced artificial intelligence and medical expertise
        </Typography>
      </Box>

      {/* Mission & Vision */}
      <Grid container spacing={6} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                To democratize access to early skin disease detection by providing accurate, accessible, and affordable AI-powered screening tools that complement professional medical care.
              </Typography>
              <Typography variant="body1">
                We believe that everyone deserves access to quality healthcare, and early detection can save lives and improve outcomes for millions of people worldwide.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                To become the world's leading AI-powered dermatology platform, trusted by healthcare professionals and patients alike for accurate skin condition assessment and treatment guidance.
              </Typography>
              <Typography variant="body1">
                We're building a future where AI and medicine work together seamlessly to provide better healthcare outcomes for all.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Company Values */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <HealthIcon fontSize="large" color="primary" />,
              title: 'Medical Excellence',
              description: 'We maintain the highest standards of medical accuracy and clinical relevance in all our AI models and recommendations.'
            },
            {
              icon: <ScienceIcon fontSize="large" color="primary" />,
              title: 'Innovation',
              description: 'We continuously advance our AI technology and research to provide cutting-edge dermatological solutions.'
            },
            {
              icon: <SecurityIcon fontSize="large" color="primary" />,
              title: 'Privacy & Security',
              description: 'We protect user data with industry-leading security measures and maintain strict privacy standards.'
            },
            {
              icon: <AccessibilityIcon fontSize="large" color="primary" />,
              title: 'Accessibility',
              description: 'We make advanced dermatological screening accessible to everyone, regardless of location or socioeconomic status.'
            }
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', height: '100%', p: 3 }}>
                <Box sx={{ mb: 2 }}>{value.icon}</Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Meet Our Expert Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main'
                    }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {member.bio}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Expertise:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                      {member.expertise.map((skill, idx) => (
                        <Chip key={idx} label={skill} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    {member.education}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Company Timeline */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Our Journey
        </Typography>
        <Grid container spacing={4}>
          {milestones.map((milestone, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {milestone.year}
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {milestone.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Contact Information */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
            Get In Touch
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <EmailIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Email</Typography>
              <Typography variant="body2" color="text.secondary">
                support@skinsight.ai
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <PhoneIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Phone</Typography>
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <LocationIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Location</Typography>
              <Typography variant="body2" color="text.secondary">
                San Francisco, CA, USA
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Social Media & Links */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Follow Us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <IconButton color="primary" size="large">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="primary" size="large">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary" size="large">
            <GitHubIcon />
          </IconButton>
        </Box>

        <Alert severity="info">
          <Typography variant="body2">
            For medical emergencies, please contact your healthcare provider or emergency services immediately.
            This application is not a substitute for professional medical advice.
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
