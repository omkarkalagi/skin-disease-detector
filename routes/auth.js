const express = require('express');
const router = express.Router();

// Mock user data for demonstration
const users = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' }
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple mock authentication
  if (username && password) {
    const user = users.find(u => u.username === username);
    if (user) {
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token: 'mock-jwt-token'
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Username and password are required' });
  }
});

// Register route
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (username && email && password) {
    // Check if user already exists
    if (users.some(u => u.username === username || u.email === email)) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // Create new user (in a real app, you would save to database)
    const newUser = {
      id: users.length + 1,
      username,
      email
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(400).json({ success: false, message: 'All fields are required' });
  }
});

// Get current user
router.get('/me', (req, res) => {
  // In a real app, you would verify the JWT token
  // For demo, just return a mock user
  res.json({
    success: true,
    user: {
      id: 1,
      username: 'user1',
      email: 'user1@example.com'
    }
  });
});

module.exports = router;