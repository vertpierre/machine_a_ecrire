const EXPORT_VIEWBOX = { x: 0, y: 0, width: 100, height: 100 };
const SHAPE_SCALE = 2;
const CONTENT_SCALE = 0.1 * SHAPE_SCALE;
const BLUR_PRESETS = { sharp: 0.15, medium: 0.4, smooth: 0.65 };
const STROKE_WIDTHS = { bold: 16, regular: 13, thin: 10 };

const previewUrls = { export: null };
const editViewBox = { x: 0, y: 0, width: 100, height: 100 };
let previewFrame = null;
let currentStrokeWidth = STROKE_WIDTHS.regular;
let blurMode = "medium";
let activeShape = null;
let dragOffset = { x: 0, y: 0 };

function byId(id) {
  return document.getElementById(id);
}

function setSelectedControl(groupName, selectedId) {
  document
    .querySelectorAll(`[data-control-group="${groupName}"]`)
    .forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.id === selectedId ? "true" : "false",
      );
    });
}

function makeNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function buildPathElement(d) {
  return `<path d="${d}" fill="none" stroke="rgb(0,0,0)" stroke-width="${currentStrokeWidth}" />`;
}

const SHAPES = [
  {
    id: "shape_01",
    wrapId: "shape_01_wrap",
    hitWrapId: "hit_shape_01_wrap",
    rotateId: "shape_01_rotate",
    width: 2.5,
    height: 10,
    x: 40,
    y: 8,
    rotationCenter: { x: 12.5, y: 50 },
    rotationRange: [-20, 20],
    buildPath() {
      return (
        "M" +
        makeNumber(6, 9) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(5, 10) +
        " " +
        makeNumber(15, 25) +
        " L" +
        makeNumber(10, 20) +
        " " +
        makeNumber(40, 50) +
        " L" +
        makeNumber(16, 16) +
        " " +
        makeNumber(60, 70) +
        " L" +
        makeNumber(16, 16) +
        " " +
        makeNumber(85, 95)
      );
    },
  },
  {
    id: "shape_02",
    wrapId: "shape_02_wrap",
    hitWrapId: "hit_shape_02_wrap",
    rotateId: "shape_02_rotate",
    width: 10,
    height: 10,
    x: 20,
    y: 10,
    rotationCenter: { x: 50, y: 50 },
    rotationRange: [0, 360],
    buildPath() {
      return (
        "M" +
        makeNumber(45, 55) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(75, 85) +
        " " +
        makeNumber(10, 20) +
        " L" +
        makeNumber(90, 95) +
        " " +
        makeNumber(40, 50) +
        " L" +
        makeNumber(80, 90) +
        " " +
        makeNumber(70, 80) +
        " L" +
        makeNumber(60, 70) +
        " " +
        makeNumber(85, 95) +
        " L" +
        makeNumber(30, 40) +
        " " +
        makeNumber(85, 95) +
        " L" +
        makeNumber(5, 15) +
        " " +
        makeNumber(70, 80) +
        " L" +
        makeNumber(5, 15) +
        " " +
        makeNumber(40, 50) +
        " L" +
        makeNumber(15, 25) +
        " " +
        makeNumber(10, 20) +
        " Z"
      );
    },
  },
  {
    id: "shape_03",
    wrapId: "shape_03_wrap",
    hitWrapId: "hit_shape_03_wrap",
    rotateId: "shape_03_rotate",
    width: 2.5,
    height: 25,
    x: 8,
    y: 8,
    rotationCenter: { x: 12.5, y: 125 },
    rotationRange: [-10, 10],
    buildPath() {
      return (
        "M" +
        makeNumber(6, 16) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(6, 16) +
        " " +
        makeNumber(30, 35) +
        " L" +
        makeNumber(5, 20) +
        " " +
        makeNumber(40, 45) +
        " L" +
        makeNumber(5, 20) +
        " " +
        makeNumber(50, 60) +
        " L" +
        makeNumber(5, 20) +
        " " +
        makeNumber(70, 80) +
        " L" +
        makeNumber(5, 20) +
        " " +
        makeNumber(100, 105) +
        " L" +
        makeNumber(5, 20) +
        " " +
        makeNumber(115, 120) +
        " L" +
        makeNumber(6, 18) +
        " " +
        makeNumber(135, 145) +
        " L" +
        makeNumber(8, 13) +
        " " +
        makeNumber(160, 175) +
        " L" +
        makeNumber(9, 11) +
        " " +
        makeNumber(180, 220) +
        " L" +
        makeNumber(5, 20) +
        " " +
        makeNumber(235, 245)
      );
    },
  },
  {
    id: "shape_04",
    wrapId: "shape_04_wrap",
    hitWrapId: "hit_shape_04_wrap",
    rotateId: "shape_04_rotate",
    width: 10,
    height: 2.5,
    x: 48,
    y: 30,
    rotationCenter: { x: 50, y: 12.5 },
    rotationRange: [-30, 30],
    buildPath() {
      return (
        "M" +
        makeNumber(5, 10) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(15, 25) +
        " " +
        makeNumber(10, 20) +
        " L" +
        makeNumber(40, 50) +
        " " +
        makeNumber(1, 15) +
        " L" +
        makeNumber(60, 70) +
        " " +
        makeNumber(10, 20) +
        " L" +
        makeNumber(85, 95) +
        " " +
        makeNumber(5, 15)
      );
    },
  },
  {
    id: "shape_05",
    wrapId: "shape_05_wrap",
    hitWrapId: "hit_shape_05_wrap",
    rotateId: "shape_05_rotate",
    width: 10,
    height: 10,
    x: 58,
    y: 10,
    rotationCenter: { x: 50, y: 50 },
    rotationRange: [-60, 60],
    buildPath() {
      return (
        "M" +
        makeNumber(90, 95) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(55, 70) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(30, 40) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(5, 10) +
        " " +
        makeNumber(15, 30) +
        " L" +
        makeNumber(5, 10) +
        " " +
        makeNumber(55, 70) +
        " L" +
        makeNumber(10, 20) +
        " " +
        makeNumber(80, 95) +
        " L" +
        makeNumber(40, 50) +
        " " +
        makeNumber(85, 95) +
        " L" +
        makeNumber(55, 65) +
        " " +
        makeNumber(85, 95)
      );
    },
  },
  {
    id: "shape_06",
    wrapId: "shape_06_wrap",
    hitWrapId: "hit_shape_06_wrap",
    rotateId: "shape_06_rotate",
    width: 10,
    height: 10,
    x: 70,
    y: 34,
    rotationCenter: { x: 50, y: 50 },
    rotationRange: [-45, 30],
    buildPath() {
      return (
        "M" +
        makeNumber(60, 70) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(80, 90) +
        " " +
        makeNumber(10, 15) +
        " L" +
        makeNumber(90, 95) +
        " " +
        makeNumber(30, 40) +
        " L" +
        makeNumber(90, 95) +
        " " +
        makeNumber(60, 65) +
        " L" +
        makeNumber(80, 90) +
        " " +
        makeNumber(80, 90) +
        " L" +
        makeNumber(60, 70) +
        " " +
        makeNumber(90, 95) +
        " L" +
        makeNumber(15, 25) +
        " " +
        makeNumber(85, 95) +
        " L" +
        makeNumber(5, 10) +
        " " +
        makeNumber(60, 65) +
        " L" +
        makeNumber(10, 15) +
        " " +
        makeNumber(20, 30)
      );
    },
  },
  {
    id: "shape_07",
    wrapId: "shape_07_wrap",
    hitWrapId: "hit_shape_07_wrap",
    rotateId: "shape_07_rotate",
    width: 7.5,
    height: 10,
    x: 30,
    y: 42,
    rotationCenter: { x: 37.5, y: 50 },
    rotationRange: [-30, 30],
    buildPath() {
      return (
        "M" +
        makeNumber(5, 10) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(20, 30) +
        " " +
        makeNumber(5, 10) +
        " L" +
        makeNumber(40, 50) +
        " " +
        makeNumber(7, 13) +
        " L" +
        makeNumber(57, 65) +
        " " +
        makeNumber(10, 20) +
        " L" +
        makeNumber(65, 70) +
        " " +
        makeNumber(30, 40) +
        " L" +
        makeNumber(65, 70) +
        " " +
        makeNumber(60, 70) +
        " L" +
        makeNumber(65, 70) +
        " " +
        makeNumber(85, 95)
      );
    },
  },
];

