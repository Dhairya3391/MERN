const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use('/api', (req, res, next) => {
  console.log('Middleware for /api routes');
  next();
});

app.use('/student', (req, res, next) => {
    res.write('hello')
    next();
});

app.get('/student/:id',(req,res)=>{
    console.log("id claled");
    res.end();
})

app.use('/api', (req, res, next) => {
  console.log('Middleware for /api routes');
  next();
});

app.all('/api/all', (req, res) => {
  res.send(`You used ${req.method} method on /api/all`);
});

app.get('/api', (req, res) => {
  res.send('This is the /api endpoint');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
