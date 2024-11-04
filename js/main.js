import World from "./classes/World.js";

function regen() {
  const world = new World(40, 40);
  world.initWorld();
  world.render();
}

regen();

document.querySelector('.regenButton').addEventListener("click", () => {
  regen();
});
