const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next(); //next passes control to next handler.
});
app.get('/', (req, res) => {
    res.send('Hello, Middleware!');
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
