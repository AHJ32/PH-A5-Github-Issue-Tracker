// main.js v1774707898675
  import { fetchAllIssues, searchIssues } from "./api.js?v=1774707898675";
  import { buildCard, buildModal } from "./ui.js?v=1774707898675";

  var grid        = document.getElementById("issuesGrid");
  var spinner     = document.getElementById("spinner");
  var noResults   = document.getElementById("noResults");
  var issueCount  = document.getElementById("issueCount");
  var modal       = document.getElementById("issueModal");
  var modalContent= document.getElementById("modalContent");
  var searchInput = document.getElementById("searchInput");
  var allIssues   = [];
  var currentTab  = "all";

  function setLoading(on) {
    spinner.style.display = on ? "flex" : "none";
    if (on) { grid.innerHTML = ""; noResults.style.display = "none"; }
  }
  function setCount(n) {
    issueCount.textContent = n + " Issue" + (n!==1?"s":"");
  }
  function renderIssues(issues) {
    setCount(issues.length);
    if (!issues.length) { grid.innerHTML = ""; noResults.style.display="block"; return; }
    noResults.style.display = "none";
    grid.innerHTML = issues.map(buildCard).join("");
    grid.querySelectorAll(".issue-card").forEach(function(card) {
      card.addEventListener("click", function() {
        var issue = allIssues.find(function(i){ return String(i.id)===card.dataset.id; });
        if (issue) { modalContent.innerHTML = buildModal(issue); modal.showModal(); }
      });
    });
  }
  function filterByTab(tab) {
    if (tab==="all") return allIssues;
    return allIssues.filter(function(i){ return (i.status||"").toLowerCase()===tab; });
  }
  function setActiveTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".tab-btn").forEach(function(b) {
      b.classList.remove("tab-btn-active");
    });
    var a = document.querySelector('.tab-btn[data-tab="'+tab+'"]');
    if (a) a.classList.add("tab-btn-active");
  }
  document.querySelectorAll(".tab-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      setActiveTab(btn.dataset.tab);
      searchInput.value="";
      renderIssues(filterByTab(currentTab));
    });
  });
  searchInput.addEventListener("keydown", function(e) {
    if (e.key!=="Enter") return;
    var q = searchInput.value.trim();
    if (!q) { renderIssues(filterByTab(currentTab)); return; }
    setLoading(true);
    searchIssues(q).then(function(results) {
      var map={};
      allIssues.forEach(function(i){ map[String(i.id)]=i; });
      results.forEach(function(i){ map[String(i.id)]=i; });
      allIssues=Object.values(map);
      renderIssues(results);
    }).catch(function(){
      grid.innerHTML='<p class="text-red-500 col-span-4 text-center py-10">Search failed.</p>';
      setCount(0);
    }).finally(function(){ setLoading(false); });
  });
  setLoading(true);
  fetchAllIssues().then(function(data) {
    allIssues=data;
    renderIssues(filterByTab(currentTab));
  }).catch(function(err){
    grid.innerHTML='<p class="text-red-500 col-span-4 text-center py-10">Failed to load issues: '+err.message+"</p>";
    setCount(0);
  }).finally(function(){ setLoading(false); });
  