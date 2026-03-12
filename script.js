let productArray = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1500.69,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 24999.99,
  },
  {
    id: 3,
    name: "Laptop",
    price: 55000.01,
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 3200.34,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 2800.43,
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
    productItem.innerHTML = `<div class="product-image"></div><div class="product-name">${product.name}</div><div class="product-price">Rs. ${product.price.toFixed(2)}</div>`;
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
  if (cart.some((item) => item.id === product.id)) {
    item = cart.find((item) => item.id === product.id);
    item.quantity += product.quantity;
  } else {
    cart.push({ ...product });
  }
  saveTolocalStorage();
  displayCart();
  calculateTotal();
}

function displayCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      const cartImg = document.createElement("div");
      cartImg.innerHTML = `<img class="productImage" src="${item.name}.jpg" alt="${item.name}" width="100px" height="100px">`;
      const text = document.createElement("span");
      text.textContent = `${item.name} - Rs. ${item.price.toFixed(2)} x ${item.quantity} = Rs. ${ (item.price * item.quantity).toFixed(2) }`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => removeFromCart(item));
      cartItem.appendChild(cartImg);
      cartItem.appendChild(text);
      cartItem.appendChild(removeBtn);

      cartList.appendChild(cartItem);
      calculateTotal();
    });
  }
}
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total").textContent = `Total: Rs ${total.toFixed(2)}`;
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
    product.name.toLowerCase().includes(query),
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
