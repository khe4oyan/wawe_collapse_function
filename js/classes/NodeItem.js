import NodeChance from './NodeChance.js';

class NodeItem {
  img;
  variants;

  constructor(img) {
    this.img = img;
    this.variants = [];
  }

  addChance(nodeInd, dropChance) {
    this.variants.push(new NodeChance(nodeInd, dropChance));
    return this;
  }
}

export default NodeItem;