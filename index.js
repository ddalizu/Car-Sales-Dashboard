const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataFilePath = path.join(__dirname, 'data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        console.log('Read data from file:', data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data from file:', error);
        return [];
    }
};

app.get('/api/data', (req, res) => {
    const jsonData = readData();
    res.json(jsonData);
  });
  
  

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/sales', (req, res) => {
    const continent = req.query.continent;
    const salesData = readData();

    if (continent) {
        
        const continentSales = salesData.filter((sale) => sale.continent.toUpperCase() === continent.toUpperCase());
        res.json(continentSales);
    } else {
        res.json(salesData);
    }
});


app.post('/api/sales', (req, res) => {
    const newSale = req.body.sale;

    if (!newSale || isNaN(newSale)) {
        return res.status(400).json({ error: 'Invalid sale amount' });
    }

    const continent = req.query.continent || 'Global';
    const salesData = readData();

    const saleObject = { sale: newSale, continent: continent };
    salesData.push(saleObject);
    writeData(salesData);

    res.json({ message: 'Sale added successfully', data: salesData });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





