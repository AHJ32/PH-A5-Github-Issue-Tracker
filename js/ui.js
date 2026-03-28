// ui.js v1774707800705

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
    var topColor = isOpen ? "#22c55e" : "#a855f7";
    var statusLabel = isOpen ? "open" : "closed";
    var statusBg = isOpen ? "#dcfce7" : "#f3e8ff";
    var statusTxt = isOpen ? "#16a34a" : "#9333ea";
    var priorityVal = (issue.priority||"").toLowerCase();
    var prioColors = { high:"background:#fee2e2;color:#dc2626", medium:"background:#fff7ed;color:#ea580c", low:"background:#f1f5f9;color:#64748b" };
    var prioStyle = prioColors[priorityVal] || "background:#f1f5f9;color:#64748b";
    var labels = Array.isArray(issue.labels) ? issue.labels : (issue.label ? [issue.label] : []);
    var labelsStr = labels.join(", ") || "N/A";

    return (
      '<div style="border-top:3px solid '+topColor+';padding-top:16px;">' +

        /* Row: open pill + HIGH pill */
        '<div style="display:flex;gap:8px;align-items:center;margin-bottom:14px;flex-wrap:wrap;">' +
          '<span style="background:'+statusBg+';color:'+statusTxt+';font-size:.72rem;font-weight:700;padding:3px 12px;border-radius:9999px;border:1px solid '+statusTxt+'20;">'+statusLabel+'</span>' +
          (issue.priority ? '<span style="'+prioStyle+';font-size:.72rem;font-weight:700;padding:3px 12px;border-radius:9999px;">'+issue.priority.toUpperCase()+'</span>' : '') +
        '</div>' +

        /* Title */
        '<h2 style="font-size:1.15rem;font-weight:800;color:#111827;margin-bottom:10px;line-height:1.3;">'+(issue.title||"Untitled")+"</h2>" +

        /* Description */
        '<p style="color:#4b5563;font-size:.875rem;line-height:1.65;margin-bottom:16px;">'+(issue.description||"No description provided.")+"</p>" +

        /* Label pills */
        (labels.length ? '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">'+labelPills(issue.labels||issue.label)+"</div>" : '') +

        /* 2x2 info grid */
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:10px;overflow:hidden;margin-bottom:16px;">' +

          '<div style="background:#f8fafc;padding:14px 16px;">' +
            '<p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px;">AUTHOR</p>' +
            '<p style="font-size:.875rem;font-weight:600;color:#111827;">'+(issue.author||"Unknown")+"</p>" +
          "</div>" +

          '<div style="background:#f8fafc;padding:14px 16px;">' +
            '<p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px;">PRIORITY</p>' +
            '<p style="font-size:.875rem;font-weight:600;color:#111827;">'+priorityVal+"</p>" +
          "</div>" +

          '<div style="background:#f8fafc;padding:14px 16px;">' +
            '<p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px;">LABELS</p>' +
            '<p style="font-size:.875rem;font-weight:600;color:#111827;">'+labelsStr+"</p>" +
          "</div>" +

          '<div style="background:#f8fafc;padding:14px 16px;">' +
            '<p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px;">CREATED AT</p>' +
            '<p style="font-size:.875rem;font-weight:600;color:#111827;">'+formatDate(issue.createdAt)+"</p>" +
          "</div>" +

        "</div>" +

        /* Issue # */
        '<p style="font-size:.72rem;color:#9ca3af;margin-bottom:4px;">Issue #'+(issue.id||"?")+"</p>" +

      "</div>"
    );
  }
  