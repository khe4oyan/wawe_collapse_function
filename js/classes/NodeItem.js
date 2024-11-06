import NodeChance from './NodeChance.js';

class NodeItem {
  img;
  top;
  right;
  bottom;
  left;

  constructor(img) {
    this.img = img;
    this.top = [];
    this.right = [];
    this.bottom = [];
    this.left = [];
  }

  #addVariant(variants, nodeInd, dropChance) {
    variants.push(new NodeChance(nodeInd, dropChance));
    return this;
  }

  addChanceAll(nodeInd, dropChance = 50) {
    this.#addVariant(this.top, nodeInd, dropChance);
    this.#addVariant(this.right, nodeInd, dropChance);
    this.#addVariant(this.bottom, nodeInd, dropChance);
    this.#addVariant(this.left, nodeInd, dropChance);
    return this;
  }
 
  addChanceTop(nodeInd, dropChance = 50) {
    this.#addVariant(this.top, nodeInd, dropChance);
    return this;
  }
  addChanceRight(nodeInd, dropChance = 50) {
    this.#addVariant(this.right, nodeInd, dropChance);
    return this;
  }
  addChanceBottom(nodeInd, dropChance = 50) {
    this.#addVariant(this.bottom, nodeInd, dropChance);
    return this;
  }
  addChanceLeft(nodeInd, dropChance = 50) {
    this.#addVariant(this.left, nodeInd, dropChance);
    return this;
  }
}

export default NodeItem;