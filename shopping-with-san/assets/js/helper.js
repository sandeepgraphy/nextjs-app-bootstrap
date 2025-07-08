// helper.js - utility functions

// Example: showAlert function moved here for reuse
function showAlert(message, type = 'info') {
  const alertPlaceholder = document.createElement('div');
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position: fixed; top: 1rem; right: 1rem; z-index: 1050;">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.body.appendChild(alertPlaceholder);
}
