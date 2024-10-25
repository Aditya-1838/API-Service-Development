const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');


// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api', apiRoutes); // Use API routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/budgetbuddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully.");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
