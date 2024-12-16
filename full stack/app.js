const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://dhairya:dhairya3391@mern.4atin.mongodb.net/?retryWrites=true&w=majority&appName=MERN", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const facultySchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
});
const studentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  email: String,
});
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

const Faculty = mongoose.model("Faculty", facultySchema);
const Student = mongoose.model("Student", studentSchema);
const Product = mongoose.model("Product", productSchema);

function createCrudRoutes(model, basePath, app) {
  app.get(basePath, async (req, res) => {
    try {
      const data = await model.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post(basePath, async (req, res) => {
    try {
      const newItem = new model(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put(`${basePath}/:id`, async (req, res) => {
    try {
      const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete(`${basePath}/:id`, async (req, res) => {
    try {
      await model.findByIdAndDelete(req.params.id);
      res.json({ message: "Item deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

createCrudRoutes(Faculty, "/api/faculty", app);
createCrudRoutes(Student, "/api/student", app);
createCrudRoutes(Product, "/api/product", app);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
