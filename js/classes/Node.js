class Node {
  static nodes = [
    ["deep_water.png", [0, 1]],
    ["water.png", [1, 0, 2]],
    ["sand.png", [2, 1, 3]],
    ["grass.png", [3, 2, 4]],
    ["tree.png", [4, 3, 5]],
    ["forest.png", [5, 4]],
  ];

  static #createFullVariants() {
    const variants = [];

    for (let i = 0; i < Node.nodes.length; ++i) {
      variants.push(i);
    }

    return variants;
  }

  constructor(i, j, nodeInd = -1) {
    this.i = i;
    this.j = j;
    this.nodeInd = nodeInd;
    this.inQueue = false;
  }

  init(worldRef, push) {
    const i = this.i;
    const j = this.j;
    const world = worldRef.world;

    // get sides available variants
    const top = this.#getNextToVariants(world, i - 1, j);
    const bottom = this.#getNextToVariants(world, i + 1, j);
    const left = this.#getNextToVariants(world, i, j - 1);
    const right = this.#getNextToVariants(world, i, j + 1);

    const intersection = top
      .filter(value => bottom.includes(value))
      .filter(value => left.includes(value))
      .filter(value => right.includes(value));

    const randomElementInd = Math.floor(Math.random() * intersection.length);
    this.nodeInd = intersection[randomElementInd];

    const topNeighbor = world[i - 1]?.[j];
    if (topNeighbor && !topNeighbor.isInited()) push(topNeighbor);

    const bottomNeighbor = world[i + 1]?.[j];
    if (bottomNeighbor && !bottomNeighbor.isInited()) push(bottomNeighbor);

    const leftNeighbor = world[i]?.[j - 1];
    if (leftNeighbor && !leftNeighbor.isInited()) push(leftNeighbor);

    const rightNeighbor = world[i]?.[j + 1];
    if (rightNeighbor && !rightNeighbor.isInited()) push(rightNeighbor);
  }

  #getNextToVariants(wordldRef, i, j) {
    try {
      return wordldRef[i][j].getVariants();
    } catch (error) {
      return Node.#createFullVariants();
    }
  }

  isInited() {
    return this.nodeInd > -1;
  }

  getVariants() {
    try {
      return Node.nodes[this.nodeInd][1];
    } catch (error) {
      return Node.#createFullVariants();
    }
  }

  getImgName() {
    try {
      return Node.nodes[this.nodeInd][0];
    } catch (error) {
      return null;
    }
  }

  getImgDOM() {
    const imgDOM = document.createElement("img");
    const nodeInd = this.nodeInd;
    const img = Node.nodes[nodeInd];

    if (img) {
      imgDOM.src = `./img/${this.getImgName()}`;
    } else {
      imgDOM.src = './img/empty.png';
    }

    return imgDOM;
  }
}

export default Node;
