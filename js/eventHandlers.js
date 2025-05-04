import { getState, updateState } from "./stateManager.js";
import { addTest, deleteTest, updateTest } from "./tableManager.js";
import { validateTestForm, showAlert } from "./utils/validators.js";
import { fadeIn, fadeOut } from "./utils/animations.js";
import { renderTable } from "./tableManager.js";

export function initializeApp() {
  // Form Toggle
  /// Replace existing form toggle code with:
  $("#add-test").on("click", function () {
    const formContainer = $("#form-container");
    formContainer.toggleClass("hidden");
    formContainer.css("opacity", formContainer.hasClass("hidden") ? 0 : 1);
    AOS.refresh();
  });

  // Create Test
  $("#create-test").on("click", async (e) => {
    e.preventDefault();
    const testData = {
      name: $("#test-name").val(),
      result: $("#test-result").val(),
    };

    if (validateTestForm(testData)) {
      await addTest(testData);
      fadeOut($("#form-container"));
      $("#test-name, #test-result").val("");
    }
  });

  // Search Input
  $("#search-input").on("input", function () {
    updateState({ searchQuery: $(this).val().toLowerCase() });
  });

  // Filter Select
  $("#filter-status").on("change", function () {
    updateState({ filterStatus: $(this).val() });
  });

  // Delete Handler
  $("#confirm-delete").on("click", function () {
    const testId = $(this).data("id"); // Changed to "id"
    if (testId) {
      deleteTest(testId);
      $("#deleteModal").modal("hide");
    }
  });
}

// Dynamic event delegation for table actions
$(document).on("click", ".btn-edit", function () {
  const testId = $(this).data("id");
  const test = getState().tests.find((t) => t.id === testId);
  if (test) startEdit(test);
});

$(document).on("click", ".btn-delete", function () {
  const testId = $(this).data("id");
  $("#confirm-delete").data("id", testId); // Changed to "id"
  $("#deleteModal").modal("show");
});

function startEdit(test) {
  const row = $(`.test-row-${test.id}`);
  row.addClass("editing");
  const resultCell = row.find(".result-cell");
  const originalValue = resultCell.text().trim();

  resultCell.html(`
    <input type="text" class="form-control edit-input" 
           value="${originalValue}">
    <div class="btn-group mt-2">
      <button class="btn btn-sm btn-success btn-save">
        <i class="fas fa-check"></i>
      </button>
      <button class="btn btn-sm btn-secondary btn-cancel">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `);

  // Use event delegation for dynamic elements
  row.off("click.save").on("click", ".btn-save", async () => {
    const newValue = row.find(".edit-input").val();
    if (newValue !== originalValue) {
      await updateTest(test.id, { result: newValue });
    }
    cancelEdit(row);
  });

  row.off("click.cancel").on("click", ".btn-cancel", () => cancelEdit(row));
}
