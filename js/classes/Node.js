import NodeChance from './NodeChance.js';
import NodeItem from './NodeItem.js';

class Node {
  static variants = [
    // 0
    new NodeItem('forest.png')
    .addChanceAll(1, 1)
    .addChanceAll(0, 3)
    ,
    
    // 1
    new NodeItem('tree.png')
    .addChanceAll(1, 1)
    .addChanceAll(0, 1)
    .addChanceAll(2, 5)
    ,

    // 2
    new NodeItem('grass.png')
    .addChanceAll(1, 1)
    .addChanceAll(3, 2)
    .addChanceAll(7, 2)
    .addChanceAll(8, 2)
    .addChanceRight(9, 2)
    .addChanceAll(2, 10)
    ,

    // 3
    new NodeItem('sand.png')
    .addChanceAll(2, 1)
    .addChanceAll(4, 2)
    .addChanceAll(3, 3)
    ,

    // 4
    new NodeItem('water.png')
    .addChanceAll(4, 1)
    .addChanceAll(3, 1)
    .addChanceAll(5, 3)
    ,

    // 5
    new NodeItem('deep_water.png')
    .addChanceAll(4, 1)
    .addChanceAll(5, 10)
    ,

    // 6
    new NodeItem('roadAll.png')
    .addChanceTop(8)
    .addChanceBottom(8)
    .addChanceLeft(7)
    .addChanceRight(7)
    ,

    // 7
    new NodeItem('roadHorizontal.png')
    .addChanceTop(2)
    .addChanceBottom(2)
    .addChanceLeft(7)
    .addChanceRight(7)
    ,

    // 8
    new NodeItem('roadVertical.png')
    .addChanceTop(8)
    .addChanceBottom(8)
    .addChanceLeft(2)
    .addChanceRight(2)
    ,

    // 9
    new NodeItem('roadTopRight.png')
    .addChanceTop(8)
    .addChanceRight(7)
    .addChanceLeft(2)
    .addChanceBottom(2)
    ,

    // 10
    new NodeItem('roadBottomRight.png')
    
    ,

    // 11
    new NodeItem('roadBottomLeft.png')
    
    ,

    // 12
    new NodeItem('roadTopLeft.png')
    
    ,
  ];

  isInited;
  selectedVariantInd;
  possibleVariants;

  constructor() {
    this.isInited = false;
    this.selectedVariantInd = null;
    this.possibleVariants = this.#initPossibleVariants();
  }

  init(world, i, j, ind = null) {
    // checked for World.js
    this.isInited = true;

    // choose one state
    this.selectedVariantInd = ind ?? this.#genereteSelectedIndByPossibleVariants();

    // set possible variants for neighbours
    const possibleVariant = this.possibleVariants[this.selectedVariantInd];
    this.setNeighboursVariants(world, i, j, possibleVariant);
  }

  #initPossibleVariants() {
    const possibleVariants = [];

    for (let i = 0; i < Node.variants.length; ++i) {
      possibleVariants.push(new NodeChance(i, 50));
    }

    return possibleVariants;
  }

  #genereteSelectedIndByPossibleVariants() {
    let totalChance = 0;

    // calculate total chance
    const variants = this.possibleVariants;
    for (let i = 0; i < variants.length; ++i) {
      const variant = variants[i];
      const {dropChance: variantDropChance} = variant;
      totalChance += variantDropChance;
    }
    
    // random chance
    const randomChance = Math.floor(Math.random() * totalChance);
    let accumulatedChance = 0;

    // calculate and return item index
    for (let i = 0; i < variants.length; ++i) {
      const variant = variants[i];
      const {dropChance: variantDropChance} = variant;

      accumulatedChance += variantDropChance;

      if (randomChance <= accumulatedChance) {
        return i;
      }
    }
  }

  setNeighboursVariants(world, i, j, possibleVariant) {
    this.setNeighbourVariants(world, i, j - 1, possibleVariant, 'left');
    this.setNeighbourVariants(world, i, j + 1, possibleVariant, 'right');
    this.setNeighbourVariants(world, i - 1, j, possibleVariant, 'top');
    this.setNeighbourVariants(world, i + 1, j, possibleVariant, 'bottom');
  }

  setNeighbourVariants(world, i, j, possibleVariant, side = 'top') {
    // check the world border
    if (i < 0 || i >= world.length || j < 0 || j >= world[i].length) {return;}
    if (world[i][j].isInited) { return; }

    let nodeInd = possibleVariant?.nodeInd ?? 0;

    const availableVariants = Node.variants[nodeInd][side];
    
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
    const img = document.createElement("img");
    const nodeChance = this.possibleVariants[this.selectedVariantInd];
    const node = Node.variants[nodeChance.nodeInd];
    img.src = `./img/${node.img}`;
    return img;
  }
}

export default Node;
