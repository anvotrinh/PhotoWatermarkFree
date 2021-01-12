import { Colors } from '../../../theme'
import { CODE_X_MARGIN_PERCENT, CODE_Y_MARGIN_PERCENT } from './utils'

export default logoBase64 => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Image</title>
</head>
<body>
<canvas id="canvas"></canvas>
<img id="logo" style="display: none;" src="${logoBase64}" />
<script>
  function editImage(base64, text, code, codeLoc, xPercent, yPercent, inputFontSize) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function() {
      canvas.width = this.width
      canvas.height = this.height

      var left = canvas.width * xPercent
      var top = canvas.height * yPercent
      var fontSize = canvas.height * inputFontSize / 550
      var padding = canvas.height * 0.01
      
      ctx.drawImage(image, 0, 0);

      var logo = document.getElementById("logo");
      var logoWidth = 5.3 * fontSize;
      var logoHeight = 2 * fontSize;
      ctx.drawImage(logo, left + padding, top + padding, logoWidth, logoHeight);
      
      ctx.font = "bold " + fontSize + "px Arial";
      ctx.fillStyle = "${Colors.brilliantRose}";
      var textWidth = ctx.measureText(text).width;
      ctx.fillText(text, left + padding + (logoWidth - textWidth) / 2, top + padding + fontSize * 1.15 + logoHeight);

      ctx.font = "bold " + fontSize + "px Arial";
      ctx.fillStyle = "${Colors.brilliantRose}";
      var measureCode = ctx.measureText(code);
      var codeX = 0;
      var codeY = 0;
      switch (codeLoc) {
        case 'top_left':
          codeX = canvas.width * ${CODE_X_MARGIN_PERCENT};
          codeY = canvas.height * ${CODE_Y_MARGIN_PERCENT} + fontSize * 0.75;
          break;
        case 'top_right':
          codeX = canvas.width * (1 - ${CODE_X_MARGIN_PERCENT}) - measureCode.width;
          codeY = canvas.height * ${CODE_Y_MARGIN_PERCENT} + fontSize * 0.75;
          break;
        case 'bottom_left':
          codeX = canvas.width * ${CODE_X_MARGIN_PERCENT};
          codeY = canvas.height * (1 - ${CODE_Y_MARGIN_PERCENT});
          break;
        case 'bottom_right':
          codeX = canvas.width * (1 - ${CODE_X_MARGIN_PERCENT}) - measureCode.width;
          codeY = canvas.height * (1 - ${CODE_Y_MARGIN_PERCENT});
          break;
      }
      ctx.fillText(code, codeX, codeY);

      window.ReactNativeWebView.postMessage(canvas.toDataURL())
    };
    image.src = 'data:image/jpeg;base64,' + base64
  }
</script>
</body>
</html>
`
