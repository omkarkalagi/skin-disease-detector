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
  useTheme,
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon, 
  Send as SendIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const ContactPage = () => {
  const theme = useTheme();
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the form data to your backend
      // const response = await fetch('your-api-endpoint/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) throw new Error('Failed to send message');
      
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

  const contactInfo = [
    { 
      icon: <EmailIcon color="primary" />, 
      title: 'Email Us', 
      value: 'support@skinsight.ai',
      href: 'mailto:support@skinsight.ai'
    },
    { 
      icon: <PhoneIcon color="primary" />, 
      title: 'Call Us', 
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    { 
      icon: <LocationIcon color="primary" />, 
      title: 'Visit Us', 
      value: '123 Health Tech Park, San Francisco, CA 94107',
      href: 'https://maps.google.com'
    },
    { 
      icon: <AccessTimeIcon color="primary" />, 
      title: 'Working Hours', 
      value: 'Monday - Friday: 9:00 AM - 6:00 PM (PST)'
    },
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
            Contact Us
          </Typography>
          <Typography variant="h6" align="center" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
            Have questions or feedback? We'd love to hear from you! Reach out to our team and we'll get back to you as soon as possible.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
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
                  By submitting this form, you agree to our 
                  <Link href="/privacy" color="primary" sx={{ ml: 0.5 }}>
                    Privacy Policy
                  </Link>.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Get In Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions about SkinSight AI or need support? Our team is here to help. 
                Fill out the form or use the contact information below to reach us.
              </Typography>
              
              <List sx={{ width: '100%', mt: 3 }}>
                {contactInfo.map((item, index) => (
                  <ListItem 
                    key={index} 
                    alignItems="flex-start"
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        item.href ? (
                          <Link 
                            href={item.href} 
                            color="text.primary" 
                            underline="hover"
                            sx={{ 
                              display: 'inline-block',
                              mt: 0.5,
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark',
                              },
                            }}
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {item.value}
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* FAQ Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Frequently Asked Questions
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  How accurate is the skin analysis?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Our AI model has been trained on thousands of images and achieves high accuracy in detecting various skin conditions. However, it's important to note that this is not a substitute for professional medical diagnosis.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Is my data secure?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Yes, we take your privacy and data security very seriously. All images and personal information are processed securely and never shared with third parties without your consent.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Do I need to create an account to use the service?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  No, you can use our basic skin analysis features without creating an account. However, creating an account allows you to track your history and access additional features.
                </Typography>
              </Box>
              
              <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                <Link href="/faq" color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  View all FAQs
                </Link>
              </Typography>
            </Box>
            
            {/* Social Media */}
            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <Button
                    key={social}
                    variant="outlined"
                    size="small"
                    href={`https://${social.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 2,
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {social}
                  </Button>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        {/* Map */}
        <Box sx={{ mt: 8, mb: 4, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.158716888601!2d-122.4019726846825!3d37.79097597975795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064dca7fa5d%3A0x9e8a3f0f8c7f8b5b!2s123%20Health%20Tech%20Park%2C%20San%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
