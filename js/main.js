import { initializeApp } from "./eventHandlers.js";
import { initializeState } from "./stateManager.js";
// import AOS from "aos";

// Initialize animation library
// AOS.init({ duration: 800 });

// Initialize application state and event handlers
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
  });
  initializeState();
  initializeApp();
});
