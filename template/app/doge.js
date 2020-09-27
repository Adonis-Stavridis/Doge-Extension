$(document).ready(function () {

  $(".imagesContainer img").click(function () {
    const imgSrc = $(this).attr('src');
    addToCanvas(imgSrc);
  });

  $(".renderButton").click(function () {
    const canvasElement = document.getElementById('memeCanvas');
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
    const canvas = document.getElementById('memeCanvas');
    const context = canvas.getContext('2d');

    newImage = new Image();
    newImage.src = imgSrc;
    newImage.onload = function () {
      context.drawImage(newImage, 0, 0);
    };
  }
});
