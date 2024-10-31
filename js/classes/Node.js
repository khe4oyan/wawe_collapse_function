class Node {
  static variants = [
    {img: "forest.png", variants: [0, 1]},
    {img: "tree.png", variants: [0, 1, 2]},
    {img: "grass.png", variants: [1, 2, 3]},
    {img: "sand.png", variants: [2, 3, 4]},
    {img: "water.png", variants: [3, 4, 5]},
    {img: "deep_water.png", variants: [4, 5]},
  ];

  selectedVariantInd;
  isTouched;

  constructor() {
    this.selectedVariantInd = -1;
    this.isTouched = false;
  }

  init(world, i, j) {
    this.isTouched = true;

    let possibleVariants = new Set(Node.variants.map((_, index) => index));

    try {
      this.intersectSideVariants(world, i, j - 1, possibleVariants);
    } catch (error) {}
    try {
      this.intersectSideVariants(world, i, j + 1, possibleVariants);
    } catch (error) {}
    try {
      this.intersectSideVariants(world, i - 1, j, possibleVariants);
    } catch (error) {}
    try {
      this.intersectSideVariants(world, i + 1, j, possibleVariants);
    } catch (error) {}

    const availableVariants = Array.from(possibleVariants);

    if (availableVariants.length === 0) {
      this.selectedVariantInd = Math.floor(
        Math.random() * Node.variants.length
      );
      return;
    }

    this.selectedVariantInd = availableVariants[Math.floor(Math.random() * availableVariants.length)];
  }

  intersectSideVariants(world, i, j, possibleVariants) {
    if (i < 0 || i >= world.length || j < 0 || j >= world[0].length) {
      return;
    }

    const variantInd = world[i][j].selectedVariantInd;
    if (variantInd > -1) {
      const allowedVariants = new Set(Node.variants[variantInd].variants);
      possibleVariants.forEach((variant) => {
        if (!allowedVariants.has(variant)) {
          possibleVariants.delete(variant);
        }
      });
    }
  }

  getImg() {
    const img = document.createElement("img");

    if (this.selectedVariantInd > -1) {
      img.src = `./img/${Node.variants[this.selectedVariantInd].img}`;
    }

    return img;
  }
}

export default Node;
