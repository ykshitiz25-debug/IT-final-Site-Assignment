// ============================================
// AUTOELITE — MAIN JAVASCRIPT
// ============================================

// ---- IMAGE SLIDER ----
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  if (slides[currentSlide]) slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function moveSlide(dir) {
  showSlide(currentSlide + dir);
  resetAutoSlide();
}

function goSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => moveSlide(1), 5000);
}

// Init slider
if (slides.length > 0) {
  showSlide(0);
  slideInterval = setInterval(() => moveSlide(1), 5000);
}

// ---- RESPONSIVE NAV ----
function toggleNav() {
  const nav = document.querySelector('.main-nav');
  if (nav) nav.classList.toggle('open');
}

// Close nav on link click (mobile)
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.main-nav');
    if (nav) nav.classList.remove('open');
  });
});

// ---- SCROLL ANIMATION ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.car-card, .feature-box, .testi-card, .team-card, .tl-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ---- NEWSLETTER ----
const newsletterBtn = document.querySelector('.newsletter button');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function() {
    const input = this.previousElementSibling;
    if (input && input.value.includes('@')) {
      this.textContent = '✓ Done!';
      input.value = '';
      this.style.background = '#00c853';
    } else if (input) {
      input.style.borderColor = '#e8221a';
      setTimeout(() => input.style.borderColor = '#333', 2000);
    }
  });
}

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});
