import { $, getFormValues, showAlert, clearForm, focusPassword, validateCredentials } from "./config.js";

const loginForm = $("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { username, password, usernameInput, passwordInput } = getFormValues("username", "password");

  if (!username || !password) {
    showAlert("Please enter both username and password.");
    return;
  }

  if (validateCredentials(username, password)) {
    showAlert("Login successful!");
    clearForm(usernameInput, passwordInput);
  } else {
    showAlert("Invalid username or password. Please try again.");
    clearForm(usernameInput, passwordInput);
    focusPassword(passwordInput);
  }
});
