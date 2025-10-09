import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import EnhancedHeader from './components/Layout/EnhancedHeader';
import EnhancedFooter from './components/Layout/EnhancedFooter';
import HomePage from './pages/HomePage';
import DetectPage from './pages/DetectPage';
import UploadPage from './pages/UploadPage';
import TrainingPage from './pages/TrainingPage';
import TreatmentGuidePage from './pages/TreatmentGuidePage';
import AboutUsPage from './pages/AboutUsPage';
import FAQPage from './pages/FAQPage';
import EnhancedContactPage from './pages/EnhancedContactPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import SkinCareTipsPage from './pages/SkinCareTipsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9c88ff',
      dark: '#5a67d8',
    },
    secondary: {
      main: '#764ba2',
      light: '#9c88ff',
      dark: '#5a4fcf',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <EnhancedHeader />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: { xs: 2, md: 4 },
            }}
          >
            <Container maxWidth="xl">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detect" element={<DetectPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
                <Route path="/skin-care-tips" element={<SkinCareTipsPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/treatments" element={<TreatmentGuidePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<EnhancedContactPage />} />
              </Routes>
            </Container>
          </Box>
          <EnhancedFooter />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
