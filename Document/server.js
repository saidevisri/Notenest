// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Define Routes
app.use('/api/auth', require('./routes/auth')); // This should load routes/auth.js
app.use('/api/notes', require('./routes/notes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));