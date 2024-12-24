const express = require('express');

const app = express();

let visit_counter = 0;

function foo(req, res) {
  if (visit_counter < 2) {
    setTimeout(() => {
      console.log('hello');
      res.write('\nNext inside prac1 called');
      res.end();
    }, 2000);
    visit_counter++;
  } else {
    setTimeout(() => {
      console.log('hello');
      res.write('\nCalled when counter is greater than or equal to 2');
      res.end();
    }, 2000);
  }
}

app.get('/prac1', (req, res, next) => {
  res.write('prac1 called');
  next();
}, foo);

app.listen(3000, () => {
  console.log('Server started at port 3000');
});
