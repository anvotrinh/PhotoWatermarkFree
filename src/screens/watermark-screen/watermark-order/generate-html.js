import { Colors } from '../../../theme'

export default `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Image</title>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  function editImage(base64, text, xPercent, yPercent, inputFontSize) {
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
      ctx.font = fontSize + "px Arial";
      var textWidth = ctx.measureText(text).width;

      ctx.fillStyle = "${Colors.deepBlush}";
      ctx.strokeStyle = "${Colors.deepBlush}";
      roundRect(ctx, left, top, textWidth + 2 * padding, fontSize + 2 * padding, padding, true);

      ctx.fillStyle = "white";
      ctx.fillText(text, left + padding, top + padding + fontSize * 0.9);

      window.ReactNativeWebView.postMessage(canvas.toDataURL())
    };
    image.src = 'data:image/jpeg;base64,' + base64
  }
</script>
</body>
</html>
`
