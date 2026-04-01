// frontend/pdfjs/pdf-init.js

// pdf.js is loaded via <script src="../pdfjs/pdf.js"></script> in HTML
// so pdfjsLib is on window
const pdfjsLib = window.pdfjsLib;

if (!pdfjsLib) {
  console.error("[pdf-init] pdfjsLib not found on window");
} else {
  // Use an absolute path so it works from / and /html/*
  const workerPath = "/pdfjs/pdf.worker.js";

  pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
  console.log("[pdf-init] Local PDF.js initialized with worker:", workerPath);
}
