import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondary,
  Divider,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  LinearProgress,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  Face as FaceIcon,
  WbSunny as MorningIcon,
  Brightness3 as NightIcon,
  LocalFlorist as ProductIcon,
  Schedule as TimeIcon,
  Star as StarIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Save as SaveIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ShoppingCart as ShopIcon,
  Favorite as FavoriteIcon,
  Timer as TimerIcon,
  Water as HydrationIcon,
  Spa as SpaIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  ingredients: string[];
  skinTypes: string[];
  concerns: string[];
  timeOfUse: 'morning' | 'evening' | 'both';
  order: number;
  frequency: string;
  amount: string;
  benefits: string[];
}

interface RoutineStep {
  id: string;
  product: Product;
  notes: string;
  duration: number;
}

interface SkinProfile {
  skinType: string;
  concerns: string[];
  sensitivity: number;
  age: number;
  climate: string;
  lifestyle: string[];
  budget: number;
  experience: string;
}

const SkinCareRoutineBuilderPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skinProfile, setSkinProfile] = useState<SkinProfile>({
    skinType: '',
    concerns: [],
    sensitivity: 3,
    age: 25,
    climate: '',
    lifestyle: [],
    budget: 100,
    experience: 'beginner'
  });
  const [morningRoutine, setMorningRoutine] = useState<RoutineStep[]>([]);
  const [eveningRoutine, setEveningRoutine] = useState<RoutineStep[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [routineName, setRoutineName] = useState('My Custom Routine');

  // Mock product database
  const productDatabase: Product[] = [
    {
      id: '1',
      name: 'Gentle Foaming Cleanser',
      brand: 'CeraVe',
      category: 'Cleanser',
      image: '/api/placeholder/100/100',
      price: 12.99,
      rating: 4.5,
      ingredients: ['Ceramides', 'Hyaluronic Acid', 'Niacinamide'],
      skinTypes: ['Normal', 'Dry', 'Sensitive'],
      concerns: ['Dryness', 'Sensitivity'],
      timeOfUse: 'both',
      order: 1,
      frequency: 'Daily',
      amount: 'Pump size',
      benefits: ['Gentle cleansing', 'Maintains skin barrier', 'Hydrating']
    },
    {
      id: '2',
      name: 'Vitamin C Serum',
      brand: 'The Ordinary',
      category: 'Serum',
      image: '/api/placeholder/100/100',
      price: 7.90,
      rating: 4.2,
      ingredients: ['L-Ascorbic Acid', 'Alpha Tocopherol'],
      skinTypes: ['Normal', 'Oily', 'Combination'],
      concerns: ['Dark Spots', 'Dullness', 'Aging'],
      timeOfUse: 'morning',
      order: 3,
      frequency: 'Daily',
      amount: '3-4 drops',
      benefits: ['Brightening', 'Antioxidant protection', 'Collagen support']
    },
    {
      id: '3',
      name: 'Hyaluronic Acid Moisturizer',
      brand: 'Neutrogena',
      category: 'Moisturizer',
      image: '/api/placeholder/100/100',
      price: 15.99,
      rating: 4.3,
      ingredients: ['Hyaluronic Acid', 'Glycerin', 'Dimethicone'],
      skinTypes: ['All Types'],
      concerns: ['Dryness', 'Dehydration'],
      timeOfUse: 'both',
      order: 4,
      frequency: 'Daily',
      amount: 'Nickel size',
      benefits: ['Deep hydration', 'Plumping effect', 'Long-lasting moisture']
    },
    {
      id: '4',
      name: 'Broad Spectrum SPF 50',
      brand: 'EltaMD',
      category: 'Sunscreen',
      image: '/api/placeholder/100/100',
      price: 37.00,
      rating: 4.7,
      ingredients: ['Zinc Oxide', 'Octinoxate', 'Niacinamide'],
      skinTypes: ['All Types'],
      concerns: ['Sun Protection', 'Aging Prevention'],
      timeOfUse: 'morning',
      order: 5,
      frequency: 'Daily',
      amount: '1/4 teaspoon',
      benefits: ['UV protection', 'Non-comedogenic', 'Antioxidant boost']
    },
    {
      id: '5',
      name: 'Retinol Treatment',
      brand: 'Paula\'s Choice',
      category: 'Treatment',
      image: '/api/placeholder/100/100',
      price: 58.00,
      rating: 4.4,
      ingredients: ['Retinol', 'Peptides', 'Antioxidants'],
      skinTypes: ['Normal', 'Oily', 'Combination'],
      concerns: ['Aging', 'Fine Lines', 'Texture'],
      timeOfUse: 'evening',
      order: 3,
      frequency: '2-3 times per week',
      amount: 'Pea size',
      benefits: ['Anti-aging', 'Skin renewal', 'Texture improvement']
    }
  ];

  const steps = [
    'Skin Assessment',
    'Product Selection',
    'Routine Building',
    'Review & Save'
  ];

  const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  const skinConcerns = [
    'Acne', 'Dark Spots', 'Fine Lines', 'Dryness', 'Oiliness', 
    'Sensitivity', 'Dullness', 'Large Pores', 'Redness', 'Aging'
  ];
  const climates = ['Humid', 'Dry', 'Temperate', 'Cold', 'Hot'];
  const lifestyles = ['Active', 'Indoor Work', 'Frequent Travel', 'Stress', 'Poor Sleep'];

  const getRecommendedProducts = () => {
    return productDatabase.filter(product => {
      const matchesSkinType = product.skinTypes.includes(skinProfile.skinType);
      const matchesConcerns = product.concerns.some(concern => 
        skinProfile.concerns.includes(concern)
      );
      const withinBudget = product.price <= skinProfile.budget;
      
      return (matchesSkinType || matchesConcerns) && withinBudget;
    }).sort((a, b) => b.rating - a.rating);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddToRoutine = (product: Product, timeOfUse: 'morning' | 'evening') => {
    const newStep: RoutineStep = {
      id: `${product.id}-${timeOfUse}-${Date.now()}`,
      product,
      notes: '',
      duration: 2
    };

    if (timeOfUse === 'morning') {
      setMorningRoutine(prev => [...prev, newStep].sort((a, b) => a.product.order - b.product.order));
    } else {
      setEveningRoutine(prev => [...prev, newStep].sort((a, b) => a.product.order - b.product.order));
    }
  };

  const handleRemoveFromRoutine = (stepId: string, timeOfUse: 'morning' | 'evening') => {
    if (timeOfUse === 'morning') {
      setMorningRoutine(prev => prev.filter(step => step.id !== stepId));
    } else {
      setEveningRoutine(prev => prev.filter(step => step.id !== stepId));
    }
  };

  const calculateRoutineTime = (routine: RoutineStep[]) => {
    return routine.reduce((total, step) => total + step.duration, 0);
  };

  const calculateRoutineCost = (routine: RoutineStep[]) => {
    return routine.reduce((total, step) => total + step.product.price, 0);
  };

  const renderSkinAssessment = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tell us about your skin
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Skin Type</InputLabel>
            <Select
              value={skinProfile.skinType}
              onChange={(e) => setSkinProfile(prev => ({ ...prev, skinType: e.target.value }))}
            >
              {skinTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Skin Concerns</Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            {skinConcerns.map(concern => (
              <Chip
                key={concern}
                label={concern}
                onClick={() => {
                  setSkinProfile(prev => ({
                    ...prev,
                    concerns: prev.concerns.includes(concern)
                      ? prev.concerns.filter(c => c !== concern)
                      : [...prev.concerns, concern]
                  }));
                }}
                color={skinProfile.concerns.includes(concern) ? 'primary' : 'default'}
                variant={skinProfile.concerns.includes(concern) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          <Typography gutterBottom>Skin Sensitivity (1-5)</Typography>
          <Slider
            value={skinProfile.sensitivity}
            onChange={(_, value) => setSkinProfile(prev => ({ ...prev, sensitivity: value as number }))}
            min={1}
            max={5}
            marks
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Age"
            value={skinProfile.age}
            onChange={(e) => setSkinProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Climate</InputLabel>
            <Select
              value={skinProfile.climate}
              onChange={(e) => setSkinProfile(prev => ({ ...prev, climate: e.target.value }))}
            >
              {climates.map(climate => (
                <MenuItem key={climate} value={climate}>{climate}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Monthly Budget ($)</Typography>
          <Slider
            value={skinProfile.budget}
            onChange={(_, value) => setSkinProfile(prev => ({ ...prev, budget: value as number }))}
            min={20}
            max={500}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <Typography gutterBottom>Experience Level</Typography>
            <RadioGroup
              value={skinProfile.experience}
              onChange={(e) => setSkinProfile(prev => ({ ...prev, experience: e.target.value }))}
            >
              <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
              <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
              <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  const renderProductSelection = () => {
    const recommendedProducts = getRecommendedProducts();

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Recommended Products for You
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Personalized Recommendations</AlertTitle>
          Based on your {skinProfile.skinType.toLowerCase()} skin type and concerns: {skinProfile.concerns.join(', ')}
        </Alert>

        <Grid container spacing={2}>
          {recommendedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar src={product.image} sx={{ width: 50, height: 50 }} />
                      <Box>
                        <Typography variant="subtitle1" noWrap>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.brand}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Rating value={product.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2">({product.rating})</Typography>
                    </Box>

                    <Typography variant="h6" color="primary" gutterBottom>
                      ${product.price}
                    </Typography>

                    <Box mb={2}>
                      <Typography variant="body2" gutterBottom>Key Ingredients:</Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {product.ingredients.slice(0, 2).map(ingredient => (
                          <Chip key={ingredient} label={ingredient} size="small" />
                        ))}
                      </Box>
                    </Box>

                    <Box display="flex" gap={1}>
                      {product.timeOfUse === 'both' || product.timeOfUse === 'morning' ? (
                        <Button
                          size="small"
                          startIcon={<MorningIcon />}
                          onClick={() => handleAddToRoutine(product, 'morning')}
                        >
                          AM
                        </Button>
                      ) : null}
                      {product.timeOfUse === 'both' || product.timeOfUse === 'evening' ? (
                        <Button
                          size="small"
                          startIcon={<NightIcon />}
                          onClick={() => handleAddToRoutine(product, 'evening')}
                        >
                          PM
                        </Button>
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderRoutineStep = (routine: RoutineStep[], timeOfUse: 'morning' | 'evening', title: string, icon: React.ReactNode) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {icon}
          <Typography variant="h6">{title}</Typography>
          <Chip 
            label={`${calculateRoutineTime(routine)} min`} 
            icon={<TimerIcon />} 
            size="small" 
          />
          <Chip 
            label={`$${calculateRoutineCost(routine).toFixed(2)}`} 
            icon={<ShopIcon />} 
            size="small" 
          />
        </Box>

        {routine.length === 0 ? (
          <Alert severity="info">
            No products added to this routine yet. Go back to add products!
          </Alert>
        ) : (
          <Timeline>
            {routine.map((step, index) => (
              <TimelineItem key={step.id}>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <Typography variant="caption">{index + 1}</Typography>
                  </TimelineDot>
                  {index < routine.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={1} sx={{ p: 2, mb: 1 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={step.product.image} sx={{ width: 40, height: 40 }} />
                      <Box flex={1}>
                        <Typography variant="subtitle2">
                          {step.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.product.brand} • {step.product.amount} • {step.product.frequency}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemoveFromRoutine(step.id, timeOfUse)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </CardContent>
    </Card>
  );

  const renderRoutineBuilding = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Custom Routine
      </Typography>
      
      <TextField
        fullWidth
        label="Routine Name"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
        sx={{ mb: 3 }}
      />

      {renderRoutineStep(morningRoutine, 'morning', 'Morning Routine', <MorningIcon color="warning" />)}
      {renderRoutineStep(eveningRoutine, 'evening', 'Evening Routine', <NightIcon color="primary" />)}

      <Alert severity="success">
        <AlertTitle>Routine Summary</AlertTitle>
        Total daily time: {calculateRoutineTime([...morningRoutine, ...eveningRoutine])} minutes • 
        Total cost: ${(calculateRoutineCost([...morningRoutine, ...eveningRoutine])).toFixed(2)}
      </Alert>
    </Box>
  );

  const renderReviewAndSave = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Routine
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skin Profile
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Skin Type" secondary={skinProfile.skinType} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Main Concerns" secondary={skinProfile.concerns.join(', ')} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sensitivity Level" secondary={`${skinProfile.sensitivity}/5`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Budget" secondary={`$${skinProfile.budget}/month`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Routine Stats
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Morning Steps" secondary={`${morningRoutine.length} products`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Evening Steps" secondary={`${eveningRoutine.length} products`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Daily Time" secondary={`${calculateRoutineTime([...morningRoutine, ...eveningRoutine])} minutes`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total Investment" secondary={`$${calculateRoutineCost([...morningRoutine, ...eveningRoutine]).toFixed(2)}`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={3} display="flex" gap={2} justifyContent="center">
        <Button variant="contained" startIcon={<SaveIcon />} size="large">
          Save Routine
        </Button>
        <Button variant="outlined" startIcon={<ShareIcon />} size="large">
          Share
        </Button>
        <Button variant="outlined" startIcon={<PrintIcon />} size="large">
          Print
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom className="gradient-text">
            Skin Care Routine Builder
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create a personalized skincare routine tailored to your needs
          </Typography>
        </Box>
      </motion.div>

      {/* Progress Stepper */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stepper activeStep={activeStep} orientation="horizontal">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent sx={{ minHeight: 400 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeStep === 0 && renderSkinAssessment()}
              {activeStep === 1 && renderProductSelection()}
              {activeStep === 2 && renderRoutineBuilding()}
              {activeStep === 3 && renderReviewAndSave()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          size="large"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          size="large"
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default SkinCareRoutineBuilderPage;