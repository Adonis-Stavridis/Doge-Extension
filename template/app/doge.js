// ===========================================================================
// GLOBAL VARIABLES
// ===========================================================================

var assets = {};

var assetsInfo = {
  imgNumber: 0,
  textNumber: 0
};

var memeDiv = document.querySelector("#memeDiv");
var editContainer = document.querySelector("#editContainer");

var currentSelection = null;

// ===========================================================================
// ASSET HANDLING
// ===========================================================================

// ADD IMAGE ASSET
function addImgAsset(imgName, imgSrc) {
  const assetName = "img" + assetsInfo.imgNumber++;

  var imgObj = new Image();
  imgObj.id = assetName;
  imgObj.alt = imgName;
  imgObj.src = imgSrc;

  const posObject = {
    x: Math.trunc((memeDiv.clientWidth / 2) - (imgObj.width / 2)),
    y: Math.trunc((memeDiv.clientHeight / 2) - (imgObj.height / 2))
  };

  const sizeObject = {
    x: imgObj.width,
    y: imgObj.height
  };

  assets[assetName] = {
    pos: posObject,
    size: sizeObject,
    rot: {
      deg: 0,
      flip: false
    },
    layer: 0,
    image: imgObj
  };

  addImgElements(assetName);

  return assetName;
}

function addImgElements(assetName) {
  var imgElement = assets[assetName].image;

  imgElement.id = assetName;
  imgElement.style.left = assets[assetName].pos.x + "px";
  imgElement.style.top = assets[assetName].pos.y + "px";
  imgElement.style.width = assets[assetName].size.x + "px";
  imgElement.style.height = assets[assetName].size.y + "px";
  imgElement.draggable = false;

  var newImageEdit = document.createElement("div");
  newImageEdit.id = assetName;
  newImageEdit.classList.add("imageEdit");
  newImageEdit.classList.add("draggable");
  newImageEdit.addEventListener("click", function (e) {
    if (currentSelection) {
      unsetSelection(currentSelection);
    }
    setSelection(assetName);
    e.stopPropagation();
  });
  newImageEdit.addEventListener('mousedown', mouseDownHandler);

  var imageCopy = new Image();
  imageCopy.classList.add("icon");
  imageCopy.alt = imgElement.alt;
  imageCopy.src = imgElement.src;
  imageCopy.draggable = false;
  newImageEdit.appendChild(imageCopy);

  editElement = document.createElement("span");
  editElement.textContent = "Pos:";
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  editElement.id = assetName + "-posx";
  editElement.type = "number";
  editElement.placeholder = "x";
  editElement.value = assets[assetName].pos.x;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "pos", "x", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  editElement.id = assetName + "-posy";
  editElement.type = "number";
  editElement.placeholder = "y";
  editElement.value = assets[assetName].pos.y;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "pos", "y", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("span");
  editElement.textContent = "Size:";
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  editElement.id = assetName + "-sizex";
  editElement.type = "number";
  editElement.placeholder = "x";
  editElement.value = assets[assetName].size.x;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "size", "x", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  editElement.id = assetName + "-sizey";
  editElement.type = "number";
  editElement.placeholder = "y";
  editElement.value = assets[assetName].size.y;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "size", "y", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("span");
  editElement.textContent = "Rot:";
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  editElement.id = assetName + "-rot";
  editElement.type = "number";
  editElement.placeholder = "deg";
  editElement.value = assets[assetName].rot.deg;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "rot", "deg", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("button");
  editElement.classList.add("flipButton");
  editElement.textContent = "Flip";
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("span");
  editElement.textContent = "Layer:";
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  editElement.id = assetName + "-layer";
  editElement.type = "number";
  editElement.placeholder = "num";
  editElement.value = assets[assetName].layer;
  editElement.required = true;
  newImageEdit.appendChild(editElement);

  editElement = new Image();
  editElement.classList.add("trash");
  editElement.src = "./app/icon/trash.png";
  editElement.addEventListener("click", function (e) {
    removeImage(assetName);
    e.stopPropagation();
  });
  editElement.addEventListener("mouseover", function (e) {
    this.src = "./app/icon/trash-hover.png";
  });
  editElement.addEventListener("mouseout", function (e) {
    this.src = "./app/icon/trash.png";
  });
  newImageEdit.appendChild(editElement);

  memeDiv.append(imgElement);
  editContainer.append(newImageEdit);
}

