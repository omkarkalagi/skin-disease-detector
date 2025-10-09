const brain = require('brain.js');
const fs = require('fs');
const path = require('path');

// Training data structure for skin diseases
const DISEASES = {
  'acne': { id: 0, name: 'Acne', severity: 'mild' },
  'eczema': { id: 1, name: 'Eczema', severity: 'moderate' },
  'psoriasis': { id: 2, name: 'Psoriasis', severity: 'moderate' },
  'rosacea': { id: 3, name: 'Rosacea', severity: 'mild' },
  'melanoma': { id: 4, name: 'Melanoma', severity: 'severe' },
  'basal_cell_carcinoma': { id: 5, name: 'Basal Cell Carcinoma', severity: 'severe' },
  'squamous_cell_carcinoma': { id: 6, name: 'Squamous Cell Carcinoma', severity: 'severe' },
  'seborrheic_keratosis': { id: 7, name: 'Seborrheic Keratosis', severity: 'mild' },
  'dermatitis': { id: 8, name: 'Dermatitis', severity: 'moderate' },
  'vitiligo': { id: 9, name: 'Vitiligo', severity: 'mild' }
};

// Treatment recommendations database
const TREATMENTS = {
  'acne': {
    medications: [
      { name: 'Benzoyl Peroxide', dosage: '2.5-10%', frequency: 'Once or twice daily', duration: '4-6 weeks' },
      { name: 'Salicylic Acid', dosage: '0.5-2%', frequency: 'Once or twice daily', duration: '4-6 weeks' },
      { name: 'Retinoids (Adapalene)', dosage: '0.1%', frequency: 'Once daily', duration: '8-12 weeks' },
      { name: 'Antibiotics (Topical)', dosage: 'Varies', frequency: 'Once or twice daily', duration: '6-8 weeks' }
    ],
    homeRemedies: [
      'Gentle cleansing with mild soap',
      'Avoid picking or squeezing pimples',
      'Use non-comedogenic moisturizers',
      'Apply tea tree oil diluted with carrier oil'
    ],
    lifestyle: [
      'Maintain a consistent skincare routine',
      'Use sunscreen daily',
      'Eat a balanced diet low in processed foods',
      'Manage stress levels'
    ]
  },
  'eczema': {
    medications: [
      { name: 'Topical Corticosteroids', dosage: '0.5-2.5%', frequency: 'Once or twice daily', duration: '2-4 weeks' },
      { name: 'Topical Calcineurin Inhibitors', dosage: 'Varies', frequency: 'Twice daily', duration: '4-6 weeks' },
      { name: 'Oral Antihistamines', dosage: '10-25mg', frequency: 'Once daily', duration: 'As needed' },
      { name: 'Moisturizing Creams', dosage: 'Apply liberally', frequency: 'Multiple times daily', duration: 'Ongoing' }
    ],
    homeRemedies: [
      'Take lukewarm baths with colloidal oatmeal',
      'Use fragrance-free moisturizers',
      'Wear soft, breathable clothing',
      'Avoid harsh soaps and detergents'
    ],
    lifestyle: [
      'Identify and avoid triggers',
      'Maintain skin hydration',
      'Use humidifiers in dry environments',
      'Practice stress management'
    ]
  },
  'psoriasis': {
    medications: [
      { name: 'Topical Corticosteroids', dosage: '0.05-0.1%', frequency: 'Once or twice daily', duration: '2-4 weeks' },
      { name: 'Vitamin D Analogues', dosage: 'Varies', frequency: 'Once daily', duration: '8-12 weeks' },
      { name: 'Coal Tar Preparations', dosage: '1-5%', frequency: 'Once daily', duration: '4-8 weeks' },
      { name: 'Systemic Medications', dosage: 'Varies', frequency: 'As prescribed', duration: 'Ongoing' }
    ],
    homeRemedies: [
      'Regular moisturizing',
      'Gentle skin care routine',
      'Exposure to natural sunlight (limited)',
      'Stress reduction techniques'
    ],
    lifestyle: [
      'Maintain a healthy weight',
      'Avoid smoking and excessive alcohol',
      'Regular exercise',
      'Stress management'
    ]
  },
  'melanoma': {
    medications: [
      { name: 'Immunotherapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Ongoing' },
      { name: 'Targeted Therapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Ongoing' },
      { name: 'Chemotherapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Treatment cycles' },
      { name: 'Radiation Therapy', dosage: 'Varies', frequency: 'As prescribed', duration: 'Treatment sessions' }
    ],
    homeRemedies: [
      'Surgical removal is primary treatment',
      'Regular skin examinations',
      'Sun protection',
      'Healthy lifestyle'
    ],
    lifestyle: [
      'Regular dermatologist visits',
      'Daily sun protection',
      'Skin self-examinations monthly',
      'Healthy diet and exercise'
    ]
  }
};

