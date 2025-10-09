const express = require('express');
const router = express.Router();
const path = require('path');
const { SkinDiseaseTrainer } = require('../src/backend/training/SkinDiseaseTrainer');

// Initialize the skin disease trainer
const skinDiseaseTrainer = new SkinDiseaseTrainer();

// Try to load the model if it exists
try {
  skinDiseaseTrainer.loadModel();
} catch (error) {
  console.error('Error loading model:', error);
}

// Analyze image for skin conditions
router.post('/analyze', (req, res) => {
  try {
    const { imageFeatures } = req.body;
    
    if (!imageFeatures || !Array.isArray(imageFeatures)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid image features. Expected an array of numerical values.' 
      });
    }
    
    // Ensure we have a trained model
    if (!skinDiseaseTrainer.loadModel()) {
      console.log('Model not found, training a new one...');
      // Train with minimal data for demo purposes
      skinDiseaseTrainer.trainModel(10, 1000)
        .then(() => {
          const result = skinDiseaseTrainer.predict(imageFeatures);
          res.json({ success: true, result });
        })
        .catch(error => {
          console.error('Training error:', error);
          res.status(500).json({ success: false, message: 'Error training model', error: error.message });
        });
    } else {
      // Model already loaded, make prediction
      const result = skinDiseaseTrainer.predict(imageFeatures);
      res.json({ success: true, result });
    }
  } catch (error) {
    console.error('Detection error:', error);
    res.status(500).json({ success: false, message: 'Error analyzing image', error: error.message });
  }
});

// Get treatment recommendations for a disease
router.get('/treatments/:disease', (req, res) => {
  try {
    const { disease } = req.params;
    const treatments = skinDiseaseTrainer.getTreatmentRecommendations(disease);
    
    if (treatments) {
      res.json({ success: true, treatments });
    } else {
      res.status(404).json({ success: false, message: 'No treatments found for this disease' });
    }
  } catch (error) {
    console.error('Treatment recommendation error:', error);
    res.status(500).json({ success: false, message: 'Error getting treatments', error: error.message });
  }
});

module.exports = router;