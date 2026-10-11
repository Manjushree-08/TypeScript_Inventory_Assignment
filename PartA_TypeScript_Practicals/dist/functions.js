"use strict";
/*
 * Advanced Web Technologies
 * Practical: Functions and Scope
 */
// 1. Calculate discount with a default discount of 10%
function calculateDiscount(price, discountPercent = 10) {
    return price - (price * discountPercent / 100);
}
console.log("Default 10% discount:", calculateDiscount(1000));
console.log("Custom 20% discount:", calculateDiscount(1000, 20));
// 2. Apply bulk discount using map()
const productPrices = [500, 1000, 1500, 2000];
function applyBulkDiscount(prices) {
    return prices.map(price => calculateDiscount(price, 10));
}
console.log("Original prices:", productPrices);
console.log("Prices after bulk discount:", applyBulkDiscount(productPrices));
// 3. Demonstrate block scope using let
for (let i = 1; i <= 3; i++) {
    console.log("Loop iteration:", i);
}
// The variable i exists only inside the loop.
// Uncommenting the next line would cause a TypeScript error:
// console.log(i);
