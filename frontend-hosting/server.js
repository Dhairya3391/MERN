const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get("/greet", (req, res) => {
  res.send("Hello from the server!");
});
app.get("/dhairya", (req, res) => {
  res.send("you found some spicy stuff");
});
const axios = require("axios");

app.get("/jokes", async (req, res) => {
  const response = await axios.get(
    "https://official-joke-api.appspot.com/random_joke",
  );
  res.send(`<h1>${response.data.setup}</h1><p>${response.data.punchline}</p>`);
});
app.get("/search", (req, res) => {
  const term = req.query.term;
  res.send(`You searched for: ${term}`);
});
