const express = require('express');
const router = express.Router();
const { TREATMENTS } = require('../src/backend/training/SkinDiseaseTrainer');

// Get all treatments
router.get('/', (req, res) => {
  try {
    res.json({ success: true, treatments: TREATMENTS });
  } catch (error) {
    console.error('Error getting treatments:', error);
    res.status(500).json({ success: false, message: 'Error getting treatments', error: error.message });
  }
});

// Get treatment for specific disease
router.get('/:disease', (req, res) => {
  try {
    const { disease } = req.params;
    const diseaseKey = disease.toLowerCase().replace(/\s+/g, '_');
    
    if (TREATMENTS[diseaseKey]) {
      res.json({ success: true, treatment: TREATMENTS[diseaseKey] });
    } else {
      res.status(404).json({ success: false, message: 'Treatment not found for this disease' });
    }
  } catch (error) {
    console.error('Error getting treatment:', error);
    res.status(500).json({ success: false, message: 'Error getting treatment', error: error.message });
  }
});

module.exports = router;