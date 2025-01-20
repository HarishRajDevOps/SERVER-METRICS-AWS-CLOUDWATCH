const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 4000;

// Dynamic password for receiver API
const password = process.env.RECEIVER_API_PASSWORD || 'defaultReceiverPassword';

// Use basic authentication for /receive-metrics endpoint
app.use('/receive-metrics', basicAuth({
    users: { 'admin': password },
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/receive-metrics', (req, res) => {
    console.log('Received Metrics:', req.body);
    res.status(200).send('Metrics received');
});

app.listen(PORT, () => {
    console.log(`Metrics receiver running on http://localhost:${PORT}`);
});
