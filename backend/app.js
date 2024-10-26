// app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const weatherRoutes = require('./routes/weatherRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/insurance', insuranceRoutes);

// Error handling for unhandled requests
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
