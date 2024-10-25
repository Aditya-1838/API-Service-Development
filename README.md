# API-Service-Development

This API is a Node.js application designed to manage leads and campaigns data. It provides endpoints to fetch and manage leads and campaigns, along with functionalities for generating reports and sending emails when certain conditions are met.

## Features

- Fetch all leads and campaigns
- Fetch individual lead or campaign by ID
- Generate PDF reports for metrics
- Send email alerts based on specific conditions
- Store and transform data into meaningful metrics

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer (for sending emails)
- PDFKit (for generating PDF reports)
- fs (for file system operations)

## Getting started
Follow the instructions in the README to clone the repository, install dependencies, and start the server. You can access the API at http://localhost:3000 and utilize various endpoints to manage your leads and campaigns data effectively.
## API Endpoint

1.GET /api/leads
- Description: Fetches all leads from the database. 
  
2.GET /api/leads/:id
- Description: Fetches all leads from the database. 


3.GET /api/campaigns
- Description: Fetches all leads from the database.
  
4.GET /api/campaigns/:id
- Description: Fetches all leads from the database.
  
5.GET /api/download-report
  - Description:Generates and downloads a PDF report containing metrics based on the leads and campaigns data.
  - The user will receive a PDF file download prompt.

6.For sending Email you need to enter the sender and recipient email.


## Example Response:
![Screenshot from 2024-10-25 14-51-55](https://github.com/user-attachments/assets/8aeb9585-b66b-41ec-b4ab-313d7b4e671a)

### Installation Instructions

1. **Clone the Repository**
   - Use the following command to clone the repository to your local machine:
     ```bash
     git clone https://github.com/Aditya-1838/API-Service-Development.git
     ```



2. **Install Required Packages**
   - Install the necessary dependencies using npm:
     ```bash
     npm install
     ```

3. **Start the Server**
   - After the packages are installed, start the server with:
     ```bash
     npm start
     ```