const shapeStateByWrapId = new Map();

function getScaledWidth(shape) {
  return shape.width * SHAPE_SCALE;
}

function getScaledHeight(shape) {
  return shape.height * SHAPE_SCALE;
}

function getScaledRotationCenter(shape) {
  return {
    x: shape.rotationCenter.x * CONTENT_SCALE,
    y: shape.rotationCenter.y * CONTENT_SCALE,
  };
}

function setTranslate(element, x, y) {
  element.setAttribute("transform", `translate(${x},${y})`);
}

function updateShapeGeometry(shape) {
  const sourceWrap = byId(shape.wrapId);
  const hitWrap = byId(shape.hitWrapId);
  const hitBox = hitWrap ? hitWrap.querySelector(".shape-hitbox") : null;
  const content = byId(shape.id);
  const rotate = byId(shape.rotateId);
  if (!sourceWrap || !hitWrap || !hitBox || !content || !rotate) return;

  const scaledWidth = getScaledWidth(shape);
  const scaledHeight = getScaledHeight(shape);
  const center = getScaledRotationCenter(shape);

  sourceWrap.dataset.width = String(scaledWidth);
  sourceWrap.dataset.height = String(scaledHeight);
  hitWrap.dataset.width = String(scaledWidth);
  hitWrap.dataset.height = String(scaledHeight);
  hitBox.setAttribute("width", String(scaledWidth));
  hitBox.setAttribute("height", String(scaledHeight));

  setTranslate(sourceWrap, shape.x, shape.y);
  setTranslate(hitWrap, shape.x, shape.y);
  content.setAttribute("transform", `scale(${CONTENT_SCALE})`);
  rotate.setAttribute(
    "transform",
    `rotate(${shape.rotation},${center.x},${center.y})`,
  );
}

