import Node from '../../js/classes/Node.js'

for (let i = 0; i < Node.variants.length; ++i) {
  const {img, top, right, bottom, left} = Node.variants[i];

  // create itemBox
  const itemBoxDOM = document.createElement("div");
  itemBoxDOM.classList.add('itemBox');

  // img box
  const imgBoxDOM = document.createElement('div');

  // create and append img
  const imgDOM = document.createElement('img');
  imgDOM.classList.add('itemImg');
  imgDOM.src = `../../img/${img}`;
  imgBoxDOM.appendChild(imgDOM);
  

  // item index
  const indexDOM = document.createElement('p');
  indexDOM.innerText = i;
  imgBoxDOM.appendChild(indexDOM);

  itemBoxDOM.appendChild(imgBoxDOM);

  const sides = [
    {title: 'Top', variants: top},
    {title: 'Right', variants: right},
    {title: 'Bottom', variants: bottom},
    {title: 'Left', variants: left},
  ];

  // create side box
  const sidesBoxDOM = document.createElement("div");
  sidesBoxDOM.classList.add("sides");

  for (let j = 0; j < sides.length; ++j) {
    const {title, variants} = sides[j];
    
    // side create
    const sideDOM = document.createElement('div');
    sideDOM.classList.add('side');

    // append title
    const titleDOM = document.createElement('p');
    titleDOM.innerText = title;
    titleDOM.classList.add('sideTitle');
    sideDOM.appendChild(titleDOM);
    
    // apped available items
    const sideAvailableItemsDOM = document.createElement('div');
    sideAvailableItemsDOM.classList.add('sideAvailableItems');
    createVariantsDOM(sideAvailableItemsDOM, variants);

    // build
    sideDOM.appendChild(sideAvailableItemsDOM);
    sidesBoxDOM.appendChild(sideDOM);
  }

  itemBoxDOM.appendChild(sidesBoxDOM);

  document.querySelector('.table').appendChild(itemBoxDOM);
}


function createVariantsDOM(parentDOM, variants) {
  const allVairants = Node.variants;
  const availableVariants = new Set();

  const imgCreate = (img, className = null) => {
    const imgDOM = document.createElement('img');
    imgDOM.classList.add('availableItemImg');
    className && imgDOM.classList.add(className);
    imgDOM.src = `../../img/${img}`;
    parentDOM.appendChild(imgDOM);
  }

  // show available nodes
  for (let i = 0; i < variants.length; ++i) {
    const {nodeInd} = variants[i];
    availableVariants.add(nodeInd);
    const {img} = allVairants[nodeInd];
    imgCreate(img);
  }

  // show unavailable nodes
  for (let i = 0; i < allVairants.length; ++i) {
    if (!availableVariants.has(i)) {
      imgCreate(allVairants[i].img, 'disabled');
    }
  }
}