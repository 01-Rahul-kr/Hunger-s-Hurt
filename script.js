const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Select the form and inputs
const form = document.querySelector(".contact-form form");
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Create feedback message container
const feedback = document.createElement("p");
feedback.style.marginTop = "10px";
feedback.style.textAlign = "center";
form.appendChild(feedback);

// Email validation function
function isValidEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email.toLowerCase());
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    feedback.textContent = "❌ Please fill in all fields.";
    feedback.style.color = "red";
    return;
  }

  if (!isValidEmail(email)) {
    feedback.textContent = "❌ Please enter a valid email.";
    feedback.style.color = "red";
    return;
  }

  feedback.textContent = "✅ Message sent successfully!";
  feedback.style.color = "green";

  form.reset();
});

// add to cart
const addToCartButtons = document.querySelectorAll(".addToCartBtn");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".productItem");
    const name = product.querySelector("h2").innerText;
    const price = parseInt(
      product.querySelector("h4").innerText.replace(/\D/g, "")
    );
    const image = product.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((p) => p.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();
  });
});

// flying effect
document.querySelectorAll(".addToCartBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const productItem = btn.closest(".productItem");
    const img = productItem.querySelector("img");
    const cartIcon = document.getElementById("cartIcon");

    const flyingImg = img.cloneNode(true);
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.zIndex = 1000;
    flyingImg.style.transition = "all 0.8s ease-in-out";
    document.body.appendChild(flyingImg);

    setTimeout(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = 0.5;
    }, 10);

    setTimeout(() => {
      flyingImg.remove();
    }, 900);
  });
});

// add to cart Btn
document.querySelectorAll(".addToCartBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const productText = this.parentElement;
    const quantityControls = productText.querySelector(".quantity-controls");
    const quantitySpan = quantityControls.querySelector(".quantity");

    // If hidden, show controls and initialize quantity
    if (
      quantityControls.style.display === "none" ||
      quantityControls.style.display === ""
    ) {
      quantityControls.style.display = "inline-flex";
      quantitySpan.textContent = 1;
      updateCartCount(1); // Add to cart increases count by 1
    } else {
      // If already visible, just increase quantity
      let currentQty = parseInt(quantitySpan.textContent);
      currentQty++;
      quantitySpan.textContent = currentQty;
      updateCartCount(1);
    }
  });
});

document.querySelectorAll(".increase").forEach((button) => {
  button.addEventListener("click", function () {
    const quantitySpan = this.previousElementSibling;
    let quantity = parseInt(quantitySpan.textContent);
    quantity++;
    quantitySpan.textContent = quantity;
    updateCartCount(1);
  });
});

document.querySelectorAll(".decrease").forEach((button) => {
  button.addEventListener("click", function () {
    const quantitySpan = this.nextElementSibling;
    let quantity = parseInt(quantitySpan.textContent);

    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      updateCartCount(-1);
    } else {
      // Hide quantity controls when quantity becomes 0
      const productText = this.closest(".productText");
      productText.querySelector(".quantity-controls").style.display = "none";
      updateCartCount(-1);
    }
  });
});

function updateCartCount(change) {
  const cartCountElem = document.getElementById("cartCount");
  let count = parseInt(cartCountElem.textContent);
  count += change;
  if (count < 0) count = 0;
  cartCountElem.textContent = count;
}

// For Page animted

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__fadeInUp");
        entry.target.classList.add("animate__animated");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".product, .item, .Outsider, #service")
  .forEach((el) => {
    observer.observe(el);
  });
