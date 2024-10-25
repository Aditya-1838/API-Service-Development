const fs = require('fs');
const path = require('path');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

// Fetch data from JSON files
const fetchData = () => {
    const dataPath = path.join(__dirname, '../data/data.json');
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
};

// Transform data (ETL Process)
const transformData = (rawData) => {
    const totalBudget = rawData.campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
    return {
        totalLeads: rawData.leads.length,
        totalBudget
    };
};

// API to fetch and store leads and campaigns
exports.fetchAndStoreData = async (req, res) => {
    const rawData = fetchData();

    await Lead.insertMany(rawData.leads);
    await Campaign.insertMany(rawData.campaigns);

    const transformedData = transformData(rawData);

    res.status(200).json({
        message: "Data fetched and stored successfully.",
        metrics: transformedData
    });

    if (transformedData.totalBudget > 10000) {
        sendEmailAlert(transformedData);
    }
};

// Fetch all leads
exports.getAllLeads = (req, res) => {
    const data = fetchData();
    res.json(data.leads);
};

// Fetch all campaigns
exports.getAllCampaigns = (req, res) => {
    const data = fetchData();
    res.json(data.campaigns);
};

// Fetch a specific lead by ID
exports.getLeadById = (req, res) => {
    const data = fetchData();
    const leadId = parseInt(req.params.id, 10);
    const lead = data.leads.find((l) => l.id === leadId);

    if (lead) {
        res.json(lead);
    } else {
        res.status(404).json({ message: "Lead not found." });
    }
};

// Fetch a specific campaign by ID
exports.getCampaignById = (req, res) => {
    const data = fetchData();
    const campaignId = parseInt(req.params.id, 10);
    const campaign = data.campaigns.find((c) => c.id === campaignId);

    if (campaign) {
        res.json(campaign);
    } else {
        res.status(404).json({ message: "Campaign not found." });
    }
};

// Function to send email alerts
const sendEmailAlert = async (metrics) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password' // Use environment variables in production
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'recipient_email@gmail.com',
        subject: 'Budget Alert',
        text: `The total budget has exceeded the limit: ${metrics.totalBudget}`
    };

    await transporter.sendMail(mailOptions);
};

// Check if the reports directory exists, and create it if not
const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
}

// Generate PDF report
const pdfGenerator = async (metrics) => {
    const doc = new PDFDocument();
    const pdfPath = path.join(reportsDir, 'report.pdf');
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    doc.fontSize(25).text('Report', { underline: true });
    doc.moveDown();
    doc.fontSize(16).text(`Total Leads: ${metrics.totalLeads}`);
    doc.text(`Total Budget: ${metrics.totalBudget[0]?.total || 0}`);

    doc.end();

    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
            console.log('PDF written successfully');
            resolve(pdfPath);
        });
        writeStream.on('error', (error) => {
            console.error('PDF writing error:', error);
            reject(error);
        });
    });
};

// Download the report
exports.downloadReport = async (req, res) => {
    try {
        const metrics = {
            totalLeads: await Lead.countDocuments(),
            totalBudget: await Campaign.aggregate([{ $group: { _id: null, total: { $sum: "$budget" } } }])
        };

        const pdfPath = await pdfGenerator(metrics);

        res.download(pdfPath, 'report.pdf', (err) => {
            if (err) {
                console.error('Download error:', err);
                return res.status(500).json({ message: "Error downloading the report.", error: err });
            }
        });
    } catch (error) {
        console.error('Report generation error:', error);
        res.status(500).json({ message: "Error generating report.", error });
    }
};
