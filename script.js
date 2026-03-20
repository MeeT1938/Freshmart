const products = [
    // --- GRAINS (ઈમેજીસ images/ ફોલ્ડરમાં હોવી જોઈએ) ---
    { id: 1, name: "Basmati Rice", price: 450, category: "grain", img: "rise.jpg" },
    { id: 2, name: "Wheat Flour (Atta)", price: 380, category: "grain", img: "atta.jpg" },
    { id: 3, name: "Toor Dal", price: 160, category: "grain", img: "toor.jpg" },
    { id: 4, name: "Moong Dal", price: 140, category: "grain", img: "moong.jpg" },
    { id: 5, name: "Chana Dal", price: 90, category: "grain", img: "chana.jpg" },

    // --- DAIRY ---
    { id: 6, name: "Full Cream Milk", price: 66, category: "dairy", img: "milk.jpg" },
    { id: 7, name: "Amul Butter", price: 55, category: "dairy", img: "butter.jpg" },
    { id: 8, name: "Fresh Paneer", price: 100, category: "dairy", img: "paneer.jpg" },
    { id: 9, name: "Curd (Dahi)", price: 40, category: "dairy", img: "dahi.jpg" },
    { id: 10, name: "Cheese Slices", price: 150, category: "dairy", img: "cheese.jpg" },

    // --- SNACKS ---
    { id: 11, name: "Potato Chips", price: 20, category: "snack", img: "chips.jpg" },
    { id: 12, name: "Maggi Noodles", price: 60, category: "snack", img: "meggi.jpg" },
    { id: 13, name: "Marie Biscuits", price: 30, category: "snack", img: "marri.jpg" },
    { id: 14, name: "Cold Drink", price: 45, category: "snack", img: "coke.jpg" },
    { id: 15, name: "Instant Coffee", price: 120, category: "snack", img: "coffee.jpg" },

    // --- ESSENTIALS ---
    { id: 16, name: "Sunflower Oil", price: 150, category: "daily", img: "oil.jpg" },
    { id: 17, name: "Iodized Salt", price: 25, category: "daily", img: "salt.jpg" },
    { id: 18, name: "Refined Sugar", price: 45, category: "daily", img: "sugar.jpg" },
    { id: 19, name: "Bathing Soap", price: 35, category: "daily", img: "soap.jpg" },
    { id: 20, name: "Tea Leaves", price: 105, category: "daily", img: "tea.jpg" }
];

let cart = JSON.parse(localStorage.getItem('fmart_cart')) || [];

window.onload = () => {
    if (document.getElementById('productList')) renderProducts(products, 'productList');
    if (document.getElementById('cartTable')) renderCart();
};

function renderProducts(items, target) {
    const container = document.getElementById(target);
    if (!container) return;
    
    container.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="images/${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
            <div class="card-info" style="padding:15px;">
                <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${p.name}</h3>
                <p class="price" style="color: #27ae60; font-weight: bold; font-size: 1.2rem;">₹${p.price}</p>
                <button class="cta-btn" onclick="addToCart(${p.id})" style="width: 100%; margin-top: 10px; padding: 10px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// બાકીના ફંક્શન્સ (filter, addToCart, renderCart, removeCart) જૂના જ રાખવાના છે.

function filter(category) {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered, 'productList');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('fmart_cart', JSON.stringify(cart));
    alert(item.name + " added to cart!");
}

function renderCart() {
    const table = document.getElementById('cartTable');
    const totalEl = document.getElementById('cartTotal');
    if (!table) return;

    let total = 0;
    table.innerHTML = `<tr><th>Item</th><th>Price</th><th>Action</th></tr>`;
    cart.forEach((item, index) => {
        total += item.price;
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td><button onclick="removeCart(${index})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Remove</button></td>
            </tr>`;
    });
    if(totalEl) totalEl.innerText = "Total Bill: ₹" + total;
}

function removeCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('fmart_cart', JSON.stringify(cart));
    renderCart();
}