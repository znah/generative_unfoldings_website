module.exports = function objectFit({
  parentWidth,
  parentHeight,
  childWidth,
  childHeight,
  fit = "contain",
  scale = 1,
  padding = 0,
  offsetX = 0.5,
  offsetY = 0.5,
}) {
  const childRatio = childWidth / childHeight;
  const parentRatio = parentWidth / parentHeight;
  let w = childWidth * scale;
  let h = childHeight * scale;
  let x = 0;
  let y = 0;
  if (fit === "scale-down") {
    if (w > parentWidth || h > parentHeight) {
      const ratio = Math.min(
        parentWidth / childWidth,
        parentHeight / childHeight
      );
      w = childWidth * scale * ratio - padding * 2;
      h = childHeight * scale * ratio - padding * 2;
    }
  } else if (fit === "contain" || fit === "cover") {
    w = parentWidth * scale;
    h = parentHeight * scale;
    const contains = fit === "contain";
    const useWidth = contains
      ? childRatio > parentRatio
      : childRatio < parentRatio;
    if (useWidth) {
      h = w / childRatio;
    } else {
      w = h * childRatio;
    }
  } else if (fit === "fill") {
    w = parentWidth * scale;
    h = parentHeight * scale;
  }
  x = (parentWidth - w) * offsetX;
  y = (parentHeight - h) * offsetY;
  return [x, y, w, h];
};
