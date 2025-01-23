let africaData = [];
let europeData = [];
let asiaData = [];

const calculateMovingAverage = (data, days) => {
    const movingAverageData = [];

    for (let i = days - 1; i < data.length; i++) {
        const sum = data.slice(i - days + 1, i + 1).reduce((acc, val) => acc + val, 0);
        const average = sum / days;
        movingAverageData.push(average);
    }
    console.log('Moving Average Data:', movingAverageData);
    return movingAverageData;
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};


const createChartConfig = (label, data) => {

    const dates = Array.from({ length: data.length }, (_, i) => {
        const today = new Date();
        today.setDate(today.getDate() - (data.length - 1 - i));
        return today.toISOString().split('T')[0];
    });

    return {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: `Daily Sales - ${label}`,
                    data: data,
                    borderColor: getRandomColor(),
                    fill: false,
                },
                {
                    label: `7-Day Moving Average - ${label}`,
                    data: calculateMovingAverage(data, 7),
                    borderColor: getRandomColor(),
                    fill: false,
                },
            ],
        },
    };
};


const africaChartCanvas = document.getElementById('africaChart').getContext('2d');
const europeChartCanvas = document.getElementById('europeChart').getContext('2d');
const asiaChartCanvas = document.getElementById('asiaChart').getContext('2d');

const africaChart = new Chart(africaChartCanvas, createChartConfig('Africa', africaData));
const europeChart = new Chart(europeChartCanvas, createChartConfig('Europe', europeData));
const asiaChart = new Chart(asiaChartCanvas, createChartConfig('Asia', asiaData));

const updateChart = (chart, data) => {
    const movingAverageData = calculateMovingAverage(data, 7);

    chart.data.labels = Array.from({ length: data.length }, (_, i) => {
        const today = new Date();
        today.setDate(today.getDate() - (data.length - 1 - i));
        return today.toISOString().split('T')[0];
    });
    chart.data.datasets[0].data = data;
    chart.data.datasets[1].data = movingAverageData;
    
    chart.update();
};


const updateCharts = () => {
    updateChart(africaChart, africaData);
    updateChart(europeChart, europeData);
    updateChart(asiaChart, asiaData);
};

const addDailySale = async (continent) => {
    const dailySale = parseInt(document.getElementById(`salesInput${continent}`).value);
    const selectedDate = document.getElementById(`dateInput${continent}`).value;

    if (!isNaN(dailySale) && selectedDate) {
        await fetch(`/api/sales?continent=${continent}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sale: dailySale, date: selectedDate }),
        });

        const dateIndex = dates.indexOf(selectedDate);

        if (dateIndex !== -1) {
            
            data[dateIndex] = dailySale;
        } else {
            
            const insertionIndex = findInsertionIndex(selectedDate);
            dates.splice(insertionIndex, 0, selectedDate);
            data.splice(insertionIndex, 0, dailySale);
        }

        updateChart(africaChart, africaData, dates);
        updateChart(europeChart, europeData, dates);
        updateChart(asiaChart, asiaData, dates);

        document.getElementById(`salesInput${continent}`).value = '';
    } else {
        alert('Please enter a valid number for daily sales and pick a valid date');
    }
};


const findInsertionIndex = (newDate) => {
    for (let i = 0; i < dates.length; i++) {
        if (newDate < dates[i]) {
            return i;
        }
    }
    return dates.length;
};


const updateDashboardMetrics = (jsonData) => {
    const totalSalesElement = document.getElementById('totalSales');
    const totalRevenueElement = document.getElementById('totalRevenue');
    const averageAmountPerSaleElement = document.getElementById('averageAmountPerSale');
    const recentSalesElement = document.getElementById('recentSales');

    const totalSales = jsonData.length; 
    const formattedTotalSales = new Intl.NumberFormat().format(totalSales);
    
    const totalRevenue = jsonData.reduce((acc, entry) => acc + entry.sale, 0);
    const formattedTotalRevenue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(totalRevenue);
    totalRevenueElement.innerText = formattedTotalRevenue;
 
  
    recentSalesElement.innerHTML = ''; 
    const recentSales = jsonData.slice(-5); 
    recentSales.forEach((entry) => {
        const formattedSale = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(entry.sale);
        const listItem = document.createElement('li');
        listItem.innerText = `${entry.continent} - ${formattedSale}`;
        recentSalesElement.appendChild(listItem);
    });
    totalSalesElement.innerText = formattedTotalSales;
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});


const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        const jsonData = await response.json();

        africaData = jsonData.filter((entry) => entry.continent === 'Africa').map((entry) => entry.sale);
        europeData = jsonData.filter((entry) => entry.continent === 'Europe').map((entry) => entry.sale);
        asiaData = jsonData.filter((entry) => entry.continent === 'Asia').map((entry) => entry.sale);
        updateCharts();

        updateDashboardMetrics(jsonData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
