import React, { useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Container
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Mock data - In a real app, this would come from your AI model
const MOCK_DISEASES = [
  { name: 'Melanoma', confidence: 92, description: 'A type of skin cancer that develops from the pigment-producing cells known as melanocytes.' },
  { name: 'Nevus (Mole)', confidence: 6, description: 'A common, usually benign, skin growth that develops when pigment cells grow in clusters.' },
  { name: 'Seborrheic Keratosis', confidence: 2, description: 'A noncancerous skin growth that often appears as a brown, black or light tan growth.' },
];

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the image to your backend for analysis
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: formData,
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

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Upload Skin Image for Analysis
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={!detectionResult ? 12 : 7}>
          {!previewUrl ? (
            <Paper
              variant="outlined"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: dragActive ? 'primary.main' : 'divider',
                backgroundColor: dragActive ? 'action.hover' : 'background.paper',
                transition: 'all 0.3s ease',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadIcon 
                color={dragActive ? 'primary' : 'action'} 
                sx={{ fontSize: 64, mb: 2, opacity: 0.7 }} 
              />
              <Typography variant="h6" gutterBottom>
                Drag & drop an image here, or click to select
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Supported formats: JPG, PNG, WEBP (Max 5MB)
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                component="span"
                onClick={(e) => e.stopPropagation()}
              >
                Select Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileInputChange}
              />
            </Paper>
          ) : (
            <Box>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <IconButton
                  color="error"
                  onClick={resetForm}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'error.light',
                      color: 'error.contrastText',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  fullWidth
                >
                  Change Image
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={analyzeImage}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                  fullWidth
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Image'}
                </Button>
              </Box>
            </Box>
          )}
          
          <Box sx={{ mt: 4, bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Tips for Best Results:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Use a well-lit area when taking photos</li>
              <li>Ensure the affected area is in focus</li>
              <li>Include a ruler or coin for scale if possible</li>
              <li>Take photos from multiple angles if needed</li>
              <li>Avoid using filters or editing the image</li>
            </ul>
          </Box>
        </Grid>

        {detectionResult && (
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
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
                            <li>Schedule an appointment with a dermatologist</li>
                            <li>Monitor for changes in size, shape, or color</li>
                            <li>Use broad-spectrum sunscreen (SPF 30 or higher)</li>
                            <li>Avoid direct sun exposure</li>
                          </ul>
                          
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              When to see a doctor immediately:
                            </Typography>
                            <Typography variant="body2">
                              If you notice any changes in size, shape, color, or if the lesion is bleeding, 
                              itching, or painful, please consult a healthcare professional as soon as possible.
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
                    <ErrorIcon color="warning" fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    This is a preliminary analysis and not a medical diagnosis. Always consult a healthcare professional.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default UploadPage;
