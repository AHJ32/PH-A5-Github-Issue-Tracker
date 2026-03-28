// GitHub Issues Tracker - UI helpers

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return day + "/" + month + "/" + year;
  }

  function priorityBadge(priority) {
    if (!priority) return "";
    const p = priority.toUpperCase();
    const map = { HIGH: "priority-HIGH", MEDIUM: "priority-MEDIUM", LOW: "priority-LOW" };
    const cls = map[p] || "priority-LOW";
    return '<span class="' + cls + ' text-xs rounded-full px-2.5 py-0.5 font-semibold">' + p + "</span>";
  }

  function priorityBadgeModal(priority) {
    if (!priority) return '<span class="text-gray-500 text-sm">N/A</span>';
    const p = priority.toUpperCase();
    const colors = {
      HIGH:   "background:#fee2e2;color:#dc2626;border:1px solid #fca5a5",
      MEDIUM: "background:#fff7ed;color:#ea580c;border:1px solid #fed7aa",
      LOW:    "background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1",
    };
    const style = colors[p] || colors.LOW;
    return '<span style="' + style + ';display:inline-block;font-size:.72rem;font-weight:700;padding:3px 12px;border-radius:9999px;">' + p + "</span>";
  }

  function labelPills(labels) {
    const list = Array.isArray(labels)
      ? labels
      : (typeof labels === "string" ? labels.split(",").map(function(l){ return l.trim(); }).filter(Boolean) : []);
    if (!list.length) return "";
    const colors = {
      "bug":           "bg-orange-100 text-orange-600 border border-orange-300",
      "help wanted":   "bg-green-100 text-green-700 border border-green-300",
      "enhancement":   "bg-teal-100 text-teal-700 border border-teal-300",
      "documentation": "bg-blue-100 text-blue-700 border border-blue-300",
      "question":      "bg-purple-100 text-purple-700 border border-purple-300",
    };
    const dots = {
      "bug":           "background:#ea580c",
      "help wanted":   "background:#16a34a",
      "enhancement":   "background:#0d9488",
      "documentation": "background:#2563eb",
      "question":      "background:#9333ea",
    };
    return list.map(function(l) {
      var key = l.toLowerCase();
      var cls = colors[key] || "bg-gray-100 text-gray-600 border border-gray-200";
      var dot = dots[key] || "background:#6b7280";
      return (
        '<span class="label-pill ' + cls + '">' +
          '<span style="width:6px;height:6px;border-radius:50%;display:inline-block;margin-right:4px;' + dot + '"></span>' +
          l.toUpperCase() +
        "</span>"
      );
    }).join("");
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
      '<div class="issue-card ' + borderCls + ' bg-white rounded-lg border border-[#e9ecef] hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2" data-id="' + issue.id + '">' +
        '<div class="flex items-start justify-between">' + statusIcon(issue.status) + priorityBadge(issue.priority) + "</div>" +
        '<h3 class="font-semibold text-[#1F2937] text-[.875rem] leading-snug line-clamp-2">' + (issue.title || "Untitled") + "</h3>" +
        '<p class="text-[#64748b] text-[.78rem] leading-relaxed line-clamp-3">' + (issue.description || "") + "</p>" +
        '<div class="flex flex-wrap gap-1 mt-auto pt-1">' + labelPills(issue.labels || issue.label) + "</div>" +
        '<div class="border-t border-[#f1f5f9] pt-2">' +
          '<div class="text-[.75rem] text-[#64748b]">#' + (issue.id || "?") + " by " + (issue.author || "Unknown") + "</div>" +
          '<div class="text-[.75rem] text-[#94a3b8] mt-0.5">' + formatDate(issue.createdAt) + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  export function buildModal(issue) {
    var isOpen = (issue.status || "").toLowerCase() === "open";
    var statusLabel = isOpen ? "Opened" : "Closed";
    var statusStyle = isOpen
      ? "background:#22c55e;color:#fff;"
      : "background:#a855f7;color:#fff;";
    var date = formatDate(issue.createdAt);
    var author = issue.author || "Unknown";

    return (
      '<div style="padding:8px 4px 0;">' +
        /* Title */
        '<h2 style="font-size:1.2rem;font-weight:700;color:#111827;margin-bottom:10px;line-height:1.35;">' + (issue.title || "Untitled") + "</h2>" +

        /* Status row: badge • Opened by X • date */
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;">' +
          '<span style="' + statusStyle + 'font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:9999px;">' + statusLabel + "</span>" +
          '<span style="color:#9ca3af;font-size:.82rem;">•</span>' +
          '<span style="color:#6b7280;font-size:.82rem;">' + statusLabel + " by " + author + "</span>" +
          '<span style="color:#9ca3af;font-size:.82rem;">•</span>' +
          '<span style="color:#6b7280;font-size:.82rem;">' + date + "</span>" +
        "</div>" +

        /* Label pills */
        '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">' +
          labelPills(issue.labels || issue.label) +
        "</div>" +

        /* Description */
        '<p style="color:#4b5563;font-size:.875rem;line-height:1.6;margin-bottom:20px;">' + (issue.description || "No description provided.") + "</p>" +

        /* Assignee + Priority info box */
        '<div style="background:#f9fafb;border-radius:10px;padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">' +
          '<div>' +
            '<p style="font-size:.72rem;color:#9ca3af;font-weight:600;margin-bottom:4px;text-transform:none;">Assignee:</p>' +
            '<p style="font-size:.9rem;font-weight:700;color:#111827;">' + author + "</p>" +
          "</div>" +
          '<div>' +
            '<p style="font-size:.72rem;color:#9ca3af;font-weight:600;margin-bottom:4px;">Priority:</p>' +
            priorityBadgeModal(issue.priority) +
          "</div>" +
        "</div>" +

        /* Close button */
        '<div style="display:flex;justify-content:flex-end;">' +
          '<form method="dialog">' +
            '<button style="background:#6366f1;color:#fff;border:none;border-radius:8px;padding:8px 20px;font-size:.875rem;font-weight:600;cursor:pointer;">Close</button>' +
          "</form>" +
        "</div>" +

      "</div>"
    );
  }
  