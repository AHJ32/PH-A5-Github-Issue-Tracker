// Format date
  export function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  }

  // Priority badge
  function priorityBadge(priority) {
    const p = (priority ?? "").toUpperCase();
    const cls =
      p === "HIGH"   ? "priority-HIGH" :
      p === "MEDIUM" ? "priority-MEDIUM" :
      p === "LOW"    ? "priority-LOW" :
      "priority-LOW";
    if (!priority) return "";
    return `<span class="priority-badge ${cls} text-xs rounded-full px-2.5 py-0.5">${p}</span>`;
  }

  // Label pills
  function labelPills(label) {
    if (!label) return "";
    const labels = Array.isArray(label) ? label : label.split(",").map(l => l.trim()).filter(Boolean);
    const colors = {
      "bug":           "bg-orange-100 text-orange-600 border border-orange-200",
      "help wanted":   "bg-green-100  text-green-700  border border-green-200",
      "enhancement":   "bg-teal-100   text-teal-700   border border-teal-200",
      "documentation": "bg-blue-100   text-blue-700   border border-blue-200",
      "question":      "bg-purple-100 text-purple-700 border border-purple-200",
    };
    return labels.map(l => {
      const key = l.toLowerCase();
      const cls = colors[key] ?? "bg-gray-100 text-gray-600 border border-gray-200";
      return `<span class="label-pill ${cls}">${l}</span>`;
    }).join("");
  }

  // Card icon based on status
  function statusIcon(status) {
    const isOpen = status?.toLowerCase() === "open";
    const color = isOpen ? "text-green-500" : "text-purple-500";
    return `<i class="ri-settings-3-line ${color} text-lg"></i>`;
  }

  // Build a single issue card
  export function buildCard(issue) {
    const isOpen = issue.status?.toLowerCase() === "open";
    const borderClass = isOpen ? "card-open" : "card-closed";

    return `
      <div
        class="issue-card ${borderClass} bg-white rounded-lg border border-[#e9ecef] hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2"
        data-id="${issue.id}"
      >
        <!-- Top row: icon + priority -->
        <div class="flex items-start justify-between">
          ${statusIcon(issue.status)}
          ${priorityBadge(issue.priority)}
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-[#1F2937] text-[.875rem] leading-snug line-clamp-2">${issue.title ?? "Untitled"}</h3>

        <!-- Description -->
        <p class="text-[#64748b] text-[.78rem] leading-relaxed line-clamp-3">${issue.description ?? "No description provided."}</p>

        <!-- Labels -->
        <div class="flex flex-wrap gap-1 mt-auto pt-1">
          ${labelPills(issue.label)}
        </div>

        <!-- Divider + Meta -->
        <div class="border-t border-[#f1f5f9] pt-2">
          <div class="text-[.75rem] text-[#64748b]">#${issue.id ?? "?"} by ${issue.author ?? "Unknown"}</div>
          <div class="text-[.75rem] text-[#94a3b8] mt-0.5">${formatDate(issue.createdAt)}</div>
        </div>
      </div>
    `;
  }

  // Build modal content for an issue
  export function buildModal(issue) {
    const isOpen = issue.status?.toLowerCase() === "open";
    const borderColor = isOpen ? "border-green-500" : "border-purple-500";
    const statusBg = isOpen ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700";

    return `
      <div class="border-t-4 ${borderColor} -mt-1 pt-4">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${statusBg}">${issue.status ?? "Unknown"}</span>
              ${priorityBadge(issue.priority)}
            </div>
            <h2 class="text-[1.1rem] font-bold text-[#1F2937] leading-snug">${issue.title ?? "Untitled"}</h2>
          </div>
        </div>
        <p class="text-[#475569] text-sm mb-4 leading-relaxed">${issue.description ?? "No description provided."}</p>
        <div class="flex flex-wrap gap-1 mb-4">${labelPills(issue.label)}</div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="bg-[#f8fafc] rounded-lg p-3">
            <span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Author</span>
            <span class="text-[#1F2937] font-medium flex items-center gap-1">
              <i class="ri-user-line text-[#94a3b8]"></i> ${issue.author ?? "Unknown"}
            </span>
          </div>
          <div class="bg-[#f8fafc] rounded-lg p-3">
            <span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Priority</span>
            <span class="text-[#1F2937] font-medium">${issue.priority ?? "N/A"}</span>
          </div>
          <div class="bg-[#f8fafc] rounded-lg p-3">
            <span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Label</span>
            <span class="text-[#1F2937] font-medium">${issue.label ?? "N/A"}</span>
          </div>
          <div class="bg-[#f8fafc] rounded-lg p-3">
            <span class="text-[#94a3b8] text-xs uppercase font-semibold block mb-1">Created At</span>
            <span class="text-[#1F2937] font-medium flex items-center gap-1">
              <i class="ri-calendar-line text-[#94a3b8]"></i> ${formatDate(issue.createdAt)}
            </span>
          </div>
        </div>
        <div class="mt-3 text-xs text-[#94a3b8]">Issue #${issue.id ?? "?"}</div>
      </div>
    `;
  }
  