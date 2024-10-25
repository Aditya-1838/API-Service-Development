const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');



// Endpoint to fetch and store leads and campaigns
router.get('/fetch-data', apiController.fetchAndStoreData);

// Endpoint to fetch routes for leads
router.get('/leads', apiController.getAllLeads);
router.get('/leads/:id', apiController.getLeadById);

// Endpoint to fetch routes for campaigns
router.get('/campaigns', apiController.getAllCampaigns);
router.get('/campaigns/:id', apiController.getCampaignById);

// Endpoint to download PDF report
router.get('/download-report', apiController.downloadReport);


module.exports = router;
