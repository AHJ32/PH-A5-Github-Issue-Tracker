// ui.js v1774707898675

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    var d = new Date(dateStr);
    return String(d.getDate()).padStart(2,"0") + "/" + String(d.getMonth()+1).padStart(2,"0") + "/" + d.getFullYear();
  }

  function priorityBadge(priority) {
    if (!priority) return "";
    var p = priority.toUpperCase();
    var map = { HIGH:"priority-HIGH", MEDIUM:"priority-MEDIUM", LOW:"priority-LOW" };
    return '<span class="' + (map[p]||"priority-LOW") + ' text-xs rounded-full px-2.5 py-0.5 font-semibold">' + p + "</span>";
  }

  function labelPills(labels) {
    var list = Array.isArray(labels) ? labels
      : (typeof labels==="string" ? labels.split(",").map(function(l){return l.trim();}).filter(Boolean) : []);
    if (!list.length) return "";
    var colors = {
      "bug":           "bg-orange-100 text-orange-600 border border-orange-300",
      "help wanted":   "bg-green-100 text-green-700 border border-green-300",
      "enhancement":   "bg-teal-100 text-teal-700 border border-teal-300",
      "documentation": "bg-blue-100 text-blue-700 border border-blue-300",
      "question":      "bg-purple-100 text-purple-700 border border-purple-300",
    };
    return list.map(function(l) {
      var cls = colors[l.toLowerCase()] || "bg-gray-100 text-gray-600 border border-gray-200";
      return '<span class="label-pill ' + cls + '">' + l + "</span>";
    }).join("");
  }

  function statusIcon(status) {
    var isOpen = (status||"").toLowerCase()==="open";
    return '<i class="ri-settings-3-line ' + (isOpen?"text-green-500":"text-purple-500") + ' text-lg"></i>';
  }

  export function buildCard(issue) {
    var isOpen = (issue.status||"").toLowerCase()==="open";
    return (
      '<div class="issue-card '+(isOpen?"card-open":"card-closed")+' bg-white rounded-lg border border-[#e9ecef] hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2" data-id="'+issue.id+'">' +
        '<div class="flex items-start justify-between">'+statusIcon(issue.status)+priorityBadge(issue.priority)+"</div>" +
        '<h3 class="font-semibold text-[#1F2937] text-[.875rem] leading-snug line-clamp-2">'+(issue.title||"Untitled")+"</h3>" +
        '<p class="text-[#64748b] text-[.78rem] leading-relaxed line-clamp-3">'+(issue.description||"")+"</p>" +
        '<div class="flex flex-wrap gap-1 mt-auto pt-1">'+labelPills(issue.labels||issue.label)+"</div>" +
        '<div class="border-t border-[#f1f5f9] pt-2">' +
          '<div class="text-[.75rem] text-[#64748b]">#'+(issue.id||"?")+" by "+(issue.author||"Unknown")+"</div>" +
          '<div class="text-[.75rem] text-[#94a3b8] mt-0.5">'+formatDate(issue.createdAt)+"</div>" +
        "</div>" +
      "</div>"
    );
  }

  export function buildModal(issue) {
    var isOpen = (issue.status||"").toLowerCase()==="open";

    /* Status badge */
    var statusLabel = isOpen ? "Opened" : "Closed";
    var statusStyle = isOpen
      ? "background:#22c55e;color:#fff;font-size:.72rem;font-weight:700;padding:3px 12px;border-radius:9999px;"
      : "background:#a855f7;color:#fff;font-size:.72rem;font-weight:700;padding:3px 12px;border-radius:9999px;";

    /* Priority badge for info box */
    var prio = (issue.priority||"").toUpperCase();
    var prioColors = { HIGH:"#dc2626", MEDIUM:"#ea580c", LOW:"#64748b" };
    var prioStyle = "background:"+(isOpen?"#fee2e2":"#f1f5f9")+";color:"+(prioColors[prio]||"#64748b")+";font-size:.72rem;font-weight:700;padding:3px 14px;border-radius:9999px;";
    if (prio === "HIGH")   prioStyle = "background:#fee2e2;color:#dc2626;font-size:.72rem;font-weight:700;padding:3px 14px;border-radius:9999px;";
    if (prio === "MEDIUM") prioStyle = "background:#fff7ed;color:#ea580c;font-size:.72rem;font-weight:700;padding:3px 14px;border-radius:9999px;";
    if (prio === "LOW")    prioStyle = "background:#f1f5f9;color:#64748b;font-size:.72rem;font-weight:700;padding:3px 14px;border-radius:9999px;";

    var author = issue.author || "Unknown";
    var date   = formatDate(issue.createdAt);

    return (
      /* ① TITLE */
      '<h2 style="font-size:1.2rem;font-weight:800;color:#111827;margin-bottom:12px;line-height:1.3;">'+(issue.title||"Untitled")+"</h2>" +

      /* ② STATUS ROW:  [Opened] • Opened by X • date */
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;">' +
        '<span style="'+statusStyle+'">'+statusLabel+"</span>" +
        '<span style="color:#9ca3af;font-size:.85rem;">&#8226;</span>' +
        '<span style="color:#6b7280;font-size:.82rem;">'+statusLabel+" by "+author+"</span>" +
        '<span style="color:#9ca3af;font-size:.85rem;">&#8226;</span>' +
        '<span style="color:#6b7280;font-size:.82rem;">'+date+"</span>" +
      "</div>" +

      /* ③ LABEL PILLS */
      (issue.labels&&issue.labels.length || issue.label
        ? '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">' + labelPills(issue.labels||issue.label) + "</div>"
        : "") +

      /* ④ DESCRIPTION */
      '<p style="color:#374151;font-size:.875rem;line-height:1.7;margin-bottom:20px;">'+(issue.description||"No description provided.")+"</p>" +

      /* ⑤ 2-COL INFO BOX */
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:10px;overflow:hidden;margin-bottom:20px;">' +
        '<div style="background:#f8fafc;padding:14px 18px;">' +
          '<p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;">Assignee</p>' +
          '<p style="font-size:.9rem;font-weight:700;color:#111827;">'+author+"</p>" +
        "</div>" +
        '<div style="background:#f8fafc;padding:14px 18px;">' +
          '<p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;">Priority</p>' +
          '<span style="'+prioStyle+'">'+prio+"</span>" +
        "</div>" +
      "</div>" +

      /* ⑥ CLOSE BUTTON bottom-right */
      '<div style="display:flex;justify-content:flex-end;">' +
        '<form method="dialog" style="margin:0;">' +
          '<button style="background:#6366f1;color:#fff;border:none;border-radius:8px;padding:8px 22px;font-size:.875rem;font-weight:600;cursor:pointer;letter-spacing:.01em;">Close</button>' +
        "</form>" +
      "</div>"
    );
  }
  