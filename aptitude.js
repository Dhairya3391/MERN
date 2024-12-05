// let factors = (num) => {
//   let array = [];
//   for (let i = 1; i <= num; i++) {
//     if (num % i === 0) {
//       array.push(i);
//     }
//   }
//   return array;
// };
// let prime = (max) => {
//   let primes = [];
//   for (let num = 2; num <= max; num++) {
//     let isPrime = true;
//     for (let i = 2; i < num; i++) {
//       if (num % i === 0) {
//         isPrime = false;
//         break;
//       }
//     }
//     if (isPrime) {
//       primes.push(num);
//     }
//   }
//   return primes.filter((num) => ![2, 3, 5].includes(num));
// };

// let uglyNum = (number) => {
//   let primeFactors = factors(number).filter((factor) =>
//     prime(number).includes(factor),
//   );
//   let isUgly = primeFactors.every((factor) => [2, 3, 5].includes(factor));
//   return isUgly ? "It is an ugly number" : "It is not an ugly number";
// };
// // console.log(uglyNum(200));

// let uglyNew = (num) => {
//   let arr = [2, 3, 5];
//   for (let i = 0; i < arr.length; i++) {
//     while (num % arr[i] === 0) {
//       num = num / arr[i];
//     }
//   }
//   return num == 1;
// };

// console.log(uglyNew(14));
// // function foo(n){
// //     for(let i=0;i<n;i++){
// //         for(let j=0; j<i; j++){
// //             if(i=0){
// //                 console.log(j);
// //             }
// //             else if(i=1){
// //                 console.log(j+5);
// //             }
// //             else if(i=2){
// //                 console.log(j+8);
// //             }
// //         }
// //         console.log("\n");
// //     }

// // }
// // foo(5)

// function printPattern(num) {
//   let rows = num;
//   for (let i = 1; i <= rows; i++) {
//     let currentNumber = i;
//     for (let j = 1; j <= i; j++) {
//       process.stdout.write(currentNumber + " ");
//       currentNumber += rows - j;
//     }
//     console.log();
//   }
// }
// // printPattern(5);

// bubblesort = (arr) => {
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < arr.length - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         let temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//         swapped = true;
//       }
//     }
//   } while (swapped);
//   return arr;
// };
// console.log(
//   bubblesort([
//     3, 44, 38, 5, 47, 15, 36, 26, 72, 14, 21047, 27, 2, 46, 4, 19, 50, 48,
//   ]),
// );
// let kthFactor = (n, k) => {
//   arr = [];
//   for (let i = 1; i <= n; i++) {
//     if (n % i == 0) {
//       arr.push(i);
//     }
//   }
//   console.log(arr);
//   arr.sort((a, b) => a - b);
//   console.log(arr.length);
//   if (k - 1 < arr.length) {
//     return arr[k - 1];
//   } else return -1;
// };
// console.log(kthFactor(7, 2));

var isMatch = function (s, p) {
  let sIndex = 0;
  let pIndex = 0;
  let starIdx = -1;
  let sTempIndex = -1;

  while (sIndex < s.length) {
    if (pIndex < p.length && (p[pIndex] === "?" || p[pIndex] === s[sIndex])) {
      sIndex++;
      pIndex++;
    } else if (pIndex < p.length && p[pIndex] === "*") {
      starIdx = pIndex;
      sTempIndex = sIndex;
      pIndex++;
    } else if (starIdx === -1) {
      return false;
    } else {
      pIndex = starIdx + 1;
      sIndex = sTempIndex + 1;
      sTempIndex = sIndex;
    }
  }

  while (pIndex < p.length && p[pIndex] === "*") {
    pIndex++;
  }

  return pIndex === p.length;
};
console.log(isMatch("abc", "a*c")); // true
console.log(isMatch("abc", "?b*")); // true
console.log(isMatch("abc", "a?c")); // true
console.log(isMatch("abc", "ashfiuashf")); // false


let a = 34;
function baz(){
  
}