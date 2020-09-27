import * as vscode from "vscode";
import * as path from "path";

export function getImages(files: [string, vscode.FileType][]): Array<string> {
  var imgTypes: Set<string> = new Set<string>([".apng", ".bmp", ".gif", ".ico", ".cur", ".jpg", ".jpeg", ".jfif", ".pjpeg", ".pjp", ".png", ".svg", ".tif", ".tiff", ".webp"]);

  var images: Array<string> = [];

  for (let val in files) {
    var file = files[val];
    if (file[1] === vscode.FileType.File) {
      var filename = file[0];
      var fileExt = path.extname(filename);

      if (imgTypes.has(fileExt)) {
        images.push(filename);
      }
    }
  }

  return images;
}

export function imagesToHTML(images: Array<string>): string {
  var htmlCode: string = "";

  images.forEach((image) => {
    htmlCode += "\t\t\t\t\t<img src=\"../img/" + image + "\" alt=\"" + image + "\">\n";
  });
  return htmlCode;
}
