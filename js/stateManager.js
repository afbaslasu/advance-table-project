import { renderTable, updatePagination } from "./tableManager.js";

let state = {
  tests: [
    { name: "Sample Test", id: "1", result: "100", status: "active" },
    { name: "Another Test", id: "2", result: "200", status: "active" },
  ],
  currentPage: 1,
  itemsPerPage: 5,
  searchQuery: "",
  filterStatus: "",
};

export function initializeState() {
  const savedState = localStorage.getItem("appState");
  state = savedState
    ? JSON.parse(savedState)
    : {
        tests: [],
        currentPage: 1,
        itemsPerPage: 5,
        searchQuery: "",
        filterStatus: "",
      };
  renderTable();
  updatePagination();
}

export function getState() {
  return state;
}

export function updateState(newState) {
  state = { ...state, ...newState };
  localStorage.setItem("appState", JSON.stringify(state));
  renderTable();
  updatePagination();
}
