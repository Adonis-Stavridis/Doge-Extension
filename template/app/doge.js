$(document).ready(function () {

  const canvas = document.getElementById("memeCanvas");
  const context = canvas.getContext('2d');

  context.canvas.width = canvas.clientWidth;
  context.canvas.height = canvas.clientHeight;

  var assets = {};

  $(window).resize(function () {
    const canvasElement = document.getElementById("memeCanvas");
    context.canvas.width = canvasElement.clientWidth;
    context.canvas.height = canvasElement.clientHeight;
    updateCanvas();
  });

  $(".imagesContainer img").click(function () {
    const imgSrc = $(this).attr('src');
    const imgAlt = $(this).attr('alt');
    addImage(imgSrc, imgAlt);
  });

  $(".renderButton").click(function () {
    const canvasElement = document.getElementById("memeCanvas");
    const MIME_TYPE = "image/png";
    const imgURL = canvasElement.toDataURL(MIME_TYPE);

    const dlLink = document.createElement("a");
    dlLink.download = "meme.png";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  });

  function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const key in assets) {
      var imageObject = assets[key].image;
      const posObject = assets[key].pos;
      imageObject.width = assets[key].size.x;
      imageObject.height = assets[key].size.y;

      context.drawImage(imageObject, posObject.x, posObject.y, imageObject.width, imageObject.height);
    }
  }

  function addAsset(imgSrc, imgAlt) {
    var imageObject = new Image();
    imageObject.src = imgSrc;
    imageObject.alt = imgAlt;
    imageObject.onload = function () {
      updateCanvas();
    };

    const posObject = {
      x: Math.trunc(canvas.width / 2 - imageObject.width / 2),
      y: Math.trunc(canvas.height / 2 - imageObject.height / 2)
    };

    const sizeObject = {
      x: imageObject.width,
      y: imageObject.height
    };


    assets[imgAlt] = {
      pos: posObject,
      size: sizeObject,
      rot: {
        deg: 0,
        flip: false
      },
      layer: 0,
      image: imageObject
    };
  }

  function addImage(imgSrc, imgAlt) {
    while (imgAlt in assets) {
      imgAlt += "-copy";
    }

    addAsset(imgSrc, imgAlt);
    addImageEdit(imgSrc, imgAlt);
  }

  function addImageEdit(imgSrc, imgAlt) {
    var newImageEdit = document.createElement("div");
    newImageEdit.id = imgAlt;
    newImageEdit.classList.add("imageEdit");

    var imageCopy = new Image();
    imageCopy.src = imgSrc;
    imageCopy.alt = imgAlt;
    newImageEdit.appendChild(imageCopy);

    editElement = document.createElement("span");
    editElement.textContent = "Pos:";
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "x";
    editElement.value = assets[imgAlt].pos.x;
    editElement.required = true;
    editElement.addEventListener("input", function () {
      inputEdit(imgAlt, "pos", "x", this.value);
    });
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "y";
    editElement.value = assets[imgAlt].pos.y;
    editElement.required = true;
    editElement.addEventListener("input", function () {
      inputEdit(imgAlt, "pos", "y", this.value);
    });
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("span");
    editElement.textContent = "Size:";
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "x";
    editElement.value = assets[imgAlt].size.x;
    editElement.required = true;
    editElement.addEventListener("input", function () {
      inputEdit(imgAlt, "size", "x", this.value);
    });
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "y";
    editElement.value = assets[imgAlt].size.y;
    editElement.required = true;
    editElement.addEventListener("input", function () {
      inputEdit(imgAlt, "size", "y", this.value);
    });
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("span");
    editElement.textContent = "Rot:";
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "deg";
    editElement.value = assets[imgAlt].rot.deg;
    editElement.required = true;
    editElement.addEventListener("input", function () {
      inputEdit(imgAlt, "rot", "deg", this.value);
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
    editElement.value = assets[imgAlt].layer;
    editElement.required = true;
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("i");
    editElement.classList.add("fas");
    editElement.classList.add("fa-trash");
    editElement.addEventListener("click", function () {
      removeImage(imgAlt);
    });
    newImageEdit.appendChild(editElement);

    const editContainter = document.getElementById("editContainer");
    editContainter.appendChild(newImageEdit);
  }

  function inputEdit(imgAlt, object, key, value) {
    if (!isNaN(value)) {
      assets[imgAlt][object][key] = parseInt(value);
      updateCanvas();
    }
  }

  function removeImage(imgAlt) {
    delete assets[imgAlt];
    updateCanvas();
    const editDiv = document.getElementById(imgAlt);
    editDiv.parentNode.removeChild(editDiv);
  }
});
