class Node {
  static nodes = [
    ["grass.png", []],
    ["tree.png", []],
    ["forest.png", []],
    ["sand.png", []],
    ["water.png", []],
    ["deep_water.png", []],
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
