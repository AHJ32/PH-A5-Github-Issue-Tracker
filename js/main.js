import { fetchAllIssues, searchIssues } from "./api.js";
  import { buildCard, buildModal } from "./ui.js";

  const grid         = document.getElementById("issuesGrid");
  const spinner      = document.getElementById("spinner");
  const noResults    = document.getElementById("noResults");
  const issueCount   = document.getElementById("issueCount");
  const modal        = document.getElementById("issueModal");
  const modalContent = document.getElementById("modalContent");
  const searchInput  = document.getElementById("searchInput");

  let allIssues  = [];
  let currentTab = "all";

  function setLoading(on) {
    if (on) {
      spinner.classList.add("show");
      grid.innerHTML = "";
      noResults.classList.remove("show");
    } else {
      spinner.classList.remove("show");
    }
  }

  // Count reflects whichever issues are currently displayed
  function setCount(issues) {
    issueCount.textContent = `${issues.length} Issue${issues.length !== 1 ? "s" : ""}`;
  }

  function renderIssues(issues) {
    setCount(issues);
    if (!issues.length) {
      grid.innerHTML = "";
      noResults.classList.add("show");
      return;
    }
    noResults.classList.remove("show");
    grid.innerHTML = issues.map(buildCard).join("");
    grid.querySelectorAll(".issue-card").forEach((card) => {
      card.addEventListener("click", () => {
        const issue = allIssues.find((i) => String(i.id) === card.dataset.id);
        if (issue) { modalContent.innerHTML = buildModal(issue); modal.showModal(); }
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
      b.classList.remove("tab-btn-active");
      b.classList.add("bg-white", "text-[#374151]");
    });
    const active = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (active) {
      active.classList.add("tab-btn-active");
      active.classList.remove("bg-white", "text-[#374151]");
    }
  }

  // Tab clicks
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
      searchInput.value = "";
      renderIssues(filterByTab(currentTab));
    });
  });

  // Search
  async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) { renderIssues(filterByTab(currentTab)); return; }
    setLoading(true);
    try {
      const results = await searchIssues(query);
      const map = new Map(allIssues.map((i) => [String(i.id), i]));
      results.forEach((i) => map.set(String(i.id), i));
      allIssues = [...map.values()];
      renderIssues(results);
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="text-red-500 col-span-4 text-center py-10">Search failed.</p>`;
      setCount([]);
    } finally {
      setLoading(false);
    }
  }

  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSearch(); });

  // Init
  async function init() {
    setLoading(true);
    try {
      allIssues = await fetchAllIssues();
      renderIssues(filterByTab(currentTab));
    } catch (err) {
      console.error(err);
      grid.innerHTML = `<p class="text-red-500 col-span-4 text-center py-10">Failed to load issues.</p>`;
      setCount([]);
    } finally {
      setLoading(false);
    }
  }

  init();
  