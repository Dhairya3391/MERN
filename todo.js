const express = require('express');

const app = express();

let array = []
app.get('/',(req,res)=>{
    res.send(`<h1>this is home page</h1>`);
})

app.get('/data',(req,res)=>{
    res.send(`The data is \n${array}`)
})

app.get('/data/:id',(req,res)=>{
    res.send(`the data of given index is ${array[req.params.id]}`);
})

app.post('/data/add/:sname',(req,res)=>{
    array.push(req.params.sname);
    res.send(`after adding data the data is ${array}`);
})

app.delete('/data/delete/:dId',(req,res)=>{
    array.splice(req.params.dId);
    res.send(`after delete data is ${array}`);
})

app.patch('/data/update/:oldId/:newdata',(req,res)=>{
    array[req.params.oldId] = req.params.newdata;
    res.send(`updated data is ${array}`);
})

app.listen(3000,()=>{
    console.log("server started at localhost:3000");
})
