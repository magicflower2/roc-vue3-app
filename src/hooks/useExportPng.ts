// 获取设备的devicePixelRatio
function getPixelRatio(context) {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
}

export function onSavePng() {
  // 保存png
  const svgDom = document.querySelector("svg");
  const format = "png";

  const svgString = new XMLSerializer().serializeToString(svgDom);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const ratio = getPixelRatio(ctx); // 获取设备的devicePixelRatio
  const w = window.innerWidth; // 获取设备的显示屏幕宽高
  const h = window.innerHeight; // 图片加载完this.height才大于0.
  const ratioW = canvas.width || w * ratio; // 计算屏幕的高清图片的宽高，同时设置画板的像素
  const ratioH = canvas.height || h * ratio;

  const domURL = this.URL || this.webkitURL || this;
  const img = new Image(ratioW, ratioH);

  const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = domURL.createObjectURL(svg);
  img.src = url;

  img.onload = function on() {
    ctx.drawImage(img, 0, 0);
    const png = canvas.toDataURL(`image/${format}`);
    domURL.revokeObjectURL(png);

    const a = document.createElement("a");
    a.setAttribute("download", `test.${format}`);
    a.setAttribute("href", png);
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    a.remove();
  };
}
