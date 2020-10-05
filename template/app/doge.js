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

    console.log(memeDiv.width() + "/" + memeDiv.height());

    const posObject = {
      x: Math.trunc((memeDiv.height() / 2) - (imgObj.height / 2)),
      y: Math.trunc((memeDiv.width() / 2) - (imgObj.width / 2))
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
    console.log(assets);
  }

  function addImgElements(assetName) {
    var imgElement = assets[assetName].image;

    imgElement.style.top = assets[assetName].pos.x + "px";
    imgElement.style.left = assets[assetName].pos.y + "px";
    imgElement.style.width = assets[assetName].size.x + "px";
    imgElement.style.height = assets[assetName].size.y + "px";

    // imgElement.css({
    //   top: assets[assetName].pos.x,
    //   left: assets[assetName].pos.y,
    //   // width: assets[assetName].size.x,
    //   // height: assets[assetName].size.y
    // });

    memeDiv.append(imgElement);
  }

  // ADD TEXT ASSET
  function textAsset(textContent) {}

  function updateMemeDiv() {
    console.log(assets);
  }

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
});
