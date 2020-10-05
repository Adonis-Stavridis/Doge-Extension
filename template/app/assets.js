// ASSETS

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
  imgNumber = 0,
  textNumber = 0
};

// ADD IMAGE ASSET
function addImgAsset(imgName, imgSrc) {
  const assetName = "img" + assetsInfo.imgNumber++;

  var imgObj = $('<img />', {
    id: assetName,
    src: imgSrc,
    alt: imgName
  });

  imgObj.load(function () {
    updateMemeDiv();
  });

  const memeDiv = $("#memeDiv");

  const posObject = {
    x: Math.trunc(memeDiv.width() / 2 - imgObj.width() / 2),
    y: Math.trunc(memeDiv.height() / 2 - imgObj.height() / 2)
  };

  const sizeObject = {
    x: imgObj.width(),
    y: imgObj.height()
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
}

// ADD TEXT ASSET
function addTextAsset(textContent) {}



function updateMemeDiv() {
  console.log(assets);
}
