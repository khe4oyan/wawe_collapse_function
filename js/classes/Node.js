class Node {
  static nodes = [
    ["grass.png", [0, 1]],
    ["tree.png", [1, 0, 2]],
    ["forest.png", [2, 1, 3]],
    ["sand.png", [3, 2, 4]],
    ["water.png", [4, 3, 5]],
    ["deep_water.png", [5, 4]],
  ];

  constructor(img = null) {
    this.isInited = null;
    this.img = img;
  }

  init(worldRef, i, j) {
    this.img = 'grass.png';
    // get sides available moves
    // get variants
    // get merged variants
    // check for double elements
    // get random element from this elements
    // set this element(img) to this img
  }

  getImg() {
    const img = document.createElement("img");
    
    if (this.img === null) {
      img.src = './img/empty.png';
    } else {
      img.src = `./img/${this.img}`;
    }

    return img;
  }
}

export default Node;
