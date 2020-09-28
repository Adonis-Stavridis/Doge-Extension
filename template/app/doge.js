$(document).ready(function () {

  const canvas = document.getElementById("memeCanvas");
  const context = canvas.getContext('2d');

  context.canvas.width = canvas.width;
  context.canvas.height = canvas.height;

  $(window).resize(function () {
    const canvasElement = document.getElementById("memeCanvas");
    context.canvas.width = canvasElement.width;
    context.canvas.height = canvasElement.height;
  });

  $(".imagesContainer img").click(function () {
    const imgSrc = $(this).attr('src');
    addToCanvas(imgSrc);
  });

  $(".renderButton").click(function () {
    const canvasElement = document.getElementById("memeCanvas");
    const MIME_TYPE = "image/png";
    const imgURL = canvasElement.toDataURL(MIME_TYPE);

    const dlLink = document.createElement('a');
    dlLink.download = "meme.png";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  });

  function addToCanvas(imgSrc) {
    newImage = new Image();
    newImage.src = imgSrc;
    newImage.onload = function () {
      context.drawImage(newImage, 0, 0);
    };
  }

  // TODO : addEvent procedurally
  $(".imagesEdit i").click(function () {
    $(this).parent().remove();
  });
});
