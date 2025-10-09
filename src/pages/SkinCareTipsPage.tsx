import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Rating,
  Paper,
  Avatar,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Lightbulb as TipIcon,
  Restaurant as DietIcon,
  FitnessCenter as ExerciseIcon,
  Spa as SpaIcon,
  WbSunny as SunIcon,
  LocalHospital as TreatmentIcon,
  Favorite as HeartIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SkinCareTipsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const showTipDetails = (tip: any) => {
    setSelectedTip(tip);
    setShowDialog(true);
  };

  const skinCareTips = {
    daily: [
      {
        title: 'Morning Routine',
        icon: <SunIcon color="warning" />,
        tips: [
          'Cleanse with lukewarm water and gentle cleanser',
          'Apply antioxidant serum (Vitamin C)',
          'Use broad-spectrum SPF 30+ sunscreen',
          'Moisturize with lightweight, non-comedogenic lotion'
        ],
        rating: 5
      },
      {
        title: 'Evening Routine',
        icon: <SpaIcon color="secondary" />,
        tips: [
          'Remove makeup and cleanse thoroughly',
          'Apply treatment products (retinol, acids)',
          'Use rich moisturizer or night cream',
          'Apply eye cream for delicate eye area'
        ],
        rating: 5
      },
      {
        title: 'Weekly Treatments',
        icon: <TreatmentIcon color="info" />,
        tips: [
          'Exfoliate 2-3 times per week',
          'Use face masks (hydrating, clay, sheet)',
          'Deep condition hair and scalp',
          'Apply body scrub in shower'
        ],
        rating: 4
      }
    ],
    seasonal: [
      {
        title: 'Summer Skin Care',
        icon: <SunIcon color="warning" />,
        tips: [
          'Use higher SPF (50+) and reapply every 2 hours',
          'Stay hydrated - drink 8+ glasses of water daily',
          'Use lightweight, oil-free moisturizers',
          'Protect lips with SPF lip balm'
        ],
        rating: 5
      },
      {
        title: 'Winter Protection',
        icon: <SpaIcon color="primary" />,
        tips: [
          'Use thicker, more emollient moisturizers',
          'Apply petroleum jelly to extremely dry areas',
          'Use humidifier to add moisture to air',
          'Protect skin from hot showers and harsh winds'
        ],
        rating: 5
      },
      {
        title: 'Spring Renewal',
        icon: <HeartIcon color="success" />,
        tips: [
          'Incorporate gentle exfoliation',
          'Add brightening serums to routine',
          'Focus on repairing winter damage',
          'Start gradual sun exposure for Vitamin D'
        ],
        rating: 4
      }
    ],
    conditions: [
      {
        title: 'Acne-Prone Skin',
        icon: <WarningIcon color="error" />,
        tips: [
          'Use non-comedogenic products only',
          'Avoid touching face throughout day',
          'Clean phone screen regularly',
          'Change pillowcases 2-3 times weekly'
        ],
        rating: 5
      },
      {
        title: 'Sensitive Skin',
        icon: <HeartIcon color="secondary" />,
        tips: [
          'Patch test all new products',
          'Use fragrance-free formulations',
          'Avoid hot water and harsh exfoliants',
          'Choose mineral-based sunscreens'
        ],
        rating: 5
      },
      {
        title: 'Aging Skin',
        icon: <TipIcon color="info" />,
        tips: [
          'Incorporate retinoids gradually',
          'Use peptides and growth factors',
          'Protect from UV damage daily',
          'Consider professional treatments'
        ],
        rating: 4
      }
    ]
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          ✨ Skin Care Tips & Guide
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Your comprehensive guide to healthy, glowing skin with expert tips and personalized routines
        </Typography>
      </Box>

      {/* Main Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.8rem', md: '1rem' },
              minHeight: 64,
            }
          }}
        >
          <Tab icon={<TipIcon />} label="Daily Routines" />
          <Tab icon={<SunIcon />} label="Seasonal Care" />
          <Tab icon={<HeartIcon />} label="Skin Conditions" />
        </Tabs>
      </Paper>

      {/* Daily Routines Tab */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Daily Skin Care Routines
        </Typography>

        <Grid container spacing={4}>
          {skinCareTips.daily.map((routine, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => showTipDetails(routine)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, fontSize: '3rem' }}>
                    {routine.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {routine.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Rating value={routine.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {routine.tips.length} essential steps
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Seasonal Care Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Seasonal Skin Care
        </Typography>

        <Grid container spacing={4}>
          {skinCareTips.seasonal.map((season, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => showTipDetails(season)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, fontSize: '3rem' }}>
                    {season.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {season.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Rating value={season.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {season.tips.length} seasonal tips
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Skin Conditions Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Skin Condition-Specific Care
        </Typography>

        <Grid container spacing={4}>
          {skinCareTips.conditions.map((condition, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => showTipDetails(condition)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, fontSize: '3rem' }}>
                    {condition.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {condition.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Rating value={condition.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {condition.tips.length} care tips
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Expert Advice Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 6, mb: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          💡 Expert Advice
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                <DietIcon />
              </Avatar>
              <Typography variant="h6" gutterBottom>Nutrition Matters</Typography>
              <Typography variant="body2">
                A diet rich in antioxidants, omega-3s, and vitamins supports skin health from within.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                <ExerciseIcon />
              </Avatar>
              <Typography variant="h6" gutterBottom>Stay Active</Typography>
              <Typography variant="body2">
                Regular exercise improves circulation and helps maintain healthy skin tone and texture.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 60, height: 60 }}>
                <SpaIcon />
              </Avatar>
              <Typography variant="h6" gutterBottom>Consistency is Key</Typography>
              <Typography variant="body2">
                Consistent skincare routines yield better results than occasional intensive treatments.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Tips Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Quick Tips for Healthy Skin
        </Typography>

        <Grid container spacing={3}>
          {[
            'Always remove makeup before bed',
            'Don\'t forget your neck and décolletage',
            'Change your pillowcase regularly',
            'Stay hydrated throughout the day',
            'Get enough quality sleep',
            'Manage stress levels effectively'
          ].map((tip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CheckIcon color="success" sx={{ mr: 2, mt: 0.5 }} />
                    <Typography variant="body2">
                      {tip}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tip Details Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedTip?.icon}
            <Typography variant="h6" sx={{ ml: 2 }}>
              {selectedTip?.title}
            </Typography>
          </Box>
          <IconButton onClick={() => setShowDialog(false)}>
            <ExpandMoreIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedTip && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Effectiveness Rating:
                </Typography>
                <Rating value={selectedTip.rating} readOnly />
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Step-by-Step Guide:
              </Typography>

              <List>
                {selectedTip.tips.map((tip: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SkinCareTipsPage;
