const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
const uri = 'mongodb+srv://dhairya:dhairya3391@mern.4atin.mongodb.net/?retryWrites=true&w=majority&appName=MERN';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const Item = mongoose.model('Item', itemSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the REST API');
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find({},{__v:0});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add item' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete item' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
