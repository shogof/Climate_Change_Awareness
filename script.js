// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1500);
});

// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorTrail = document.querySelector(".cursor-trail");

if (cursor && cursorTrail) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorTrail.style.left = e.clientX + "px";
      cursorTrail.style.top = e.clientY + "px";
    }, 80);
  });

  const hoverElements = document.querySelectorAll(
    "a, button, .btn-primary, .action-card, .stat-item"
  );
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)";
      cursorTrail.style.transform = "scale(1.5)";
      cursorTrail.style.opacity = "0.8";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursorTrail.style.transform = "scale(1)";
      cursorTrail.style.opacity = "0.5";
    });
  });
}

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");

    const burger = document.querySelector(".menu-btn__burger");
    if (menuBtn.classList.contains("active")) {
      burger.style.transform = "rotate(45deg)";
      burger.style.background = "transparent";
      burger.style.background = "transparent";
    } else {
      burger.style.transform = "rotate(0)";
    }
  });
}

// Close mobile menu on link click
document.querySelectorAll(".nav-link, .nav-join").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn?.classList.remove("active");
    navLinks?.classList.remove("active");
  });
});

// Counter Animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const update = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  update();
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseFloat(element.getAttribute("data-target"));
        if (!isNaN(target) && !element.classList.contains("animated")) {
          element.classList.add("animated");
          animateCounter(element, target);
        }
        counterObserver.unobserve(element);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll("[data-target]").forEach((el) => {
  counterObserver.observe(el);
});

// Progress Bar Animation
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const bar = card.querySelector(".impact-bar");
        const number = card.querySelector(".impact-number");

        if (bar && number) {
          const target = parseFloat(number.getAttribute("data-target"));
          let percentage = 0;

          if (card.classList.contains("impact-card")) {
            const maxValues = {
              ".impact-card:first-child": 2000000,
              ".impact-card:nth-child(2)": 3000,
              ".impact-card:nth-child(3)": 300,
              ".impact-card:last-child": 1000000,
            };

            const index = Array.from(card.parentNode.children).indexOf(card);
            const max = [2000000, 3000, 300, 1000000][index];
            percentage = Math.min((target / max) * 100, 100);
          }

          setTimeout(() => {
            bar.style.width = percentage + "%";
          }, 300);
        }
        progressObserver.unobserve(card);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".impact-card").forEach((el) => {
  progressObserver.observe(el);
});

// Countdown Timer
function updateCountdown() {
  const targetDate = new Date("2030-01-01T00:00:00");
  const now = new Date();
  const diff = targetDate - now;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("years").textContent = String(years).padStart(2, "0");
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Form Submission
const form = document.getElementById("signupForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("formMessage");

    if (!name || !email || !country) {
      message.innerHTML = "❌ Please fill in all fields";
      message.style.color = "#e74c3c";
    } else if (!email.includes("@") || !email.includes(".")) {
      message.innerHTML = "❌ Please enter a valid email address";
      message.style.color = "#e74c3c";
    } else {
      message.innerHTML =
        "✅ Welcome, " +
        name +
        "! You are now a Climate Warrior. Check your email.";
      message.style.color = "#2ecc71";
      form.reset();
    }
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".stat-item, .action-card, .impact-card"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(30px)";
        entry.target.style.transition =
          "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)";
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Particle Effect (simple)
const particlesContainer = document.getElementById("particles");
if (particlesContainer) {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.background = "rgba(46,204,113,0.3)";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${
      5 + Math.random() * 10
    }s linear infinite`;
    particle.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${
          Math.random() * 100 - 50
        }px); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log("🌍 Youth Climate Network — The movement is ready. Join us!");
