import React from 'react';
import { Box, Container, Typography, Link, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
      href: 'https://wa.me/917624828106',
      color: '#25D366'
    },
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      href: 'https://instagram.com/omkar_kalagi',
      color: '#E4405F'
    },
    {
      icon: <YouTubeIcon />,
      label: 'YouTube',
      href: 'https://youtube.com/@omkarkalagi',
      color: '#FF0000'
    },
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      href: 'https://github.com/OmkarKalagi',
      color: '#333'
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/omkardigambar/',
      color: '#0077B5'
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
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
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  🏥 SkinSight AI
                </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Advanced AI-powered skin disease detection system for early diagnosis and treatment guidance.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FavoriteIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Made with <FavoriteIcon sx={{ color: '#ff6b6b', fontSize: 16, mx: 0.5 }} /> by
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Kalagi Group of Companies
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { path: '/', label: 'Home' },
                { path: '/detect', label: 'Live Detection' },
                { path: '/upload', label: 'Upload Image' },
                { path: '/training', label: 'AI Training' },
                { path: '/treatments', label: 'Treatment Guide' },
                { path: '/about', label: 'About Us' },
                { path: '/faq', label: 'FAQ' },
                { path: '/contact', label: 'Contact' }
              ].map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Connect With Us
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              {socialLinks.map((social) => (
                <Tooltip key={social.label} title={social.label}>
                  <IconButton
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: social.color,
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

            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              📧 Email: support@skinsight.ai
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              📞 Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              📍 San Francisco, CA, USA
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {currentYear} SkinSight AI. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
            Designed & Developed by{' '}
            <Link
              href="https://linkedin.com/in/omkardigambar/"
              target="_blank"
              sx={{
                color: '#64b5f6',
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Omkar Digambar Kalagi
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
