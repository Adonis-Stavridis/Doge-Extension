$(document).ready(function () {

  const canvas = document.getElementById("memeCanvas");
  const context = canvas.getContext('2d');

  context.canvas.width = canvas.clientWidth;
  context.canvas.height = canvas.clientHeight;

  var imagesSet = new Set();

  $(window).resize(function () {
    const canvasElement = document.getElementById("memeCanvas");
    context.canvas.width = canvasElement.clientWidth;
    context.canvas.height = canvasElement.clientHeight;
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

  function addImage(imgSrc, imgAlt) {
    var newImage = new Image();
    newImage.src = imgSrc;
    newImage.onload = function () {
      context.drawImage(newImage, 0, 0);
    };

    var newImgAlt = imgAlt;
    while (imagesSet.has(newImgAlt)) {
      newImgAlt = newImgAlt + "-copy";
    }

    newImage.alt = newImgAlt;

    imagesSet.add(newImgAlt);
    addImageEdit(imgSrc, newImgAlt);
  }

  function addImageEdit(imgSrc, imgAlt) {
    var newImageEdit = document.createElement("div");
    newImageEdit.classList.add("imageEdit");

    var asset = new Image();
    asset.src = imgSrc;
    asset.alt = imgAlt;
    newImageEdit.appendChild(asset);

    asset = document.createElement("span");
    asset.textContent = "Pos:";
    newImageEdit.appendChild(asset);

    asset = document.createElement("input");
    asset.type = "number";
    asset.placeholder = "x";
    asset.required = true;
    newImageEdit.appendChild(asset);

    asset = document.createElement("input");
    asset.type = "number";
    asset.placeholder = "y";
    asset.required = true;
    newImageEdit.appendChild(asset);

    asset = document.createElement("span");
    asset.textContent = "Size:";
    newImageEdit.appendChild(asset);

    asset = document.createElement("input");
    asset.type = "number";
    asset.placeholder = "x";
    asset.required = true;
    newImageEdit.appendChild(asset);

    asset = document.createElement("input");
    asset.type = "number";
    asset.placeholder = "y";
    asset.required = true;
    newImageEdit.appendChild(asset);

    asset = document.createElement("span");
    asset.textContent = "Rot:";
    newImageEdit.appendChild(asset);

    asset = document.createElement("input");
    asset.type = "number";
    asset.placeholder = "deg";
    asset.required = true;
    newImageEdit.appendChild(asset);

    asset = document.createElement("button");
    asset.classList.add("flipButton");
    asset.textContent = "Flip";
    newImageEdit.appendChild(asset);

    asset = document.createElement("span");
    asset.textContent = "Layer:";
    newImageEdit.appendChild(asset);

    asset = document.createElement("input");
    asset.type = "number";
    asset.placeholder = "num";
    asset.required = true;
    newImageEdit.appendChild(asset);

    asset = document.createElement("i");
    asset.classList.add("fas");
    asset.classList.add("fa-trash");
    asset.addEventListener("click", function () {
      removeImage(imgAlt);
    });
    newImageEdit.appendChild(asset);

    const imagesEditContainter = document.getElementById("imagesEditContainer");
    imagesEditContainter.appendChild(newImageEdit);
  }

  function removeImage(imgAlt) {
    imagesSet.delete(imgAlt);
  }
});
