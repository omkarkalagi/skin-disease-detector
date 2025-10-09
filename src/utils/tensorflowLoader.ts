/**
 * Utility for dynamically loading TensorFlow.js
 * This helps reduce initial bundle size by loading TensorFlow only when needed
 */

// Dynamic import function for TensorFlow.js
export const loadTensorFlow = async () => {
  try {
    const tf = await import('@tensorflow/tfjs');
    console.log('TensorFlow.js loaded successfully');
    return tf;
  } catch (error) {
    console.error('Error loading TensorFlow.js:', error);
    throw error;
  }
};

// Dynamic import function for MobileNet model
export const loadMobileNetModel = async () => {
  try {
    const tf = await loadTensorFlow();
    const mobilenet = await import('@tensorflow-models/mobilenet');
    const model = await mobilenet.load();
    console.log('MobileNet model loaded successfully');
    return { tf, model };
  } catch (error) {
    console.error('Error loading MobileNet model:', error);
    throw error;
  }
};

// Example usage in a React component:
/*
import React, { useState, useEffect } from 'react';
import { loadMobileNetModel } from '../utils/tensorflowLoader';

const ModelComponent = () => {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const initModel = async () => {
      try {
        setIsLoading(true);
        const { model } = await loadMobileNetModel();
        if (isMounted) {
          setModel(model);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };
    
    initModel();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Rest of component...
};
*/