class SkinDiseaseTrainer {
  constructor() {
    this.neuralNetwork = new brain.NeuralNetwork({
      hiddenLayers: [128, 64, 32],
      activation: 'sigmoid',
      learningRate: 0.01
    });
    this.isTraining = false;
    this.trainingProgress = 0;
    this.trainingData = [];
    this.modelPath = path.join(__dirname, '../models/skin_disease_model.json');
  }

  // Generate synthetic training data based on skin characteristics
  generateTrainingData(samples = 10000) {
    console.log(`🧠 Generating ${samples} training samples...`);
    const trainingData = [];

    for (let i = 0; i < samples; i++) {
      const disease = Object.keys(DISEASES)[Math.floor(Math.random() * Object.keys(DISEASES).length)];
      const diseaseData = DISEASES[disease];

      // Generate features based on disease characteristics
      const features = this.generateFeaturesForDisease(disease);

      trainingData.push({
        input: features,
        output: this.createOutputVector(diseaseData.id)
      });
    }

    return trainingData;
  }

  generateFeaturesForDisease(disease) {
    const baseFeatures = {
      'acne': [0.8, 0.3, 0.2, 0.1, 0.4, 0.6, 0.3, 0.2, 0.5, 0.1],
      'eczema': [0.2, 0.8, 0.6, 0.4, 0.1, 0.2, 0.8, 0.7, 0.3, 0.4],
      'psoriasis': [0.3, 0.6, 0.9, 0.7, 0.2, 0.4, 0.5, 0.8, 0.6, 0.3],
      'rosacea': [0.6, 0.4, 0.3, 0.8, 0.3, 0.5, 0.2, 0.4, 0.7, 0.2],
      'melanoma': [0.1, 0.2, 0.1, 0.2, 0.9, 0.8, 0.1, 0.1, 0.2, 0.9],
      'basal_cell_carcinoma': [0.1, 0.1, 0.1, 0.1, 0.8, 0.9, 0.1, 0.1, 0.1, 0.7],
      'squamous_cell_carcinoma': [0.2, 0.2, 0.2, 0.2, 0.7, 0.8, 0.2, 0.2, 0.3, 0.8],
      'seborrheic_keratosis': [0.4, 0.3, 0.2, 0.3, 0.1, 0.2, 0.3, 0.2, 0.8, 0.1],
      'dermatitis': [0.3, 0.7, 0.5, 0.3, 0.1, 0.2, 0.7, 0.6, 0.4, 0.3],
      'vitiligo': [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
    };

    let features = baseFeatures[disease] || [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

    // Add some noise to make training more realistic
    features = features.map(f => Math.max(0, Math.min(1, f + (Math.random() - 0.5) * 0.3)));

    return features;
  }

  createOutputVector(diseaseId) {
    const output = new Array(Object.keys(DISEASES).length).fill(0);
    output[diseaseId] = 1;
    return output;
  }

  async trainModel(epochs = 100, samples = 50000) {
    this.isTraining = true;
    this.trainingProgress = 0;

    try {
      console.log('🏥 Starting intensive model training...');
      console.log(`📊 Training with ${samples} samples for ${epochs} epochs`);

      // Generate training data
      this.trainingData = this.generateTrainingData(samples);

      // Split data for training and testing
      const splitPoint = Math.floor(this.trainingData.length * 0.8);
      const trainData = this.trainingData.slice(0, splitPoint);
      const testData = this.trainingData.slice(splitPoint);

      console.log(`📈 Training data: ${trainData.length} samples`);
      console.log(`🧪 Test data: ${testData.length} samples`);

      // Train the model
      const trainingOptions = {
        iterations: epochs,
        log: true,
        logPeriod: 10,
        callback: (stats) => {
          this.trainingProgress = (stats.iterations / epochs) * 100;
          console.log(`📊 Training Progress: ${this.trainingProgress.toFixed(1)}%`);
        },
        callbackPeriod: 5
      };

      await this.neuralNetwork.train(trainData, trainingOptions);

      // Test the model
      const testResults = this.testModel(testData);
      console.log(`✅ Training completed! Accuracy: ${testResults.accuracy.toFixed(2)}%`);

      // Save the trained model
      this.saveModel();

      this.isTraining = false;
      return {
        success: true,
        accuracy: testResults.accuracy,
        samples: samples,
        epochs: epochs,
        trainingTime: Date.now()
      };

    } catch (error) {
      console.error('❌ Training failed:', error);
      this.isTraining = false;
      throw error;
    }
  }

  testModel(testData) {
    let correct = 0;
    let total = testData.length;

    testData.forEach(sample => {
      const output = this.neuralNetwork.run(sample.input);
      const predicted = output.indexOf(Math.max(...output));
      const actual = sample.output.indexOf(1);

      if (predicted === actual) {
        correct++;
      }
    });

    return {
      accuracy: (correct / total) * 100,
      correct: correct,
      total: total
    };
  }

  predict(imageFeatures) {
    try {
      const prediction = this.neuralNetwork.run(imageFeatures);
      const diseaseId = prediction.indexOf(Math.max(...prediction));
      const confidence = Math.max(...prediction);

      const disease = Object.values(DISEASES).find(d => d.id === diseaseId);

      return {
        disease: disease ? disease.name : 'Unknown',
        confidence: confidence,
        diseaseId: diseaseId,
        probabilities: prediction,
        severity: disease ? disease.severity : 'unknown'
      };
    } catch (error) {
      console.error('Prediction error:', error);
      return {
        disease: 'Error',
        confidence: 0,
        error: error.message
      };
    }
  }

  saveModel() {
    try {
      const modelData = {
        model: this.neuralNetwork.toJSON(),
        diseases: DISEASES,
        treatments: TREATMENTS,
        trainedAt: new Date().toISOString(),
        version: '1.0.0'
      };

      fs.writeFileSync(this.modelPath, JSON.stringify(modelData, null, 2));
      console.log('💾 Model saved successfully');
    } catch (error) {
      console.error('❌ Failed to save model:', error);
    }
  }

  loadModel() {
    try {
      if (fs.existsSync(this.modelPath)) {
        const modelData = JSON.parse(fs.readFileSync(this.modelPath, 'utf8'));
        this.neuralNetwork.fromJSON(modelData.model);
        console.log('📂 Model loaded successfully');
        return true;
      }
    } catch (error) {
      console.error('❌ Failed to load model:', error);
    }
    return false;
  }

  getTrainingProgress() {
    return {
      isTraining: this.isTraining,
      progress: this.trainingProgress,
      status: this.isTraining ? 'training' : 'idle'
    };
  }

  getTreatmentRecommendations(diseaseName) {
    const diseaseKey = diseaseName.toLowerCase().replace(/\s+/g, '_');
    return TREATMENTS[diseaseKey] || null;
  }
}

module.exports = { SkinDiseaseTrainer, DISEASES, TREATMENTS };
