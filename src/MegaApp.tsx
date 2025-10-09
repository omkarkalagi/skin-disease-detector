import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, CircularProgress } from '@mui/material';
import EnhancedHeader from './components/Layout/EnhancedHeader';
import EnhancedFooter from './components/Layout/EnhancedFooter';

// Lazy load all page components
const UltraEnhancedHomePage = lazy(() => import('./pages/UltraEnhancedHomePage'));
const DetectPage = lazy(() => import('./pages/DetectPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const EnhancedTreatmentGuidePage = lazy(() => import('./pages/EnhancedTreatmentGuidePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const EnhancedContactPage = lazy(() => import('./pages/EnhancedContactPage'));
const SymptomCheckerPage = lazy(() => import('./pages/SymptomCheckerPage'));
const SkinCareTipsPage = lazy(() => import('./pages/SkinCareTipsPage'));
const SkinHealthTrackerPage = lazy(() => import('./pages/SkinHealthTrackerPage'));
const AIModelComparisonPage = lazy(() => import('./pages/AIModelComparisonPage'));
const SkinConditionsEncyclopediaPage = lazy(() => import('./pages/SkinConditionsEncyclopediaPage'));
const SkinCareProductsRecommenderPage = lazy(() => import('./pages/SkinCareProductsRecommenderPage'));
const SkinHealthDashboardPage = lazy(() => import('./pages/SkinHealthDashboardPage'));
const VirtualConsultationPage = lazy(() => import('./pages/VirtualConsultationPage'));
const SkinAnalysisHistoryPage = lazy(() => import('./pages/SkinAnalysisHistoryPage'));
const SkinCareRoutineBuilderPage = lazy(() => import('./pages/SkinCareRoutineBuilderPage'));
const SkinHealthAnalyticsPage = lazy(() => import('./pages/SkinHealthAnalyticsPage'));
const CommunityForumPage = lazy(() => import('./pages/CommunityForumPage'));

// Loading component
const LoadingComponent = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress />
  </Box>
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9c88ff',
      dark: '#5a67d8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#764ba2',
      light: '#9c88ff',
      dark: '#5a4fcf',
      contrastText: '#ffffff',
    },
    success: {
      main: '#48bb78',
      light: '#68d391',
      dark: '#38a169',
    },
    warning: {
      main: '#ed8936',
      light: '#f6ad55',
      dark: '#dd6b20',
    },
    error: {
      main: '#f56565',
      light: '#fc8181',
      dark: '#e53e3e',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
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
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
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
              <Suspense fallback={<LoadingComponent />}>
                <Routes>
                  <Route path="/" element={<UltraEnhancedHomePage />} />
                  <Route path="/detect" element={<DetectPage />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
                  <Route path="/skin-care-tips" element={<SkinCareTipsPage />} />
                  <Route path="/skin-health-tracker" element={<SkinHealthTrackerPage />} />
                  <Route path="/ai-model-comparison" element={<AIModelComparisonPage />} />
                  <Route path="/skin-conditions-encyclopedia" element={<SkinConditionsEncyclopediaPage />} />
                  <Route path="/skin-care-products" element={<SkinCareProductsRecommenderPage />} />
                  <Route path="/dashboard" element={<SkinHealthDashboardPage />} />
                  <Route path="/consultation" element={<VirtualConsultationPage />} />
                  <Route path="/history" element={<SkinAnalysisHistoryPage />} />
                  <Route path="/routine-builder" element={<SkinCareRoutineBuilderPage />} />
                  <Route path="/analytics" element={<SkinHealthAnalyticsPage />} />
                  <Route path="/community" element={<CommunityForumPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/treatments" element={<EnhancedTreatmentGuidePage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contact" element={<EnhancedContactPage />} />
                </Routes>
              </Suspense>
            </Container>
          </Box>
          <EnhancedFooter />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
