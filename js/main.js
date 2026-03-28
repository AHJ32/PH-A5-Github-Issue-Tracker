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
    const open   = allIssues.filter((i) => i.status?.toLowerCase() === "open").length;
    const closed = allIssues.filter((i) => i.status?.toLowerCase() === "closed").length;
    issueCount.textContent   = `${allIssues.length} Issue${allIssues.length !== 1 ? "s" : ""}`;
    openCount.textContent    = `${open} Open`;
    closedCount.textContent  = `${closed} Closed`;
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

  function filterByTab(tab) {
    if (tab === "all") return allIssues;
    return allIssues.filter((i) => i.status?.toLowerCase() === tab);
  }

  function setActiveTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("tab-btn-active", "bg-white");
      b.classList.add("bg-white");
    });
    const active = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (active) {
      active.classList.add("tab-btn-active");
      active.classList.remove("bg-white");
    }
  }

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
      searchInput.value = "";
      renderIssues(filterByTab(currentTab));
    });
  });

  // Search on Enter or input change
  async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      renderIssues(filterByTab(currentTab));
      return;
    }
    setLoading(true);
    try {
      const data = await searchIssues(query);
      const results = Array.isArray(data) ? data : (data.issues ?? data.data ?? []);
      // Merge into allIssues for modal lookup
      const map = new Map(allIssues.map((i) => [String(i.id), i]));
      results.forEach((i) => map.set(String(i.id), i));
      allIssues = [...map.values()];
      renderIssues(results);
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="text-red-500 col-span-4 text-center py-10">Search failed. Please try again.</p>`;
    } finally {
      setLoading(false);
    }
  }

  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSearch(); });

  // Prevent New Issue button from doing anything (not required)
  const newIssueBtn = document.getElementById("newIssueBtn");
  if (newIssueBtn) newIssueBtn.addEventListener("click", () => {});

  // Init
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
  