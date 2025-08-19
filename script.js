let products = [
    { id: 1, name: "Wood Plank", addons: "Delivery", quantity: 2, price: 80 },
    { id: 3, name: "Steel Rod", addons: "Installation", quantity: 3, price: 452 },
    { id: 4, name: "Roof Tile", addons: "Delivery", quantity: 8, price: 652 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.getElementById("productCards");
    const cartItems = document.getElementById("cartItems");
    const productForm = document.getElementById("productForm");
    const customerForm = document.getElementById("customerForm");
    const receipt = document.getElementById("receipt");

    if (productCards) {
        productCards.innerHTML = "";
        products.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${p.name}</h3>
                <p><strong>Add-ons:</strong> ${p.addons}</p>
                <p><strong>Quantity:</strong> ${p.quantity}</p>
                <p><strong>Price:</strong> RM ${p.price}</p>
                <button onclick="addToCart(${p.id})">Order</button>
            `;
            productCards.appendChild(card);
        });
    }

    if (cartItems) {
        renderCart(cartItems);
    }

    if (productForm) {
        productForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const newProduct = {
                id: parseInt(document.getElementById("productID").value),
                name: document.getElementById("productName").value,
                addons: document.getElementById("addons").value,
                quantity: parseInt(document.getElementById("quantity").value),
                price: parseFloat(document.getElementById("price").value)
            };
            const index = products.findIndex(p => p.id === newProduct.id);
            if (index !== -1) {
                products[index] = newProduct;
            }
            alert("Product updated!");
            productForm.reset();
        });
    }

    if (customerForm) {
        customerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("custName").value;
            const email = document.getElementById("custEmail").value;
            const address = document.getElementById("custAddress").value;
            receipt.innerHTML = `
                <h3>Receipt</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Address:</strong> ${address}</p>
                <h4>Ordered Items:</h4>
                <ul>${cart.map(item => `<li>${item.name} - RM ${item.price}</li>`).join("")}</ul>
                <p><strong>Total:</strong> RM ${cart.reduce((sum, i) => sum + i.price, 0)}</p>
            `;
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            customerForm.reset();
            document.getElementById("cartItems").innerHTML = "";
        });
    }
});

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
}

function renderCart(container) {
    container.innerHTML = cart.length ? cart.map(item => `
        <p>${item.name} - RM ${item.price}</p>
    `).join("") : "<p>Your cart is empty.</p>";
}
