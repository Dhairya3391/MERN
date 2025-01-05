import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});