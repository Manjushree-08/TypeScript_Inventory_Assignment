"use strict";
/*
 * Moss & Metric
 * Product Inventory Manager
 * Advanced Web Technologies Practical
 */
const initialProducts = [
    {
        id: 1,
        name: "Botanical Notebook",
        price: 180,
        quantity: 12,
        category: "Stationery"
    },
    {
        id: 2,
        name: "Ceramic Coffee Mug",
        price: 450,
        quantity: 4,
        category: "Homeware"
    },
    {
        id: 3,
        name: "Wireless Earbuds",
        price: 1499,
        quantity: 0,
        category: "Electronics"
    },
    {
        id: 4,
        name: "Canvas Tote Bag",
        price: 299,
        quantity: 7,
        category: "Accessories"
    }
];
let products = [...initialProducts];
let nextProductId = 5;
const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
const inventoryValue = document.getElementById("inventory-value");
const lowStockCount = document.getElementById("low-stock-count");
const visibleCount = document.getElementById("visible-count");
const searchInput = document.getElementById("search-input");
const stockFilter = document.getElementById("stock-filter");
const productForm = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const categoryInput = document.getElementById("product-category");
const priceInput = document.getElementById("product-price");
const quantityInput = document.getElementById("product-quantity");
const formMessage = document.getElementById("form-message");
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(amount);
}
function getStockStatus(product) {
    if (product.quantity === 0) {
        return "Out of stock";
    }
    if (product.quantity <= 5) {
        return "Low stock";
    }
    return "In stock";
}
function getStockClass(product) {
    if (product.quantity === 0) {
        return "out";
    }
    if (product.quantity <= 5) {
        return "low";
    }
    return "";
}
function getProductIcon(category) {
    switch (category) {
        case "Stationery":
            return "✎";
        case "Homeware":
            return "☕";
        case "Electronics":
            return "⌘";
        case "Accessories":
            return "◇";
        default:
            return "□";
    }
}
function updateSummary() {
    if (!productCount || !inventoryValue || !lowStockCount) {
        return;
    }
    const totalValue = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const lowStock = products.filter(product => product.quantity > 0 && product.quantity <= 5).length;
    productCount.textContent = String(products.length);
    inventoryValue.textContent = formatCurrency(totalValue);
    lowStockCount.textContent = String(lowStock);
}
function getFilteredProducts() {
    const searchTerm = searchInput?.value.trim().toLowerCase() ?? "";
    const selectedStock = stockFilter?.value ?? "all";
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);
        const matchesStock = selectedStock === "all" ||
            (selectedStock === "available" && product.quantity > 0) ||
            (selectedStock === "out" && product.quantity === 0);
        return matchesSearch && matchesStock;
    });
}
function renderProducts() {
    if (!productList || !visibleCount) {
        return;
    }
    const filteredProducts = getFilteredProducts();
    visibleCount.textContent =
        `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"}`;
    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <div class="empty-state">
                No products found. Try another search or add a product.
            </div>
        `;
        return;
    }
    productList.innerHTML = filteredProducts.map(product => {
        const safeName = escapeHTML(product.name);
        const safeCategory = escapeHTML(product.category);
        const stockStatus = getStockStatus(product);
        const stockClass = getStockClass(product);
        const icon = getProductIcon(product.category);
        return `
            <article class="product-row">
                <div class="product-main">
                    <span class="product-icon" aria-hidden="true">${icon}</span>
                    <div>
                        <span class="product-name">${safeName}</span>
                        <span class="product-category">${safeCategory}</span>
                    </div>
                </div>

                <div class="product-price">
                    <small>Price</small>
                    ${formatCurrency(product.price)}
                </div>

                <div class="product-quantity">
                    <small>Quantity</small>
                    ${product.quantity} units
                    <div>
                        <span class="stock-badge ${stockClass}">
                            ${stockStatus}
                        </span>
                    </div>
                </div>

                <div class="product-actions">
                    <button
                        type="button"
                        class="remove-button"
                        data-remove-id="${product.id}"
                        aria-label="Remove ${safeName}"
                    >
                        Remove
                    </button>
                </div>
            </article>
        `;
    }).join("");
}
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[character] ?? character;
    });
}
function showMessage(message) {
    if (formMessage) {
        formMessage.textContent = message;
    }
}
function addProduct(event) {
    event.preventDefault();
    if (!nameInput ||
        !categoryInput ||
        !priceInput ||
        !quantityInput) {
        showMessage("The product form could not be loaded.");
        return;
    }
    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (!name || !category) {
        showMessage("Please enter a product name and choose a category.");
        return;
    }
    if (!Number.isFinite(price) || price <= 0) {
        showMessage("Price must be a number greater than zero.");
        priceInput.focus();
        return;
    }
    if (!Number.isInteger(quantity) ||
        !Number.isFinite(quantity) ||
        quantity < 0) {
        showMessage("Quantity must be a whole number of zero or more.");
        quantityInput.focus();
        return;
    }
    const newProduct = {
        id: nextProductId++,
        name,
        price,
        quantity,
        category
    };
    products.push(newProduct);
    productForm?.reset();
    showMessage(`${name} was added successfully.`);
    updateSummary();
    renderProducts();
}
function removeProduct(id) {
    const productToRemove = products.find(product => product.id === id);
    if (!productToRemove) {
        return;
    }
    products = products.filter(product => product.id !== id);
    showMessage(`${productToRemove.name} was removed.`);
    updateSummary();
    renderProducts();
}
productForm?.addEventListener("submit", addProduct);
searchInput?.addEventListener("input", renderProducts);
stockFilter?.addEventListener("change", renderProducts);
productList?.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }
    const removeButton = target.closest("button[data-remove-id]");
    if (!removeButton) {
        return;
    }
    const id = Number(removeButton.dataset.removeId);
    if (Number.isInteger(id)) {
        removeProduct(id);
    }
});
// Initial display
updateSummary();
renderProducts();
