import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message?: string }>({ type: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading' });

    try {
      // In a real application, this would send to a backend that forwards to email
      const emailData = {
        to: 'omkardigambar4@gmail.com',
        from: formData.email,
        subject: `SkinSight AI Contact: ${formData.subject}`,
        text: `
New Contact Form Submission from SkinSight AI

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the SkinSight AI contact form.
        `.trim()
      };

      // Simulate API call - in production, replace with actual email service
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  const developerInfo = {
    name: 'Omkar Digambar Kalagi',
    title: 'Full Stack Developer & AI Engineer',
    bio: 'Passionate software engineer specializing in AI-powered healthcare solutions, React applications, and modern web technologies.',
    image: '/team/omkar.jpg',
    social: [
      {
        platform: 'WhatsApp',
        handle: '+91 7624828106',
        icon: <WhatsAppIcon />,
        href: 'https://wa.me/917624828106',
        color: '#25D366'
      },
      {
        platform: 'Instagram',
        handle: '@omkar_kalagi',
        icon: <InstagramIcon />,
        href: 'https://instagram.com/omkar_kalagi',
        color: '#E4405F'
      },
      {
        platform: 'YouTube',
        handle: '@omkarkalagi',
        icon: <YouTubeIcon />,
        href: 'https://youtube.com/@omkarkalagi',
        color: '#FF0000'
      },
      {
        platform: 'GitHub',
        handle: 'OmkarKalagi',
        icon: <GitHubIcon />,
        href: 'https://github.com/OmkarKalagi',
        color: '#333'
      },
      {
        platform: 'LinkedIn',
        handle: 'omkardigambar',
        icon: <LinkedInIcon />,
        href: 'https://linkedin.com/in/omkardigambar/',
        color: '#0077B5'
      }
    ],
    skills: ['React', 'TypeScript', 'Python', 'Machine Learning', 'Node.js', 'AWS'],
    email: 'omkardigambar4@gmail.com'
  };

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
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Have questions or feedback? We'd love to hear from you! Reach out to our team and we'll get back to you as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Developer Profile */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={developerInfo.image}
                alt={developerInfo.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {developerInfo.name.split(' ').map(n => n[0]).join('')}
              </Avatar>

              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {developerInfo.name}
              </Typography>

              <Typography variant="subtitle1" color="primary" gutterBottom>
                {developerInfo.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {developerInfo.bio}
              </Typography>

              {/* Skills */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Technologies:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                  {developerInfo.skills.map((skill, index) => (
                    <Typography
                      key={index}
                      variant="caption"
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.7rem'
                      }}
                    >
                      {skill}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Social Links */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {developerInfo.social.map((social) => (
                  <Tooltip key={social.platform} title={`${social.platform}: ${social.handle}`}>
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: 'rgba(0, 0, 0, 0.05)',
                        '&:hover': {
                          bgcolor: social.color,
                          color: 'white',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>

              <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                📧 {developerInfo.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Send Us a Message
            </Typography>

            {status.type === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {status.message}
              </Alert>
            )}

            {status.type === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {status.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={status.type === 'loading'}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={status.type === 'loading'}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    disabled={status.type === 'loading'}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    disabled={status.type === 'loading'}
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={status.type === 'loading'}
                    startIcon={
                      status.type === 'loading' ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{ minWidth: 180 }}
                  >
                    {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Divider sx={{ my: 4 }} />

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Privacy Notice
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                We respect your privacy and are committed to protecting your personal data.
                The information you provide will be used to respond to your inquiry and
                improve our services. We will not share your information with third parties
                without your consent.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" color="primary" sx={{ ml: 0.5 }}>
                  Privacy Policy
                </Link>.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Frequently Asked Questions
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  How accurate is the skin analysis?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Our AI model has been trained on thousands of images and achieves high accuracy in detecting various skin conditions. However, it's important to note that this is not a substitute for professional medical diagnosis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Is my data secure?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Yes, we take your privacy and data security very seriously. All images and personal information are processed securely and never shared with third parties without your consent.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
