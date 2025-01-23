// //prime range

// function isPrime(n) {
//   if (n < 2) {
//     return false;
//   }
//   for (let i = 2; i <= n; i++) {
//     if (n % i === 0) {
//       return false;
//     }
//     return true;
//   }
// }

// function primeRange(n) {
//   let primes = [];
//   for (let i = 2; i <= n; i++) {
//     if (isPrime(i)) {
//       primes.push(i);
//     }
//   }
//   return primes;
// }

// console.log(primeRange(10));

// function primeRange(n) {
//   if (n < 2) return [];
//   const bits = new Uint32Array(Math.ceil((n + 1) / 32));
//   bits.fill(0xffffffff);
//   bits[0] &= ~3;
//   for (let i = 2; i * i <= n; i++) {
//     if ((bits[i >> 5] & (1 << (i & 31))) !== 0) {
//       for (let j = i * i; j <= n; j += i) {
//         bits[j >> 5] &= ~(1 << (j & 31));
//       }
//     }
//   }
//   const primes = [];
//   for (let i = 2; i <= n; i++) {
//     if ((bits[i >> 5] & (1 << (i & 31))) !== 0) {
//       primes.push(i);
//     }
//   }
//   return primes;
// }

// console.log(primeRange(300));


