const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><p>Welcome to the Home Page!</p>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1><p>Learn more about us here.</p>');
});

app.get('/projects', (req, res) => {
    res.send('<h1>Projects Page</h1><p>there are many projects i did.</p>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Page</h1><p>Get in touch with us.</p>');
});

app.get('/faq', (req, res) => {
    res.send('<h1>FAQ Page</h1><p>Here are some frequently asked questions.</p>');
});

app.get('/fun', async (req, res) => {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        const joke = response.data.type === 'single' 
            ? response.data.joke 
            : `${response.data.setup} - ${response.data.delivery}`;
        res.send(`<h1>Random Joke</h1><p>${joke}</p><a href="/fun">Get another joke</a>`);
    } catch (error) {
        res.send('<h1>Error</h1><p>Could not fetch a joke at the moment. Please try again later.</p>');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

