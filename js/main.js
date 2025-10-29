import World from "./classes/World.js";

function regen() {
  const w = Math.floor(window.innerWidth / 20) - 1;
  const h = Math.floor(window.innerHeight / 20) - 1;
  const world = new World(w, h);
  world.initWorld();
  world.render();
}

regen();

document.querySelector('.regenButton').addEventListener("click", () => {
  regen();
});
