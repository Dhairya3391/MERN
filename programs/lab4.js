const child_process = require('child_process');
const { createDiffieHellmanGroup } = require('crypto');

child_process.exec('ls',(err,stdout,stderr)=>{
    // console.log(stdout);
    
});

const os = require('os')

let mem = os.totalmem();

// console.log(mem/1024**3);




const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}
const eventEmitter = new EventEmitter();

// eventEmitter.on('greet', (name) => {
//   console.log(`Hello, ${name}!`);
// });

// eventEmitter.emit('greet', 'Dhairya');

// eventEmitter.on('farewell', (name) => {
//   console.log(`Goodbye, ${name}!`);
// });

// eventEmitter.emit('farewell', 'Dhairya');

// let called = someone =>{
//     console.log(someone,"called");
// }

// eventEmitter.on('call',(someone)=>{
//     called(someone);
// })

// eventEmitter.emit('call', 'harpal')

// let foo = bar => { console.log(bar,"happened"); }

// eventEmitter.on('baz',(bax)=>{foo(bax)})
// eventEmitter.emit('baz','coding')

eventEmitter.on('some',(idk)=>{
  console.log(idk);
})

eventEmitter.emit('some','hello')