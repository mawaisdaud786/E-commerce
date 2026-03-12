let productArray = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1500,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 25000,
  },
  {
    id: 3,
    name: "Laptop",
    price: 55000,
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 3200,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 2800,
  },
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clearBtn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  productList.innerHTML = "";
  productArray.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.innerHTML = `<div class="product-name">${product.name}</div><div class="product-price">Rs. ${product.price}</div>`;
    productItem.className = "product-card";
    productItem.setAttribute("id", `product-${product.id}`);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(product));

    productItem.appendChild(addBtn);
    productList.appendChild(productItem);
  });
}
function addToCart(product) {
  // only allow a product to be added once
  if (cart.some((item) => item.id === product.id)) {
    alert(`${product.name} is already in your cart.`);
    return;
  }

  // always add with quantity 1 (no multiples)
  cart.push({ ...product, quantity: 1 });
  saveTolocalStorage();
  displayCart();
  calculateTotal();
}

function displayCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - Rs. ${item.price} x ${item.quantity} = Rs. ${item.price * item.quantity}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(item));
    cartItem.appendChild(removeBtn);
    cartList.appendChild(cartItem);
    calculateTotal();
  });
}
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total").textContent = `Total: Rs ${total}`;
}
clearBtn.addEventListener("click", clearCart);
function clearCart() {
  cart = [];
  displayCart();
  calculateTotal();
}
function removeFromCart(product) {
  cart = cart.filter((item) => item.id !== product.id);
  displayCart();
  calculateTotal();
}

function saveTolocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const fileredProducts = productArray.filter((product) =>
        product.name.toLowerCase().includes(query)
    );
    productList.innerHTML = "";
    fileredProducts.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.innerHTML = `<div class="product-name">${product.name}</div><div class="product-price">Rs. ${product.price}</div>`;
        productItem.className = "product-card";
        productItem.setAttribute("id", `product-${product.id}`);

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add to Cart";
        addBtn.addEventListener("click", () => addToCart(product));
        productItem.appendChild(addBtn);
        productList.appendChild(productItem);
    });
}
searchInput.addEventListener("input", filterProducts);
displayProducts();
displayCart();
