class NodeChance {
  nodeInd;
  dropChance;

  constructor(nodeInd, dropChance) { 
    this.nodeInd = nodeInd;
    this.dropChance = dropChance;
  }
}

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

class Node {
  static variants = [
    new NodeItem('forest.png')
    .addChance(0, 50)
    .addChance(1, 100),
    
    new NodeItem('tree.png')
    .addChance(0, 50)
    .addChance(1, 10)
    .addChance(2, 50),

    new NodeItem('grass.png')
    .addChance(1, 50)
    .addChance(2, 10)
    .addChance(3, 50),

    new NodeItem('sand.png')
    .addChance(2, 50)
    .addChance(3, 10)
    .addChance(4, 50),

    new NodeItem('water.png')
    .addChance(3, 50)
    .addChance(4, 10)
    .addChance(5, 50),

    new NodeItem('deep_water.png')
    .addChance(4, 40)
    .addChance(5, 60),
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

  #genereteSelectedIndByPossibleVariants() {
    // TODO implement random choose with chance
    return Math.floor(Math.random() * this.possibleVariants.length);
  }

  init(world, i, j, ind = null) {
    // checked for World.js
    this.isInited = true;

    // choose one state
    this.selectedVariantInd = ind ?? this.#genereteSelectedIndByPossibleVariants();

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
          const chanceSumm = neighbourVariants[i].dropChance + availableVariants[j].dropChance;
          const nodeChance = new NodeChance(neighbourVariants[i].nodeInd, chanceSumm);
          newPossibleVariants.push(nodeChance);
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
