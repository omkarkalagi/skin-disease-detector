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
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
          }}
        >
          {/* Left Section */}
          <Box>
            <Typography variant="body1" color="text.secondary">
              © {new Date().getFullYear()} SkinSight AI — Transforming dermatology through artificial intelligence.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                📧 Email: <Link href="mailto:omkardigambar4@gmail.com">omkardigambar4@gmail.com</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📞 Phone: +91 76248 28106 (SKIN-HELP)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📍 Bangalore, Karnataka, India
              </Typography>
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
            }}
          >
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

        {/* Disclaimer */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          ⚠️ This application is for educational purposes only and is not a substitute for professional medical advice.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
