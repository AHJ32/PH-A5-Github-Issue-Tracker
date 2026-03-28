// ui.js

function formatDate(d){if(!d)return 'N/A';var x=new Date(d);return (x.getMonth()+1)+'/'+x.getDate()+'/'+x.getFullYear();}

function priorityBadge(priority){
  if(!priority)return '';
  var p=priority.toUpperCase();
  var map={HIGH:'priority-HIGH',MEDIUM:'priority-MEDIUM',LOW:'priority-LOW'};
  return '<span class="'+(map[p]||'priority-LOW')+' text-xs rounded-full px-2.5 py-0.5 font-semibold">'+p+'</span>';
}

function labelPills(labels,withIcons){
  var list=Array.isArray(labels)?labels:(typeof labels==='string'?labels.split(',').map(function(l){return l.trim();}).filter(Boolean):[]);
  if(!list.length)return '';
  var cfg={'bug':{bg:'#fff0eb',color:'#c2410c',border:'#fdba74',icon:'ri-bug-line'},'help wanted':{bg:'#f0fdf4',color:'#15803d',border:'#86efac',icon:'ri-at-line'},'enhancement':{bg:'#f0fdfa',color:'#0d9488',border:'#5eead4',icon:'ri-flashlight-line'},'documentation':{bg:'#eff6ff',color:'#2563eb',border:'#93c5fd',icon:'ri-file-text-line'},'question':{bg:'#faf5ff',color:'#9333ea',border:'#d8b4fe',icon:'ri-question-line'}};
  return list.map(function(l){
    var c=cfg[l.toLowerCase()]||{bg:'#f1f5f9',color:'#64748b',border:'#cbd5e1',icon:'ri-price-tag-3-line'};
    var icon=withIcons?('<i class="'+c.icon+'" style="font-size:.7rem;margin-right:3px;"></i>'):'';
    return '<span style="background:'+c.bg+';color:'+c.color+';border:1.5px solid '+c.border+';font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:9999px;display:inline-flex;align-items:center;">'+icon+l.toUpperCase()+'</span>';
  }).join('');
}

function cardLabelPills(labels){
  var list=Array.isArray(labels)?labels:(typeof labels==='string'?labels.split(',').map(function(l){return l.trim();}).filter(Boolean):[]);
  if(!list.length)return '';
  var colors={'bug':'bg-orange-100 text-orange-600 border border-orange-200','help wanted':'bg-green-100 text-green-700 border border-green-200','enhancement':'bg-teal-100 text-teal-700 border border-teal-200','documentation':'bg-blue-100 text-blue-700 border border-blue-200','question':'bg-purple-100 text-purple-700 border border-purple-200'};
  return list.map(function(l){return '<span class="label-pill '+(colors[l.toLowerCase()]||'bg-gray-100 text-gray-600 border border-gray-200')+'">'+l+'</span>';}).join('');
}

function statusIcon(status){
  var isOpen=(status||'').toLowerCase()==='open';
  return '<i class="'+(isOpen?'ri-checkbox-circle-line text-green-500':'ri-close-circle-line text-purple-500')+' text-lg"></i>';
}

export function buildCard(issue){
  var isOpen=(issue.status||'').toLowerCase()==='open';
  var border=isOpen?'card-open':'card-closed';
  var html='';
  html+='<div class="issue-card '+border+' bg-white rounded-lg border border-[#e9ecef] hover:shadow-md transition-shadow cursor-pointer p-4 flex flex-col gap-2" data-id="'+issue.id+'">';
  html+='<div class="flex items-start justify-between">'+statusIcon(issue.status)+priorityBadge(issue.priority)+'</div>';
  html+='<h3 class="font-semibold text-[#1F2937] text-[.875rem] leading-snug line-clamp-2">'+(issue.title||'Untitled')+'</h3>';
  html+='<p class="text-[#64748b] text-[.78rem] leading-relaxed line-clamp-3">'+(issue.description||'')+'</p>';
  html+='<div class="flex flex-wrap gap-1 mt-auto pt-1">'+cardLabelPills(issue.labels||issue.label)+'</div>';
  html+='<div class="border-t border-[#f1f5f9] pt-2">';
  html+='<div class="text-[.75rem] text-[#64748b]">#'+(issue.id||'?')+' by '+(issue.author||'Unknown')+'</div>';
  html+='<div class="text-[.75rem] text-[#94a3b8] mt-0.5">'+formatDate(issue.createdAt)+'</div>';
  html+='</div></div>';
  return html;
}

export function buildModal(issue){
  var isOpen=(issue.status||'').toLowerCase()==='open';
  var author=issue.author||'Unknown';
  var date=formatDate(issue.createdAt);
  var prio=(issue.priority||'').toUpperCase();
  var prioLow=(issue.priority||'').toLowerCase();
  var statusLabel=isOpen?'Opened':'Closed';
  var statusBg=isOpen?'#22c55e':'#a855f7';
  var prioBoxBg=prioLow==='high'?'#ef4444':prioLow==='medium'?'#f97316':'#94a3b8';
  var labels=Array.isArray(issue.labels)?issue.labels:(issue.label?[issue.label]:[]);
  var html='';
  html+='<h2 style="font-size:1.25rem;font-weight:800;color:#111827;margin:0 0 12px;line-height:1.3;">'+(issue.title||'Untitled')+'</h2>';
  html+='<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;">';
  html+='<span style="background:'+statusBg+';color:#fff;font-size:.75rem;font-weight:700;padding:4px 14px;border-radius:9999px;">'+statusLabel+'</span>';
  html+='<span style="color:#d1d5db;">&#8226;</span>';
  html+='<span style="color:#6b7280;font-size:.82rem;">'+statusLabel+' by '+author+'</span>';
  html+='<span style="color:#d1d5db;">&#8226;</span>';
  html+='<span style="color:#6b7280;font-size:.82rem;">'+date+'</span>';
  html+='</div>';
  if(labels.length)html+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">'+labelPills(issue.labels||issue.label,true)+'</div>';
  html+='<p style="color:#374151;font-size:.875rem;line-height:1.7;margin:0 0 20px;">'+(issue.description||'No description provided.')+'</p>';
  html+='<div style="background:#f8fafc;border-radius:10px;padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">';
  html+='<div><p style="font-size:.75rem;color:#9ca3af;margin:0 0 4px;">Assignee:</p><p style="font-size:.9rem;font-weight:700;color:#111827;margin:0;">'+author+'</p></div>';
  html+='<div><p style="font-size:.75rem;color:#9ca3af;margin:0 0 6px;">Priority:</p>';
  if(prio)html+='<span style="background:'+prioBoxBg+';color:#fff;font-size:.72rem;font-weight:700;padding:3px 16px;border-radius:9999px;display:inline-block;">'+prio+'</span>';
  else html+='<span style="color:#9ca3af;font-size:.82rem;">N/A</span>';
  html+='</div></div>';
  html+='<div style="display:flex;justify-content:flex-end;">';
  html+='<form method="dialog" style="margin:0;"><button style="background:#6366f1;color:#fff;border:none;border-radius:8px;padding:9px 24px;font-size:.875rem;font-weight:600;cursor:pointer;">Close</button></form>';
  html+='</div>';
  return html;
}