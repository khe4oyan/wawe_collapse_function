import Node from "./Node.js";

class World {
  worlds;
  world;

  constructor() {
    this.worlds = [];
    this.world = [];

    const heigth = 30;
    const width = 40;

    // create world
    for (let i = 0; i < heigth; ++i) {
      const line = [];
      for (let j = 0; j < width; ++j) {
        line.push(new Node());
      }
      this.world.push(line);
    }
  }

  initWorld() {
    // VERSION 1
    const randomI = Math.floor(Math.random() * this.world.length); 
    const randomJ = Math.floor(Math.random() * this.world[0].length)
    this.recursiveWorldInit(randomI, randomJ);

    // VERSION 2
    // this.recursiveWorldInit(0, 0);
  }

  recursiveWorldInit(i, j) {
    if (this.world[i][j].isTouched) {
      return;
    }

    this.world[i][j].init(this.world, i, j);
    this.worlds.push(JSON.parse(JSON.stringify(this.world)));

    try {this.recursiveWorldInit(i + 1, j);} catch (error) {}
    try {this.recursiveWorldInit(i - 1, j);} catch (error) {}
    try {this.recursiveWorldInit(i, j + 1);} catch (error) {}
    try {this.recursiveWorldInit(i, j - 1);} catch (error) {}
  }

  render() {
    document.querySelector(".buttons")?.remove();
    const world = document.querySelector(".world");
    world.innerHTML = '';

    for (let i = 0; i < this.world.length; ++i) {
      for (let j = 0; j < this.world[i].length; ++j) {
        // node DOM element
        const nodeElem = document.createElement("div");
        nodeElem.classList.add("node");

        // node data
        const nodeData = this.world[i][j];
        nodeElem.appendChild(nodeData.getImg());

        // render in DOM
        world.appendChild(nodeElem);
      }
    }
  }
}

export default World;
