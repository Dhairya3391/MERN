const some = require('express')

const app = some()

app.get('/some',(req,res)=>{
    res.send(`<br>hello world</br>`)
})

app.listen(3000,()=>{
    console.log("some");
    
})

Function(some)