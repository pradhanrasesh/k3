// ------------------------------------------------------------
// app.js — Main entry point for Redectio
// ------------------------------------------------------------

// 1) PDF.js worker config (browser-safe)
import "./pdfjs/pdf-init.js";

// 2) Core app wiring
import { initApp } from "./app/Events.js";
import { initRuleDefinePage } from "./app/RuleDefine.js";

// 3) Export loadPDF for FileIO.js
export { loadPDF } from "./app/PDF_Loader.js";

// 4) Alerts
import { showAlert } from "./app/alert.js";
window.showAlert = showAlert;

// 5) SaveRule (optional global)
import { saveSelectedAsRule } from "./app/SaveRule.js";
window.saveSelectedAsRule = saveSelectedAsRule;

// 6) UI tabs
import "./app/tabs.js";

// 7) Search suggestions
import { initSearchSuggestions } from "./app/search_suggestions.js";

// 8) Template list loader
import { loadCompanyList } from "./app/Template_List.js";

// 9) Plugin system
import { loadPluginsIntoUI, runPlugin } from "./app/plugin.js";
window.runPlugin = runPlugin;

// 10) Performance optimizations (browser-safe)
import {
  initPerformanceOptimizations,
  monitorPerformance
} from "./app/performance.js";

// ------------------------------------------------------------
// Settings helpers (theme, density, default color, sticky search)
// ------------------------------------------------------------
function applySettings() {
  const settings = JSON.parse(localStorage.getItem("coaSettings") || "{}");

  // Theme + density
  if (settings.theme) {
    document.body.dataset.theme = settings.theme;
  }
  if (settings.density) {
    document.body.dataset.density = settings.density;
  }

  // Default redaction color
  if (settings.defaultColor) {
    const colorInput = document.getElementById("redactionColor");
    if (colorInput) colorInput.value = settings.defaultColor;
  }

  // Auto highlight toggle
  if (settings.autoHighlight === false) {
    const btn = document.getElementById("btnToggleHighlight");
    if (btn) btn.classList.remove("btn-toggle-active");
  }

  // Sticky search toggle
  if (settings.stickySearch === false) {
    window.__DISABLE_STICKY_SEARCH = true;
  }
}

function setupRedactionColorSync() {
  const redactionColorInput = document.getElementById("redactionColor");
  if (!redactionColorInput) return;

  redactionColorInput.addEventListener("input", () => {
    const settings = JSON.parse(localStorage.getItem("coaSettings") || "{}");
    settings.defaultColor = redactionColorInput.value;
    localStorage.setItem("coaSettings", JSON.stringify(settings));

    const settingsColorInput = document.getElementById("settingDefaultColor");
    if (settingsColorInput) {
      settingsColorInput.value = redactionColorInput.value;
    }
  });
}

// ------------------------------------------------------------
// Public init called AFTER layout/partials are loaded
// (layout.js imports this and calls initFrontend())
// ------------------------------------------------------------
export function initFrontend() {
  console.log("Rasesh COAs PDF Redaction App Loaded");

  // 1) Performance (safe in browser)
  initPerformanceOptimizations();

  // Optional: only monitor performance on localhost
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    monitorPerformance();
  }

  // 2) Apply user settings (theme, density, etc.)
  applySettings();

  const page = document.body?.dataset?.page || "redaction";

  // 3) Route by page
  if (page === "rule-define") {
    initRuleDefinePage();
    return;
  }

  if (page === "settings") {
    // Settings page has its own JS; nothing else to wire here
    return;
  }

  // 4) Initialize full redaction app
  initApp();

  // 5) Build search suggestions index
  initSearchSuggestions();

  // 6) Populate company dropdown
  loadCompanyList();

  // 7) Load plugin buttons into Tools panel
  loadPluginsIntoUI();

  // 8) Sync redaction color between tools panel and settings
  setupRedactionColorSync();
}