function renderShapePath(shape) {
  const content = byId(shape.id);
  if (!content) return;
  content.innerHTML = buildPathElement(shape.pathData);
}

function renderAllShapePaths() {
  SHAPES.forEach(renderShapePath);
}

function initializeShapes() {
  SHAPES.forEach((shape) => {
    shape.rotation = makeNumber(shape.rotationRange[0], shape.rotationRange[1]);
    shape.pathData = shape.buildPath();
    shapeStateByWrapId.set(shape.wrapId, shape);
    updateShapeGeometry(shape);
    renderShapePath(shape);
  });
}

function updateStrokeWidth(value) {
  currentStrokeWidth = value;
  renderAllShapePaths();
  schedulePreviewUpdate();
}

function setStrokeWidth(controlId, strokeWidth) {
  setSelectedControl("stroke", controlId);
  updateStrokeWidth(strokeWidth);
}

function updateBlobBlur() {
  const source = byId("glyphSource");
  const feBlur = source
    ? source.querySelector("#blobFilter feGaussianBlur")
    : null;
  if (!feBlur) return;
  feBlur.setAttribute(
    "stdDeviation",
    String(BLUR_PRESETS[blurMode] * SHAPE_SCALE),
  );
  schedulePreviewUpdate();
}

function setBlurMode(controlId, nextBlurMode) {
  blurMode = nextBlurMode;
  setSelectedControl("blur", controlId);
  updateBlobBlur();
}

function buildPreviewUrl(viewBoxValue) {
  const source = byId("glyphSource");
  if (!source) return null;
  const clone = source.cloneNode(true);
  clone.removeAttribute("id");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("viewBox", viewBoxValue);
  clone.setAttribute("preserveAspectRatio", "xMinYMin meet");
  const serialized = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
  return URL.createObjectURL(blob);
}

