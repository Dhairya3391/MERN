const http = require("http");
const express = require("express");
app = express();

// const server = http.createServer((req, res) => {
//   // res.end("hello world");
//   if (req.method == "GET") {
  //     console.log("get method called");
  //     res.write("get method called");
//   } else if (req.method == "PUT") {
//     res.end("another method is called");
//   }
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("server started at localhost:3000");
// }); 

// app.get("/", (req, res) => {
//   console.log("home");
//   res.send(`<h1>hello world</h1>`);
// });

// app.get("/some", (req, res) => {
//   console.log("some");
//   res.send(`this is some`);
// });

app.get(
  "/",
  (req, res, next) => {
    next();
  },
  foo,
);
function foo(req, res, next) {
arr = ['some','ware','thing','blahh']
let clutter = ""
arr.map((data,index)=>{
  clutter += `<h1>${data}</h1>`
})
res.send(clutter)
  next();
}
app.listen(3000, () => console.log("Server Started"));
