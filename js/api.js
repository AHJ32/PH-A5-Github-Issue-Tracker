// API endpoints
  const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";

  export const API = {
    allIssues: `${BASE_URL}/issues`,
    singleIssue: (id) => `${BASE_URL}/issue/${id}`,
    searchIssues: (q) => `${BASE_URL}/issues/search?q=${encodeURIComponent(q)}`,
  };

  export async function fetchAllIssues() {
    const res = await fetch(API.allIssues);
    if (!res.ok) throw new Error("Failed to fetch issues");
    return res.json();
  }

  export async function fetchIssueById(id) {
    const res = await fetch(API.singleIssue(id));
    if (!res.ok) throw new Error("Failed to fetch issue");
    return res.json();
  }

  export async function searchIssues(query) {
    const res = await fetch(API.searchIssues(query));
    if (!res.ok) throw new Error("Failed to search issues");
    return res.json();
  }
  