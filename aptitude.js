let factors = (num) => {
    let array=[];
    for(let i=1;i<=num;i++){
        if(num%i===0){
            array.push(i)
        }
    }
    return array;
}
let prime = max =>{
    let primes=[];
    for(let num=2;num<=max;num++){
        let isPrime=true;
        for(let i=2;i<num;i++){
            if(num%i===0){
                isPrime=false;
                break;
            }
        }
        if (isPrime){
            primes.push(num);
        }
    }
    return primes.filter(num=>![2,3,5].includes(num));
}
let uglyNum = (number) => {
    let primeFactors = factors(number).filter((factor) => prime(number).includes(factor));
    let isUgly = primeFactors.every((factor) => [2, 3, 5].includes(factor));    
    return isUgly ? 'It is an ugly number' : 'It is not an ugly number';
};
console.log(uglyNum(200));

// function foo(n){
//     for(let i=0;i<n;i++){
//         for(let j=0; j<i; j++){
//             if(i=0){
//                 console.log(j);
//             }
//             else if(i=1){
//                 console.log(j+5);
//             }
//             else if(i=2){
//                 console.log(j+8);
//             }
//         }
//         console.log("\n");
//     }
    
// }
// foo(5)


function printPattern(num) {
    let rows = num;
    for (let i = 1; i <= rows; i++) {
        let currentNumber = i;        
        for (let j = 1; j <= i; j++) {
            process.stdout.write(currentNumber + " ");
            currentNumber += rows - j;
        }        
        console.log();
    }
}
printPattern(5);
