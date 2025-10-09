import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  LocalHospital as TreatmentIcon,
  Restaurant as DietIcon,
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

const SkinConditionsEncyclopediaPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const conditions = [
    {
      id: 'acne',
      name: 'Acne Vulgaris',
      category: 'Common',
      severity: 'Mild to Severe',
      image: '/images/conditions/acne.jpg',
      description: 'A chronic skin condition characterized by inflamed or infected sebaceous glands, typically affecting adolescents and young adults.',
      symptoms: [
        'Whiteheads and blackheads (comedones)',
        'Papules and pustules (inflamed pimples)',
        'Cysts and nodules (deep, painful lumps)',
        'Scarring in severe cases',
        'Post-inflammatory hyperpigmentation'
      ],
      causes: [
        'Excess sebum production',
        'Bacterial infection (P. acnes)',
        'Hormonal fluctuations',
        'Clogged hair follicles',
        'Genetic predisposition'
      ],
      treatments: [
        'Topical retinoids (tretinoin, adapalene)',
        'Benzoyl peroxide',
        'Topical antibiotics (clindamycin)',
        'Oral antibiotics (tetracycline, doxycycline)',
        'Hormonal therapy (oral contraceptives)',
        'Isotretinoin for severe cases'
      ],
      prevention: [
        'Daily gentle cleansing',
        'Non-comedogenic skincare products',
        'Regular moisturizing',
        'Healthy diet (low glycemic index)',
        'Stress management'
      ]
    },
    {
      id: 'eczema',
      name: 'Atopic Dermatitis (Eczema)',
      category: 'Chronic',
      severity: 'Mild to Severe',
      image: '/images/conditions/eczema.jpg',
      description: 'A chronic inflammatory skin condition that causes dry, itchy, and inflamed skin, often beginning in childhood.',
      symptoms: [
        'Intense itching (pruritus)',
        'Dry, scaly, or cracked skin',
        'Red to brownish-gray patches',
        'Small raised bumps that may ooze fluid',
        'Thickened, cracked, or scaly skin (lichenification)'
      ],
      causes: [
        'Genetic factors (filaggrin gene mutations)',
        'Immune system dysfunction',
        'Environmental allergens',
        'Irritants (soaps, detergents)',
        'Climate and weather changes'
      ],
      treatments: [
        'Topical corticosteroids',
        'Topical calcineurin inhibitors (tacrolimus)',
        'Antihistamines for itching',
        'Oral corticosteroids for flare-ups',
        'Immunosuppressants for severe cases',
        'Phototherapy (UV light treatment)'
      ],
      prevention: [
        'Regular moisturizing',
        'Avoiding known triggers',
        'Using fragrance-free products',
        'Maintaining skin hydration',
        'Stress management techniques'
      ]
    },
    {
      id: 'psoriasis',
      name: 'Psoriasis',
      category: 'Autoimmune',
      severity: 'Mild to Severe',
      image: '/images/conditions/psoriasis.jpg',
      description: 'A chronic autoimmune disease that causes rapid skin cell buildup, resulting in thick, silvery scales and itchy, dry patches.',
      symptoms: [
        'Thick, silvery scales on red patches',
        'Dry, cracked skin that may bleed',
        'Itching, burning, or soreness',
        'Thickened, pitted, or ridged nails',
        'Joint pain and swelling (psoriatic arthritis)'
      ],
      causes: [
        'Immune system dysfunction',
        'Genetic predisposition',
        'Environmental triggers',
        'Stress and emotional factors',
        'Infections (strep throat)',
        'Certain medications'
      ],
      treatments: [
        'Topical corticosteroids',
        'Vitamin D analogues (calcipotriene)',
        'Topical retinoids (tazarotene)',
        'Methotrexate',
        'Biologic drugs (TNF inhibitors)',
        'Phototherapy (UVB, PUVA)'
      ],
      prevention: [
        'Stress management',
        'Avoiding skin injuries',
        'Limiting alcohol consumption',
        'Maintaining healthy weight',
        'Regular moisturizing'
      ]
    },
    {
      id: 'melanoma',
      name: 'Melanoma',
      category: 'Cancer',
      severity: 'High Risk',
      image: '/images/conditions/melanoma.jpg',
      description: 'The most serious type of skin cancer, developing from melanocytes and requiring immediate medical attention.',
      symptoms: [
        'Asymmetrical moles with irregular borders',
        'Multiple colors within a single mole',
        'Diameter larger than 6mm (pencil eraser)',
        'Evolving or changing moles',
        'Moles that bleed, itch, or are painful'
      ],
      causes: [
        'UV radiation exposure',
        'Genetic mutations (BRAF, NRAS genes)',
        'Family history of melanoma',
        'Fair skin and light-colored eyes',
        'History of severe sunburns',
        'Weakened immune system'
      ],
      treatments: [
        'Surgical excision with wide margins',
        'Mohs surgery for facial lesions',
        'Sentinel lymph node biopsy',
        'Immunotherapy (pembrolizumab, nivolumab)',
        'Targeted therapy (BRAF inhibitors)',
        'Chemotherapy (rare cases)',
        'Radiation therapy'
      ],
      prevention: [
        'Daily sunscreen use (SPF 30+)',
        'Avoiding peak sun hours (10am-4pm)',
        'Wearing protective clothing',
        'Regular skin self-examinations',
        'Avoiding tanning beds completely',
        'Annual dermatologist skin checks'
      ]
    },
    {
      id: 'rosacea',
      name: 'Rosacea',
      category: 'Chronic',
      severity: 'Mild to Moderate',
      image: '/images/conditions/rosacea.jpg',
      description: 'A common skin condition that causes redness and visible blood vessels in the face, often with pus-filled bumps.',
      symptoms: [
        'Facial redness and flushing',
        'Visible blood vessels (telangiectasia)',
        'Swollen, red bumps (papules and pustules)',
        'Eye irritation (ocular rosacea)',
        'Thickened skin (phymatous rosacea)'
      ],
      causes: [
        'Abnormal vascular response',
        'Inflammatory response to skin mites',
        'Genetic factors',
        'Environmental triggers',
        'Gastrointestinal disorders'
      ],
      treatments: [
        'Topical medications (metronidazole, azelaic acid)',
        'Oral antibiotics (tetracycline, doxycycline)',
        'Laser therapy for blood vessels',
        'Intense pulsed light (IPL) therapy',
        'Topical retinoids',
        'Oral isotretinoin (severe cases)'
      ],
      prevention: [
        'Identifying and avoiding triggers',
        'Daily gentle skincare routine',
        'Sun protection',
        'Stress management',
        'Avoiding extreme temperatures'
      ]
    },
    {
      id: 'vitiligo',
      name: 'Vitiligo',
      category: 'Autoimmune',
      severity: 'Cosmetic',
      image: '/images/conditions/vitiligo.jpg',
      description: 'A long-term skin condition characterized by patches of skin losing their pigment, resulting in white or light-colored areas.',
      symptoms: [
        'White or light-colored patches of skin',
        'Premature graying of hair',
        'Loss of color in mucous membranes',
        'Patches that spread over time',
        'Symmetric distribution (both sides of body)'
      ],
      causes: [
        'Autoimmune destruction of melanocytes',
        'Genetic factors (30% have family history)',
        'Oxidative stress',
        'Environmental triggers',
        'Neural factors'
      ],
      treatments: [
        'Topical corticosteroids',
        'Topical calcineurin inhibitors',
        'Phototherapy (narrowband UVB)',
        'Excimer laser therapy',
        'Surgical treatments (skin grafting)',
        'Depigmentation therapy (severe cases)'
      ],
      prevention: [
        'Sun protection for affected areas',
        'Avoiding skin trauma',
        'Stress management',
        'Regular dermatologist monitoring',
        'Psychological support'
      ]
    }
  ];

  const filteredConditions = conditions.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || condition.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', 'common', 'chronic', 'autoimmune', 'cancer'];

  return (
    <Container maxWidth="xl">
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
          📚 Skin Conditions Encyclopedia
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Comprehensive information about skin conditions, symptoms, treatments, and prevention strategies
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search skin conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  onClick={() => setFilter(category)}
                  variant={filter === category ? 'filled' : 'outlined'}
                  color="primary"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Category Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Conditions" />
          <Tab label="Common Conditions" />
          <Tab label="Chronic Conditions" />
          <Tab label="Autoimmune Conditions" />
          <Tab label="Cancer Conditions" />
        </Tabs>
      </Paper>

      {/* Conditions Grid */}
      <Grid container spacing={4}>
        {filteredConditions.map((condition) => (
          <Grid item xs={12} sm={6} md={4} key={condition.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                },
                position: 'relative',
              }}
              onClick={() => setSelectedCondition(condition)}
            >
              <CardMedia
                component="img"
                height="200"
                image={condition.image}
                alt={condition.name}
                sx={{ objectFit: 'cover' }}
              />

              <Chip
                label={condition.category}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: condition.category === 'Cancer' ? 'error.main' :
                          condition.category === 'Chronic' ? 'warning.main' : 'primary.main',
                  color: 'white',
                }}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {condition.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {condition.description.substring(0, 100)}...
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={condition.severity}
                    size="small"
                    variant="outlined"
                    color={condition.severity === 'High Risk' ? 'error' : 'default'}
                  />
                  <Button size="small" variant="outlined">
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Condition Details Dialog */}
      <Dialog
        open={!!selectedCondition}
        onClose={() => setSelectedCondition(null)}
        maxWidth="lg"
        fullWidth
      >
        {selectedCondition && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {selectedCondition.name}
              </Typography>
              <Box>
                <Chip
                  label={selectedCondition.category}
                  sx={{ mr: 1 }}
                  color={selectedCondition.category === 'Cancer' ? 'error' : 'primary'}
                />
                <Chip label={selectedCondition.severity} variant="outlined" />
              </Box>
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={selectedCondition.image}
                    alt={selectedCondition.name}
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      mb: 3
                    }}
                  />

                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedCondition.description}
                  </Typography>

                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment.
                    </Typography>
                  </Alert>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                    <Tab icon={<InfoIcon />} label="Symptoms" />
                    <Tab icon={<WarningIcon />} label="Causes" />
                    <Tab icon={<TreatmentIcon />} label="Treatments" />
                    <Tab icon={<CheckIcon />} label="Prevention" />
                  </Tabs>

                  <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Common Symptoms:
                    </Typography>
                    <List>
                      {selectedCondition.symptoms.map((symptom, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <InfoIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={symptom} />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Possible Causes:
                    </Typography>
                    <List>
                      {selectedCondition.causes.map((cause, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <WarningIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={cause} />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Treatment Options:
                    </Typography>
                    <List>
                      {selectedCondition.treatments.map((treatment, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <TreatmentIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={treatment} />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>

                  <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Prevention Strategies:
                    </Typography>
                    <List>
                      {selectedCondition.prevention.map((prevention, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={prevention} />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedCondition(null)}>Close</Button>
              <Button variant="contained" onClick={() => window.open('/treatments', '_blank')}>
                View Treatments
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Quick Stats */}
      <Paper elevation={3} sx={{ p: 4, mt: 6, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Encyclopedia Statistics
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                50+
              </Typography>
              <Typography variant="h6">
                Conditions Covered
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                200+
              </Typography>
              <Typography variant="h6">
                Treatment Options
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                1000+
              </Typography>
              <Typography variant="h6">
                Medical Facts
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                24/7
              </Typography>
              <Typography variant="h6">
                Always Available
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SkinConditionsEncyclopediaPage;
