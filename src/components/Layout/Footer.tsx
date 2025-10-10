import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 3
          }}
        >
          <Box>
            <Typography variant="body1" color="text.secondary">
              © {new Date().getFullYear()} SkinSight AI. Transforming dermatology through artificial intelligence.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                📧 Email: omkardigambar4@gmail.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📞 Phone: +91 7624828106 SKIN-HELP
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📍 Bangalore, Karnataka, INDIA
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              color="text.secondary"
              underline="hover"
            >
              Privacy Policy
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              color="text.secondary"
              underline="hover"
            >
              Terms of Service
            </Link>
            <Link 
              component={RouterLink} 
              to="/contact" 
              color="text.secondary"
              underline="hover"
            >
              Contact Us
            </Link>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          This application is for educational purposes only and is not a substitute for professional medical advice.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
