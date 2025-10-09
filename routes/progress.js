const express = require('express');
const router = express.Router();

// Mock user progress data
const userProgress = {
  1: {
    userId: 1,
    history: [
      {
        id: 1,
        date: '2025-09-15T10:30:00Z',
        condition: 'Acne',
        severity: 'Mild',
        confidence: 0.89,
        imageUrl: '/images/history/user1_analysis1.jpg'
      },
      {
        id: 2,
        date: '2025-09-25T14:15:00Z',
        condition: 'Acne',
        severity: 'Mild',
        confidence: 0.76,
        imageUrl: '/images/history/user1_analysis2.jpg'
      }
    ],
    goals: [
      {
        id: 1,
        title: 'Reduce acne breakouts',
        target: 'Reduce severity to minimal',
        startDate: '2025-09-10T00:00:00Z',
        targetDate: '2025-12-10T00:00:00Z',
        progress: 35,
        status: 'in-progress'
      }
    ],
    metrics: {
      conditionSeverity: [
        { date: '2025-09-15', value: 7 },
        { date: '2025-09-25', value: 5 },
        { date: '2025-10-05', value: 4 }
      ],
      skinHydration: [
        { date: '2025-09-15', value: 45 },
        { date: '2025-09-25', value: 52 },
        { date: '2025-10-05', value: 58 }
      ]
    }
  }
};

// Get user progress history
router.get('/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    if (userProgress[userId]) {
      res.json({ success: true, history: userProgress[userId].history });
    } else {
      res.status(404).json({ success: false, message: 'User progress not found' });
    }
  } catch (error) {
    console.error('Error getting progress history:', error);
    res.status(500).json({ success: false, message: 'Error getting progress history', error: error.message });
  }
});

// Get user goals
router.get('/goals/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    if (userProgress[userId]) {
      res.json({ success: true, goals: userProgress[userId].goals });
    } else {
      res.status(404).json({ success: false, message: 'User goals not found' });
    }
  } catch (error) {
    console.error('Error getting goals:', error);
    res.status(500).json({ success: false, message: 'Error getting goals', error: error.message });
  }
});

// Get user metrics
router.get('/metrics/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    if (userProgress[userId]) {
      res.json({ success: true, metrics: userProgress[userId].metrics });
    } else {
      res.status(404).json({ success: false, message: 'User metrics not found' });
    }
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({ success: false, message: 'Error getting metrics', error: error.message });
  }
});

// Add new analysis to history
router.post('/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const analysisData = req.body;
    
    if (!userProgress[userId]) {
      userProgress[userId] = {
        userId: parseInt(userId),
        history: [],
        goals: [],
        metrics: {
          conditionSeverity: [],
          skinHydration: []
        }
      };
    }
    
    const newAnalysis = {
      id: userProgress[userId].history.length + 1,
      date: new Date().toISOString(),
      ...analysisData
    };
    
    userProgress[userId].history.push(newAnalysis);
    
    res.status(201).json({ success: true, analysis: newAnalysis });
  } catch (error) {
    console.error('Error adding analysis:', error);
    res.status(500).json({ success: false, message: 'Error adding analysis', error: error.message });
  }
});

module.exports = router;