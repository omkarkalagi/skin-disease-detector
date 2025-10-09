---
description: Repository Information Overview
alwaysApply: true
---

# Skin Disease Detector Information

## Summary
An AI-powered skin health analysis platform built with React, TypeScript, and Material-UI. The application provides advanced skin disease detection, personalized skincare recommendations, health tracking, and community support features.

## Structure
- **src/**: Main source code directory containing React components, pages, and backend code
- **public/**: Static assets including images and HTML template
- **build/**: Production build output directory
- **src/components/**: Reusable UI components
- **src/pages/**: Page components for different sections of the application
- **src/backend/**: Backend code including AI model training

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 4.9.5
**Build System**: React Scripts 5.0.1
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.2.0
- React Router DOM 6.30.1
- Material UI 5.18.0 with MUI Lab and Icons
- TensorFlow.js 4.22.0 with MobileNet model
- Framer Motion 11.0.0
- Axios 1.12.2
- React Webcam 7.2.0
- Brain.js 2.0.0-beta.24 (for neural network training)
- Chart.js 4.5.0 with React-ChartJS-2 5.3.0

**Development Dependencies**:
- Testing Library (Jest, React)
- TypeScript compiler

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Server Configuration
**Server**: Express.js 5.1.0
**Port**: 5000 (default)
**Middleware**: Helmet 8.1.0, CORS 2.8.5, JSON parsing
**Routes**:
- /api/auth
- /api/detection
- /api/training
- /api/treatments
- /api/progress

## Deployment
**Platform**: Vercel
**Configuration**: vercel.json
**Build Command**: npm run build
**Output Directory**: build
**Runtime**: Node.js 18.x
**Deployment Script**: deploy.sh

## Testing
**Framework**: Jest with React Testing Library
**Test Location**: src/*.test.tsx files
**Configuration**: Default Create React App test setup
**Run Command**:
```bash
npm test
```

## AI Features
**Model Training**: Custom neural network using Brain.js
**Disease Detection**: TensorFlow.js with MobileNet
**Training Data**: Synthetic data generation for skin diseases
**Model Storage**: JSON format with disease and treatment data
**Features**:
- Real-time skin analysis
- Image upload analysis
- Symptom checking
- Treatment recommendations

## Build Performance Optimization

### Build Performance Issues
1. **Large Dependency Tree**: The project has numerous dependencies including heavy libraries like TensorFlow.js and Material UI.
2. **Many React Components**: The application has 20+ page components with complex UI elements.
3. **TypeScript Compilation**: TypeScript compilation adds overhead to the build process.

### Optimization Strategies
1. **Use Production Builds**:
   ```bash
   # Set to production mode before building
   SET NODE_ENV=production && npm run build
   ```

2. **Implement Code Splitting**:
   - Use React.lazy() and Suspense for route-based code splitting
   - Split MegaApp.tsx into smaller chunks

3. **Optimize Dependencies**:
   - Consider removing unused page components
   - Use dynamic imports for TensorFlow.js models
   - Implement tree-shaking for Material UI components

4. **Cache Optimization**:
   - Enable Babel/TypeScript incremental builds
   - Use persistent caching between builds

5. **Development Workflow**:
   - Use partial builds during development
   - Focus on specific components rather than full builds