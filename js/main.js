// Initialize canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball objects
let balls = [];

// Ball constructor
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    // Draw the ball
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    // Update ball position
    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

// Create two balls
for (let i = 0; i < 10; i++) {
    let radius = 30;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 8; // Speed in x direction
    let dy = (Math.random() - 0.5) * 8; // Speed in y direction
    let color = '#fff'; // White color

    balls.push(new Ball(x, y, dx, dy, radius, color));
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ball.update();
    }
}

// Start animation
animate();

// Resize canvas on window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});