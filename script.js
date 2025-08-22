// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('nav');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// --- Simple Carousel (no library) ---
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('[data-carousel-track]');
  const prev  = carousel.querySelector('[data-carousel-prev]');
  const next  = carousel.querySelector('[data-carousel-next]');
  const slides = Array.from(track.children);
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  function go(dir) {
    index = (index + dir + slides.length) % slides.length;
    update();
  }
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  // optional: auto-play
  let timer = setInterval(() => go(1), 4500);
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => timer = setInterval(() => go(1), 4500));
});

// Contact form (demo only)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    msg.textContent = "Thanks! We’ll get back to you soon.";
    form.reset();
  });
}
