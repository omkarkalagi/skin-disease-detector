import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <CameraAltIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            SkinSight AI
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/detect"
              startIcon={<CameraAltIcon />}
            >
              Detect
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/upload"
              startIcon={<UploadIcon />}
            >
              Upload
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/about"
              startIcon={<InfoIcon />}
            >
              About
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contact"
              startIcon={<ContactMailIcon />}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
