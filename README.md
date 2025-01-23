# **Royal Motors Employee Dashboard**
The Royal Motors Employee Dashboard is a comprehensive web application designed to track and display sales performance across multiple continents (Africa, Europe, and Asia). The dashboard provides insights into daily sales, recent sales, total revenue, and sales performance metrics. It also includes interactive charts for visualizing data trends using 7-day moving averages.

### Features
##### Dashboard Metrics:

Total Sales.
Total Revenue (formatted in USD).
Sales Performance percentage.
Recent Sales (last 5 sales).
Interactive Sales Input:

Allows employees to input daily sales data for Africa, Europe, and Asia.
Real-time updates to the charts and metrics.
### Data Visualization:

Line charts showing daily sales and their 7-day moving averages for each continent.
Custom dynamic chart colors.
Backend Integration:

Fetches and posts data via a REST API (/api/data, /api/sales).
### Technologies Used
##### Frontend:

HTML5, CSS3.
JavaScript (ES6+).
Chart.js for interactive charts.
##### Backend:

Node.js/Express.js for API endpoints.
Fetch API for communication with the backend.
###Installation and Setup
####To run the project locally, follow these steps:

### Prerequisites

Node.js and npm installed on your system.
A modern web browser (e.g., Chrome, Edge, or Firefox).
Steps
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/ddalizu/Car-Sales-Dashboard.git
cd Car-Sales-Dashboard
Install Dependencies:

Navigate to the project directory and run:
bash
Copy
Edit
npm install
Start the Server:

bash
Copy
Edit
npm start
The app will run at http://localhost:3000.
Open the App:

Visit http://localhost:3000 in your browser.
### Usage
Navigate to the dashboard in your browser.
Use the input fields under each continent to enter daily sales data and the corresponding date.
####View updated metrics, including:
Total Sales and Revenue.
Recent Sales displayed in a formatted list.
Analyze interactive charts for each continent's sales trends and 7-day moving averages.
API Endpoints
GET /api/data:
Fetches all sales data for Africa, Europe, and Asia.
POST /api/sales?continent=<continent>:
Adds a new daily sale entry for the specified continent.
Payload: { "sale": <number>, "date": <string> }
Features in Detail
Dynamic Charts:

Charts automatically update when new sales data is added.
Uses 7-day moving averages to show sales trends.
Validation:

Ensures valid input for sales numbers and dates before submitting.
Error Handling:

Displays errors when API calls fail or invalid data is submitted.
### Future Enhancements
Add authentication and role-based access for employees.
Include historical comparisons for performance metrics.
Export charts and reports to PDF or Excel.
###License
This project is licensed under the MIT License. See the LICENSE file for more details.
