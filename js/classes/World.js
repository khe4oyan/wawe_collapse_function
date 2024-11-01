import Node from "./Node.js";

class World {
  world;

  constructor(width, heigth) {
    this.world = [];

    const worldDom = document.querySelector(".world");
    worldDom.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

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
    this.recursiveWorldInit(0, 0);
  }

  initNode(i, j, nodeInd) {
    if (i < 0 || i >= this.world.length || j < 0 || j >= this.world[0].length) {return;}
    this.world[i][j].init(this.world, i, j, nodeInd);
  }

  recursiveWorldInit(i, j) {
    if (i < 0 || i >= this.world.length || j < 0 || j >= this.world[0].length) {return;}
    if (this.world[i][j].isInited) {return;}

    this.world[i][j].init(this.world, i, j);

    this.recursiveWorldInit(i + 1, j);
    this.recursiveWorldInit(i - 1, j);
    this.recursiveWorldInit(i, j + 1);
    this.recursiveWorldInit(i, j - 1);
  }

  render() {
    document.querySelector(".buttons")?.remove();
    const worldDom = document.querySelector(".world");
    worldDom.innerHTML = '';

    for (let i = 0; i < this.world.length; ++i) {
      for (let j = 0; j < this.world[i].length; ++j) {
        // node DOM element
        const nodeElem = document.createElement("div");
        nodeElem.classList.add("node");

        // node data
        const nodeData = this.world[i][j];
        nodeElem.appendChild(nodeData.getImg());

        // render in DOM
        worldDom.appendChild(nodeElem);
      }
    }
  }
}

export default World;
