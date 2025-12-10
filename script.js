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
