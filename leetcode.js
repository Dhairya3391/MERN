nums = [10, 2];
foo = (nums) =>
  nums
    .map(String)
    .sort((a, b) => b + a - (a + b))
    .join("");
console.log(foo(nums));
