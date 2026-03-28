const CREDENTIALS = {
  USERNAME: "admin",
  PASSWORD: "admin123",
};

const $ = (id) => document.getElementById(id);

const getFormValues = (usernameId, passwordId) => {
  const usernameInput = $(usernameId);
  const passwordInput = $(passwordId);

  return {
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
    usernameInput,
    passwordInput,
  };
};

const showAlert = (message) => {
  alert(message);
};

const clearForm = (usernameInput, passwordInput) => {
  usernameInput.value = "";
  passwordInput.value = "";
};

const focusPassword = (passwordInput) => {
  passwordInput.focus();
};

const validateCredentials = (username, password) => {
  return username === CREDENTIALS.USERNAME && password === CREDENTIALS.PASSWORD;
};

export { CREDENTIALS, $, getFormValues, showAlert, clearForm, focusPassword, validateCredentials };
