const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next(); //sends to get req
});

app.get(
  "/",
  (req, res, next) => {
    next(); //sends to foo
  },
  foo,
  bar,
);

//callback functions for next
function foo(req, res, next) {
  console.log("hello world");
  let a = 2;
  let b = 4;
  let c = a + b;
  res.send(`${c}`);
  next(); //sends to bar
}
function bar() {
  console.log("something");
}

//put
app.put("/", (req, res) => {
  res.send("put");
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
