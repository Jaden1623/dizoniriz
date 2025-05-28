document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded!");
});

  function addToCart(itemName) {
    // Save selected item to localStorage (optional)
    localStorage.setItem("selectedItem", itemName);

    // Redirect to add to cart page
    window.location.href = "addtocart.html";
  }
     const item = localStorage.getItem("selectedItem");
    document.getElementById("cartItem").textContent = item ? item : "No item in cart.";

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName) {
  cart.push(itemName);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${itemName} added to cart.`);
  window.location.href = 'cart.html'; // optional redirect
}


function buyNow(itemName) {
  localStorage.setItem('buyItem', itemName);
  window.location.href = 'buy.html'; // <-- redirects to buy page
}


function loadCartItems() {
  const cartContainer = document.getElementById('cart-items');
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  if (storedCart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cartContainer.innerHTML = '<ul>' + storedCart.map(item => `<li>${item}</li>`).join('') + '</ul>';
  }
}

function loadBuyItem() {
  const item = localStorage.getItem('buyItem');
  const container = document.getElementById('buy-item');
  if (item) {
    container.innerHTML = `<h2>You're buying: ${item}</h2><p>Complete your payment details here.</p>`;
  } else {
    container.innerHTML = '<p>No item selected for purchase.</p>';
  }
}

// Select the container holding testimonial cards
const testimonialGrid = document.querySelector('.testimonial-grid');

// How many pixels to scroll each step
const scrollAmount = 320; // width of one testimonial + gap approx

// Time between auto scrolls (ms)
const scrollInterval = 4000;

// Store interval ID so we can clear it on user interaction
let autoScrollInterval;

// Function to scroll the testimonials one card to the right
function scrollTestimonials() {
  if (!testimonialGrid) return;

  // Scroll smoothly by scrollAmount pixels
  testimonialGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  // If we've reached the end, reset to start
  // Check if we are near the maximum scrollLeft
  if (testimonialGrid.scrollLeft + testimonialGrid.clientWidth >= testimonialGrid.scrollWidth) {
    setTimeout(() => {
      testimonialGrid.scrollTo({ left: 0, behavior: 'smooth' });
    }, 1000);
  }
}

// Start auto scrolling on page load
function startAutoScroll() {
  autoScrollInterval = setInterval(scrollTestimonials, scrollInterval);
}

// Pause auto scrolling when user interacts
function pauseAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Resume auto scrolling after delay
function resumeAutoScroll() {
  clearInterval(autoScrollInterval);
  setTimeout(startAutoScroll, 3000);
}

// Start auto scroll when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  startAutoScroll();

  // Pause scrolling on mouse enter & resume on mouse leave
  testimonialGrid.addEventListener('mouseenter', pauseAutoScroll);
  testimonialGrid.addEventListener('mouseleave', resumeAutoScroll);

  // Also pause on touch start for mobile devices
  testimonialGrid.addEventListener('touchstart', pauseAutoScroll);
  testimonialGrid.addEventListener('touchend', resumeAutoScroll);
});

