// ===========================================================================
// GLOBAL VARIABLES
// ===========================================================================

// asset: String {image: Image | text: String, pos: {x: Int, y: Int
//   },
//   size: {x: Int, y: Int
//   },
//   rot: {deg: Int, flip: Boolean
//   },
//   layer: Int
// }
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
  imgElement.addEventListener("click", function () {
    if (currentSelection) {
      unsetSelection(currentSelection);
    }
    setSelection(assetName);
  });

  var newImageEdit = document.createElement("div");
  newImageEdit.id = assetName;
  newImageEdit.classList.add("imageEdit");
  newImageEdit.addEventListener("click", function () {
    if (currentSelection) {
      unsetSelection(currentSelection);
    }
    setSelection(assetName);
  });

  var imageCopy = new Image();
  imageCopy.alt = imgElement.alt;
  imageCopy.src = imgElement.src;
  newImageEdit.appendChild(imageCopy);

  editElement = document.createElement("span");
  editElement.textContent = "Pos:";
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
  
  editElement.type = "number";
  editElement.placeholder = "x";
  editElement.value = assets[assetName].pos.x;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "pos", "x", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
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
  editElement.type = "number";
  editElement.placeholder = "x";
  editElement.value = assets[assetName].size.x;
  editElement.required = true;
  editElement.addEventListener("input", function () {
    updateAsset(assetName, "size", "x", this.value);
  });
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("input");
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
  editElement.type = "number";
  editElement.placeholder = "num";
  editElement.value = assets[assetName].layer;
  editElement.required = true;
  newImageEdit.appendChild(editElement);

  editElement = document.createElement("i");
  editElement.classList.add("fas");
  editElement.classList.add("fa-trash");
  editElement.addEventListener("click", function (e) {
    removeImage(assetName);
    e.stopPropagation();
  });
  newImageEdit.appendChild(editElement);

  memeDiv.append(imgElement);
  editContainer.append(newImageEdit);
}

function updateAsset(assetName, object, key, value, inputFlag = false) {
  if (!isNaN(value)) {
    assets[assetName][object][key] = parseInt(value);
    const cssAttr = attrToCSS(object, key);
    document.querySelector(".memeDiv img#" + assetName).style[cssAttr] = value + "px";
    
    if (inputFlag) {
      console.log("updateInputs");
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

// ADD TEXT ASSET
function textAsset(textContent) {}

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
  } else {
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
