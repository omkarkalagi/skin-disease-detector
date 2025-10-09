import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  HealthAndSafety as HealthIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Help as HelpIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const FAQPage = () => {
  const faqCategories = [
    {
      title: 'Accuracy & Reliability',
      icon: <HealthIcon color="primary" />,
      questions: [
        {
          question: 'How accurate is the AI diagnosis?',
          answer: 'Our AI model has been trained on thousands of clinically verified images and achieves 95%+ accuracy in detecting common skin conditions. However, it should not replace professional medical diagnosis. Always consult a healthcare provider for definitive diagnosis and treatment.',
        },
        {
          question: 'What skin conditions can be detected?',
          answer: 'Our system can detect over 15 common skin conditions including acne, eczema, psoriasis, melanoma, basal cell carcinoma, squamous cell carcinoma, seborrheic keratosis, dermatitis, vitiligo, and various other dermatological conditions.',
        },
        {
          question: 'How often should I use this app?',
          answer: 'For general skin monitoring, monthly self-examinations are recommended. If you notice any concerning changes in your skin, use the app immediately and consult a healthcare provider. For specific conditions, follow your dermatologist\'s recommendations.',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: <SecurityIcon color="primary" />,
      questions: [
        {
          question: 'Is my data secure and private?',
          answer: 'Yes, we take privacy seriously. Images are processed locally when possible, and all data transmission is encrypted using industry-standard SSL/TLS encryption. We never store or share personal medical data without explicit consent, and we comply with HIPAA and GDPR regulations.',
        },
        {
          question: 'Do you store my images?',
          answer: 'Images are processed temporarily for analysis and are not permanently stored on our servers unless you explicitly choose to save them for your personal health tracking. All processing happens securely, and you maintain full control over your data.',
        },
        {
          question: 'Who has access to my health information?',
          answer: 'Only you and authorized healthcare professionals (with your explicit consent) have access to your health information. Our system uses end-to-end encryption, and we never share personal data with third parties for marketing or any other purposes.',
        },
      ],
    },
    {
      title: 'Technical Questions',
      icon: <SpeedIcon color="primary" />,
      questions: [
        {
          question: 'What devices are supported?',
          answer: 'SkinSight AI works on all modern smartphones, tablets, and computers with a camera and internet connection. The app is optimized for iOS 12+, Android 8+, and modern web browsers including Chrome, Firefox, Safari, and Edge.',
        },
        {
          question: 'Do I need to create an account?',
          answer: 'No, you can use basic skin analysis features without creating an account. However, creating a free account allows you to track your skin health history, save analysis results, and access additional features like progress tracking and personalized recommendations.',
        },
        {
          question: 'How does the AI training work?',
          answer: 'Our AI model uses advanced machine learning techniques including convolutional neural networks trained on thousands of dermatologist-verified images. The model continuously improves through federated learning, ensuring privacy while enhancing accuracy across all users.',
        },
      ],
    },
    {
      title: 'Medical Guidance',
      icon: <HelpIcon color="primary" />,
      questions: [
        {
          question: 'Should I rely solely on this app for medical decisions?',
          answer: 'No, this app is designed as a screening and educational tool to help identify potential skin concerns early. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for proper medical care.',
        },
        {
          question: 'What should I do if I get a concerning result?',
          answer: 'If you receive a result indicating a potentially serious condition, consult a dermatologist or healthcare provider immediately. Early detection and professional medical care are crucial for the best outcomes. Use the app as a tool to facilitate, not replace, professional medical consultation.',
        },
        {
          question: 'Can this replace regular dermatologist visits?',
          answer: 'No, regular dermatologist visits remain essential for comprehensive skin health. This app is designed to complement, not replace, professional dermatological care. It can help you monitor your skin between appointments and identify changes that may need professional attention.',
        },
      ],
    },
  ];

  const quickTips = [
    {
      title: 'Best Photography Practices',
      tips: [
        'Use good lighting (natural daylight is best)',
        'Ensure the camera is focused on the skin area',
        'Take photos from multiple angles if needed',
        'Include a reference object (like a coin) for scale',
        'Avoid using filters or editing the image',
      ],
    },
    {
      title: 'When to Seek Professional Help',
      tips: [
        'If symptoms persist for more than 2 weeks',
        'If the condition is worsening or spreading',
        'If you experience significant pain or discomfort',
        'If you notice rapid changes in moles or lesions',
        'If you have a family history of skin cancer',
      ],
    },
    {
      title: 'Emergency Situations',
      tips: [
        'Severe allergic reactions with swelling',
        'Infected skin that is hot, red, and painful',
        'Skin conditions that affect large body areas',
        'Any skin changes during pregnancy',
        'Skin conditions in infants or young children',
      ],
    },
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
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
          Find answers to common questions about SkinSight AI and skin health monitoring
        </Typography>
      </Box>

      {/* FAQ Categories */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {faqCategories.map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {category.icon}
                  <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold' }}>
                    {category.title}
                  </Typography>
                </Box>

                {category.questions.map((faq, faqIndex) => (
                  <Accordion key={faqIndex} sx={{ mb: 1 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`faq-content-${index}-${faqIndex}`}
                      id={`faq-header-${index}-${faqIndex}`}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Tips Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Quick Tips & Guidelines
        </Typography>

        <Grid container spacing={4}>
          {quickTips.map((tipSection, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {tipSection.title}
                  </Typography>
                  <List dense>
                    {tipSection.tips.map((tip, tipIndex) => (
                      <ListItem key={tipIndex} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
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
      </Box>

      {/* Important Disclaimers */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'warning.main', display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ mr: 1 }} />
            Important Medical Disclaimers
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Not a Medical Diagnosis
                </Typography>
                <Typography variant="body2">
                  SkinSight AI provides preliminary screening and educational information only. It is not intended to replace professional medical advice, diagnosis, or treatment.
                </Typography>
              </Alert>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  For Healthcare Professionals
                </Typography>
                <Typography variant="body2">
                  This tool is designed to assist, not replace, clinical judgment. Always correlate findings with clinical presentation and consider biopsy when indicated.
                </Typography>
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Emergency Situations
                </Typography>
                <Typography variant="body2">
                  If you are experiencing a medical emergency, call emergency services immediately. Do not rely on this app for emergency medical situations.
                </Typography>
              </Alert>

              <Alert severity="success">
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  When to Consult a Doctor
                </Typography>
                <Typography variant="body2">
                  Consult a healthcare professional if you notice any concerning changes in your skin, persistent symptoms, or if you have questions about your skin health.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card sx={{ textAlign: 'center', py: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Still Have Questions?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Our support team is here to help you with any questions about using SkinSight AI or understanding your results.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<InfoIcon />}
              label="support@skinsight.ai"
              variant="outlined"
              clickable
              onClick={() => window.location.href = 'mailto:support@skinsight.ai'}
            />
            <Chip
              icon={<HelpIcon />}
              label="Visit Help Center"
              variant="outlined"
              clickable
              onClick={() => window.location.href = '/help'}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FAQPage;
