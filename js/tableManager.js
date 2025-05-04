import { getState, updateState } from "./stateManager.js";
import { formatResult, showAlert } from "./utils/validators.js";
import { fadeIn, fadeOut } from "./utils/animations.js";

let editTimeout;

export function addTest(testData) {
  return new Promise((resolve) => {
    const state = getState();
    const newTest = {
      ...testData,
      id: Date.now().toString(),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    updateState({
      tests: [...state.tests, newTest],
    });
    showAlert("Test added successfully!", "success");
    resolve();
  });
}

export async function deleteTest(testId) {
  const state = getState();
  updateState({
    tests: state.tests.filter((test) => test.id !== testId),
  });
  showAlert("Test deleted successfully!", "danger");
}

export async function updateTest(testId, updates) {
  const state = getState();
  updateState({
    tests: state.tests.map((test) =>
      test.id === testId ? { ...test, ...updates } : test
    ),
  });
  showAlert("Test updated successfully!", "info");
}

export function renderTable() {
  const { tests, searchQuery, filterStatus, currentPage, itemsPerPage } =
    getState();
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchQuery) ||
      test.result.includes(searchQuery);
    const matchesFilter = !filterStatus || test.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedTests = filteredTests.slice(start, start + itemsPerPage);

  const tableBody = paginatedTests
    .map(
      (test) => `
        <tr class="test-row-${test.id}" data-aos="fade-right">
            <td>${test.name}</td>
            <td class="result-cell">${formatResult(test.result)}</td>
            <td>
                <span class="badge ${
                  test.status === "active" ? "badge-success" : "badge-secondary"
                }">
                    ${test.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary btn-edit" data-id="${
                  test.id
                }">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${
                  test.id
                }">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `
    )
    .join("");

  $("#tests-table").html(tableBody);
}

export function updatePagination() {
  const { tests, currentPage, itemsPerPage } = getState();
  const totalPages = Math.ceil(tests.length / itemsPerPage);
  let paginationHtml = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `;
  }

  $("#pagination").html(paginationHtml);
  $(".page-link").on("click", function (e) {
    e.preventDefault();
    updateState({ currentPage: parseInt($(this).text()) });
  });
}