function getResponsiveEditViewBox(viewportWidth, viewportHeight) {
  if (!viewportWidth || !viewportHeight) {
    return { ...EXPORT_VIEWBOX };
  }

  const viewportAspect = viewportWidth / viewportHeight;
  if (viewportAspect >= 1) {
    return {
      x: 0,
      y: 0,
      width: EXPORT_VIEWBOX.width * viewportAspect,
      height: EXPORT_VIEWBOX.height,
    };
  }

  return {
    x: 0,
    y: 0,
    width: EXPORT_VIEWBOX.width,
    height: EXPORT_VIEWBOX.height / viewportAspect,
  };
}

function applyEditViewBox(viewBox) {
  const canvas = byId("glyphCanvas");
  const source = byId("glyphSource");
  if (!canvas || !source) return;

  editViewBox.x = viewBox.x;
  editViewBox.y = viewBox.y;
  editViewBox.width = viewBox.width;
  editViewBox.height = viewBox.height;

  const viewBoxValue = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
  canvas.setAttribute("viewBox", viewBoxValue);
  source.setAttribute("viewBox", viewBoxValue);
  // Export-area rect stays 100×100 at origin; script no longer resizes it
}

function updatePreviewImage() {
  const exportPreview = byId("glyphExportPreview");
  if (!exportPreview) return;

  const nextExportUrl = buildPreviewUrl(
    `${EXPORT_VIEWBOX.x} ${EXPORT_VIEWBOX.y} ${EXPORT_VIEWBOX.width} ${EXPORT_VIEWBOX.height}`,
  );

  if (previewUrls.export) URL.revokeObjectURL(previewUrls.export);

  previewUrls.export = nextExportUrl;
  if (nextExportUrl) exportPreview.src = nextExportUrl;
}

function schedulePreviewUpdate() {
  if (previewFrame != null) return;
  previewFrame = window.requestAnimationFrame(() => {
    previewFrame = null;
    updatePreviewImage();
  });
}

function syncLayout() {
  const glyphArea = document.querySelector(".global_glyphe");
  const sidebar = document.querySelector(".global_range");
  if (!glyphArea || !sidebar) return;

  const stageRect = glyphArea.getBoundingClientRect();
  const sidebarRect = sidebar.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return;

  const nextEditViewBox = getResponsiveEditViewBox(
    stageRect.width,
    stageRect.height,
  );
  const panelWidthPx = sidebarRect.width;
  const exportSquarePx = Math.min(stageRect.width, stageRect.height);

  applyEditViewBox(nextEditViewBox);
  document.documentElement.style.setProperty(
    "--panel-width",
    `${panelWidthPx}px`,
  );
  document.documentElement.style.setProperty(
    "--safe-zone-width",
    `${exportSquarePx}px`,
  );
  document.documentElement.style.setProperty(
    "--safe-zone-height",
    `${exportSquarePx}px`,
  );

  schedulePreviewUpdate();
}

// JPEG export: quality 0–1. Lower = smaller file, less detail. ~0.8 keeps visual quality with good compression.
const JPEG_EXPORT_QUALITY = 0.8;

function triggerJpegDownload() {
  const exportPreview = byId("glyphExportPreview");
  if (!exportPreview || !exportPreview.src) return;

  const image = new Image();
  image.onload = () => {
    const exportWidth = 2000;
    const exportHeight = Math.max(
      1,
      Math.round((exportWidth * image.naturalHeight) / image.naturalWidth),
    );
    const canvas = document.createElement("canvas");
    canvas.width = exportWidth;
    canvas.height = exportHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "machine-a-ecrire-export.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      "image/jpeg",
      JPEG_EXPORT_QUALITY,
    );
  };
  image.src = exportPreview.src;
}

function parseTranslate(transformAttr) {
  if (!transformAttr) return { x: 0, y: 0 };
  const match = transformAttr.match(
    /translate\s*\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*\)/,
  );
  return match
    ? { x: parseFloat(match[1]), y: parseFloat(match[2]) }
    : { x: 0, y: 0 };
}

