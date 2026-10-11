
/*
 * Advanced Web Technologies
 * TypeScript Practical: Inventory System
 */

// 1. Declare variables with specific data types
let productName: string = "Laptop";
let price: number = 55000;
let inStock: boolean = true;
let tags: string[] = ["Electronics", "Computer", "Gadgets"];
let productId: number | string = "PROD101";

// 2. Demonstrate the any type
let flexibleValue: any = "Initial value";
flexibleValue = 100;
flexibleValue = true;

// Safer alternative: use a union type
let safeValue: string | number = "Initial value";
safeValue = 100;
// safeValue = true; // TypeScript error if uncommented

// 3. Function to print product information
function printProductInfo(): void {
    console.log("----- Product Information -----");
    console.log("Product Name:", productName);
    console.log("Price: ₹" + price);
    console.log("In Stock:", inStock);
    console.log("Tags:", tags.join(", "));
    console.log("Product ID:", productId);
    console.log("Flexible Value (any):", flexibleValue);
    console.log("Safe Value:", safeValue);
}

// Call the function
printProductInfo();
