export default `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Image</title>
</head>
<body>
<canvas id="logo"></canvas>
<canvas id="canvas"></canvas>
<script>
  var isLogoLoaded = false;
  var isImageLoaded = false;
  var logo;
  var image;

  function loadLogo(base64) {
    var logoOrigin = new Image();
    logoOrigin.onload = function() {
      var canvas = document.getElementById("logo");
      var ctx = canvas.getContext("2d");

      canvas.width = this.width;
      canvas.height = this.height;
      ctx.drawImage(logoOrigin, 0, 0);

      var imgData = ctx.getImageData(0, 0, this.width, this.height);
      var pix = imgData.data;
      for (var i = 0, n = pix.length; i < n; i += 4) {
        if (pix[i] >= 240 && pix[i+1] >= 240 && pix[i+2] >= 240) {
          pix[i] = 0;
          pix[i+1] = 0;
          pix[i+2] = 0;
          pix[i+3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      // logo
      logo = new Image();
      logo.onload = function() {
        isLogoLoaded = true;
        generateBase64();
      }
      logo.src = canvas.toDataURL();
    };
    logoOrigin.src = "data:image/png;base64," + base64
  }

  function loadImage(base64) {
    image = new Image();
    image.onload = function() {
      isImageLoaded = true;
      generateBase64();
    };
    image.src = "data:image/jpeg;base64," + base64
  }

  function generateBase64() {
    if (!isLogoLoaded || !isImageLoaded) {
      return;
    }
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = image.width
    canvas.height = image.height

    var left = canvas.width * xPercent
    var top = canvas.height * yPercent
    var fontSize = canvas.height * inputFontSize / 550
    var padding = canvas.height * 0.01
    
    ctx.drawImage(image, 0, 0);

    var logoWidth = 5.3 * fontSize;
    var logoHeight = 2 * fontSize;
    ctx.drawImage(logo, left + padding, top + padding, logoWidth, logoHeight);
    
    ctx.font = "bold " + fontSize + "px Arial";
    ctx.fillStyle = "white";
    var textWidth = ctx.measureText(text).width;
    ctx.fillText(text, left + padding + (logoWidth - textWidth) / 2, top + padding + fontSize * 1.15 + logoHeight);

    window.ReactNativeWebView.postMessage(canvas.toDataURL())
  }

  function editImage(base64Image, base64Logo, text, xPercent, yPercent, inputFontSize) {
    loadImage(base64Image);
    loadLogo(base64Logo);
    window.text = text;
    window.xPercent = xPercent;
    window.yPercent = yPercent;
    window.inputFontSize = inputFontSize;
  }
</script>
</body>
</html>
`;
