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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Alert,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  LocalHospital as TreatmentIcon,
  Restaurant as DietIcon,
  FitnessCenter as ExerciseIcon,
  Spa as SpaIcon,
  WbSunny as SunIcon,
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

const EnhancedTreatmentGuidePage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const conditions = [
    {
      id: 'acne',
      name: 'Acne Vulgaris',
      category: 'Common',
      image: '/images/conditions/acne.jpg',
      description: 'A chronic skin condition characterized by inflamed or infected sebaceous glands, typically affecting adolescents and young adults.',
      symptoms: [
        'Whiteheads and blackheads',
        'Papules and pustules',
        'Cysts and nodules',
        'Scarring in severe cases'
      ],
      medicalTreatments: [
        'Topical retinoids (tretinoin, adapalene)',
        'Benzoyl peroxide',
        'Topical antibiotics (clindamycin)',
        'Oral antibiotics (tetracycline, doxycycline)',
        'Hormonal therapy (oral contraceptives)',
        'Isotretinoin for severe cases'
      ],
      homeRemedies: [
        'Tea tree oil diluted with carrier oil',
        'Aloe vera gel application',
        'Honey and cinnamon mask',
        'Green tea extract',
        'Regular gentle cleansing'
      ],
      lifestyleTips: [
        'Maintain a consistent skincare routine',
        'Avoid picking or squeezing pimples',
        'Use non-comedogenic products',
        'Keep hair clean and off the face',
        'Manage stress through meditation or exercise'
      ],
      prevention: [
        'Daily gentle cleansing',
        'Regular moisturizing',
        'Balanced diet rich in fruits and vegetables',
        'Adequate sleep (7-9 hours)',
        'Stress management techniques'
      ]
    },
    {
      id: 'eczema',
      name: 'Atopic Dermatitis (Eczema)',
      category: 'Chronic',
      image: '/images/conditions/eczema.jpg',
      description: 'A chronic inflammatory skin condition that causes dry, itchy, and inflamed skin, often beginning in childhood.',
      symptoms: [
        'Intense itching',
        'Dry, scaly skin',
        'Red patches',
        'Small bumps that may ooze fluid',
        'Thickened, cracked skin'
      ],
      medicalTreatments: [
        'Topical corticosteroids',
        'Topical calcineurin inhibitors',
        'Antihistamines for itching',
        'Oral corticosteroids for flare-ups',
        'Immunosuppressants for severe cases',
        'Phototherapy (UV light treatment)'
      ],
      homeRemedies: [
        'Oatmeal baths',
        'Coconut oil application',
        'Aloe vera gel',
        'Evening primrose oil supplements',
        'Chamomile compresses'
      ],
      lifestyleTips: [
        'Use fragrance-free products',
        'Avoid hot showers',
        'Pat dry after bathing',
        'Use humidifier in dry environments',
        'Wear soft, breathable clothing'
      ],
      prevention: [
        'Moisturize regularly',
        'Avoid known triggers',
        'Maintain skin hydration',
        'Use gentle skincare products',
        'Manage stress levels'
      ]
    },
    {
      id: 'psoriasis',
      name: 'Psoriasis',
      category: 'Autoimmune',
      image: '/images/conditions/psoriasis.jpg',
      description: 'A chronic autoimmune disease that causes rapid skin cell buildup, resulting in thick, silvery scales and itchy, dry patches.',
      symptoms: [
        'Thick, silvery scales',
        'Dry, cracked skin',
        'Itching and burning',
        'Thickened nails',
        'Joint pain (psoriatic arthritis)'
      ],
      medicalTreatments: [
        'Topical corticosteroids',
        'Vitamin D analogues',
        'Topical retinoids',
        'Methotrexate',
        'Biologic drugs (TNF inhibitors)',
        'Phototherapy (UVB, PUVA)'
      ],
      homeRemedies: [
        'Aloe vera gel',
        'Fish oil supplements',
        'Dead Sea salt baths',
        'Mahonia aquifolium cream',
        'Tea tree oil (diluted)'
      ],
      lifestyleTips: [
        'Regular moisturizing',
        'Stress management',
        'Avoid skin injuries',
        'Limit alcohol consumption',
        'Maintain healthy weight'
      ],
      prevention: [
        'Daily moisturizing routine',
        'Stress reduction techniques',
        'Balanced diet',
        'Regular exercise',
        'Avoid smoking'
      ]
    },
    {
      id: 'melanoma',
      name: 'Melanoma',
      category: 'Cancer',
      image: '/images/conditions/melanoma.jpg',
      description: 'The most serious type of skin cancer, developing from melanocytes and requiring immediate medical attention.',
      symptoms: [
        'Asymmetrical moles',
        'Irregular borders',
        'Multiple colors within a mole',
        'Diameter larger than 6mm',
        'Evolving or changing moles'
      ],
      medicalTreatments: [
        'Surgical excision',
        'Mohs surgery for facial lesions',
        'Sentinel lymph node biopsy',
        'Immunotherapy',
        'Targeted therapy',
        'Chemotherapy (rare cases)',
        'Radiation therapy'
      ],
      homeRemedies: [
        'None - requires immediate medical attention',
        'Focus on prevention and early detection'
      ],
      lifestyleTips: [
        'Monthly skin self-examinations',
        'Regular dermatologist visits',
        'Sun protection measures',
        'Avoid tanning beds',
        'Report any changes immediately'
      ],
      prevention: [
        'Daily sunscreen use (SPF 30+)',
        'Avoid peak sun hours (10am-4pm)',
        'Wear protective clothing',
        'Regular skin examinations',
        'Avoid tanning beds completely'
      ]
    }
  ];

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
          🏥 Comprehensive Treatment Guide
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Evidence-based treatment information, home remedies, and lifestyle guidance for various skin conditions
        </Typography>
      </Box>

      {/* Medical Disclaimer */}
      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice.
          Always consult with a qualified healthcare provider for diagnosis and treatment.
        </Typography>
      </Alert>

      {/* Tabs for different conditions */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 72,
              px: 3,
            }
          }}
        >
          {conditions.map((condition, index) => (
            <Tab
              key={condition.id}
              label={
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {condition.name}
                  </Typography>
                  <Chip
                    label={condition.category}
                    size="small"
                    sx={{ mt: 0.5 }}
                    color={
                      condition.category === 'Cancer' ? 'error' :
                      condition.category === 'Chronic' ? 'warning' : 'primary'
                    }
                  />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Condition Details */}
      {conditions.map((condition, index) => (
        <TabPanel key={condition.id} value={tabValue} index={index}>
          <Grid container spacing={4}>
            {/* Condition Overview */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 4 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={condition.image}
                  alt={condition.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                      {condition.name}
                    </Typography>
                    <Chip
                      label={condition.category}
                      color={
                        condition.category === 'Cancer' ? 'error' :
                        condition.category === 'Chronic' ? 'warning' : 'primary'
                      }
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {condition.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Common Symptoms:
                  </Typography>

                  <List>
                    {condition.symptoms.map((symptom, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <InfoIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={symptom} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Treatment Information */}
            <Grid item xs={12} md={4}>
              {/* Medical Treatments */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <TreatmentIcon sx={{ mr: 1, color: 'error.main' }} />
                    Medical Treatments
                  </Typography>

                  <List dense>
                    {condition.medicalTreatments.map((treatment, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={treatment}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Home Remedies */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <SpaIcon sx={{ mr: 1, color: 'success.main' }} />
                    Home Remedies
                  </Typography>

                  <List dense>
                    {condition.homeRemedies.map((remedy, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={remedy}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Lifestyle Tips */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
                    Lifestyle Tips
                  </Typography>

                  <List dense>
                    {condition.lifestyleTips.map((tip, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={tip}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Prevention */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
                    Prevention
                  </Typography>

                  <List dense>
                    {condition.prevention.map((prevention, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={prevention}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      ))}

      {/* When to See a Doctor */}
      <Paper elevation={3} sx={{ p: 4, mt: 6, bgcolor: 'error.light', color: 'error.contrastText' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <WarningIcon sx={{ mr: 2 }} />
          When to See a Doctor Immediately
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Emergency Signs:
            </Typography>
            <List>
              {[
                'Rapid spreading of rash or lesions',
                'Severe pain or burning sensation',
                'Fever accompanying skin symptoms',
                'Swelling of face, lips, or tongue',
                'Difficulty breathing',
                'Signs of infection (pus, warmth, red streaks)'
              ].map((sign, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <WarningIcon sx={{ color: 'error.contrastText' }} />
                  </ListItemIcon>
                  <ListItemText primary={sign} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Cancer Warning Signs:
            </Typography>
            <List>
              {[
                'New mole or growth',
                'Changes in existing moles',
                'Irregular borders or multiple colors',
                'Moles larger than pencil eraser',
                'Moles that bleed or itch',
                'Sores that don\'t heal'
              ].map((sign, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <WarningIcon sx={{ color: 'error.contrastText' }} />
                  </ListItemIcon>
                  <ListItemText primary={sign} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Alert severity="error" sx={{ mt: 3, bgcolor: 'error.dark' }}>
          <Typography variant="body2">
            If you experience any of these symptoms, seek immediate medical attention.
            Early detection and treatment are crucial for the best outcomes.
          </Typography>
        </Alert>
      </Paper>

      {/* Resources */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Additional Resources
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: 'American Academy of Dermatology',
              description: 'Comprehensive dermatology resources and guidelines',
              link: 'https://www.aad.org'
            },
            {
              title: 'National Eczema Association',
              description: 'Support and information for eczema patients',
              link: 'https://nationaleczema.org'
            },
            {
              title: 'Skin Cancer Foundation',
              description: 'Prevention, detection, and treatment information',
              link: 'https://www.skincancer.org'
            },
            {
              title: 'Psoriasis Foundation',
              description: 'Research, advocacy, and patient support',
              link: 'https://www.psoriasis.org'
            }
          ].map((resource, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {resource.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(resource.link, '_blank')}
                  >
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default EnhancedTreatmentGuidePage;
