import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  Upload as UploadIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Science as ScienceIcon,
  LocalHospital as TreatmentIcon,
  Person as AboutIcon,
  Help as HelpIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Mobile Navigation Component
export const MobileNavigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navigationItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/detect', label: 'Live Detection', icon: <CameraIcon /> },
    { path: '/upload', label: 'Upload Image', icon: <UploadIcon /> },
    { path: '/training', label: 'AI Training', icon: <ScienceIcon /> },
    { path: '/treatments', label: 'Treatments', icon: <TreatmentIcon /> },
    { path: '/about', label: 'About Us', icon: <AboutIcon /> },
    { path: '/faq', label: 'FAQ', icon: <HelpIcon /> },
    { path: '/contact', label: 'Contact', icon: <ContactIcon /> },
  ];

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile App Bar */}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar sx={{ justifyContent: 'space-around', py: 1 }}>
          {navigationItems.slice(0, 5).map((item) => (
            <IconButton
              key={item.path}
              color={location.pathname === item.path ? 'primary' : 'default'}
              onClick={() => navigate(item.path)}
              sx={{
                flexDirection: 'column',
                fontSize: '0.75rem',
                minWidth: 60,
                '& .MuiIconButton-label': {
                  flexDirection: 'column',
                },
              }}
            >
              {item.icon}
              <Typography variant="caption" sx={{ fontSize: '0.7rem', mt: 0.5 }}>
                {item.label.split(' ')[0]}
              </Typography>
            </IconButton>
          ))}
        </Toolbar>
      </AppBar>

      {/* Drawer for more options */}
      <Fab
        color="primary"
        size="small"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navigationItems.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                sx={{
                  bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

// Mobile-optimized Card Component
export const MobileOptimizedCard = ({
  children,
  elevation = 2,
  ...props
}: {
  children: React.ReactNode;
  elevation?: number;
  [key: string]: any;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      elevation={elevation}
      sx={{
        borderRadius: isMobile ? 2 : 3,
        mx: isMobile ? -1 : 0,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

// Mobile-friendly Hero Section
export const MobileHeroSection = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  subtitle: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: isMobile ? 6 : 8,
        px: isMobile ? 2 : 3,
        mb: isMobile ? 4 : 6,
        borderRadius: isMobile ? 2 : 3,
        textAlign: 'center',
      }}
    >
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      <Typography
        variant={isMobile ? 'body1' : 'h6'}
        sx={{
          opacity: 0.9,
          maxWidth: isMobile ? 'none' : 800,
          mx: 'auto',
          mb: isMobile ? 3 : 4,
        }}
      >
        {subtitle}
      </Typography>

      {(primaryAction || secondaryAction) && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {primaryAction && (
            <Button
              variant="contained"
              color="secondary"
              size={isMobile ? 'medium' : 'large'}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outlined"
              color="inherit"
              size={isMobile ? 'medium' : 'large'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

// Mobile-responsive Grid Layout
export const ResponsiveGrid = ({
  children,
  spacing = 3,
  ...props
}: {
  children: React.ReactNode;
  spacing?: number;
  [key: string]: any;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={isMobile ? spacing - 1 : spacing}
      {...props}
    >
      {children}
    </Grid>
  );
};

// Mobile-optimized spacing utility
export const MobileSpacing = ({
  children,
  py = 2,
  px = 2,
}: {
  children: React.ReactNode;
  py?: number;
  px?: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: isMobile ? py - 1 : py, px: isMobile ? px - 1 : px }}>
      {children}
    </Box>
  );
};

// Touch-friendly buttons for mobile
export const MobileButton = ({
  children,
  size = 'medium',
  ...props
}: {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  [key: string]: any;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      size={isMobile ? 'medium' : size}
      sx={{
        minHeight: isMobile ? 48 : 36,
        px: isMobile ? 3 : 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

// Mobile Optimized Components - All components are individually exported above
