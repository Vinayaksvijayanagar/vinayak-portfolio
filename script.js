// -------------------- Animated Particles Background --------------------
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.7,
    speedY: (Math.random() - 0.5) * 0.7,
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
// -------------------- 3D Parallax Scroll Effect --------------------
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".parallax").forEach((el, index) => {
    const depth = (index + 1) * 0.25;
    el.style.transform = `translateY(${scrollY * depth * 0.03}px)`;
  });
});


// 3D tilt effect for cards
document.querySelectorAll('.tilt-card').forEach((card) => {
  const intensity = 10; // degrees

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside the element
    const y = e.clientY - rect.top; // y position inside the element

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * intensity;
    const rotateX = -((y - midY) / midY) * intensity;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(0)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
// ---------------- Neon Cursor Trail ----------------
document.addEventListener("mousemove", (e) => {
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  document.body.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 600);
});
// ---------------- 3D Tilt on Project Cards ----------------
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






