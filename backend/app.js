// app.js
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const config = require('./utils/config');
const weatherRoutes = require('./routes/weatherRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const policyRoutes = require('./routes/policyRoutes'); // New policy route

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(
  process.env.MONGODB_URI,
)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/policies', policyRoutes);  // Route for handling policy creation

const PORT = config.port || 5132;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
