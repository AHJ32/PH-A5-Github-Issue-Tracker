// GitHub Issues Tracker — UI helpers

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

function priorityBadge(priority) {
  if (!priority) return "";
  const p = priority.toUpperCase();
  const map = {
    HIGH: "priority-HIGH",
    MEDIUM: "priority-MEDIUM",
    LOW: "priority-LOW",
  };
  const cls = map[p] || "priority-LOW";
  return (
    '<span class="' +
    cls +
    ' text-xs rounded-full px-2.5 py-0.5 font-semibold">' +
    p +
    "</span>"
  );
}

function labelPills(labels) {
  const list = Array.isArray(labels)
    ? labels
    : typeof labels === "string"
      ? labels
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean)
      : [];
  if (!list.length) return "";
  const colors = {
    bug: "bg-orange-100 text-orange-600 border border-orange-200",
    "help wanted": "bg-green-100 text-green-700 border border-green-200",
    enhancement: "bg-teal-100 text-teal-700 border border-teal-200",
    documentation: "bg-blue-100 text-blue-700 border border-blue-200",
    question: "bg-purple-100 text-purple-700 border border-purple-200",
  };
  return list
    .map(function (l) {
      var cls =
        colors[l.toLowerCase()] ||
        "bg-gray-100 text-gray-600 border border-gray-200";
      return '<span class="label-pill ' + cls + '">' + l + "</span>";
    })
    .join("");
}

function statusIcon(status) {
  var isOpen = (status || "").toLowerCase() === "open";
  var color = isOpen ? "text-green-500" : "text-purple-500";
  return '<i class="ri-settings-3-line ' + color + ' text-lg"></i>';
}

export function buildCard(issue) {
  var isOpen = (issue.status || "").toLowerCase() === "open";
  var borderCls = isOpen ? "card-open" : "card-closed";
  return (
    '<div class="issue-card ' +
    borderCls +
    ' bg-white rounded-lg border border-[#e9ecef] hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2" data-id="' +
    issue.id +
    '">' +
    '<div class="flex items-start justify-between">' +
    statusIcon(issue.status) +
    priorityBadge(issue.priority) +
    "</div>" +
    '<h3 class="font-semibold text-[#1F2937] text-[.875rem] leading-snug line-clamp-2">' +
    (issue.title || "Untitled") +
    "</h3>" +
    '<p class="text-[#64748b] text-[.78rem] leading-relaxed line-clamp-3">' +
    (issue.description || "") +
    "</p>" +
    '<div class="flex flex-wrap gap-1 mt-auto pt-1">' +
    labelPills(issue.labels || issue.label) +
    "</div>" +
    '<div class="border-t border-[#f1f5f9] pt-2">' +
    '<div class="text-[.75rem] text-[#64748b]">#' +
    (issue.id || "?") +
    " by " +
    (issue.author || "Unknown") +
    "</div>" +
    '<div class="text-[.75rem] text-[#94a3b8] mt-0.5">' +
    formatDate(issue.createdAt) +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

export function buildModal(issue) {
  var isOpen = (issue.status || "").toLowerCase() === "open";
  var borderColor = isOpen ? "border-green-500" : "border-purple-500";
  var statusBg = isOpen
    ? "bg-green-100 text-green-700"
    : "bg-purple-100 text-purple-700";
  var labels = Array.isArray(issue.labels)
    ? issue.labels
    : issue.label
      ? [issue.label]
      : [];
  return (
    '<div class="border-t-4 ' +
    borderColor +
    ' pt-4">' +
    '<div class="flex items-start gap-2 mb-3 flex-wrap">' +
    '<span class="text-xs font-semibold px-2 py-0.5 rounded-full ' +
    statusBg +
    '">' +
    (issue.status || "Unknown") +
    "</span>" +
    priorityBadge(issue.priority) +
    "</div>" +
    '<h2 class="text-[1.1rem] font-bold text-[#1F2937] mb-2">' +
    (issue.title || "Untitled") +
    "</h2>" +
    '<p class="text-[#475569] text-sm mb-4 leading-relaxed">' +
    (issue.description || "") +
    "</p>" +
    '<div class="flex flex-wrap gap-1 mb-4">' +
    labelPills(issue.labels || issue.label) +
    "</div>" +
    '<div class="grid grid-cols-2 gap-3 text-sm">' +
    '<div class="bg-[#f8fafc] rounded-lg p-3"><span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Author</span><span class="text-[#1F2937] font-medium">' +
    (issue.author || "Unknown") +
    "</span></div>" +
    '<div class="bg-[#f8fafc] rounded-lg p-3"><span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Priority</span><span class="text-[#1F2937] font-medium">' +
    (issue.priority || "N/A") +
    "</span></div>" +
    '<div class="bg-[#f8fafc] rounded-lg p-3"><span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Labels</span><span class="text-[#1F2937] font-medium">' +
    (labels.join(", ") || "N/A") +
    "</span></div>" +
    '<div class="bg-[#f8fafc] rounded-lg p-3"><span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Created At</span><span class="text-[#1F2937] font-medium">' +
    formatDate(issue.createdAt) +
    "</span></div>" +
    "</div>" +
    '<div class="mt-3 text-xs text-[#94a3b8]">Issue #' +
    (issue.id || "?") +
    "</div>" +
    "</div>"
  );
}
