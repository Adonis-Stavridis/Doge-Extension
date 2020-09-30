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
      const imageObject = assets[key].image;
      const posObject = assets[key].pos;
      context.drawImage(imageObject, posObject.x, posObject.y);
    }
  }

  function addAsset(imgAlt, imageObject) {
    assets[imgAlt] = {
      pos: {
        x: 0,
        y: 0
      },
      size: {
        x: 0,
        y: 0
      },
      rot: {
        deg: 0,
        flip: false
      },
      layer: 0,
      image: imageObject
    };
    console.log(assets);
  }

  function addImage(imgSrc, imgAlt) {
    var newImage = new Image();
    newImage.src = imgSrc;

    while (imgAlt in assets) {
      imgAlt += "-copy";
    }
    newImage.alt = imgAlt;

    addAsset(imgAlt, newImage);
    addImageEdit(imgSrc, imgAlt);

    newImage.onload = function () {
      updateCanvas();
    };
  }

  function addImageEdit(imgSrc, imgAlt) {
    var newImageEdit = document.createElement("div");
    newImageEdit.classList.add("imageEdit");

    var editElement = new Image();
    editElement.src = imgSrc;
    editElement.alt = imgAlt;
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("span");
    editElement.textContent = "Pos:";
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "x";
    editElement.required = true;
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "y";
    editElement.required = true;
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("span");
    editElement.textContent = "Size:";
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "x";
    editElement.required = true;
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "y";
    editElement.required = true;
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("span");
    editElement.textContent = "Rot:";
    newImageEdit.appendChild(editElement);

    editElement = document.createElement("input");
    editElement.type = "number";
    editElement.placeholder = "deg";
    editElement.required = true;
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

  function removeImage(imgAlt) {
    assets.delete(imgAlt);
  }
});
