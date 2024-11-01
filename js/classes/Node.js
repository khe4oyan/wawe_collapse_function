class NodeChance {
  nodeInd;
  dropChance;

  constructor(nodeInd, dropChance) { 
    this.nodeInd = nodeInd;
    this.dropChance = dropChance;
  }
}

class Node {
  static variants = [
    {img: "forest.png", variants: [new NodeChance(0, 50), new NodeChance(1, 100)]},
    {img: "tree.png", variants: [new NodeChance(0, 50), new NodeChance(1, 10), new NodeChance(2, 50)]},
    {img: "grass.png", variants: [new NodeChance(1, 50), new NodeChance(2, 10), new NodeChance(3, 50)]},
    {img: "sand.png", variants: [new NodeChance(2, 50), new NodeChance(3, 10), new NodeChance(4, 50)]},
    {img: "water.png", variants: [new NodeChance(3, 50), new NodeChance(4, 10), new NodeChance(5, 50)]},
    {img: "deep_water.png", variants: [new NodeChance(4, 40), new NodeChance(5, 60)]},
  ];

  isInited;
  selectedVariantInd;
  possibleVariants;

  constructor() {
    this.isInited = false;
    this.selectedVariantInd = null;
    this.possibleVariants = [];
    this.possibleVariants = this.#initPossibleVariants();
  }

  #initPossibleVariants() {
    const possibleVariants = [];

    for (let i = 0; i < Node.variants.length; ++i) {
      possibleVariants.push(new NodeChance(i, 1));
    }

    return possibleVariants;
  }

  init(world, i, j, ind) {
    // checked for World.js
    this.isInited = true;

    // choose one state
    this.selectedVariantInd = ind ?? Math.floor(Math.random() * this.possibleVariants.length);

    // set possible variants for neighbours
    const possibleVariant = this.possibleVariants[this.selectedVariantInd];

    this.setNeighbourVariants(world, i, j - 1, possibleVariant);
    this.setNeighbourVariants(world, i, j + 1, possibleVariant);
    this.setNeighbourVariants(world, i - 1, j, possibleVariant);
    this.setNeighbourVariants(world, i + 1, j, possibleVariant);
  }

  setNeighbourVariants(world, i, j, possibleVariant) {
    // check the world border
    if (i < 0 || i >= world.length || j < 0 || j >= world[i].length) {return;}
    if (world[i][j].isInited) { return; }

    let nodeInd = possibleVariant?.nodeInd ?? 0;

    const availableVariants = Node.variants[nodeInd].variants;
    const neighbourVariants = world[i][j].possibleVariants;
    let newPossibleVariants = [];

    for (let i = 0; i < neighbourVariants.length; ++i) {
      for (let j = 0; j < availableVariants.length; ++j){ 
        if (neighbourVariants[i].nodeInd === availableVariants[j].nodeInd) {
          newPossibleVariants.push(neighbourVariants[i]);
          break;
        }
      }
    }

    // check if dont have possible variants then init it
    if (newPossibleVariants.length === 0) {
      newPossibleVariants = this.#initPossibleVariants();
    }

    world[i][j].possibleVariants = newPossibleVariants;
  }

  getImg() {
    if (this.selectedVariantInd === null) {
      return this.#createVariantsImg();
    } else {
      const img = document.createElement("img");
      const nodeChance = this.possibleVariants[this.selectedVariantInd];
      const node = Node.variants[nodeChance.nodeInd];
      img.src = `./img/${node.img}`;
      return img;
    }
  }

  #createVariantsImg() {
    const div = document.createElement('div');
    div.classList.add("variantsBox");
    
    for (let i = 0; i < this.possibleVariants.length; ++i) {
      const nodeChance = this.possibleVariants[i];
      const node = Node.variants[nodeChance.nodeInd];
      
      const img = document.createElement("img");
      img.src = `./img/${node.img}`;
      div.appendChild(img);
    }

    return div;
  }
}

export default Node;
