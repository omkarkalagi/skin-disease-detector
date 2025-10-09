import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  AlertTitle,
  Paper,
  LinearProgress,
  CircularProgress,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ShowChart as LineChartIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  DateRange as DateRangeIcon,
  Insights as InsightsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Star as StarIcon,
  LocalHospital as TreatmentIcon,
  Spa as SpaIcon,
  WbSunny as SunIcon,
  Water as HydrationIcon,
  FitnessCenter as ExerciseIcon,
  Restaurant as NutritionIcon,
  Hotel as SleepIcon,
  Mood as MoodIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  icon: React.ReactNode;
  color: string;
  target: number;
  category: string;
}

interface AnalysisData {
  date: string;
  skinHealth: number;
  hydration: number;
  oiliness: number;
  sensitivity: number;
  acne: number;
  pigmentation: number;
  wrinkles: number;
  pores: number;
}

interface Insight {
  id: string;
  type: 'improvement' | 'concern' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
}

const SkinHealthAnalyticsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['skinHealth', 'hydration', 'acne']);
  const [showInsights, setShowInsights] = useState(true);
  const [detailsDialog, setDetailsDialog] = useState<string | null>(null);

  // Mock health metrics data
  const healthMetrics: HealthMetric[] = [
    {
      id: 'skinHealth',
      name: 'Overall Skin Health',
      value: 78,
      unit: '%',
      trend: 'up',
      change: 5.2,
      icon: <SpaIcon />,
      color: '#4CAF50',
      target: 85,
      category: 'Overall'
    },
    {
      id: 'hydration',
      name: 'Hydration Level',
      value: 65,
      unit: '%',
      trend: 'down',
      change: -2.1,
      icon: <HydrationIcon />,
      color: '#2196F3',
      target: 75,
      category: 'Hydration'
    },
    {
      id: 'sunProtection',
      name: 'Sun Protection',
      value: 92,
      unit: '%',
      trend: 'up',
      change: 8.5,
      icon: <SunIcon />,
      color: '#FF9800',
      target: 90,
      category: 'Protection'
    },
    {
      id: 'acneControl',
      name: 'Acne Control',
      value: 71,
      unit: '%',
      trend: 'up',
      change: 12.3,
      icon: <TreatmentIcon />,
      color: '#E91E63',
      target: 80,
      category: 'Treatment'
    },
    {
      id: 'routineCompliance',
      name: 'Routine Compliance',
      value: 85,
      unit: '%',
      trend: 'stable',
      change: 0.5,
      icon: <CheckCircleIcon />,
      color: '#9C27B0',
      target: 90,
      category: 'Behavior'
    },
    {
      id: 'sleepQuality',
      name: 'Sleep Quality',
      value: 73,
      unit: '%',
      trend: 'up',
      change: 3.2,
      icon: <SleepIcon />,
      color: '#673AB7',
      target: 80,
      category: 'Lifestyle'
    }
  ];

  // Mock time series data
  const analysisData: AnalysisData[] = [
    { date: '2024-01-01', skinHealth: 70, hydration: 60, oiliness: 45, sensitivity: 30, acne: 25, pigmentation: 20, wrinkles: 15, pores: 35 },
    { date: '2024-01-08', skinHealth: 72, hydration: 62, oiliness: 43, sensitivity: 28, acne: 23, pigmentation: 18, wrinkles: 15, pores: 33 },
    { date: '2024-01-15', skinHealth: 75, hydration: 65, oiliness: 40, sensitivity: 25, acne: 20, pigmentation: 16, wrinkles: 14, pores: 30 },
    { date: '2024-01-22', skinHealth: 77, hydration: 63, oiliness: 42, sensitivity: 27, acne: 18, pigmentation: 15, wrinkles: 13, pores: 28 },
    { date: '2024-01-29', skinHealth: 78, hydration: 65, oiliness: 38, sensitivity: 24, acne: 15, pigmentation: 14, wrinkles: 12, pores: 26 },
  ];

  // Mock insights data
  const insights: Insight[] = [
    {
      id: '1',
      type: 'improvement',
      title: 'Acne Control Improving',
      description: 'Your acne control has improved by 12.3% this month thanks to consistent routine adherence.',
      impact: 'high',
      category: 'Treatment',
      actionable: false
    },
    {
      id: '2',
      type: 'concern',
      title: 'Hydration Levels Declining',
      description: 'Your skin hydration has decreased by 2.1%. Consider increasing water intake and using a heavier moisturizer.',
      impact: 'medium',
      category: 'Hydration',
      actionable: true
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Optimize Morning Routine',
      description: 'Based on your skin type and current results, consider adding a vitamin C serum to your morning routine.',
      impact: 'medium',
      category: 'Routine',
      actionable: true
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Sun Protection Goal Achieved',
      description: 'Congratulations! You\'ve exceeded your sun protection target with 92% compliance.',
      impact: 'high',
      category: 'Protection',
      actionable: false
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon color="success" />;
      case 'down': return <TrendingDownIcon color="error" />;
      default: return <TimelineIcon color="action" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <TrendingUpIcon color="success" />;
      case 'concern': return <WarningIcon color="warning" />;
      case 'recommendation': return <InfoIcon color="info" />;
      case 'achievement': return <StarIcon color="primary" />;
      default: return <InfoIcon />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'improvement': return 'success';
      case 'concern': return 'warning';
      case 'recommendation': return 'info';
      case 'achievement': return 'primary';
      default: return 'default';
    }
  };

  const renderMetricCard = (metric: HealthMetric) => (
    <Grid item xs={12} sm={6} md={4} key={metric.id}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card 
          sx={{ 
            height: '100%',
            background: `linear-gradient(135deg, ${metric.color}15 0%, ${metric.color}05 100%)`,
            border: `1px solid ${metric.color}30`,
            cursor: 'pointer'
          }}
          onClick={() => setDetailsDialog(metric.id)}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Avatar sx={{ bgcolor: metric.color, width: 48, height: 48 }}>
                {metric.icon}
              </Avatar>
              {getTrendIcon(metric.trend)}
            </Box>
            
            <Typography variant="h4" component="div" sx={{ color: metric.color, mb: 1 }}>
              {metric.value}{metric.unit}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {metric.name}
            </Typography>
            
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Chip
                size="small"
                label={`${metric.change > 0 ? '+' : ''}${metric.change}%`}
                color={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'error' : 'default'}
              />
              <Typography variant="caption" color="text.secondary">
                vs last period
              </Typography>
            </Box>
            
            <Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="caption">Progress to target</Typography>
                <Typography variant="caption">{Math.round((metric.value / metric.target) * 100)}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(metric.value / metric.target) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: `${metric.color}20`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: metric.color,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );

  const renderInsightsPanel = () => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="between" mb={3}>
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <InsightsIcon color="primary" />
            AI Insights & Recommendations
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showInsights}
                onChange={(e) => setShowInsights(e.target.checked)}
              />
            }
            label="Auto-insights"
          />
        </Box>
        
        {showInsights && (
          <Grid container spacing={2}>
            {insights.map((insight, index) => (
              <Grid item xs={12} md={6} key={insight.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Alert 
                    severity={getInsightColor(insight.type) as any}
                    icon={getInsightIcon(insight.type)}
                    sx={{ mb: 1 }}
                  >
                    <AlertTitle>{insight.title}</AlertTitle>
                    {insight.description}
                    {insight.actionable && (
                      <Box mt={1}>
                        <Button size="small" variant="outlined">
                          Take Action
                        </Button>
                      </Box>
                    )}
                  </Alert>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );

  const renderTrendsChart = () => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="between" mb={3}>
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <LineChartIcon color="primary" />
            Skin Health Trends
          </Typography>
          <Box display="flex" gap={1}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 3 months</MenuItem>
                <MenuItem value="1y">Last year</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
        
        {/* Simplified chart representation */}
        <Box sx={{ height: 300, display: 'flex', alignItems: 'end', gap: 2, p: 2 }}>
          {analysisData.map((data, index) => (
            <Box key={data.date} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  height: `${data.skinHealth * 3}px`,
                  backgroundColor: 'primary.main',
                  borderRadius: 1,
                  mb: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'scaleY(1.1)',
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Typography>
            </Box>
          ))}
        </Box>
        
        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          {selectedMetrics.map(metric => (
            <Chip
              key={metric}
              label={metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              onDelete={() => setSelectedMetrics(prev => prev.filter(m => m !== metric))}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const renderComparisonTable = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
          <BarChartIcon color="primary" />
          Detailed Metrics Comparison
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">Current</TableCell>
                <TableCell align="right">Target</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthMetrics.map((metric) => (
                <TableRow key={metric.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: metric.color, width: 32, height: 32 }}>
                        {metric.icon}
                      </Avatar>
                      {metric.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="bold">
                      {metric.value}{metric.unit}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {metric.target}{metric.unit}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      size="small"
                      label={`${metric.change > 0 ? '+' : ''}${metric.change}%`}
                      color={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'error' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {metric.value >= metric.target ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <WarningIcon color="warning" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
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
            Skin Health Analytics
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Advanced insights and trends for your skin health journey
          </Typography>
        </Box>
      </motion.div>

      {/* Action Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="between" flexWrap="wrap" gap={2}>
            <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)}>
              <Tab icon={<AnalyticsIcon />} label="Overview" />
              <Tab icon={<LineChartIcon />} label="Trends" />
              <Tab icon={<BarChartIcon />} label="Comparison" />
              <Tab icon={<InsightsIcon />} label="Insights" />
            </Tabs>
            
            <Box display="flex" gap={1}>
              <Button startIcon={<DownloadIcon />} variant="outlined" size="small">
                Export
              </Button>
              <Button startIcon={<ShareIcon />} variant="outlined" size="small">
                Share
              </Button>
              <IconButton>
                <FilterIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Content based on selected tab */}
      {selectedTab === 0 && (
        <Box>
          {/* Metrics Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {healthMetrics.map(renderMetricCard)}
          </Grid>
          
          {/* Insights Panel */}
          {renderInsightsPanel()}
        </Box>
      )}

      {selectedTab === 1 && renderTrendsChart()}
      {selectedTab === 2 && renderComparisonTable()}
      {selectedTab === 3 && renderInsightsPanel()}

      {/* Details Dialog */}
      <Dialog
        open={!!detailsDialog}
        onClose={() => setDetailsDialog(null)}
        maxWidth="md"
        fullWidth
      >
        {detailsDialog && (
          <>
            <DialogTitle>
              {healthMetrics.find(m => m.id === detailsDialog)?.name} Details
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                Detailed analysis and recommendations for this metric will be displayed here.
                This would include historical data, correlations with other metrics, and
                personalized suggestions for improvement.
              </Typography>
              
              <Alert severity="info">
                <AlertTitle>Pro Tip</AlertTitle>
                Track this metric daily for more accurate insights and better trend analysis.
              </Alert>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialog(null)}>Close</Button>
              <Button variant="contained">View Full Report</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default SkinHealthAnalyticsPage;