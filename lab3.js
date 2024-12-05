const path = require('path')
const fs = require('fs')

fs.exists('portfolioo', (err)=>{
    console.log(err ? "exists" : "doesnt exists")
})
fs.exists('portfolio', (err)=>{
    console.log(err ? "exists" : "doesnt exists")
})
fs.writeFileSync('testfs.js','787',(err)=>{})
fs.renameSync('testfs.js','testfs2.js',(err)=>{})
fs.unlinkSync('testfs2.js',(err)=>{})


let base = path.basename('something/foo.js')
let dir = path.dirname('something/foo.js')
let ext = path.extname('something/foo.js')
console.log("basename:",base,"dirname:",dir,"extention name:", ext)