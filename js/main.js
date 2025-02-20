// Cart functionality
let cart = [];

function addToCart(product) {
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  // Animation for cart update
  gsap.to('.cart-icon', {
    scale: 1.2,
    duration: 0.2,
    yoyo: true,
    repeat: 1
  });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const product = {
        name: card.querySelector('h3').textContent,
        price: card.querySelector('p').textContent,
        image: card.querySelector('img').src
      };
      addToCart(product);
    });
  });
});