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

eventEmitter.emit('call', 'harpal')

let foo = bar => { console.log(bar,"happened"); }

eventEmitter.on('baz',(bax)=>{foo(bax)})

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr.shift();
  const left = arr.filter((el) => el < pivot);
  const right = arr.filter((el) => el >= pivot);
  return quickSort(left).concat(pivot, quickSort(right));
};

TraditionalquickSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const TraditionalquickSort = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      quickSort(arr, low, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
  };
  
  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

eventEmitter.emit('baz','coding')