function updateAsset(assetName, object, key, value, inputFlag = false) {
  if (!isNaN(value)) {
    const intValue = parseInt(value);
    assets[assetName][object][key] = intValue;
    const cssAttr = attrToCSS(object, key);
    document.querySelector(".memeDiv img#" + assetName).style[cssAttr] = intValue + "px";
    
    if (inputFlag) {
      const inputId = attrToId(object,key);
      document.querySelector("#editContainer div#" + assetName + " input#" + assetName + "-" + inputId).value = intValue;
    }
  }
}

function removeImage(assetName) {
  if (currentSelection === assetName) {
    currentSelection = null;
  }
  delete assets[assetName];

  memeDiv.removeChild(document.querySelector("#" + assetName));
  editContainer.removeChild(document.querySelector("#" + assetName));
}

function setSelection(assetName) {
  currentSelection = assetName;
  document.querySelector(".memeDiv img#" + assetName).classList.add("selected");
  document.querySelector(".editContainer div#" + assetName).classList.add("selected");
}

function unsetSelection(assetName) {
  document.querySelector(".memeDiv img#" + assetName).classList.remove("selected");
  document.querySelector(".editContainer div#" + assetName).classList.remove("selected");
}

function attrToCSS(object, key) {
  var pairs = {
    pos: {
      x: "left",
      y: "top"
    },
    size: {
      x: "width",
      y: "height"
    }
  };

  return pairs[object][key];
}

function attrToId(object,key) {
  var pairs = {
    pos: {
      x: "posx",
      y: "posy"
    },
    size: {
      x: "sizex",
      y: "sizey"
    }
  };

  return pairs[object][key];
}

function checkboxHandle() {
  var checkbox = document.querySelector(".imagesCheckbox label input#checkboxInput");
  var text = document.querySelector(".imagesCheckbox label span#checkboxText");
  var userImages = document.querySelector("div.userImages");
  var defaultImages = document.querySelector("div.defaultImages");

  if (checkbox.checked) {
    if (userImages) {
      userImages.classList.remove("separator");
    }
    defaultImages.style.display = "none";
    text.innerHTML = "Show default images";
  } else {
    if (userImages) {
      userImages.classList.add("separator");
    }
    defaultImages.style.display = "block";
    text.innerHTML = "Hide default images";
  }
}

var checkboxHandle = (function () {
  var show = true;
  var text = document.querySelector(".imagesCheckbox label span#labelText");
  var image = document.querySelector(".imagesCheckbox label img#labelImage");
  var userImages = document.querySelector("div.userImages");
  var defaultImages = document.querySelector("div.defaultImages");
  
  return function () {
    show = !show;

    if (show) {
      if (userImages) {
        userImages.classList.add("separator");
      }
      defaultImages.style.display = "block";
      text.innerHTML = "Hide default images";
      image.src = "./app/icon/hide.png";
    } else {
      if (userImages) {
        userImages.classList.remove("separator");
      }
      defaultImages.style.display = "none";
      text.innerHTML = "Show default images";
      image.src = "./app/icon/show.png";
    }
  };
})();

// ADD TEXT ASSET
function textAsset(textContent) { }

// ===========================================================================
// EVENTS
// ===========================================================================

document.querySelectorAll(".imagesContainer img").forEach(function (image) {
  image.addEventListener("click", function () {
    const imgAlt = this.getAttribute("alt");
    const imgSrc = this.getAttribute("src");
    const newAssetName = addImgAsset(imgAlt, imgSrc);
    
    if (currentSelection) {
      unsetSelection(currentSelection);
    }
    setSelection(newAssetName);
  }); 
});

document.querySelector(".renderButton").addEventListener("click", function () {
  window.alert("RENDER");
});

document.querySelector(".imagesCheckbox label").addEventListener("click", function () {
  checkboxHandle();
});

// ===========================================================================
// DRAG IMAGES
// ===========================================================================

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

