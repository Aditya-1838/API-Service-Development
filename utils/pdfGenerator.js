const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// Function to generate a PDF report
const generatePDF = (metrics) => {
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, '../reports/report.pdf');

    // Create PDF file
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text('Report', { align: 'center' });
    doc.text(`Total Leads: ${metrics.totalLeads}`);
    doc.text(`Total Budget: ${metrics.totalBudget}`);
    doc.end();

    return pdfPath; // Return the path of the generated PDF
};

module.exports = generatePDF;
