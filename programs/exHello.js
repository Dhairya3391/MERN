const express = require('express');
const app = express(
);
// app.use(express.bodyParser)

app.get('/:a.:b', (req, res) => {
    res.send(`${req.params.a} plus ${req.params.b} is ${parseInt(req.params.a) + parseInt( req.params.b)}`);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
