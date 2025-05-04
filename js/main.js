import { initializeApp } from "./eventHandlers.js";
import { initializeState } from "./stateManager.js";
import AOS from "https://unpkg.com/aos@2.3.1/dist/aos.js";

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
