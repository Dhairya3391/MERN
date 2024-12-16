const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors())
    
const mongoDBUrl = "mongodb+srv://dhairya:dhairya3391@mern.4atin.mongodb.net/?retryWrites=true&w=majority&appName=MERN";

mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.use(bodyParser.json());

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const Faculty = mongoose.model('Faculty', facultySchema);

app.post('/api/faculty', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        const savedFaculty = await newFaculty.save();
        res.status(201).json(savedFaculty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/faculty', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/faculty/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.status(200).json(faculty);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/faculty/:id', async (req, res) => {
    try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFaculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.status(200).json(updatedFaculty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/faculty/:id', async (req, res) => {
    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.status(200).json({ message: "Faculty deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
