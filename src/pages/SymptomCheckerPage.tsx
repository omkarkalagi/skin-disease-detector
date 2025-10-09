import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  HealthAndSafety as HealthIcon,
  Timeline as TimelineIcon,
  Psychology as PsychologyIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';

const SymptomCheckerPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [results, setResults] = useState<any>(null);

  const steps = ['Select Symptoms', 'Rate Severity', 'Provide Details', 'Get Results'];

  const symptomCategories = [
    {
      category: 'Skin Appearance',
      symptoms: [
        'Redness or rash',
        'Itching or burning',
        'Swelling or inflammation',
        'Dry, flaky skin',
        'Oozing or weeping',
        'Blisters or vesicles',
        'Scales or plaques',
        'Color changes (darker/lighter)',
        'Thickened skin',
        'Open sores or ulcers'
      ]
    },
    {
      category: 'Pain & Sensation',
      symptoms: [
        'Pain or tenderness',
        'Burning sensation',
        'Stinging or tingling',
        'Numbness',
        'Sensitivity to touch',
        'Itching that worsens at night',
        'Pain that worsens with movement',
        'Sharp, stabbing pain'
      ]
    },
    {
      category: 'Location & Spread',
      symptoms: [
        'Affects face only',
        'Affects hands and feet',
        'Affects scalp or hair',
        'Affects nails',
        'Spreads to other areas',
        'Appears in skin folds',
        'Symmetric (both sides)',
        'Isolated patches'
      ]
    },
    {
      category: 'Associated Symptoms',
      symptoms: [
        'Fever or chills',
        'Fatigue or tiredness',
        'Joint pain or swelling',
        'Headache',
        'Nausea or vomiting',
        'Hair loss',
        'Nail changes',
        'Swollen lymph nodes'
      ]
    }
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    // Simple rule-based analysis - in production, this would use ML
    const possibleConditions = [];

    if (symptoms.includes('Itching or burning') && symptoms.includes('Redness or rash')) {
      possibleConditions.push({
        condition: 'Eczema (Atopic Dermatitis)',
        probability: 85,
        urgency: 'medium',
        description: 'Common inflammatory skin condition causing itchy, red, swollen skin.'
      });
    }

    if (symptoms.includes('Scales or plaques') && symptoms.includes('Thickened skin')) {
      possibleConditions.push({
        condition: 'Psoriasis',
        probability: 78,
        urgency: 'medium',
        description: 'Autoimmune condition causing rapid skin cell buildup forming scales and plaques.'
      });
    }

    if (symptoms.includes('Open sores or ulcers') && symptoms.includes('Pain or tenderness')) {
      possibleConditions.push({
        condition: 'Skin Infection',
        probability: 65,
        urgency: 'high',
        description: 'Possible bacterial or viral infection requiring prompt medical attention.'
      });
    }

    setResults({
      possibleConditions: possibleConditions.slice(0, 3),
      recommendations: [
        'Document your symptoms with photos',
        'Avoid scratching or picking at affected areas',
        'Use gentle, fragrance-free skincare products',
        'Consult a dermatologist if symptoms persist >2 weeks',
        'Seek immediate care if you experience severe pain, fever, or rapid spreading'
      ]
    });
    setCurrentStep(3);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        🩺 AI Symptom Checker
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step 1: Symptom Selection */}
      {currentStep === 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Select Your Symptoms
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Check all symptoms that apply to your condition:
            </Typography>

            <Grid container spacing={3}>
              {symptomCategories.map((category) => (
                <Grid item xs={12} md={6} key={category.category}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {category.category}
                  </Typography>
                  <FormGroup>
                    {category.symptoms.map((symptom) => (
                      <FormControlLabel
                        key={symptom}
                        control={
                          <Checkbox
                            checked={symptoms.includes(symptom)}
                            onChange={() => handleSymptomToggle(symptom)}
                          />
                        }
                        label={symptom}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Selected: {symptoms.length} symptoms
              </Typography>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(1)}
                disabled={symptoms.length === 0}
              >
                Continue
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Severity Rating */}
      {currentStep === 1 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Rate Symptom Severity
            </Typography>

            <FormControl sx={{ mb: 4 }}>
              <FormLabel>How severe are your symptoms?</FormLabel>
              <RadioGroup
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <FormControlLabel value="mild" control={<Radio />} label="Mild - Minor discomfort, doesn't interfere with daily activities" />
                <FormControlLabel value="moderate" control={<Radio />} label="Moderate - Noticeable discomfort, some impact on daily activities" />
                <FormControlLabel value="severe" control={<Radio />} label="Severe - Significant discomfort, major impact on daily activities" />
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => setCurrentStep(0)}>Back</Button>
              <Button variant="contained" onClick={() => setCurrentStep(2)}>
                Continue
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Additional Details */}
      {currentStep === 2 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Additional Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <FormLabel>How long have you had these symptoms?</FormLabel>
                  <RadioGroup
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <FormControlLabel value="days" control={<Radio />} label="Less than a week" />
                    <FormControlLabel value="weeks" control={<Radio />} label="1-4 weeks" />
                    <FormControlLabel value="months" control={<Radio />} label="1-6 months" />
                    <FormControlLabel value="chronic" control={<Radio />} label="More than 6 months" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <FormLabel>Where is the affected area primarily located?</FormLabel>
                  <RadioGroup
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <FormControlLabel value="face" control={<Radio />} label="Face" />
                    <FormControlLabel value="arms" control={<Radio />} label="Arms" />
                    <FormControlLabel value="legs" control={<Radio />} label="Legs" />
                    <FormControlLabel value="torso" control={<Radio />} label="Torso/Chest/Back" />
                    <FormControlLabel value="hands" control={<Radio />} label="Hands/Feet" />
                    <FormControlLabel value="scalp" control={<Radio />} label="Scalp/Hair" />
                    <FormControlLabel value="multiple" control={<Radio />} label="Multiple areas" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Additional details (optional)"
                  placeholder="Describe any triggers, patterns, or other relevant information..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => setCurrentStep(1)}>Back</Button>
              <Button variant="contained" onClick={analyzeSymptoms}>
                Analyze Symptoms
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Results */}
      {currentStep === 3 && results && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <HealthIcon sx={{ mr: 1 }} />
              Analysis Results
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Important:</strong> This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.
              </Typography>
            </Alert>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
              Possible Conditions:
            </Typography>

            {results.possibleConditions.map((condition: any, index: number) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                      {condition.condition}
                    </Typography>
                    <Chip
                      label={`${condition.probability}% match`}
                      color={condition.probability > 70 ? 'success' : 'warning'}
                      size="small"
                    />
                    <Chip
                      label={condition.urgency}
                      color={condition.urgency === 'high' ? 'error' : 'info'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    {condition.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
              Recommended Actions:
            </Typography>

            <List>
              {results.recommendations.map((rec: string, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={rec} />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={() => setCurrentStep(0)}>
                Start Over
              </Button>
              <Button variant="contained" component="a" href="/contact">
                Contact Dermatologist
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default SymptomCheckerPage;
