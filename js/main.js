import World from "./classes/World.js";

function regen() {
  const world = new World(10, 10);
  // const world = new World(1, 1);
  world.initWorld();
  world.render();
}

regen();

document.querySelector('.regenButton').addEventListener("click", () => {
  regen();
});
