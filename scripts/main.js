let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}


// Create an engine
const engine = Engine.create();

// No acceleration
engine.world.gravity.y = 0.04;

// Create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#87CEEB', // Sky blue color
        wireframes: false // Disable wireframe mode to show images
    }
});

const actualImageWidth = 319
const actualImageHeight = 357

const maxX = window.innerWidth;
const startX = getRandomInt(0, maxX)

// Create a box with an image texture (dynamic body)
const box = Bodies.rectangle(startX, 0, 120, 120, {
    render: {
        sprite: {
            texture: '../img/haggord_basic_transparent.png', // Image URL
            xScale: 120 / actualImageWidth, // Scale the image to fit 80px width
            yScale: 120 / actualImageHeight // Scale the image to fit 80px height
        }
    }
});

const boxHeight = box.bounds.max.y - box.bounds.min.y;
console.log(boxHeight);


// Add the box to the world
Composite.add(engine.world, [box]);

// Set a constant velocity for the box (e.g., 2 pixels per frame)
Matter.Body.setVelocity(box, { x: 0, y: 2 });

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);

// Optional: Add a runner to continuously update the simulation
const runner = Runner.create();
Runner.run(runner, engine);

// Add an event listener to reset the position of the box
Events.on(engine, 'afterUpdate', function() {
    if (box.position.y > window.innerHeight + boxHeight) {
        // Reset the position of the box to the top
        const startX = getRandomInt(0, maxX)
        Matter.Body.setPosition(box, { x: startX, y: 0 });
        // Reset the velocity to make it fall again naturally
        Matter.Body.setVelocity(box, { x: 0, y: 0 });
    }
});