function getSvgPointer(svg, clientX, clientY) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) return { x: 0, y: 0 };
  const svgPoint = point.matrixTransform(matrix.inverse());
  return { x: svgPoint.x, y: svgPoint.y };
}

function clampShapePosition(shape, x, y) {
  const maxX = Math.max(0, editViewBox.width - getScaledWidth(shape));
  const maxY = Math.max(0, editViewBox.height - getScaledHeight(shape));
  return {
    x: Math.max(0, Math.min(maxX, x)),
    y: Math.max(0, Math.min(maxY, y)),
  };
}

function setupDragging() {
  const svg = byId("glyphCanvas");
  if (!svg) return;

  svg.addEventListener("pointerdown", (event) => {
    const hitWrap = event.target.closest(".shape-hit");
    if (!hitWrap || !svg.contains(hitWrap)) return;

    const sourceWrapId = hitWrap.dataset.targetWrap;
    const shape = sourceWrapId ? shapeStateByWrapId.get(sourceWrapId) : null;
    if (!shape) return;

    event.preventDefault();
    const pointer = getSvgPointer(svg, event.clientX, event.clientY);
    activeShape = shape;
    dragOffset = {
      x: pointer.x - shape.x,
      y: pointer.y - shape.y,
    };

    hitWrap.parentNode.appendChild(hitWrap);
    if (hitWrap.setPointerCapture) {
      hitWrap.setPointerCapture(event.pointerId);
    }
  });

  window.addEventListener("pointermove", (event) => {
    if (!activeShape) return;
    event.preventDefault();
    const pointer = getSvgPointer(svg, event.clientX, event.clientY);
    const next = clampShapePosition(
      activeShape,
      pointer.x - dragOffset.x,
      pointer.y - dragOffset.y,
    );
    activeShape.x = next.x;
    activeShape.y = next.y;
    updateShapeGeometry(activeShape);
    schedulePreviewUpdate();
  });

  function releaseDrag() {
    activeShape = null;
  }

  window.addEventListener("pointerup", releaseDrag);
  window.addEventListener("pointercancel", releaseDrag);
}

function cleanupPreviewUrls() {
  if (previewUrls.export) URL.revokeObjectURL(previewUrls.export);
}

function initializeControls() {
  byId("reload")?.addEventListener("click", () => location.reload());
  byId("bold")?.addEventListener("click", () =>
    setStrokeWidth("bold", STROKE_WIDTHS.bold),
  );
  byId("regular")?.addEventListener("click", () =>
    setStrokeWidth("regular", STROKE_WIDTHS.regular),
  );
  byId("thin")?.addEventListener("click", () =>
    setStrokeWidth("thin", STROKE_WIDTHS.thin),
  );
  byId("sharp")?.addEventListener("click", () => setBlurMode("sharp", "sharp"));
  byId("medium")?.addEventListener("click", () =>
    setBlurMode("medium", "medium"),
  );
  byId("smooth")?.addEventListener("click", () =>
    setBlurMode("smooth", "smooth"),
  );
  byId("save-jpeg")?.addEventListener("click", triggerJpegDownload);
  setSelectedControl("stroke", "regular");
  setSelectedControl("blur", "medium");
}

function initializeArtboard() {
  const canvas = byId("glyphCanvas");
  const source = byId("glyphSource");
  if (!canvas || !source) return;

  canvas.setAttribute("preserveAspectRatio", "xMinYMin meet");
  source.setAttribute("preserveAspectRatio", "xMinYMin meet");
  applyEditViewBox({ ...EXPORT_VIEWBOX });
}

function initializeEditor() {
  initializeArtboard();
  initializeShapes();
  initializeControls();
  setupDragging();
  syncLayout();
  updateBlobBlur();
  schedulePreviewUpdate();

  window.addEventListener("resize", () => {
    syncLayout();
  });
  window.addEventListener("beforeunload", cleanupPreviewUrls);
}

document.addEventListener("DOMContentLoaded", initializeEditor);
