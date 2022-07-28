const express = require('express');
const axios = require('axios');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3001;

const f1key = process.env.F1_API_KEY;

app.get('/', async (req, res, next) => {
  try {
    // Craft sport radar API URL
    const url = `https://api.sportradar.us/formula1/trial/v2/en/competitors/sr:competitor:7135/profile.json?api_key=${f1key}`;

    // Make request to API and forward the response
    const response = await axios.get(url);

    const data = res.json(response.data);

    console.log('DATA: ', data);

    return response;
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(port, () => console.log(`http://localhost:${port}`));
