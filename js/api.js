import { API_BASE_URL } from './config.js?v=1774725523436';

export async function fetchAllIssues() {
  const res = await fetch(API_BASE_URL + '/issues');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}

export async function searchIssues(query) {
  const res = await fetch(API_BASE_URL + '/issues/search?q=' + encodeURIComponent(query));
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}