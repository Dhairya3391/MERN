let arr = new Set();

for (let i = 0; i <= 1000; i++) {
    if (i % 2 === 0 || i % 3 === 0 || i % 5 === 0) {
        arr.add(i);
    }
}

let newArray = [...arr];

console.log(newArray);
console.log(newArray.length);
