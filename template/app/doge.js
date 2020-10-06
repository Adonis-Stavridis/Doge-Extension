$(document).ready(function () {

  // ===========================================================================
  // GLOBAL VARIABLES
  // ===========================================================================

  // asset: String {
  //   image: Image | text: String,
  //   pos: {
  //     x: Int,
  //     y: Int
  //   },
  //   size: {
  //     x: Int,
  //     y: Int
  //   },
  //   rot: {
  //     deg: Int,
  //     flip: Boolean
  //   },
  //   layer: Int
  // }
  var assets = {};

  var assetsInfo = {
    imgNumber: 0,
    textNumber: 0
  };

  var memeDiv = $("#memeDiv");
  var editContainer = $("#editContainer");

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
      x: Math.trunc((memeDiv.width() / 2) - (imgObj.width / 2)),
      y: Math.trunc((memeDiv.height() / 2) - (imgObj.height / 2))
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
  }

  function addImgElements(assetName) {
    var imgElement = assets[assetName].image;

    imgElement.id = assetName;
    imgElement.style.left = assets[assetName].pos.x + "px";
    imgElement.style.top = assets[assetName].pos.y + "px";
    imgElement.style.width = assets[assetName].size.x + "px";
    imgElement.style.height = assets[assetName].size.y + "px";

    imgElement.addEventListener("mousedown", function () {
      initialClick(assetName);
    }, false);

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
    editElement.addEventListener("click", function () {
      removeImage(assetName);
    });
    newImageEdit.appendChild(editElement);

    memeDiv.append(imgElement);
    editContainer.append(newImageEdit);
  }

  function updateAsset(assetName, object, key, value) {
    if (!isNaN(value)) {
      assets[assetName][object][key] = parseInt(value);
      const cssAttr = getCSSAttribute(object, key);
      $(".memeDiv img#" + assetName).css(cssAttr, value + "px");
    }
  }

  function removeImage(assetName) {
    if (currentSelection === assetName) {
      unsetSelection(currentSelection);
      currentSelection = null;
    }
    delete assets[assetName];
    $("#memeDiv img").remove("#" + assetName);
    $("#editContainer div").remove("#" + assetName);
  }

  function setSelection(assetName) {
    currentSelection = assetName;
    $(".memeDiv img#" + assetName).addClass("selected");
    $(".editContainer div#" + assetName).addClass("selected");
  }

  function unsetSelection(assetName) {
    $(".memeDiv img#" + assetName).removeClass("selected");
    $(".editContainer div#" + assetName).removeClass("selected");
  }

  function getCSSAttribute(object, key) {
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

  $(".imagesContainer img").click(function () {
    const imgAlt = $(this).attr('alt');
    const imgSrc = $(this).attr('src');
    addImgAsset(imgAlt, imgSrc);
  });

  $(".renderButton").click(function () {
    window.alert("RENDER");
  });

  // ===========================================================================
  // DRAG IMAGES
  // ===========================================================================

  var moving = false;

  function move(e) {
    const memeDivOffset = memeDiv.offset();
    const imgOffset = $(".memeDiv img#" + currentSelection).offset();

    var newX = 2 * e.clientX - memeDivOffset.left - imgOffset.left;
    var newY = 2 * e.clientY - memeDivOffset.top - imgOffset.top;

    updateAsset(currentSelection, "pos", "x", newX);
    updateAsset(currentSelection, "pos", "y", newY);
  }

  function initialClick(assetName) {
    if (moving) {
      document.removeEventListener("mousemove", move);
      moving = !moving;
      return;
    }

    moving = !moving;
    if (currentSelection) {
      unsetSelection(currentSelection);
    }
    setSelection(assetName);

    document.addEventListener("mousemove", move, false);
  }
});