memeDiv.addEventListener("touchstart", dragStart, false);
memeDiv.addEventListener("touchend", dragEnd, false);
memeDiv.addEventListener("touchmove", drag, false);

memeDiv.addEventListener("mousedown", dragStart, false);
memeDiv.addEventListener("mouseup", dragEnd, false);
memeDiv.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.target.tagName === "IMG") {
    if (currentSelection !== e.target.id) {
      if (currentSelection) {
        unsetSelection(currentSelection);
      }
      setSelection(e.target.id);
    }
    active = true;
    document.body.style.cursor = "move";
  } else {
    if (currentSelection) {
      unsetSelection(currentSelection);
      currentSelection = null;
    }
    return false;
  }

  xOffset = e.target.offsetLeft;
  yOffset = e.target.offsetTop;

  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
  document.body.style.cursor = "default";
}

function drag(e) {
  if (active) {
    e.preventDefault();
  
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    updateAsset(currentSelection, "pos", "x", currentX, true);
    updateAsset(currentSelection, "pos", "y", currentY, true);
  }
}

// ===========================================================================
// DRAG ASSET EDITS
// ===========================================================================

let draggingEle;
let elewidth;
let placeholder;
let isDraggingStarted = false;
let mousehold = false;

// The current position of mouse relative to the dragging element
let x = 0;
let y = 0;

// Swap two nodes
const swap = function(nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // Move `nodeA` to before the `nodeB`
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  // Move `nodeB` to before the sibling of `nodeA`
  parentA.insertBefore(nodeB, siblingA);
};

// Check if `nodeA` is above `nodeB`
const isAbove = function(nodeA, nodeB) {
  // Get the bounding rectangle of nodes
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();

  return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
};

const mouseDownHandler = function (e) {
  if (!e.target.classList.contains("imageEdit")) {
    return;
  }
    
  draggingEle = e.target;

  // Calculate the mouse position
  const rect = draggingEle.getBoundingClientRect();
  x = e.pageX - rect.left;
  y = e.pageY - rect.top;

  // Attach the listeners to `document`
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

  mousehold = true;
};

const mouseMoveHandler = function (e) {
  if (!mousehold) {
    return;
  }

  const draggingRect = draggingEle.getBoundingClientRect();

  if (!isDraggingStarted) {
    isDraggingStarted = true;
    
    // Let the placeholder take the height of dragging element
    // So the next element won't move up
    placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
    placeholder.style.height = draggingRect.height + "px";
    placeholder.style.minHeight = draggingRect.height + "px";
    elewidth = draggingEle.clientWidth;
  }

  // Set position for dragging element
  draggingEle.style.position = 'absolute';
  draggingEle.style.top = `${e.pageY - y}px`; 
  draggingEle.style.left = `${e.pageX - x}px`;
  draggingEle.style.width = elewidth + "px";

  // The current order
  // prevEle
  // draggingEle
  // placeholder
  // nextEle
  const prevEle = draggingEle.previousElementSibling;
  const nextEle = placeholder.nextElementSibling;
  
  // The dragging element is above the previous element
  // User moves the dragging element to the top
  if (prevEle && isAbove(draggingEle, prevEle)) {
    // The current order    -> The new order
    // prevEle              -> placeholder
    // draggingEle          -> draggingEle
    // placeholder          -> prevEle
    swap(placeholder, draggingEle);
    swap(placeholder, prevEle);
    return;
  }

  // The dragging element is below the next element
  // User moves the dragging element to the bottom
  if (nextEle && isAbove(nextEle, draggingEle)) {
    // The current order    -> The new order
    // draggingEle          -> nextEle
    // placeholder          -> placeholder
    // nextEle              -> draggingEle
    swap(nextEle, placeholder);
    swap(nextEle, draggingEle);
  }
};

const mouseUpHandler = function () {
  mousehold = false;

  // Remove the placeholder
  if (isDraggingStarted) {
    placeholder && placeholder.parentNode.removeChild(placeholder);draggingEle.style.removeProperty('top');
    
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    isDraggingStarted = false;
  }

  x = null;
  y = null;
  elewidth = 0;
  draggingEle.style.width = null;
  draggingEle = null;

  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};
