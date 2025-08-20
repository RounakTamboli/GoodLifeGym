// MOBILE NAV TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav-links');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // CONTACT FORM (simple demo)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Thanks! We will get back to you soon.';
      form.reset();
    });
  }

  // COUNTERS (animate numbers on scroll into view)
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const runCounter = (el) => {
      const target = +el.dataset.target;
      const speed = Math.max(20, Math.floor(target / 100)); // simple speed
      let current = 0;
      const tick = () => {
        current += speed;
        if (current >= target) {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = current.toLocaleString();
          requestAnimationFrame(tick);
        }
      };
      tick();
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => io.observe(c));
  }

  // BMI CALCULATOR
  const bmiForm = document.getElementById('bmi-form');
  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const h = document.getElementById('bmi-height').value;
      const w = document.getElementById('bmi-weight').value;
      const out = document.getElementById('bmi-result');
      const heightM = Number(h) / 100;
      const bmi = Number(w) / (heightM * heightM);
      if (!isFinite(bmi)) return;
      let category = 'Normal';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      out.textContent = `BMI: ${bmi.toFixed(1)} (${category})`;
    });
  }

  // BEFORE/AFTER SLIDER
  const baSlider = document.getElementById('ba-slider');
  const baOverlay = document.getElementById('ba-overlay');
  if (baSlider && baOverlay) {
    const updateBA = () => {
      const val = baSlider.value; // 0..100
      baOverlay.style.width = val + '%';
    };
    baSlider.addEventListener('input', updateBA);
    updateBA();
  }

  // SERVICES CAROUSEL (buttons + dots)
  const makeCarousel = (containerSel, dotsSel, prevSel, nextSel) => {
    const container = document.querySelector(containerSel);
    const dotsWrap = document.querySelector(dotsSel);
    const prev = document.querySelector(prevSel);
    const next = document.querySelector(nextSel);
    if (!container) return;

    // Create dots based on number of child cards visible “pages”
    const cardWidth = 300; // approx (min-width + gap)
    const pages = Math.max(1, Math.ceil(container.scrollWidth / cardWidth) - Math.floor(container.clientWidth / cardWidth) + 1);

    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const b = document.createElement('button');
        if (i === 0) b.classList.add('active');
        b.addEventListener('click', () => {
          container.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
          setActiveDot(i);
        });
        dotsWrap.appendChild(b);
      }
    }

    const setActiveDot = (index) => {
      if (!dotsWrap) return;
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === index));
    };

    const getIndex = () => Math.round(container.scrollLeft / cardWidth);

    container.addEventListener('scroll', () => {
      setActiveDot(getIndex());
    });

    if (prev) prev.addEventListener('click', () => {
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', () => {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    // Auto slide (optional)
    let auto = setInterval(() => {
      const i = getIndex();
      const target = i + 1 >= pages ? 0 : i + 1;
      container.scrollTo({ left: target * cardWidth, behavior: 'smooth' });
    }, 3500);

    // Pause on hover (desktop)
    container.addEventListener('mouseenter', () => clearInterval(auto));
    container.addEventListener('mouseleave', () => {
      auto = setInterval(() => {
        const i = getIndex();
        const target = i + 1 >= pages ? 0 : i + 1;
        container.scrollTo({ left: target * cardWidth, behavior: 'smooth' });
      }, 3500);
    });
  };

  // If on services page, initialize
  if (document.getElementById('services-carousel')) {
    makeCarousel('#services-carousel', '#services-dots', '.carousel-btn.prev', '.carousel-btn.next');
  }
});
