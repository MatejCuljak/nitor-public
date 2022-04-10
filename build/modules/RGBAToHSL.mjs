export function ConverteRGBAToHLS(rgba, callback){
    rgba = rgba.match(/([0-9.]+)/g);
    console.log(rgba)    
    if (!rgba) {
            return null;
        }
    
        var red = rgba[0] < 0 ? 0 : rgba[0] > 255 ? 255 : rgba[0];
        var green = rgba[1] < 0 ? 0 : rgba[1] > 255 ? 255 : rgba[1];
        var blue = rgba[2] < 0 ? 0 : rgba[2] > 255 ? 255 : rgba[2];
      var opacity = rgba[3] < 0 ? 0.1 : rgba[3] > 2 ? (rgba[3] / 100) : rgba[3];
    
        var r = red / 255,
            g = green / 255,
            b = blue / 255,
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h, s, l;
        if (max == min) {
            h = 0;
        } else if (r == max) {
            h = (g - b) / delta;
        } else if (g == max) {
            h = 2 + (b - r) / delta;
        } else if (b == max) {
            h = 4 + (r - g) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) h += 360;
        l = (min + max) / 2;
        if (max == min) s = 0;
        else if (l <= 0.5) s = delta / (max + min);
        else s = delta / (2 - max - min);
    
        callback(`hsla(${roundToTwo(h)}, ${roundToTwo(s)}%, ${roundToTwo(l)}%, ${roundToTwo(opacity)})`)
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }