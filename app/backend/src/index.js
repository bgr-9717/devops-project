const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory metrics
let requestCount = 0;
let errorCount = 0;

// Middleware to count requests
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Service Health Dashboard API is running' });
});

// Health endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(), // seconds
        timestamp: new Date().toISOString()
    });
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
    res.json({
        requests: requestCount,
        errors: errorCount
    });
});

// Simulate load
app.post('/simulate-load', (req, res) => {
    const duration = 5000; // 5 seconds
    const end = Date.now() + duration;

    while (Date.now() < end) {
        Math.sqrt(Math.random());
    }

    res.json({ message: 'Load simulation complete' });
});

// Simulate error
app.get('/error', (req, res) => {
    errorCount++;
    res.status(500).json({ error: 'Simulated failure' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
