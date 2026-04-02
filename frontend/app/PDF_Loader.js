// ------------------------------------------------------------
// PDF_Loader.js — Safe PDF rendering with text + box redaction support
// ------------------------------------------------------------

// IMPORTANT: pdf-init sets the workerSrc safely.
// DO NOT set workerSrc here.
const pdfjsLib = window.pdfjsLib;

import {
  setPdfDoc,
  setPdfBytes,
  setNumPages,
  pageViews,
  setPageViews,
  zoom,
  highlightMode
} from "./Utils.js";

import { drawRedactionsOnView } from "./Redaction_Core.js";
import { drawSearchHighlightsOnView } from "./Search.js";
import { drawAutoRedactPreviewOnView } from "./Redaction_Auto.js";
import { attachAnnotationHandlers } from "./AnnotationEngine.js";
import { buildTextLayer, clearTextStore } from "./TextLayer.js";
import { runOCRFallback } from "./OCR_Fallback.js";

// ------------------------------------------------------------
// loadPDF(pdfBytes)
// ------------------------------------------------------------
export async function loadPDF(pdfBytes) {
  setPdfBytes(pdfBytes);

  // Reset text store
  clearTextStore();

  const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
  const pdf = await loadingTask.promise;

  window.__PDF_DOC = pdf;
  setPdfDoc(pdf);
  setNumPages(pdf.numPages);

  // Render normally first
  await renderAllPages();

  // OCR fallback if PDF.js extracted no text
  await runOCRFallback();

  document.dispatchEvent(new CustomEvent("pdf-loaded"));
}

// ------------------------------------------------------------
// createPageView(page, viewport, pageNum)
// ------------------------------------------------------------
function createPageView(page, viewport, pageNum) {
  const container = document.getElementById("pdfPagesColumn");
  if (!container) {
    console.error("[PDF_Loader] #pdfPagesColumn not found.");
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "page-container";
  wrapper.dataset.pageNumber = pageNum;

  const canvas = document.createElement("canvas");
  canvas.className = "pdf-canvas";

  const textLayerDiv = document.createElement("div");
  textLayerDiv.className = "text-layer";

  const overlay = document.createElement("canvas");
  overlay.className = "overlay-canvas";

  const sizeShim = document.createElement("div");
  sizeShim.className = "page-size-shim";
  wrapper.appendChild(sizeShim);

  wrapper.appendChild(canvas);
  wrapper.appendChild(textLayerDiv);
  wrapper.appendChild(overlay);
  container.appendChild(wrapper);

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  overlay.width = viewport.width;
  overlay.height = viewport.height;

  attachAnnotationHandlers(overlay, {
    pageNumber: pageNum,
    viewport,
    overlay
  });

  return {
    pageNumber: pageNum,
    page,
    canvas,
    textLayerDiv,
    overlay,
    overlayCanvas: overlay,
    wrapper,
    viewport
  };
}

// ------------------------------------------------------------
// renderPageView(view)
// ------------------------------------------------------------
export async function renderPageView(view) {
  const pdf = window.__PDF_DOC;
  if (!pdf || !view) return;

  const page = await pdf.getPage(view.pageNumber);

  const currentZoom = zoom || 1.25;
  const viewport = page.getViewport({ scale: currentZoom });
  view.viewport = viewport;

  view.canvas.width = viewport.width;
  view.canvas.height = viewport.height;

  view.wrapper.style.width = "100%";
  view.wrapper.style.height = "auto";
  view.wrapper.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
  view.wrapper.style.maxWidth = "100%";

  view.overlay.width = viewport.width;
  view.overlay.height = viewport.height;

  view.textLayerDiv.style.width = "100%";
  view.textLayerDiv.style.height = "100%";

  const ctx = view.canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;

  await buildTextLayer(view, viewport);

  drawRedactionsOnView(view);
  if (highlightMode) drawSearchHighlightsOnView(view);
  drawAutoRedactPreviewOnView(view);
}

// ------------------------------------------------------------
// renderAllPages()
// ------------------------------------------------------------
export async function renderAllPages() {
  const pdf = window.__PDF_DOC;
  if (!pdf) return;

  const container = document.getElementById("pdfPagesColumn");
  if (!container) {
    console.error("[PDF_Loader] #pdfPagesColumn not found for renderAllPages.");
    return;
  }

  container.innerHTML = "";
  clearTextStore();

  const views = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const currentZoom = zoom || 1.25;
    const viewport = page.getViewport({ scale: currentZoom });

    const view = createPageView(page, viewport, pageNum);
    if (!view) continue;

    await renderPageView(view);
    views.push(view);
  }

  setPageViews(views);
  document.dispatchEvent(new CustomEvent("pages-rendered"));
}
