const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";

  export async function fetchAllIssues() {
    const res = await fetch(`${BASE_URL}/issues`);
    if (!res.ok) throw new Error("Failed to fetch issues");
    const json = await res.json();
    // API returns { status, message, data: [...] }
    return Array.isArray(json) ? json : (json.data ?? []);
  }

  export async function searchIssues(query) {
    const res = await fetch(`${BASE_URL}/issues/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search failed");
    const json = await res.json();
    return Array.isArray(json) ? json : (json.data ?? []);
  }

  export async function fetchIssueById(id) {
    const res = await fetch(`${BASE_URL}/issue/${id}`);
    if (!res.ok) throw new Error("Failed to fetch issue");
    const json = await res.json();
    return json.data ?? json;
  }
  