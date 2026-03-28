import { formatDate, isOpenStatus, normalizeLabels, LABEL_CONFIG, PRIORITY_CONFIG, STATUS_COLORS } from './config.js?v=1774725523436';

function labelPills(labels, withIcons) {
  var list = normalizeLabels(labels);
  if (!list.length) return '';
  return list.map(function(l) {
    var c = LABEL_CONFIG[l.toLowerCase()] || { bg:'#f1f5f9', color:'#64748b', border:'#cbd5e1', icon:'ri-price-tag-3-line' };
    var icon = withIcons ? '<i class="' + c.icon + '" style="font-size:.7rem;margin-right:3px;"></i>' : '';
    return '<span style="background:' + c.bg + ';color:' + c.color + ';border:1.5px solid ' + c.border + ';font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:9999px;display:inline-flex;align-items:center;">' + icon + l.toUpperCase() + '</span>';
  }).join('');
}

function cardLabelPills(labels) {
  var list = normalizeLabels(labels);
  if (!list.length) return '';
  return list.map(function(l) {
    var c = LABEL_CONFIG[l.toLowerCase()];
    var tw = c ? c.tw : 'bg-gray-100 text-gray-600 border border-gray-200';
    return '<span class="label-pill ' + tw + '">' + l + '</span>';
  }).join('');
}

function priorityBadge(priority) {
  if (!priority) return '';
  var key = priority.toUpperCase();
  var cfg = PRIORITY_CONFIG[key] || PRIORITY_CONFIG.LOW;
  return '<span class="' + cfg.cssClass + ' text-xs rounded-full px-2.5 py-0.5 font-semibold">' + key + '</span>';
}

function statusIcon(status) {
  var open = isOpenStatus(status);
  return '<i class="' + (open ? 'ri-checkbox-circle-line text-green-500' : 'ri-close-circle-line text-purple-500') + ' text-lg"></i>';
}

export function buildCard(issue) {
  var open = isOpenStatus(issue.status);
  var border = open ? 'card-open' : 'card-closed';
  var html = '';
  html += '<div class="issue-card ' + border + ' bg-white rounded-lg border border-[#e9ecef] hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2" data-id="' + issue.id + '">';
  html += '<div class="flex items-start justify-between">' + statusIcon(issue.status) + priorityBadge(issue.priority) + '</div>';
  html += '<h3 class="font-semibold text-[#1F2937] text-[.875rem] leading-snug line-clamp-2">' + (issue.title || 'Untitled') + '</h3>';
  html += '<p class="text-[#64748b] text-[.78rem] leading-relaxed line-clamp-3">' + (issue.description || '') + '</p>';
  html += '<div class="flex flex-wrap gap-1 mt-auto pt-1">' + cardLabelPills(issue.labels || issue.label) + '</div>';
  html += '<div class="border-t border-[#f1f5f9] pt-2">';
  html += '<div class="text-[.75rem] text-[#64748b]">#' + (issue.id || '?') + ' by ' + (issue.author || 'Unknown') + '</div>';
  html += '<div class="text-[.75rem] text-[#94a3b8] mt-0.5">' + formatDate(issue.createdAt) + '</div>';
  html += '</div></div>';
  return html;
}

export function buildModal(issue) {
  var open = isOpenStatus(issue.status);
  var author = issue.author || 'Unknown';
  var date = formatDate(issue.createdAt);
  var prio = (issue.priority || '').toUpperCase();
  var statusLabel = open ? 'Opened' : 'Closed';
  var statusBg = open ? STATUS_COLORS.open : STATUS_COLORS.closed;
  var pCfg = PRIORITY_CONFIG[prio] || PRIORITY_CONFIG.LOW;
  var html = '';
  html += '<h2 style="font-size:1.25rem;font-weight:800;color:#111827;margin:0 0 12px;line-height:1.3;">' + (issue.title || 'Untitled') + '</h2>';
  html += '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;">';
  html += '<span style="background:' + statusBg + ';color:#fff;font-size:.75rem;font-weight:700;padding:4px 14px;border-radius:9999px;">' + statusLabel + '</span>';
  html += '<span style="color:#d1d5db;">&#8226;</span>';
  html += '<span style="color:#6b7280;font-size:.82rem;">' + statusLabel + ' by ' + author + '</span>';
  html += '<span style="color:#d1d5db;">&#8226;</span>';
  html += '<span style="color:#6b7280;font-size:.82rem;">' + date + '</span>';
  html += '</div>';
  var labels = normalizeLabels(issue.labels || issue.label);
  if (labels.length) html += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">' + labelPills(labels, true) + '</div>';
  html += '<p style="color:#374151;font-size:.875rem;line-height:1.7;margin:0 0 20px;">' + (issue.description || 'No description provided.') + '</p>';
  html += '<div style="background:#f8fafc;border-radius:10px;padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">';
  html += '<div><p style="font-size:.75rem;color:#9ca3af;margin:0 0 4px;">Assignee:</p><p style="font-size:.9rem;font-weight:700;color:#111827;margin:0;">' + author + '</p></div>';
  html += '<div><p style="font-size:.75rem;color:#9ca3af;margin:0 0 6px;">Priority:</p>';
  if (prio) html += '<span style="background:' + pCfg.hex + ';color:#fff;font-size:.72rem;font-weight:700;padding:3px 16px;border-radius:9999px;display:inline-block;">' + prio + '</span>';
  else html += '<span style="color:#9ca3af;font-size:.82rem;">N/A</span>';
  html += '</div></div>';
  html += '<div style="display:flex;justify-content:flex-end;">';
  html += '<form method="dialog" style="margin:0;"><button style="background:#6366f1;color:#fff;border:none;border-radius:8px;padding:9px 24px;font-size:.875rem;font-weight:600;cursor:pointer;">Close</button></form>';
  html += '</div>';
  return html;
}