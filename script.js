// ===== TYPING ANIMATION =====
const typingText = document.querySelector(".hero-subtitle");
const words = [
  "Aspiring Full Stack Developer",
  "Web Designer",
  "Problem Solver",
  "JavaScript Enthusiast",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 80 : 120;
  setTimeout(type, speed);
}

type();


// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});


// ===== CONTACT FORM =====
async function sendMessage() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const response = document.getElementById("form-response");

  if (!name || !email || !message) {
    response.textContent = "⚠️ Please fill in all fields!";
    response.style.color = "#ff6b6b";
    return;
  }

  response.textContent = "Sending...";
  response.style.color = "#a8a8b3";

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (data.success) {
      response.textContent = `✅ ${data.message}`;
      response.style.color = "#4ecca3";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    } else {
      response.textContent = `❌ ${data.error}`;
      response.style.color = "#ff6b6b";
    }
  } catch (error) {
    response.textContent = "❌ Could not connect to server. Make sure backend is running!";
    response.style.color = "#ff6b6b";
  }
}


// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});