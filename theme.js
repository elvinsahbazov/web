import fs from 'fs';

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Colors replacement for dark theme
content = content.replace(/bg-slate-50\/50/g, 'bg-[#18181b]/50');
content = content.replace(/bg-slate-50/g, 'bg-[#18181b]');
content = content.replace(/bg-slate-100/g, 'bg-white/5'); 
content = content.replace(/bg-white/g, 'bg-[#09090b]');

content = content.replace(/border-slate-100/g, 'border-white/5');
content = content.replace(/border-slate-200/g, 'border-white/10');
content = content.replace(/border-slate-300/g, 'border-white/20');

content = content.replace(/text-slate-900/g, 'text-white');
content = content.replace(/text-slate-800/g, 'text-white/90');
content = content.replace(/text-slate-700/g, 'text-white/80');
content = content.replace(/text-slate-600/g, 'text-white/70');
content = content.replace(/text-slate-500/g, 'text-white/50');
content = content.replace(/text-slate-400/g, 'text-white/40');

content = content.replace(/focus:bg-white/g, 'focus:bg-[#27272a]');
content = content.replace(/shadow-sm/g, 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]');

content = content.replace(/text-blue-700/g, 'text-blue-400');
content = content.replace(/bg-blue-50/g, 'bg-blue-500/10');
content = content.replace(/hover:bg-slate-50/g, 'hover:bg-white/5');
content = content.replace(/hover:text-slate-900/g, 'hover:text-white');
content = content.replace(/hover:text-slate-700/g, 'hover:text-white/90');

// specifically for the login container background to blend nicely
content = content.replace(/bg-slate-50 min-h-screen/g, 'bg-[#09090b] min-h-screen');
// specifically for the sidebar to blend
content = content.replace(/border-r border-slate-200 bg-white/g, 'border-r border-white/5 bg-[#09090b]');
content = content.replace(/min-h-screen bg-slate-50/g, 'min-h-screen bg-[#09090b]');
content = content.replace(/bg-blue-100 text-blue-700/g, 'bg-blue-500/20 text-blue-400');
content = content.replace(/bg-red-50/g, 'bg-red-500/10');
content = content.replace(/hover:bg-red-50/g, 'hover:bg-red-500/10');
content = content.replace(/text-red-600/g, 'text-red-500');

fs.writeFileSync('src/pages/Admin.tsx', content, 'utf-8');
console.log('Admin.tsx updated to Dark Premium Theme');
