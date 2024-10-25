const mongoose = require('mongoose');

// Define Lead schema
const leadSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Unique ID for lead
    name: String,
    email: String,
    source: String,
    createdAt: { type: Date, default: Date.now }
});

// Create Lead model
module.exports = mongoose.model('Lead', leadSchema);
