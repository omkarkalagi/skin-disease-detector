import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Badge,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
  Fab,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Chat as ChatIcon,
  Schedule as ScheduleIcon,
  Person as DoctorIcon,
  Star as StarIcon,
  Send as SendIcon,
  AttachFile as AttachIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  Phone as PhoneIcon,
  PhoneDisabled as PhoneDisabledIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  School as EducationIcon,
  Verified as VerifiedIcon,
  Message as MessageIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const VirtualConsultationPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [consultationType, setConsultationType] = useState('video');
  const [activeStep, setActiveStep] = useState(0);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Dermatologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 1247,
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      location: 'New York, NY',
      availability: 'Available Now',
      price: '$150',
      image: '/images/doctor1.jpg',
      verified: true,
      specializations: ['Acne Treatment', 'Skin Cancer', 'Cosmetic Dermatology']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatopathologist',
      experience: '12 years',
      rating: 4.8,
      reviews: 892,
      languages: ['English', 'Mandarin'],
      education: 'Johns Hopkins University',
      location: 'San Francisco, CA',
      availability: 'Available in 30 min',
      price: '$180',
      image: '/images/doctor2.jpg',
      verified: true,
      specializations: ['Skin Biopsy', 'Rare Conditions', 'Pediatric Dermatology']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Cosmetic Dermatologist',
      experience: '10 years',
      rating: 4.7,
      reviews: 654,
      languages: ['English', 'Spanish', 'Portuguese'],
      education: 'Stanford Medical School',
      location: 'Los Angeles, CA',
      availability: 'Available Tomorrow',
      price: '$200',
      image: '/images/doctor3.jpg',
      verified: true,
      specializations: ['Anti-aging', 'Laser Treatments', 'Injectables']
    }
  ];

  const consultationSteps = [
    'Select Consultation Type',
    'Choose Doctor',
    'Schedule Appointment',
    'Payment & Confirmation'
  ];

  const sampleMessages = [
    {
      id: 1,
      sender: 'doctor',
      message: 'Hello! I\'ve reviewed your uploaded images. Can you tell me when you first noticed these symptoms?',
      timestamp: '10:30 AM',
      avatar: '/images/doctor1.jpg'
    },
    {
      id: 2,
      sender: 'patient',
      message: 'Hi Dr. Johnson! I noticed the rash about 2 weeks ago. It started small but has been spreading.',
      timestamp: '10:32 AM',
      avatar: '/images/patient-avatar.jpg'
    },
    {
      id: 3,
      sender: 'doctor',
      message: 'I see. Have you experienced any itching, pain, or other discomfort?',
      timestamp: '10:33 AM',
      avatar: '/images/doctor1.jpg'
    }
  ];

  useEffect(() => {
    setChatMessages(sampleMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'patient',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/images/patient-avatar.jpg'
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setActiveStep(2);
  };

  const ConsultationTypeCard = ({ type, icon, title, description, price, features }: any) => (
    <Card 
      className={`hover-card ${consultationType === type ? 'selected' : ''}`}
      sx={{ 
        cursor: 'pointer',
        border: consultationType === type ? '2px solid #667eea' : '1px solid #e0e0e0',
        transform: consultationType === type ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease'
      }}
      onClick={() => setConsultationType(type)}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Avatar sx={{ bgcolor: '#667eea', width: 60, height: 60, mx: 'auto', mb: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
          {price}
        </Typography>
        <Box sx={{ textAlign: 'left' }}>
          {features.map((feature: string, index: number) => (
            <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
              • {feature}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const DoctorCard = ({ doctor }: any) => (
    <Card className="hover-card" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={doctor.image}
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {doctor.name}
              </Typography>
              {doctor.verified && (
                <VerifiedIcon sx={{ color: '#4caf50', fontSize: 20 }} />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {doctor.specialty}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Rating value={doctor.rating} precision={0.1} size="small" readOnly />
              <Typography variant="caption">
                {doctor.rating} ({doctor.reviews} reviews)
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <EducationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2">{doctor.education}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2">{doctor.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2">{doctor.experience} experience</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2">{doctor.languages.join(', ')}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight="medium" gutterBottom>
            Specializations:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {doctor.specializations.map((spec: string, index: number) => (
              <Chip key={index} label={spec} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {doctor.price}
            </Typography>
            <Chip
              label={doctor.availability}
              size="small"
              color={doctor.availability === 'Available Now' ? 'success' : 'warning'}
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => handleDoctorSelect(doctor)}
            sx={{ bgcolor: '#667eea' }}
          >
            Select
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" className="gradient-text" gutterBottom>
          Virtual Dermatologist Consultation
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Connect with certified dermatologists from the comfort of your home
        </Typography>
      </Box>

      {/* Consultation Process Stepper */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} orientation="horizontal">
          {consultationSteps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Choose Your Consultation Type
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ConsultationTypeCard
                type="video"
                icon={<VideoCallIcon sx={{ fontSize: 30 }} />}
                title="Video Consultation"
                description="Face-to-face consultation with HD video quality"
                price="$150-200"
                features={[
                  'Real-time video chat',
                  'Screen sharing',
                  'Instant diagnosis',
                  '30-45 minutes session'
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ConsultationTypeCard
                type="chat"
                icon={<ChatIcon sx={{ fontSize: 30 }} />}
                title="Text Consultation"
                description="Detailed text-based consultation with image sharing"
                price="$75-100"
                features={[
                  'Secure messaging',
                  'Image uploads',
                  'Detailed reports',
                  '24-48 hour response'
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ConsultationTypeCard
                type="phone"
                icon={<PhoneIcon sx={{ fontSize: 30 }} />}
                title="Phone Consultation"
                description="Voice-only consultation for quick advice"
                price="$100-125"
                features={[
                  'Voice call',
                  'Quick consultation',
                  'Follow-up messages',
                  '20-30 minutes session'
                ]}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setActiveStep(1)}
              sx={{ bgcolor: '#667eea', px: 4 }}
            >
              Continue to Doctor Selection
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Select Your Dermatologist
          </Typography>
          <Grid container spacing={3}>
            {doctors.map((doctor) => (
              <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeStep === 2 && selectedDoctor && (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Schedule Your Appointment
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Selected Doctor
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={selectedDoctor.image} sx={{ width: 50, height: 50, mr: 2 }} />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedDoctor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedDoctor.specialty}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" gutterBottom>
                    <strong>Consultation Type:</strong> {consultationType === 'video' ? 'Video Call' : consultationType === 'chat' ? 'Text Chat' : 'Phone Call'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Duration:</strong> {consultationType === 'video' ? '30-45 minutes' : consultationType === 'chat' ? 'Ongoing' : '20-30 minutes'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Price:</strong> {selectedDoctor.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Available Time Slots
                  </Typography>
                  <Grid container spacing={1}>
                    {['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'].map((time) => (
                      <Grid item xs={6} key={time}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 1 }}
                        >
                          {time}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    multiline
                    rows={3}
                    sx={{ mt: 2 }}
                    placeholder="Describe your symptoms or concerns..."
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setActiveStep(3)}
              sx={{ bgcolor: '#667eea', px: 4 }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 3 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Payment & Confirmation
          </Typography>
          <Alert severity="success" sx={{ mb: 3 }}>
            Your consultation has been scheduled successfully!
          </Alert>
          <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Appointment Confirmed
            </Typography>
            <Typography variant="body1" gutterBottom>
              Dr. {selectedDoctor?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Tomorrow at 10:30 AM
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 2, bgcolor: '#4caf50' }}
              >
                Join Consultation Room
              </Button>
              <Button variant="outlined" fullWidth>
                Add to Calendar
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Demo Chat Interface (for demonstration) */}
      {consultationType === 'chat' && activeStep > 1 && (
        <Paper sx={{ position: 'fixed', bottom: 20, right: 20, width: 350, height: 400, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, bgcolor: '#667eea', color: 'white' }}>
            <Typography variant="h6">Chat with Dr. Johnson</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
            <List>
              {chatMessages.map((msg) => (
                <ListItem key={msg.id} sx={{ alignItems: 'flex-start' }}>
                  <ListItemAvatar>
                    <Avatar src={msg.avatar} sx={{ width: 32, height: 32 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={msg.message}
                    secondary={msg.timestamp}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                        bgcolor: msg.sender === 'doctor' ? '#f5f5f5' : '#e3f2fd',
                        p: 1,
                        borderRadius: 2,
                        display: 'inline-block'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IconButton onClick={handleSendMessage} color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default VirtualConsultationPage;