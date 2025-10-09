import React from 'react';
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
  Divider,
  Alert,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Medication as MedicationIcon,
  Home as RemedyIcon,
  Restaurant as DietIcon,
  FitnessCenter as ExerciseIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface TreatmentData {
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  homeRemedies: string[];
  lifestyle: string[];
  precautions: string[];
}

const TREATMENT_DATABASE: Record<string, TreatmentData> = {
  'acne': {
    medications: [
      { name: 'Benzoyl Peroxide', dosage: '2.5-10%', frequency: 'Once or twice daily', duration: '4-6 weeks' },
      { name: 'Salicylic Acid', dosage: '0.5-2%', frequency: 'Once or twice daily', duration: '4-6 weeks' },
      { name: 'Retinoids (Adapalene)', dosage: '0.1%', frequency: 'Once daily', duration: '8-12 weeks' },
      { name: 'Antibiotics (Topical)', dosage: 'Varies', frequency: 'Once or twice daily', duration: '6-8 weeks' }
    ],
    homeRemedies: [
      'Gentle cleansing with mild soap twice daily',
      'Avoid picking or squeezing pimples',
      'Use non-comedogenic moisturizers',
      'Apply tea tree oil diluted with carrier oil',
      'Use honey and cinnamon mask twice weekly',
      'Apply aloe vera gel to affected areas'
    ],
    lifestyle: [
      'Maintain a consistent skincare routine',
      'Use sunscreen daily (SPF 30+)',
      'Eat a balanced diet low in processed foods and dairy',
      'Manage stress levels through meditation or exercise',
      'Get adequate sleep (7-9 hours)',
      'Change pillowcases regularly'
    ],
    precautions: [
      'Avoid harsh scrubbing or exfoliation',
      'Do not use multiple acne treatments simultaneously',
      'Consult a dermatologist if acne persists >6 weeks',
      'Be patient - results may take 4-8 weeks to appear'
    ]
  },
  'eczema': {
    medications: [
      { name: 'Topical Corticosteroids', dosage: '0.5-2.5%', frequency: 'Once or twice daily', duration: '2-4 weeks' },
      { name: 'Topical Calcineurin Inhibitors', dosage: 'Varies', frequency: 'Twice daily', duration: '4-6 weeks' },
      { name: 'Oral Antihistamines', dosage: '10-25mg', frequency: 'Once daily', duration: 'As needed' },
      { name: 'Moisturizing Creams', dosage: 'Apply liberally', frequency: 'Multiple times daily', duration: 'Ongoing' }
    ],
    homeRemedies: [
      'Take lukewarm baths with colloidal oatmeal',
      'Use fragrance-free moisturizers immediately after bathing',
      'Wear soft, breathable cotton clothing',
      'Avoid harsh soaps and detergents',
      'Apply coconut oil to affected areas',
      'Use wet wraps for severe flare-ups'
    ],
    lifestyle: [
      'Identify and avoid personal triggers',
      'Maintain skin hydration throughout the day',
      'Use humidifiers in dry environments',
      'Practice stress management techniques',
      'Avoid extreme temperature changes',
      'Keep fingernails short to prevent scratching'
    ],
    precautions: [
      'Do not use topical steroids for more than 2 weeks without medical supervision',
      'Avoid hot showers or baths',
      'Be cautious with new skincare products',
      'Seek medical attention for infected eczema'
    ]
  },
  'psoriasis': {
    medications: [
      { name: 'Topical Corticosteroids', dosage: '0.05-0.1%', frequency: 'Once or twice daily', duration: '2-4 weeks' },
      { name: 'Vitamin D Analogues', dosage: 'Varies', frequency: 'Once daily', duration: '8-12 weeks' },
      { name: 'Coal Tar Preparations', dosage: '1-5%', frequency: 'Once daily', duration: '4-8 weeks' },
      { name: 'Systemic Medications', dosage: 'Varies', frequency: 'As prescribed', duration: 'Ongoing' }
    ],
    homeRemedies: [
      'Regular moisturizing with thick creams',
      'Gentle skin care routine avoiding irritants',
      'Limited exposure to natural sunlight',
      'Stress reduction through meditation',
      'Aloe vera application to plaques',
      'Apple cider vinegar diluted baths'
    ],
    lifestyle: [
      'Maintain a healthy weight',
      'Avoid smoking and excessive alcohol',
      'Regular moderate exercise',
      'Stress management and adequate sleep',
      'Protect skin from injury (Koebner phenomenon)',
      'Join psoriasis support groups'
    ],
    precautions: [
      'Avoid sudden withdrawal of topical steroids',
      'Monitor for side effects of systemic treatments',
      'Be aware of potential drug interactions',
      'Regular follow-up with dermatologist'
    ]
  },
  'melanoma': {
    medications: [
      { name: 'Immunotherapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Ongoing' },
      { name: 'Targeted Therapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Ongoing' },
      { name: 'Chemotherapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Treatment cycles' },
      { name: 'Radiation Therapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Treatment sessions' }
    ],
    homeRemedies: [
      'Surgical removal is the primary treatment',
      'Regular self-examination of skin',
      'Comprehensive sun protection',
      'Healthy diet rich in antioxidants',
      'Stress management techniques',
      'Support from cancer support groups'
    ],
    lifestyle: [
      'Monthly skin self-examinations',
      'Regular dermatologist check-ups',
      'Daily broad-spectrum sunscreen use',
      'Healthy diet and regular exercise',
      'Avoid tanning beds and excessive sun',
      'Genetic counseling if family history exists'
    ],
    precautions: [
      'This is a serious condition requiring immediate medical attention',
      'Early detection and treatment is crucial',
      'Regular follow-up care is essential',
      'Be vigilant about new or changing moles'
    ]
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`treatment-tabpanel-${index}`}
      aria-labelledby={`treatment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TreatmentGuidePageProps {
  detectedDisease?: string;
}

const TreatmentGuidePage: React.FC<TreatmentGuidePageProps> = ({ detectedDisease }) => {
  const [selectedDisease, setSelectedDisease] = useState(detectedDisease || 'acne');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{ title: string; content: string } | null>(null);

  const handleDiseaseChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedDisease(newValue);
  };

  const showDetailDialog = (title: string, content: string) => {
    setDialogContent({ title, content });
    setShowDialog(true);
  };

  const treatmentData = TREATMENT_DATABASE[selectedDisease];

  if (!treatmentData) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">
          Treatment information not available for the selected condition.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Treatment Guide & Recommendations
      </Typography>

      {detectedDisease && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Showing treatment recommendations for detected condition: <strong>{detectedDisease}</strong>
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Select Skin Condition
          </Typography>
          <Tabs
            value={selectedDisease}
            onChange={handleDiseaseChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(TREATMENT_DATABASE).map((disease) => (
              <Tab
                key={disease}
                value={disease}
                label={disease.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Medications */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <MedicationIcon sx={{ mr: 1, color: 'primary.main' }} />
                Medical Treatments
              </Typography>

              <List dense>
                {treatmentData.medications.map((med, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <MedicationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1">{med.name}</Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => showDetailDialog(
                              med.name,
                              `Dosage: ${med.dosage}\nFrequency: ${med.frequency}\nDuration: ${med.duration}`
                            )}
                          >
                            Details
                          </Button>
                        </Box>
                      }
                      secondary={`${med.dosage} • ${med.frequency}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Home Remedies */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <RemedyIcon sx={{ mr: 1, color: 'success.main' }} />
                Home Remedies
              </Typography>

              <List dense>
                {treatmentData.homeRemedies.map((remedy, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <RemedyIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={remedy} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Lifestyle Changes */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <DietIcon sx={{ mr: 1, color: 'secondary.main' }} />
                Lifestyle Recommendations
              </Typography>

              <List dense>
                {treatmentData.lifestyle.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Precautions */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
                Important Precautions
              </Typography>

              <List dense>
                {treatmentData.precautions.map((precaution, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={precaution} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Important Disclaimer */}
      <Alert severity="warning" sx={{ mt: 4 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Important Medical Disclaimer
        </Typography>
        <Typography variant="body2">
          This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          Never disregard professional medical advice or delay seeking it because of something you have read here.
        </Typography>
      </Alert>

      {/* Detail Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {dialogContent?.title}
          <IconButton onClick={() => setShowDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dialogContent && (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {dialogContent.content}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TreatmentGuidePage;
