const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

let color = [
  "#6C4AB6", // Primary accent (soft violet)
  "#E8E8E8", // Light neutral (soft gray)
  "#FF9F9F", // Warm accent (peach)
  "#A7C5EB", // Cool accent (sky blue)
  "#4A4A4A", // Dark text/contrast
  "#F5F5F5", // Off-white background
  "#D3D3D3", // Medium neutral (silver)
  "#FFF5E4", // Warm background (creamy white)
];

if (localStorage.getItem("theme") === "dark") {
  color = [
    `#000000`,
    "#222222",
    "#27292d",
    "#444444",
    "#111111",
    "#334443",
    "#191919",
    "#e7e3d3",
  ];
}

moon.addEventListener("click", (e) => {
  color = [
    `#000000`,
    "#222222",
    "#27292d",
    "#444444",
    "#111111",
    "#334443",
    "#191919",
    "#e7e3d3",
  ];
  updateBodyColors();
});

sun.addEventListener("click", (e) => {
  color = [
    `#6d33a7`,
    "#797575",
    "#999999",
    "#999999",
    "#888888",
    "#333333",
    "#555555",
    "#666666",
  ];
  updateBodyColors();
});

var canvas = document.querySelector("#wrapper-canvas");

var dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

Matter.use("matter-attractors");
Matter.use("matter-wrap");

function runMatter() {
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies;

  var engine = Matter.Engine.create();
  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  var render = Matter.Render.create({
    element: canvas,
    engine: engine,
    options: {
      showVelocity: false,
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: "transparent",
    },
  });

  var runner = Matter.Runner.create();
  var world = engine.world;
  world.gravity.scale = 0;

  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
    {
      render: {
        fillStyle: color[0],
        strokeStyle: color[0],
        lineWidth: 0,
      },
      isStatic: true,
      colorData: { fill: 0, stroke: 0 },
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    },
  );

  World.add(world, attractiveBody);

  for (var i = 0; i < 60; i += 1) {
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let s =
      Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
    let poligonNumber = Common.random(3, 6);

    var body = Bodies.polygon(x, y, poligonNumber, s, {
      mass: s / 20,
      friction: 0,
      frictionAir: 0.02,
      angle: Math.round(Math.random() * 360),
      render: {
        fillStyle: color[1],
        strokeStyle: color[0],
        lineWidth: 2,
      },
      colorData: { fill: 1, stroke: 0 },
    });
    World.add(world, body);

    let r = Common.random(0, 1);
    let fillIndex1 = r > 0.3 ? 2 : 3;
    var circle1 = Bodies.circle(x, y, Common.random(2, 8), {
      mass: 0.1,
      friction: 0,
      frictionAir: 0.01,
      render: {
        fillStyle: color[fillIndex1],
        strokeStyle: color[0],
        lineWidth: 2,
      },
      colorData: { fill: fillIndex1, stroke: 0 },
    });
    World.add(world, circle1);

    let fillIndex2 = r > 0.3 ? 5 : 1;
    var circle2 = Bodies.circle(x, y, Common.random(2, 20), {
      mass: 6,
      friction: 0,
      frictionAir: 0,
      render: {
        fillStyle: color[fillIndex2],
        strokeStyle: color[4],
        lineWidth: 4,
      },
      colorData: { fill: fillIndex2, stroke: 4 },
    });
    World.add(world, circle2);

    var circle3 = Bodies.circle(x, y, Common.random(2, 30), {
      mass: 0.2,
      friction: 0.6,
      frictionAir: 0.8,
      render: {
        fillStyle: color[6],
        strokeStyle: color[4],
        lineWidth: 3,
      },
      colorData: { fill: 6, stroke: 4 },
    });
    World.add(world, circle3);
  }

  var mouse = Matter.Mouse.create(render.canvas);

  Matter.Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) return;
    Matter.Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.12,
      y: (mouse.position.y - attractiveBody.position.y) * 0.12,
    });
  });

  let data = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    play: function () {
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    },
  };

  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);
  return data;
}

function updateBodyColors() {
  let bodies = Matter.Composite.allBodies(m.engine.world);
  for (let body of bodies) {
    if (body.colorData) {
      body.render.fillStyle = color[body.colorData.fill];
      body.render.strokeStyle = color[body.colorData.stroke];
    }
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setWindowSize() {
  let dimensions = {};
  dimensions.width = window.innerWidth;
  dimensions.height = window.innerHeight;
  m.render.canvas.width = window.innerWidth;
  m.render.canvas.height = window.innerHeight;
  return dimensions;
}

let m = runMatter();
setWindowSize();

window.addEventListener("resize", debounce(setWindowSize, 250));
