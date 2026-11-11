
async function loadProducts() {
    const response = await fetch("http://localhost:3000/api/products");

    const products = await response.json();

    const container = document.getElementById("products-container");

    container.innerHTML = "";

    products.forEach((product) => {
        container.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
            </div>
        `;
    });
}


const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;

    const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            price: price
        })
    });

    if (response.ok) {
        productForm.reset();
        loadProducts();
    }
});


loadProducts();
