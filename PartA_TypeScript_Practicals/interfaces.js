"use strict";
/*
 * Advanced Web Technologies
 * Practical: Interfaces and Product Management
 */
// 2. Create an array containing four products
const products = [
    {
        productId: 101,
        productName: "Laptop",
        price: 55000,
        quantity: 5,
        category: "Electronics",
        inStock: true
    },
    {
        productId: 102,
        productName: "Headphones",
        price: 1500,
        quantity: 0,
        category: "Accessories",
        inStock: false
    },
    {
        productId: 103,
        productName: "Keyboard",
        price: 2000,
        quantity: 10,
        category: "Accessories",
        inStock: true
    },
    {
        productId: "P104",
        productName: "Monitor",
        price: 12000,
        quantity: 3,
        category: "Electronics",
        inStock: true
    }
];
// 3. Return products that are available
function getAvailableProducts(productList) {
    return productList.filter(product => product.inStock && product.quantity > 0);
}
// 5. Apply a discount to products
function applyDiscountToProducts(productList, discountPercent) {
    return productList.map(product => ({
        ...product,
        discountPercent: discountPercent
    }));
}
// Display the original products
console.log("----- All Products -----");
console.log(products);
// Display available products
console.log("----- Available Products -----");
console.log(getAvailableProducts(products));
// Display discounted products
console.log("----- Products with Discount -----");
console.log(applyDiscountToProducts(products, 10));
