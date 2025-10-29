class Node {
  static nodes = [
    ["grass.png", [0, 1]],
    ["tree.png", [1, 0, 2]],
    ["forest.png", [2, 1]],
    // ["sand.png", [3, 2, 4]],
    // ["water.png", [4, 3, 5]],
    // ["deep_water.png", [5, 4]],
  ];

  constructor(nodeInd = -1) {
    this.isInited = null;
    this.nodeInd = nodeInd;
  }

  init(worldRef, i, j) {
    // get sides available variants
    const top = this.#getNextToVariants(worldRef, i - 1, j);
    const bottom = this.#getNextToVariants(worldRef, i + 1, j);
    const left = this.#getNextToVariants(worldRef, i, j - 1);
    const right = this.#getNextToVariants(worldRef, i, j + 1);

    // get merged variantsgit 
    const topBottom = this.#variantsMerge(top, bottom);
    const leftRight = this.#variantsMerge(left, right);
    const mergedVariants = this.#variantsMerge(this.#filterDoubleElements(topBottom), this.#filterDoubleElements(leftRight));

    // check for double elements
    const filteredElements = this.#filterDoubleElements(mergedVariants);
    
    // get random element from this elements
    const randomElementInd = Math.floor(Math.random() * filteredElements.length);

    // set this element(img) to this img
    this.nodeInd = randomElementInd;
  }

  #filterDoubleElements(elements) {
    const result = [];

    for (let i = 0; i < elements.length; ++i) {
      if (elements[i][1] > 1) {
        result.push(elements[i][0]);
      }
    }

    return result;
  }

  #variantsMerge(...sides) {
    const variants = [];

    const findVariantInd = (variantInd) => {
      for (let i = 0; i < variants.length; ++i) {
        if (variants[i][0] === variantInd) {
          return i;
        }
      }

      return -1;
    };

    for (let i = 0; i < sides.length; ++i) {
      for (let j = 0; j < sides[i].length; ++j) {
        const variantValue = sides[i][j];
        const variantInd = findVariantInd(variantValue);

        if (variantInd > -1) {
          variants[variantInd][1] = variants[variantInd][1] + 1;
        } else {
          variants.push([variantValue, 1]);
        }
      }
    }

    return variants;
  }

  #getNextToVariants(wordldRef, i, j) {
    try {
      return wordldRef[i][j].getVariants();
    } catch (error) {
      console.log(i, j, error.message);
      return this.#createFullVariants();
    }
  }

  #createFullVariants() {
    const variants = [];

    for (let i = 0; i < Node.nodes.length; ++i) {
      variants.push(i);
    }

    return variants;
  }

  getVariants() {
    try {
      return Node.nodes[this.nodeInd][1];
    } catch (error) {
      return [];
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
