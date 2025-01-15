// Get the canvas and set its dimensions
const canvas = document.getElementById('meteorCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas width and height to match the header's size
canvas.width = window.innerWidth;
canvas.height = 200; // Fixed height for the banner

// Meteor properties
const meteors = [];
const meteorCount = 100;
const colors = ['#ffffff', '#ffcc99', '#ccffff', '#ff6666'];

// Create meteors
class Meteor {
  constructor(x, y, size, speed, angle, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.angle = angle;
    this.color = color;
  }

  // Draw the meteor
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.size * Math.cos(this.angle),
      this.y - this.size * Math.sin(this.angle)
    );
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size; // Make the meteor's stroke thicker
    ctx.stroke();
  }

  // Update the meteor's position
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    // Reset meteor position if it goes out of bounds
    if (
      this.x < -50 ||
      this.y > canvas.height + 50 ||
      this.x > canvas.width + 50
    ) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -50;
      this.size = Math.random() * 5 + 5; // Increase the size range (from 5 to 10)
      this.speed = Math.random() * 5 + 3; // Increase speed slightly
      this.angle = Math.random() * (Math.PI / 4) + Math.PI / 4; // 45°-90°
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }
}

// Initialize meteors
function initMeteors() {
  for (let i = 0; i < meteorCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 5 + 5; // Increased size range
    const speed = Math.random() * 5 + 3;
    const angle = Math.random() * (Math.PI / 4) + Math.PI / 4; // 45°-90°
    const color = colors[Math.floor(Math.random() * colors.length)];
    meteors.push(new Meteor(x, y, size, speed, angle, color));
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  meteors.forEach((meteor) => {
    meteor.draw();
    meteor.update();
  });

  requestAnimationFrame(animate);
}

// Resize canvas when the window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
});

// Start the animation
initMeteors();
animate();
