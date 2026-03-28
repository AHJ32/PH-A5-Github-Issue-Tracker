import { fetchAllIssues } from "./api.js";
  import { buildCard, buildModal } from "./ui.js";

  const grid = document.getElementById("issuesGrid");
  const spinner = document.getElementById("spinner");
  const noResults = document.getElementById("noResults");
  const issueCount = document.getElementById("issueCount");
  const openCount = document.getElementById("openCount");
  const closedCount = document.getElementById("closedCount");
  const modal = document.getElementById("issueModal");
  const modalContent = document.getElementById("modalContent");

  let allIssues = [];
  let currentTab = "all";

  // Show/hide spinner
  function setLoading(loading) {
    if (loading) {
      spinner.classList.add("show");
      grid.innerHTML = "";
      noResults.classList.add("hidden");
    } else {
      spinner.classList.remove("show");
    }
  }

  // Render issues in grid
  function renderIssues(issues) {
    if (!issues.length) {
      grid.innerHTML = "";
      noResults.classList.remove("hidden");
      return;
    }
    noResults.classList.add("hidden");
    grid.innerHTML = issues.map(buildCard).join("");
    attachCardListeners();
  }

  // Update counts
  function updateCounts(issues) {
    const open = issues.filter((i) => i.status?.toLowerCase() === "open").length;
    const closed = issues.filter((i) => i.status?.toLowerCase() === "closed").length;
    issueCount.textContent = `${issues.length} Issue${issues.length !== 1 ? "s" : ""}`;
    openCount.textContent = `${open} Open`;
    closedCount.textContent = `${closed} Closed`;
  }

  // Open modal with issue data
  function openModal(issue) {
    modalContent.innerHTML = buildModal(issue);
    modal.showModal();
  }

  // Attach click listeners to cards
  function attachCardListeners() {
    document.querySelectorAll(".issue-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const issue = allIssues.find((i) => String(i.id) === String(id));
        if (issue) openModal(issue);
      });
    });
  }

  // Filter issues by tab
  function filterByTab(tab) {
    if (tab === "all") return allIssues;
    return allIssues.filter((i) => i.status?.toLowerCase() === tab);
  }

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-ghost", "text-[#64748B]");
      });
      btn.classList.add("btn-primary");
      btn.classList.remove("btn-ghost", "text-[#64748B]");
      renderIssues(filterByTab(currentTab));
    });
  });

  // Load all issues on mount
  async function init() {
    setLoading(true);
    try {
      const data = await fetchAllIssues();
      allIssues = Array.isArray(data) ? data : (data.issues ?? data.data ?? []);
      updateCounts(allIssues);
      renderIssues(filterByTab(currentTab));
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="text-red-500 col-span-4 text-center py-10">Failed to load issues. Please refresh.</p>`;
    } finally {
      setLoading(false);
    }
  }

  init();

  export { allIssues };
  