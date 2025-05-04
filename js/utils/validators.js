export function validateTestForm({ name, result }) {
  if (!name || name === "----------") {
    showAlert("Please select a test type!", "danger");
    return false;
  }
  if (!result || isNaN(result)) {
    showAlert("Please enter a valid numerical result!", "danger");
    return false;
  }
  return true;
}

export function formatResult(result) {
  return parseFloat(result).toFixed(2);
}

export function showAlert(message, type = "info") {
  const alert = $(`
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
  `);

  // Add to alert container instead of before form
  $("#alert-container").html(alert);

}

