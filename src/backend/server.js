
// This is a simple Express.js server
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Sample API endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// User profiles endpoint (mock data)
app.get('/api/profiles', (req, res) => {
  const mockProfiles = [
    { id: 1, name: 'Sarah Johnson', title: 'UX Designer', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'David Chen', title: 'Software Engineer', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Maya Patel', title: 'Product Manager', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
  ];
  
  res.json(mockProfiles);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
