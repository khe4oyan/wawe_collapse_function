import Node from '../../js/classes/Node.js'

for (let i = 0; i < Node.variants.length; ++i) {
  const {img, top, right, bottom, left} = Node.variants[i];

  // create itemBox
  const itemBoxDOM = document.createElement("div");
  itemBoxDOM.classList.add('itemBox');

  // create and append img
  const imgDOM = document.createElement('img');
  imgDOM.classList.add('itemImg');
  imgDOM.src = `../../img/${img}`;
  itemBoxDOM.appendChild(imgDOM);

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
  for (let i = 0; i < variants.length; ++i) {
    const {nodeInd} = variants[i];
    const {img} = Node.variants[nodeInd];

    const imgDOM = document.createElement('img');
    imgDOM.classList.add('availableItemImg');
    imgDOM.src = `../../img/${img}`;
    parentDOM.appendChild(imgDOM);
  }
}