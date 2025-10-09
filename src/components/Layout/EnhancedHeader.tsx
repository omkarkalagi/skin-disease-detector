import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  CameraAlt as CameraIcon,
  Upload as UploadIcon,
  Menu as MenuIcon,
  Notifications as BellIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Favorite as HeartIcon,
  Science as ScienceIcon,
  LocalHospital as TreatmentIcon,
  Person as AboutIcon,
  Help as HelpIcon,
  ContactMail as ContactIcon,
  Home as HomeIcon,
  Assessment as AssessmentIcon,
  Spa as SpaIcon,
  Dashboard as DashboardIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material';

const EnhancedHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced navigation items with descriptions
  const navigationItems = [
    {
      path: '/',
      label: 'Home',
      icon: <HomeIcon />,
      description: 'Dashboard & Overview',
      badge: null
    },
    {
      path: '/detect',
      label: 'Live Detection',
      icon: <CameraIcon />,
      description: 'Real-time Camera Analysis',
      badge: 'LIVE'
    },
    {
      path: '/upload',
      label: 'Upload Image',
      icon: <UploadIcon />,
      description: 'Photo Analysis',
      badge: null
    },
    {
      path: '/symptom-checker',
      label: 'Symptom Checker',
      icon: <AssessmentIcon />,
      description: 'AI Symptom Analysis',
      badge: 'NEW'
    },
    {
      path: '/dashboard',
      label: 'Health Dashboard',
      icon: <DashboardIcon />,
      description: 'Personal Health Metrics',
      badge: 'NEW'
    },
    {
      path: '/consultation',
      label: 'Virtual Consultation',
      icon: <VideoCallIcon />,
      description: 'Connect with Doctors',
      badge: 'HOT'
    },
    {
      path: '/skin-care-tips',
      label: 'Skin Care Tips',
      icon: <SpaIcon />,
      description: 'Expert Care Guide',
      badge: null
    },
    {
      path: '/history',
      label: 'Analysis History',
      icon: <AssessmentIcon />,
      description: 'Track Your Progress',
      badge: null
    },
    {
      path: '/routine-builder',
      label: 'Routine Builder',
      icon: <SpaIcon />,
      description: 'Custom Skincare Plans',
      badge: 'NEW'
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: <AssessmentIcon />,
      description: 'Health Insights & Trends',
      badge: 'PRO'
    },
    {
      path: '/community',
      label: 'Community',
      icon: <ContactIcon />,
      description: 'Forum & Support',
      badge: null
    },
    {
      path: '/training',
      label: 'AI Training',
      icon: <ScienceIcon />,
      description: 'Model Training Dashboard',
      badge: null
    },
    {
      path: '/treatments',
      label: 'Treatments',
      icon: <TreatmentIcon />,
      description: 'Treatment Guide',
      badge: null
    },
    {
      path: '/about',
      label: 'About',
      icon: <AboutIcon />,
      description: 'Our Story',
      badge: null
    },
    {
      path: '/faq',
      label: 'Help',
      icon: <HelpIcon />,
      description: 'FAQ & Support',
      badge: null
    },
    {
      path: '/contact',
      label: 'Contact',
      icon: <ContactIcon />,
      description: 'Get In Touch',
      badge: null
    }
  ];

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would change the theme
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'primary.main',
          backdropFilter: 'blur(10px)',
          color: isScrolled ? 'text.primary' : 'white',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <CameraIcon sx={{ mr: 1, fontSize: { xs: 24, md: 28 } }} />
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    color: isScrolled ? 'primary.main' : 'white',
                  },
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                SkinSight AI
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, flexGrow: 1 }}>
              {navigationItems.slice(0, 6).map((item) => (
                <Tooltip key={item.path} title={item.description}>
                  <Button
                    component={RouterLink}
                    to={item.path}
                    variant={location.pathname === item.path ? 'contained' : 'text'}
                    color={location.pathname === item.path ? 'secondary' : 'inherit'}
                    startIcon={item.icon}
                    endIcon={item.badge && (
                      <Badge
                        badgeContent={item.badge}
                        color={item.badge === 'LIVE' ? 'error' : 'primary'}
                        sx={{
                          '& .MuiBadge-badge': {
                            fontSize: '0.6rem',
                            minWidth: '16px',
                            height: '16px',
                          }
                        }}
                      />
                    )}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                </Tooltip>
              ))}
            </Box>

            {/* Right Side Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Dark Mode Toggle */}
              <Tooltip title="Toggle Dark Mode">
                <IconButton
                  onClick={toggleDarkMode}
                  sx={{
                    color: 'inherit',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  {isDarkMode ? <LightIcon /> : <DarkIcon />}
                </IconButton>
              </Tooltip>

              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton
                  sx={{
                    color: 'inherit',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <Badge badgeContent={notifications} color="error">
                    <BellIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Tooltip title="User Menu">
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    color: 'inherit',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: isScrolled ? 'primary.main' : 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <AccountIcon fontSize="small" />
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>

        {/* Secondary Navigation Bar for Mobile */}
        <Box
          sx={{
            display: { xs: 'block', lg: 'none' },
            bgcolor: 'rgba(0, 0, 0, 0.05)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', overflowX: 'auto', py: 1, gap: 1 }}>
              {navigationItems.slice(0, 5).map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  size="small"
                  variant={location.pathname === item.path ? 'contained' : 'text'}
                  color={location.pathname === item.path ? 'secondary' : 'inherit'}
                  startIcon={item.icon}
                  sx={{
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    '& .MuiButton-startIcon': {
                      mr: 0.5,
                      '& > *:nth-of-type(1)': {
                        fontSize: '1rem',
                      },
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Container>
        </Box>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Navigation Menu
          </Typography>

          <List>
            {navigationItems.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleMobileMenuClose();
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
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                />
                {item.badge && (
                  <Badge
                    badgeContent={item.badge}
                    color={item.badge === 'LIVE' ? 'error' : 'primary'}
                    sx={{ mr: 1 }}
                  />
                )}
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HeartIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <HeartIcon fontSize="small" color="error" />
          </ListItemIcon>
          Favorites
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size="small"
              />
            }
            label="Dark Mode"
          />
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>

      {/* Floating Action Button for Quick Access */}
      <Fab
        color="secondary"
        size="medium"
        onClick={() => navigate('/detect')}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, md: 24 },
          right: 24,
          zIndex: 1000,
          display: { xs: location.pathname === '/' ? 'flex' : 'none', md: 'flex' },
          '&:hover': {
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.3s ease',
        }}
      >
        <CameraIcon />
      </Fab>
    </>
  );
};

export default EnhancedHeader;
