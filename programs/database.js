const mongoose = require('mongoose');
const mongoDBUrl = "mongodb+srv://dhairya:dhairya3391@mern.4atin.mongodb.net/?retryWrites=true&w=majority&appName=MERN";

mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    rollNumber: { type: String, required: true, unique: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
});

const Faculty = mongoose.model('Faculty', facultySchema);
const Student = mongoose.model('Student', studentSchema);
const Product = mongoose.model('Product', productSchema);


async function createSampleData() {
    try {
        await Faculty.create({ name: "Dhairya", department: "Maths", email: "Dhairyaadroja@icloud.com" });
        console.log("Faculty added.");

        await Student.create({ name: "Hardd", age: 20, rollNumber: "209830307016" });
        console.log("Student added.");

        await Product.create({ name: "Macbook air", price: 60000, category: "Electronics" });
        console.log("Product added.");
    } catch (err) {
        console.error("Error creating data:", err);
    } finally {
        mongoose.connection.close();
    }
}

createSampleData();
