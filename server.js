const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/history/:date', async (req, res) => {
    const date = req.params.date;
    try {
        // Make the API request to the History API with the specified date
        const response = await axios.get(`http://history.muffinlabs.com/date`);

        // Assuming the API response returns an array of historical events
        const historicalEvents = response.data;

        // Send the response data back to the client
        res.json(historicalEvents);
    } catch (error) {
        console.error('Error fetching historical events:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching historical events.' });
    }
});

const port = 3000
app.listen(port, () => {
    console.log('Server is up and running on port',port);
});