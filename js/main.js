import { fetchAllIssues, searchIssues } from "./api.js";
  import { buildCard, buildModal } from "./ui.js";

  const grid = document.getElementById("issuesGrid");
  const spinner = document.getElementById("spinner");
  const noResults = document.getElementById("noResults");
  const issueCount = document.getElementById("issueCount");
  const openCount = document.getElementById("openCount");
  const closedCount = document.getElementById("closedCount");
  const modal = document.getElementById("issueModal");
  const modalContent = document.getElementById("modalContent");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  let allIssues = [];
  let currentTab = "all";

  function setLoading(loading) {
    if (loading) {
      spinner.classList.add("show");
      grid.innerHTML = "";
      noResults.classList.add("hidden");
    } else {
      spinner.classList.remove("show");
    }
  }

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

  function updateCounts(issues) {
    const open = issues.filter((i) => i.status?.toLowerCase() === "open").length;
    const closed = issues.filter((i) => i.status?.toLowerCase() === "closed").length;
    issueCount.textContent = `${issues.length} Issue${issues.length !== 1 ? "s" : ""}`;
    openCount.textContent = `${open} Open`;
    closedCount.textContent = `${closed} Closed`;
  }

  function openModal(issue) {
    modalContent.innerHTML = buildModal(issue);
    modal.showModal();
  }

  function attachCardListeners() {
    document.querySelectorAll(".issue-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const issue = allIssues.find((i) => String(i.id) === String(id));
        if (issue) openModal(issue);
      });
    });
  }

  function filterByTab(issues, tab) {
    if (tab === "all") return issues;
    return issues.filter((i) => i.status?.toLowerCase() === tab);
  }

  function setActiveTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("btn-primary");
      b.classList.add("btn-ghost", "text-[#64748B]");
    });
    const active = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (active) {
      active.classList.add("btn-primary");
      active.classList.remove("btn-ghost", "text-[#64748B]");
    }
  }

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
      // Clear search on tab switch
      searchInput.value = "";
      renderIssues(filterByTab(allIssues, currentTab));
      updateCounts(filterByTab(allIssues, currentTab));
    });
  });

  // Search functionality
  async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      renderIssues(filterByTab(allIssues, currentTab));
      updateCounts(filterByTab(allIssues, currentTab));
      return;
    }
    setLoading(true);
    try {
      const data = await searchIssues(query);
      const results = Array.isArray(data) ? data : (data.issues ?? data.data ?? []);
      updateCounts(results);
      renderIssues(results);
      // Update allIssues ref for modal lookup during search
      allIssues = [...new Map([...allIssues, ...results].map((i) => [i.id, i])).values()];
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="text-red-500 col-span-4 text-center py-10">Search failed. Please try again.</p>`;
    } finally {
      setLoading(false);
    }
  }

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Load all issues on mount
  async function init() {
    setLoading(true);
    try {
      const data = await fetchAllIssues();
      allIssues = Array.isArray(data) ? data : (data.issues ?? data.data ?? []);
      updateCounts(allIssues);
      renderIssues(filterByTab(allIssues, currentTab));
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="text-red-500 col-span-4 text-center py-10">Failed to load issues. Please refresh.</p>`;
    } finally {
      setLoading(false);
    }
  }

  init();
  