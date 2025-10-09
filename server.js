const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/detection', require('./routes/detection'));
app.use('/api/training', require('./routes/training'));
app.use('/api/treatments', require('./routes/treatments'));
app.use('/api/progress', require('./routes/progress'));

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend available at http://localhost:${PORT}`);
});

module.exports = app;
