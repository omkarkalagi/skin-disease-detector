import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Avatar,
  Fab,
  Tooltip,
  LinearProgress,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
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
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  PhotoCamera as CameraIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  LocalHospital as TreatmentIcon,
  Timeline as TimelineIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface AnalysisRecord {
  id: string;
  date: string;
  image: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Resolved' | 'Monitoring' | 'Treatment Required';
  notes: string;
  treatments: string[];
  followUp?: string;
}

const SkinAnalysisHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<AnalysisRecord | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  // Mock data for analysis history
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      image: '/api/placeholder/300/200',
      condition: 'Acne Vulgaris',
      confidence: 92,
      severity: 'Medium',
      status: 'Treatment Required',
      notes: 'Moderate inflammatory acne on forehead and cheeks. Recommended topical treatment.',
      treatments: ['Benzoyl Peroxide', 'Salicylic Acid', 'Moisturizer'],
      followUp: '2024-02-15'
    },
    {
      id: '2',
      date: '2024-01-10',
      image: '/api/placeholder/300/200',
      condition: 'Seborrheic Dermatitis',
      confidence: 87,
      severity: 'Low',
      status: 'Monitoring',
      notes: 'Mild scaling and redness around nose area. Improving with current treatment.',
      treatments: ['Antifungal Cream', 'Gentle Cleanser'],
      followUp: '2024-02-10'
    },
    {
      id: '3',
      date: '2024-01-05',
      image: '/api/placeholder/300/200',
      condition: 'Eczema',
      confidence: 95,
      severity: 'High',
      status: 'Resolved',
      notes: 'Atopic dermatitis on arms. Successfully treated with prescribed medication.',
      treatments: ['Topical Corticosteroid', 'Emollient', 'Antihistamine'],
    },
    {
      id: '4',
      date: '2024-01-01',
      image: '/api/placeholder/300/200',
      condition: 'Normal Skin',
      confidence: 98,
      severity: 'Low',
      status: 'Resolved',
      notes: 'Healthy skin condition. Continue current skincare routine.',
      treatments: ['Daily Moisturizer', 'Sunscreen'],
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'Monitoring': return 'info';
      case 'Treatment Required': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircleIcon />;
      case 'Monitoring': return <InfoIcon />;
      case 'Treatment Required': return <WarningIcon />;
      default: return <InfoIcon />;
    }
  };

  const filteredHistory = analysisHistory.filter(record => {
    const matchesSearch = record.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (record: AnalysisRecord) => {
    setSelectedRecord(record);
  };

  const handleCloseDetails = () => {
    setSelectedRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    setAnalysisHistory(prev => prev.filter(record => record.id !== id));
  };

  const renderGridView = () => (
    <Grid container spacing={3}>
      {filteredHistory.map((record, index) => (
        <Grid item xs={12} sm={6} md={4} key={record.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={record.image}
                alt={record.condition}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" component="h3" noWrap>
                    {record.condition}
                  </Typography>
                  <Chip
                    size="small"
                    label={record.severity}
                    color={getSeverityColor(record.severity) as any}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(record.date).toLocaleDateString()}
                </Typography>
                
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Confidence: {record.confidence}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={record.confidence} 
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
                
                <Chip
                  icon={getStatusIcon(record.status)}
                  label={record.status}
                  color={getStatusColor(record.status) as any}
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {record.notes.substring(0, 100)}...
                </Typography>
                
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => handleViewDetails(record)}
                  >
                    View
                  </Button>
                  <IconButton size="small" color="primary">
                    <ShareIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteRecord(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );

  const renderTimelineView = () => (
    <Timeline position="alternate">
      {filteredHistory.map((record, index) => (
        <TimelineItem key={record.id}>
          <TimelineSeparator>
            <TimelineDot color={getSeverityColor(record.severity) as any}>
              <AssessmentIcon />
            </TimelineDot>
            {index < filteredHistory.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Avatar src={record.image} sx={{ width: 60, height: 60 }} />
                  <Box>
                    <Typography variant="h6">{record.condition}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(record.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box ml="auto">
                    <Chip
                      label={record.status}
                      color={getStatusColor(record.status) as any}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {record.notes}
                </Typography>
                <Box display="flex" gap={1}>
                  <Button size="small" onClick={() => handleViewDetails(record)}>
                    View Details
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
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
            Analysis History
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track your skin health journey over time
          </Typography>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent sx={{ textAlign: 'center' }}>
              <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" color="primary">
                {analysisHistory.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Analyses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {analysisHistory.filter(r => r.status === 'Resolved').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resolved Cases
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent sx={{ textAlign: 'center' }}>
              <InfoIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" color="info.main">
                {analysisHistory.filter(r => r.status === 'Monitoring').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitoring
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent sx={{ textAlign: 'center' }}>
              <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {analysisHistory.filter(r => r.status === 'Treatment Required').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Need Treatment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
            
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>
            
            <Box display="flex" gap={1}>
              <Button
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('grid')}
                size="small"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('timeline')}
                startIcon={<TimelineIcon />}
                size="small"
              >
                Timeline
              </Button>
            </Box>
          </Box>
          
          {filterOpen && (
            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              {['all', 'Resolved', 'Monitoring', 'Treatment Required'].map((filter) => (
                <Chip
                  key={filter}
                  label={filter === 'all' ? 'All' : filter}
                  onClick={() => setSelectedFilter(filter)}
                  color={selectedFilter === filter ? 'primary' : 'default'}
                  variant={selectedFilter === filter ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Content */}
      {filteredHistory.length === 0 ? (
        <Box textAlign="center" py={8}>
          <CameraIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No analyses found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start analyzing your skin to build your health history
          </Typography>
          <Button variant="contained" size="large" startIcon={<AddIcon />}>
            New Analysis
          </Button>
        </Box>
      ) : (
        viewMode === 'grid' ? renderGridView() : renderTimelineView()
      )}

      {/* Floating Action Button */}
      <Tooltip title="New Analysis">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Details Dialog */}
      <Dialog
        open={!!selectedRecord}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedRecord && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={selectedRecord.image} sx={{ width: 50, height: 50 }} />
                <Box>
                  <Typography variant="h6">{selectedRecord.condition}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(selectedRecord.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedRecord.image}
                    alt={selectedRecord.condition}
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Analysis Details
                    </Typography>
                    <Box display="flex" gap={1} mb={1}>
                      <Chip
                        label={`${selectedRecord.confidence}% Confidence`}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={selectedRecord.severity}
                        color={getSeverityColor(selectedRecord.severity) as any}
                        size="small"
                      />
                      <Chip
                        icon={getStatusIcon(selectedRecord.status)}
                        label={selectedRecord.status}
                        color={getStatusColor(selectedRecord.status) as any}
                        size="small"
                      />
                    </Box>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Notes
                    </Typography>
                    <Typography variant="body2">
                      {selectedRecord.notes}
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Treatments
                    </Typography>
                    <List dense>
                      {selectedRecord.treatments.map((treatment, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <TreatmentIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={treatment} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  {selectedRecord.followUp && (
                    <Alert severity="info">
                      <AlertTitle>Follow-up Scheduled</AlertTitle>
                      Next appointment: {new Date(selectedRecord.followUp).toLocaleDateString()}
                    </Alert>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
              <Button variant="contained" startIcon={<DownloadIcon />}>
                Download Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default SkinAnalysisHistoryPage;