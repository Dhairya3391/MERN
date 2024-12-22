//first Hard question of leetcode i did without help only leaned about approaches like top-down, iterative dynamic programming and all.)

function maxProfit(prices) {
  //base case
  if (prices.length < 2) return 0;

  let maxProfit = 0;
  
  //we track forward max profit for each day here
  //for each day we calculate the maximum profit achievable if we sell on or before that day
  const forwardProfits = [];
  let minPrice = prices[0];
  let maxForwardProfit = 0;

  for (let i = 0; i < prices.length; i++) {
      minPrice = Math.min(minPrice, prices[i]);
      maxForwardProfit = Math.max(maxForwardProfit, prices[i] - minPrice);
      forwardProfits[i] = maxForwardProfit;
  }

  //track backward max profit for each day
  //during this pass we combine the backward profit with the corresponding forward profit from the previous day to simulate two transactions
  let maxPrice = prices[prices.length - 1];
  let maxBackwardProfit = 0;

  for (let i = prices.length - 1; i >= 0; i--) {
      maxPrice = Math.max(maxPrice, prices[i]);
      maxBackwardProfit = Math.max(maxBackwardProfit, maxPrice - prices[i]);

      //combine forward and backward profits
      maxProfit = Math.max(maxProfit, maxBackwardProfit + (forwardProfits[i - 1] || 0));
  }

  return maxProfit;
}