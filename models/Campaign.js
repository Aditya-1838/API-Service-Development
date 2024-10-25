const mongoose = require('mongoose');

// Define Campaign schema
const campaignSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Unique ID for campaign
    name: String,
    budget: Number,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

// Create Campaign model
module.exports = mongoose.model('Campaign', campaignSchema);
