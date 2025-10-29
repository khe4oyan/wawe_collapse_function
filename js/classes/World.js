import Node from './Node.js';

class World {
  constructor(width, heigth) {
    this.world = [];
    this.createWorld(width, heigth);
  }

  createWorld(width, heigth) {
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
    for (let i = 0; i < this.world.length; ++i) {
      for (let j = 0; j < this.world[i].length; ++j) {
        this.world[i][j].init(this, i, j);
      }
    }
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
        nodeElem.appendChild(nodeData.getImgDOM());

        // render in DOM
        worldDom.appendChild(nodeElem);
      }
    }
  }
}

export default World;
