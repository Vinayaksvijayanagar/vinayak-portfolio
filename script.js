// ================= PARTICLES BACKGROUND =================
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.fillStyle = "rgba(124, 58, 237, 0.8)";
    ctx.shadowColor = "#7c3aed";
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();


// ================= OPTIMIZED PARALLAX =================
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      document.querySelectorAll(".parallax").forEach((el, index) => {
        const depth = (index + 1) * 0.25;
        el.style.transform = `translateY(${scrollY * depth * 0.03}px)`;
      });

      ticking = false;
    });

    ticking = true;
  }
});


// ================= TILT CARD EFFECT =================
document.querySelectorAll(".tilt-card").forEach((card) => {
  const intensity = 10;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * intensity;
    const rotateX = -((y - midY) / midY) * intensity;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
});


// ================= PROJECT 3D TILT =================
document.querySelectorAll(".project-card").forEach((card) => {
  const inner = card.querySelector(".project-card-inner");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / 20) * -1;
    const rotateY = x / 20;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    inner.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});


// ================= OPTIMIZED NEON CURSOR =================
let lastDotTime = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();

  if (now - lastDotTime < 30) return;
  lastDotTime = now;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  document.body.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 500);
});


// ================= FOOTER YEAR =================
document.getElementById("year").textContent =
  new Date().getFullYear();


// ================= FADE-IN SECTIONS =================
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section").forEach((section) => {
  fadeObserver.observe(section);
});


// ================= GITHUB COUNTER ANIMATION =================
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;

  let current = start;
  const range = end - start;
  const increment = range / (duration / 16);

  function update() {
    current += increment;

    if (current >= end) {
      obj.textContent = end.toLocaleString();
      return;
    }

    obj.textContent = Math.floor(current).toLocaleString();
    requestAnimationFrame(update);
  }

  update();
}

const githubSection = document.getElementById("github");

if (githubSection) {
  const githubObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue("contribCount", 0, 3657, 2000);
          animateValue("streakCount", 0, 306, 2000);
          githubObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  githubObserver.observe(githubSection);
}
