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
    productItem.innerHTML = `<div class="product-image"></div><div class="product-name">${product.name}</div><div class="product-price">Rs. ${product.price}</div>`;
    productItem.className = "product-card";
    const qunatityInput = document.createElement("input");
    qunatityInput.type = "number";
    qunatityInput.min = "1";
    qunatityInput.value = "1";
    product.quantity = parseInt(qunatityInput.value);
    qunatityInput.addEventListener("change", () => {
      const quantity = parseInt(qunatityInput.value);
      product.quantity = quantity;
    });

    productItem.setAttribute("id", `product-${product.id}`);
    const productImage = productItem.querySelector(".product-image");
    productImage.innerHTML = `<img class="productImage" src="${product.name}.jpg" alt="${product.name}">`;
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(product));

    productItem.appendChild(qunatityInput);
    productItem.appendChild(addBtn);
    productList.appendChild(productItem);
  });
}
function addToCart(product) {
    if(cart.some((item) => item.id === product.id)) {
        item = cart.find((item) => item.id === product.id);
        item.quantity += product.quantity;
    } else{
        cart.push({ ...product});
    }
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
  saveTolocalStorage();
}
function removeFromCart(product) {
  cart = cart.filter((item) => item.id !== product.id);
  displayCart();
  calculateTotal();
  saveTolocalStorage();
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
