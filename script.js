// ===== EMAILJS SETUP =====
emailjs.init("KG6EqkjJIeSyGT1kB"); 

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 80);
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(2)';
  follower.style.transform = 'translate(-50%, -50%) scale(0.5)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  follower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right, .service-card, .skill-item, .work-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal-up');
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      let count = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          entry.target.textContent = target;
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(count);
        }
      }, 40);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#f5f5f0';
    }
  });
});

// ===== CONTACT FORM WITH EMAILJS =====
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = 'Please fill in all required fields.';
    statusEl.style.color = '#ff6b6b';
    return;
  }

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  statusEl.textContent = '';

  try {
    await emailjs.send("service_7cpd3xy", "template_bkfye5r", {
      from_name: name,
      from_email: email,
      service_type: service || 'Not specified',
      message: message,
      to_email: "sanjeevrnjnn@gmail.com"
    });

    statusEl.textContent = '✓ Message sent! I will get back to you soon.';
    statusEl.style.color = '#6bff9e';
    form.reset();
  } catch (err) {
    statusEl.textContent = '✗ Something went wrong. Please WhatsApp me directly.';
    statusEl.style.color = '#ff6b6b';
  }

  submitBtn.textContent = 'Send Message →';
  submitBtn.disabled = false;
});