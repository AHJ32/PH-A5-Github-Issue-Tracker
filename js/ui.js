// Format date nicely
  export function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  // Get status badge HTML
  export function statusBadge(status) {
    const isOpen = status?.toLowerCase() === "open";
    const color = isOpen ? "badge-success" : "badge-secondary";
    const icon = isOpen ? "ri-checkbox-circle-line" : "ri-close-circle-line";
    return `<span class="badge ${color} gap-1 text-white"><i class="${icon}"></i> ${status ?? "Unknown"}</span>`;
  }

  // Build a single issue card
  export function buildCard(issue) {
    const isOpen = issue.status?.toLowerCase() === "open";
    const borderClass = isOpen ? "card-open" : "card-closed";

    return `
      <div
        class="issue-card ${borderClass} bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2"
        data-id="${issue.id}"
      >
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-semibold text-[#1F2937] text-[.9rem] line-clamp-2 flex-1">${issue.title ?? "Untitled"}</h3>
          ${statusBadge(issue.status)}
        </div>
        <p class="text-[#64748B] text-[.8rem] line-clamp-3">${issue.description ?? "No description provided."}</p>
        <div class="flex flex-wrap gap-1 mt-1">
          ${issue.label ? `<span class="badge badge-outline text-xs">${issue.label}</span>` : ""}
          ${issue.priority ? `<span class="badge badge-ghost text-xs">P: ${issue.priority}</span>` : ""}
        </div>
        <div class="border-t border-[#F1F5F9] pt-2 mt-auto">
          <div class="flex items-center gap-1 text-xs text-[#64748B]">
            <i class="ri-user-line"></i>
            <span>${issue.author ?? "Unknown"}</span>
          </div>
          <div class="flex items-center gap-1 text-xs text-[#94A3B8] mt-1">
            <i class="ri-calendar-line"></i>
            <span>${formatDate(issue.createdAt)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Build modal content for an issue
  export function buildModal(issue) {
    const isOpen = issue.status?.toLowerCase() === "open";
    const borderColor = isOpen ? "border-green-500" : "border-purple-500";

    return `
      <div class="border-t-4 ${borderColor} pt-4">
        <div class="flex items-start justify-between gap-2 mb-3">
          <h2 class="text-xl font-bold text-[#1F2937] flex-1">${issue.title ?? "Untitled"}</h2>
          ${statusBadge(issue.status)}
        </div>
        <p class="text-[#475569] mb-4 leading-relaxed">${issue.description ?? "No description provided."}</p>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="bg-[#F8FAFC] rounded-lg p-3">
            <span class="text-[#94A3B8] text-xs uppercase font-semibold block mb-1">Author</span>
            <span class="text-[#1F2937] font-medium flex items-center gap-1">
              <i class="ri-user-line"></i> ${issue.author ?? "Unknown"}
            </span>
          </div>
          <div class="bg-[#F8FAFC] rounded-lg p-3">
            <span class="text-[#94A3B8] text-xs uppercase font-semibold block mb-1">Priority</span>
            <span class="text-[#1F2937] font-medium">${issue.priority ?? "N/A"}</span>
          </div>
          <div class="bg-[#F8FAFC] rounded-lg p-3">
            <span class="text-[#94A3B8] text-xs uppercase font-semibold block mb-1">Label</span>
            <span class="text-[#1F2937] font-medium">${issue.label ?? "N/A"}</span>
          </div>
          <div class="bg-[#F8FAFC] rounded-lg p-3">
            <span class="text-[#94A3B8] text-xs uppercase font-semibold block mb-1">Created At</span>
            <span class="text-[#1F2937] font-medium flex items-center gap-1">
              <i class="ri-calendar-line"></i> ${formatDate(issue.createdAt)}
            </span>
          </div>
        </div>
        ${issue.id ? `<div class="mt-3 text-xs text-[#94A3B8]">Issue #${issue.id}</div>` : ""}
      </div>
    `;
  }
  