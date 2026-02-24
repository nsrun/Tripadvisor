
// DOM Elements
const header = document.querySelector('header');
const cards = document.querySelectorAll('.card');
const categoryBtns = document.querySelectorAll('.category-item');

// 1. Header Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 2. Scroll Reveal System
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Reveal existing elements
  const elementsToReveal = document.querySelectorAll('.reveal, .card, .section-header, .footer-col');
  elementsToReveal.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger cards in the grid
    if (el.classList.contains('card')) {
      el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }
    revealObserver.observe(el);
  });
});

// 3. Filter Functionality (Optimized)
function filterSelection(c, element) {
  if (c === "all") c = "";

  // Update active button
  categoryBtns.forEach(btn => btn.classList.remove("active"));
  if (element) element.classList.add("active");

  cards.forEach(card => {
    const category = card.dataset.category || "";
    if (category.includes(c) || c === "") {
      card.style.display = "block";
      // Re-trigger reveal animation for newly shown items
      setTimeout(() => {
        card.classList.add('active');
      }, 10);
    } else {
      card.style.display = "none";
      card.classList.remove('active');
    }
  });
}

// 4. Rating Functionality (Review Page)
function rate(n) {
  const stars = document.querySelectorAll('.star-rating i');
  stars.forEach((star, index) => {
    if (index < n) {
      star.classList.replace('fa-regular', 'fa-solid');
      star.style.color = '#34E0A1';
      star.style.transform = 'scale(1.2)';
      setTimeout(() => star.style.transform = 'scale(1)', 200);
    } else {
      star.classList.replace('fa-solid', 'fa-regular');
      star.style.color = '#ccc';
    }
  });
}
// 5. Mobile Menu Toggle
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');

  // Toggle hamburger icon if needed
  const menuBtn = document.querySelector('.hamburger-menu i');
  if (nav.classList.contains('active')) {
    menuBtn.classList.replace('fa-bars', 'fa-xmark');
  } else {
    menuBtn.classList.replace('fa-xmark', 'fa-bars');
  }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('nav');
  const menuBtn = document.querySelector('.hamburger-menu');

  if (nav.classList.contains('active') &&
    !nav.contains(e.target) &&
    !menuBtn.contains(e.target)) {
    toggleMenu();
  }
});

// 6. Budget Calculator Logic
function calculateBudget() {
  const duration = parseFloat(document.getElementById('duration')?.value) || 0;
  const accommodation = parseFloat(document.getElementById('accommodation')?.value) || 0;
  const food = parseFloat(document.getElementById('food')?.value) || 0;
  const activities = parseFloat(document.getElementById('activities')?.value) || 0;

  const totalAcc = duration * accommodation;
  const totalFood = duration * food;
  const totalAct = activities;
  const grandTotal = totalAcc + totalFood + totalAct;

  // Update UI
  if (document.getElementById('total-cost')) {
    document.getElementById('total-cost').innerText = grandTotal.toLocaleString();
    document.getElementById('breakdown-acc').innerText = totalAcc.toLocaleString();
    document.getElementById('breakdown-food').innerText = totalFood.toLocaleString();
    document.getElementById('breakdown-act').innerText = totalAct.toLocaleString();
  }
}
