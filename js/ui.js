// ui.js v1774708041125

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    var d = new Date(dateStr);
    return String(d.getMonth()+1) + "/" + String(d.getDate()) + "/" + d.getFullYear();
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
      "bug":           "bg-orange-100 text-orange-600 border border-orange-200",
      "help wanted":   "bg-green-100 text-green-700 border border-green-200",
      "enhancement":   "bg-teal-100 text-teal-700 border border-teal-200",
      "documentation": "bg-blue-100 text-blue-700 border border-blue-200",
      "question":      "bg-purple-100 text-purple-700 border border-purple-200",
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
    var isOpen   = (issue.status||"").toLowerCase() === "open";
    var topColor = isOpen ? "#22c55e" : "#a855f7";

    var statusPill = isOpen
      ? '<span style="background:#dcfce7;color:#16a34a;border:1.5px solid #86efac;font-size:.72rem;font-weight:600;padding:3px 12px;border-radius:9999px;">open</span>'
      : '<span style="background:#f3e8ff;color:#9333ea;border:1.5px solid #d8b4fe;font-size:.72rem;font-weight:600;padding:3px 12px;border-radius:9999px;">closed</span>';

    var prio = (issue.priority||"").toUpperCase();
    var prioPill = "";
    if (prio) {
      var ps = { HIGH:"background:#fce7f3;color:#be185d;border:1.5px solid #f9a8d4;", MEDIUM:"background:#fff7ed;color:#c2410c;border:1.5px solid #fdba74;", LOW:"background:#f1f5f9;color:#64748b;border:1.5px solid #cbd5e1;" };
      prioPill = '<span style="'+(ps[prio]||ps.LOW)+'font-size:.72rem;font-weight:600;padding:3px 12px;border-radius:9999px;">'+prio+"</span>";
    }

    var labels   = Array.isArray(issue.labels) ? issue.labels : (issue.label ? [issue.label] : []);
    var labelsStr = labels.join(", ") || "N/A";
    var author   = issue.author || "Unknown";
    var date     = formatDate(issue.createdAt);
    var pVal     = (issue.priority||"").toLowerCase() || "N/A";

    return (
      '<div style="border-top:3px solid '+topColor+';padding-top:16px;">' +
        '<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">'+statusPill+prioPill+"</div>" +
        '<h2 style="font-size:1.15rem;font-weight:800;color:#111827;margin-bottom:10px;line-height:1.35;">'+(issue.title||"Untitled")+"</h2>" +
        '<p style="color:#4b5563;font-size:.875rem;line-height:1.7;margin-bottom:16px;">'+(issue.description||"No description provided.")+"</p>" +
        (labels.length ? '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">'+labelPills(issue.labels||issue.label)+"</div>" : "") +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:10px;overflow:hidden;margin-bottom:14px;">' +
          '<div style="background:#f8fafc;padding:14px 16px;"><p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px;">AUTHOR</p><p style="font-size:.875rem;font-weight:600;color:#111827;">'+author+"</p></div>" +
          '<div style="background:#f8fafc;padding:14px 16px;"><p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px;">PRIORITY</p><p style="font-size:.875rem;font-weight:600;color:#111827;">'+pVal+"</p></div>" +
          '<div style="background:#f8fafc;padding:14px 16px;"><p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px;">LABELS</p><p style="font-size:.875rem;font-weight:600;color:#111827;">'+labelsStr+"</p></div>" +
          '<div style="background:#f8fafc;padding:14px 16px;"><p style="font-size:.65rem;font-weight:700;color:#9ca3af;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px;">CREATED AT</p><p style="font-size:.875rem;font-weight:600;color:#111827;">'+date+"</p></div>" +
        "</div>" +
        '<p style="font-size:.72rem;color:#9ca3af;">Issue #'+(issue.id||"?")+"</p>" +
      "</div>"
    );
  }
  