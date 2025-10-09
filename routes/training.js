const express = require('express');
const router = express.Router();
const { SkinDiseaseTrainer } = require('../src/backend/training/SkinDiseaseTrainer');

// Initialize the skin disease trainer
const skinDiseaseTrainer = new SkinDiseaseTrainer();

// Start model training
router.post('/start', async (req, res) => {
  try {
    const { epochs = 100, samples = 10000 } = req.body;
    
    // Check if training is already in progress
    const status = skinDiseaseTrainer.getTrainingProgress();
    if (status.isTraining) {
      return res.status(409).json({ 
        success: false, 
        message: 'Training already in progress', 
        progress: status.progress 
      });
    }
    
    // Start training in background
    res.json({ 
      success: true, 
      message: 'Training started', 
      status: 'training' 
    });
    
    // Perform training (this will run after response is sent)
    try {
      await skinDiseaseTrainer.trainModel(epochs, samples);
    } catch (error) {
      console.error('Training error:', error);
    }
    
  } catch (error) {
    console.error('Error starting training:', error);
    res.status(500).json({ success: false, message: 'Error starting training', error: error.message });
  }
});

// Get training status
router.get('/status', (req, res) => {
  try {
    const status = skinDiseaseTrainer.getTrainingProgress();
    res.json({ success: true, status });
  } catch (error) {
    console.error('Error getting training status:', error);
    res.status(500).json({ success: false, message: 'Error getting training status', error: error.message });
  }
});

// Get list of diseases
router.get('/diseases', (req, res) => {
  try {
    const { DISEASES } = require('../src/backend/training/SkinDiseaseTrainer');
    res.json({ success: true, diseases: DISEASES });
  } catch (error) {
    console.error('Error getting diseases list:', error);
    res.status(500).json({ success: false, message: 'Error getting diseases list', error: error.message });
  }
});

module.exports = router;