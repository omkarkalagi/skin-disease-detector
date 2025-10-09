import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import Webcam from 'react-webcam';
import { CameraAlt, FlipCameraAndroid, CheckCircle, Error } from '@mui/icons-material';

// Mock data - In a real app, this would come from your AI model
const MOCK_DISEASES = [
  { name: 'Acne', confidence: 87, description: 'A common skin condition that occurs when hair follicles become clogged with oil and dead skin cells.' },
  { name: 'Eczema', confidence: 12, description: 'A condition that makes your skin red and itchy.' },
  { name: 'Psoriasis', confidence: 8, description: 'A skin disorder causing flaky patches of skin which form scales.' },
];

const DetectPage = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      analyzeImage(imageSrc);
    }
  }, [webcamRef]);

  const analyzeImage = async (imageData: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the image to your backend for analysis
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify({ image: imageData }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const result = await response.json();
      
      // For demo purposes, we'll use mock data
      const result = {
        success: true,
        predictions: MOCK_DISEASES,
        timestamp: new Date().toISOString(),
      };
      
      setDetectionResult(result);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDetection = () => {
    setImgSrc(null);
    setDetectionResult(null);
    setError(null);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    resetDetection();
  };

  // Add keyboard shortcut (Space) for capturing image
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isLoading && !imgSrc) {
        e.preventDefault();
        capture();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [capture, isLoading, imgSrc]);

  const videoConstraints = {
    facingMode: facingMode,
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Live Skin Analysis
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={!detectionResult ? 12 : 8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'black'
            }}
          >
            {!imgSrc ? (
              <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Tooltip title="Switch Camera">
                    <IconButton 
                      onClick={toggleCamera}
                      sx={{
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                    >
                      <FlipCameraAndroid />
                    </IconButton>
                  </Tooltip>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={capture}
                    disabled={isLoading}
                    startIcon={<CameraAlt />}
                    sx={{
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      minWidth: 64,
                      padding: 0,
                      '& .MuiButton-startIcon': {
                        margin: 0,
                        '& > *:nth-of-type(1)': {
                          fontSize: '2rem',
                        },
                      },
                    }}
                  >
                    <span style={{ display: 'none' }}>Capture</span>
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src={imgSrc} 
                  alt="Captured" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '70vh',
                    borderRadius: 8,
                  }} 
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={resetDetection}
                    disabled={isLoading}
                  >
                    Retake
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => analyzeImage(imgSrc)}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze Again'}
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Tip: Press <strong>Space</strong> to capture an image
          </Typography>
        </Grid>

        {detectionResult && (
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  Analysis Results
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  {detectionResult.predictions.map((disease: any, index: number) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        borderRadius: 1,
                        bgcolor: index === 0 ? 'success.light' : 'grey.100',
                        borderLeft: `4px solid ${index === 0 ? 'success.main' : 'grey.400'}`,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {disease.name}
                        </Typography>
                        <Typography variant="body2" color={index === 0 ? 'success.dark' : 'text.secondary'}>
                          {disease.confidence}% confidence
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {disease.description}
                      </Typography>
                      
                      {index === 0 && (
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Recommended Actions:
                          </Typography>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            <li>Clean the affected area with a gentle cleanser</li>
                            <li>Avoid picking or squeezing the affected area</li>
                            <li>Use non-comedogenic moisturizers</li>
                            <li>Consult a dermatologist for persistent issues</li>
                          </ul>
                          
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              When to see a doctor:
                            </Typography>
                            <Typography variant="body2">
                              If symptoms persist for more than 2 weeks, worsen, or cause significant discomfort, 
                              please consult a healthcare professional.
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ mt: 3, fontSize: '0.75rem', color: 'text.secondary' }}>
                  <Typography variant="caption" display="block">
                    Analysis performed on: {new Date(detectionResult.timestamp).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    <Error color="warning" fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    This is a preliminary analysis and not a medical diagnosis. Always consult a healthcare professional.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DetectPage;
