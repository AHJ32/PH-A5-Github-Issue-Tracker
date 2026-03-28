const CREDENTIALS = { USERNAME: 'admin', PASSWORD: 'admin123' };

const API_BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

const LABEL_CONFIG = {
  'bug':           { bg:'#fff0eb', color:'#c2410c', border:'#fdba74',  icon:'ri-bug-line',        tw:'bg-orange-100 text-orange-600 border border-orange-200' },
  'help wanted':   { bg:'#f0fdf4', color:'#15803d', border:'#86efac',  icon:'ri-at-line',         tw:'bg-green-100 text-green-700 border border-green-200' },
  'enhancement':   { bg:'#f0fdfa', color:'#0d9488', border:'#5eead4',  icon:'ri-flashlight-line', tw:'bg-teal-100 text-teal-700 border border-teal-200' },
  'documentation': { bg:'#eff6ff', color:'#2563eb', border:'#93c5fd',  icon:'ri-file-text-line',  tw:'bg-blue-100 text-blue-700 border border-blue-200' },
  'question':      { bg:'#faf5ff', color:'#9333ea', border:'#d8b4fe',  icon:'ri-question-line',   tw:'bg-purple-100 text-purple-700 border border-purple-200' }
};

const PRIORITY_CONFIG = {
  HIGH:   { cssClass: 'priority-HIGH',   hex: '#ef4444' },
  MEDIUM: { cssClass: 'priority-MEDIUM', hex: '#f97316' },
  LOW:    { cssClass: 'priority-LOW',    hex: '#94a3b8' }
};

const STATUS_COLORS = { open: '#22c55e', closed: '#a855f7' };

const $ = (id) => document.getElementById(id);

const formatDate = (d) => {
  if (!d) return 'N/A';
  const x = new Date(d);
  return (x.getMonth() + 1) + '/' + x.getDate() + '/' + x.getFullYear();
};

const isOpenStatus = (status) => (status || '').toLowerCase() === 'open';

const normalizeLabels = (labels) => {
  if (Array.isArray(labels)) return labels;
  if (typeof labels === 'string') return labels.split(',').map(l => l.trim()).filter(Boolean);
  return [];
};

const getFormValues = (usernameId, passwordId) => {
  const usernameInput = $(usernameId);
  const passwordInput = $(passwordId);
  return { username: usernameInput.value.trim(), password: passwordInput.value.trim(), usernameInput, passwordInput };
};

const showAlert = (message) => { alert(message); };

const clearForm = (usernameInput, passwordInput) => {
  usernameInput.value = '';
  passwordInput.value = '';
};

const focusPassword = (passwordInput) => { passwordInput.focus(); };

const validateCredentials = (username, password) =>
  username === CREDENTIALS.USERNAME && password === CREDENTIALS.PASSWORD;

export {
  CREDENTIALS, API_BASE_URL, LABEL_CONFIG, PRIORITY_CONFIG, STATUS_COLORS,
  $, formatDate, isOpenStatus, normalizeLabels,
  getFormValues, showAlert, clearForm, focusPassword, validateCredentials
};