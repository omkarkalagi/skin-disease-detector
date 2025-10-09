import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
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
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Slider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  CheckCircle as CheckIcon,
  CheckCircle,
  Info as InfoIcon,
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

const SkinCareProductsRecommenderPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState({
    skinType: '',
    concerns: [] as string[],
    age: '',
    budget: [20, 100],
    preferences: [] as string[],
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const products = [
    {
      id: 1,
      name: 'CeraVe Moisturizing Cream',
      brand: 'CeraVe',
      price: 18.99,
      rating: 4.6,
      reviews: 2847,
      image: '/images/products/cerave-cream.jpg',
      category: 'Moisturizer',
      skinTypes: ['Dry', 'Normal', 'Sensitive'],
      ingredients: ['Ceramides', 'Hyaluronic Acid', 'Petrolatum'],
      benefits: ['Hydrates deeply', 'Repairs skin barrier', 'Non-comedogenic'],
      concerns: ['Dryness', 'Eczema', 'Sensitive skin'],
    },
    {
      id: 2,
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      brand: 'The Ordinary',
      price: 6.99,
      rating: 4.4,
      reviews: 1523,
      image: '/images/products/ordinary-niacinamide.jpg',
      category: 'Serum',
      skinTypes: ['All Types'],
      ingredients: ['Niacinamide', 'Zinc PCA'],
      benefits: ['Reduces pores', 'Controls oil', 'Brightens skin'],
      concerns: ['Acne', 'Large pores', 'Uneven tone'],
    },
    {
      id: 3,
      name: 'La Roche-Posay Anthelios SPF 50+',
      brand: 'La Roche-Posay',
      price: 29.99,
      rating: 4.7,
      reviews: 4123,
      image: '/images/products/la-roche-posay-spf.jpg',
      category: 'Sunscreen',
      skinTypes: ['All Types'],
      ingredients: ['Mexoryl SX', 'Mexoryl XL', 'Titanium Dioxide'],
      benefits: ['Broad spectrum protection', 'Lightweight formula', 'Non-greasy'],
      concerns: ['Sun protection', 'Anti-aging', 'Sensitive skin'],
    },
    {
      id: 4,
      name: 'Paula\'s Choice Skin Perfecting 2% BHA',
      brand: 'Paula\'s Choice',
      price: 32.99,
      rating: 4.5,
      reviews: 893,
      image: '/images/products/paulas-choice-bha.jpg',
      category: 'Exfoliant',
      skinTypes: ['Oily', 'Combination', 'Normal'],
      ingredients: ['Salicylic Acid', 'Green Tea Extract'],
      benefits: ['Unclogs pores', 'Reduces blackheads', 'Smooths texture'],
      concerns: ['Acne', 'Blackheads', 'Rough texture'],
    },
  ];

  const handleQuizChange = (field: string, value: any) => {
    setQuizAnswers(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getRecommendedProducts = () => {
    return products.filter(product => {
      // Simple recommendation logic based on quiz answers
      if (quizAnswers.skinType && !product.skinTypes.includes('All Types') &&
          !product.skinTypes.includes(quizAnswers.skinType)) {
        return false;
      }

      if (quizAnswers.concerns.length > 0) {
        const hasMatchingConcern = quizAnswers.concerns.some(concern =>
          product.concerns.some(productConcern =>
            productConcern.toLowerCase().includes(concern.toLowerCase())
          )
        );
        if (!hasMatchingConcern) return false;
      }

      if (quizAnswers.budget[1] < product.price) return false;

      return true;
    });
  };

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
          🛍️ Skin Care Product Recommender
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
          Get personalized skincare product recommendations based on your skin type, concerns, and preferences
        </Typography>
      </Box>

      {/* Main Content Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Product Catalog" />
          <Tab label="Personalized Quiz" />
          <Tab label="My Recommendations" />
        </Tabs>
      </Paper>

      {/* Product Catalog */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />

                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    by {product.brand}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                    ${product.price}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {product.skinTypes.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Personalized Quiz */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Tell Us About Your Skin
                </Typography>

                <FormControl component="fieldset" sx={{ mb: 4 }}>
                  <FormLabel component="legend">What's your skin type?</FormLabel>
                  <RadioGroup
                    value={quizAnswers.skinType}
                    onChange={(e) => handleQuizChange('skinType', e.target.value)}
                  >
                    <FormControlLabel value="dry" control={<Radio />} label="Dry" />
                    <FormControlLabel value="oily" control={<Radio />} label="Oily" />
                    <FormControlLabel value="combination" control={<Radio />} label="Combination" />
                    <FormControlLabel value="sensitive" control={<Radio />} label="Sensitive" />
                    <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ mb: 4 }}>
                  <FormLabel component="legend">What are your main concerns?</FormLabel>
                  <FormGroup>
                    {['Acne', 'Dryness', 'Aging', 'Dark spots', 'Redness', 'Large pores'].map((concern) => (
                      <FormControlLabel
                        key={concern}
                        control={
                          <Checkbox
                            checked={quizAnswers.concerns.includes(concern)}
                            onChange={(e) => {
                              const newConcerns = e.target.checked
                                ? [...quizAnswers.concerns, concern]
                                : quizAnswers.concerns.filter(c => c !== concern);
                              handleQuizChange('concerns', newConcerns);
                            }}
                          />
                        }
                        label={concern}
                      />
                    ))}
                  </FormGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ mb: 4 }}>
                  <FormLabel component="legend">What's your age group?</FormLabel>
                  <RadioGroup
                    value={quizAnswers.age}
                    onChange={(e) => handleQuizChange('age', e.target.value)}
                  >
                    <FormControlLabel value="18-25" control={<Radio />} label="18-25" />
                    <FormControlLabel value="26-35" control={<Radio />} label="26-35" />
                    <FormControlLabel value="36-45" control={<Radio />} label="36-45" />
                    <FormControlLabel value="46+" control={<Radio />} label="46+" />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ mb: 4 }}>
                  <Typography gutterBottom>Budget Range: ${quizAnswers.budget[0]} - ${quizAnswers.budget[1]}</Typography>
                  <Slider
                    value={quizAnswers.budget}
                    onChange={(e, value) => handleQuizChange('budget', value)}
                    valueLabelDisplay="auto"
                    min={10}
                    max={200}
                    step={5}
                  />
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setTabValue(2)}
                  sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}
                >
                  Get My Recommendations
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Quiz Progress
                </Typography>

                <List>
                  {[
                    { label: 'Skin Type', completed: !!quizAnswers.skinType },
                    { label: 'Concerns', completed: quizAnswers.concerns.length > 0 },
                    { label: 'Age Group', completed: !!quizAnswers.age },
                    { label: 'Budget', completed: true },
                  ].map((step, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {step.completed ? (
                          <CheckCircle color="success" fontSize="small" />
                        ) : (
                          <InfoIcon color="disabled" fontSize="small" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={step.label} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Recommendations */}
      <TabPanel value={tabValue} index={2}>
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            Based on your preferences, here are our personalized product recommendations:
          </Typography>
        </Alert>

        <Grid container spacing={4}>
          {getRecommendedProducts().map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: '2px solid',
                  borderColor: 'primary.light',
                }}
              >
                <Chip
                  label="Recommended"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: 'success.main',
                    color: 'white',
                  }}
                />

                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />

                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    by {product.brand}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({product.reviews} reviews)
                    </Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                    ${product.price}
                  </Typography>

                  <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Why recommended:
                  </Typography>

                  <List dense>
                    {product.benefits.slice(0, 2).map((benefit, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} primaryTypographyProps={{ variant: 'caption' }} />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton size="small">
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Product Details Dialog */}
      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {selectedProduct.name}
              </Typography>
              <IconButton onClick={() => setSelectedProduct(null)}>
                <ExpandMoreIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    sx={{ width: '100%', borderRadius: 2 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    by {selectedProduct.brand}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={selectedProduct.rating} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({selectedProduct.reviews} reviews)
                    </Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                    ${selectedProduct.price}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Key Ingredients:
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {selectedProduct.ingredients.map((ingredient: string) => (
                      <Chip
                        key={ingredient}
                        label={ingredient}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Benefits:
                  </Typography>

                  <List dense>
                    {selectedProduct.benefits.map((benefit: string, index: number) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedProduct(null)}>Close</Button>
              <Button variant="contained" sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff5252' } }}>
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default SkinCareProductsRecommenderPage;
