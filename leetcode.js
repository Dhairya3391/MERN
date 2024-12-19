/**
 * @param {number[]} candyType
 * @return {number}
 */
let some = [3, 3, 3];
var distributeCandies = function (candyType) {
  const newSet = new Set(candyType);
  console.log(newSet);
  return Math.floor(candyType.length / 2);
};

console.log(distributeCandies(some));
