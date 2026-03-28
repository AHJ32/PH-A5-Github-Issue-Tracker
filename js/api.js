// GitHub Issues Tracker — API helpers
const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";

export async function fetchAllIssues() {
  const res = await fetch(BASE_URL + "/issues");
  if (!res.ok) throw new Error("HTTP " + res.status);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}

export async function searchIssues(query) {
  const res = await fetch(
    BASE_URL + "/issues/search?q=" + encodeURIComponent(query),
  );
  if (!res.ok) throw new Error("HTTP " + res.status);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}
