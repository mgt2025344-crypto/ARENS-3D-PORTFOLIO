// Form elements
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("form-success");
const fieldNames = ["name", "email", "subject", "message"];

// Show an error under a field
function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  document.getElementById(fieldName + "-error").textContent = message;
  field.parentElement.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
}

// Clear an error
function clearError(fieldName) {
  const field = document.getElementById(fieldName);
  document.getElementById(fieldName + "-error").textContent = "";
  field.parentElement.classList.remove("invalid");
  field.removeAttribute("aria-invalid");
}

// Check email format
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Check one field. Returns true if valid
function checkField(fieldName) {
  const value = document.getElementById(fieldName).value.trim();
  clearError(fieldName);

  if (value === "") {
    showError(fieldName, "This field is required.");
    return false;
  }
  if (fieldName === "email" && !isValidEmail(value)) {
    showError(fieldName, "Please enter a valid email address.");
    return false;
  }
  if (fieldName === "message" && value.length < 10) {
    showError(fieldName, "Message must be at least 10 characters.");
    return false;
  }
  return true;
}

// Handle form submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.hidden = true;

  let formIsValid = true;
  let firstInvalid = null;
  fieldNames.forEach(function (fieldName) {
    if (!checkField(fieldName)) {
      formIsValid = false;
      if (!firstInvalid) {
        firstInvalid = fieldName;
      }
    }
  });

  if (formIsValid) {
    // Demo only: no email is sent
    successMessage.hidden = false;
    form.reset();
  } else {
    document.getElementById(firstInvalid).focus();
  }
});

// Remove the error while the user types
fieldNames.forEach(function (fieldName) {
  document.getElementById(fieldName).addEventListener("input", function () {
    clearError(fieldName);
    successMessage.hidden = true;
  });
});
