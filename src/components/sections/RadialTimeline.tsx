import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

// 4. RADIAL ORBITAL TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
const orbitNodes = [
  {
    id: 0, label: 'Audit & Analiz', icon: 'fas fa-search-dollar', color: C.blue,
    bg: C.blueSoft, darkBg: C.blueSoft,
    title: '1. Audit və Analiz',
    desc: 'Mövcud reklam hesablarının, rəqib mövqeyinin, hədəf auditoriyasının və məlumat strukturunun dərin qiymətləndirilməsi.',
    items: ['Reklam hesabı tam audit', 'Rəqib strategiyası analizi', 'Hədəf auditoriya profili', 'KPI müəyyənləşdirmə'],
  },
  {
    id: 1, label: 'Strategiya Qurulması', icon: 'fas fa-chess', color: C.blue,
    bg: C.blueSoft, darkBg: C.blueSoft,
    title: '2. Strategiya Qurulması',
    desc: 'Data əsasında büdcə bölgüsü, kanallar arası optimal mix, konversiya hunisi və mesajlaşma strategiyasının hazırlanması.',
    items: ['Büdcə optimallaşdırması', 'Kanal mix planlaması', 'Funnel arxitekturası', 'Creative strategiyası'],
  },
  {
    id: 2, label: 'Tətbiq və İcra', icon: 'fas fa-rocket', color: C.blue,
    bg: C.blueSoft, darkBg: C.blueSoft,
    title: '3. Tətbiq və İcra',
    desc: 'Kampaniyalar işə salınır, A/B testlər aparılır, gündəlik optimallaşdırma və real-vaxt monitorinq həyata keçirilir.',
    items: ['Kampaniya aktivasiyası', 'A/B kreativ testlər', 'Real-time monitorinq', 'Gündəlik optimizasiya'],
  },
  {
    id: 3, label: 'Nəticə & İnkişaf', icon: 'fas fa-chart-line', color: C.black,
    bg: C.blueSoft, darkBg: C.blueSoft,
    title: '4. Nəticə və İnkişaf',
    desc: 'Ətraflı ROI/ROAS hesabatları, öyrənilmiş dərslər, böyümə fürsətlərinin müəyyənləşdirilməsi və növbəti dövr planlaması.',
    items: ['ROI & ROAS hesabatı', 'Attribution analizi', 'Böyümə tövsiyələri', 'Növbəti dövr planı'],
  },
];

function RadialTimeline() {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const radius = 185;
  const center = 250;

  useEffect(() => {
    const animate = (ts: number) => {
      if (!paused) {
        const delta = ts - lastRef.current;
        setAngle((a) => (a + delta * 0.018) % 360);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  const handleNode = (id: number) => {
    if (active === id) { setActive(null); setPaused(false); }
    else { setPaused(true); setActive(id); }
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center gap-10 justify-center">
      <div className="relative flex-none" style={{ width: 500, height: 500 }}>
        {[radius - 50, radius, radius + 50].map((r, i) => (
          <div key={i} className="orbit-ring"
            style={{ width: r * 2, height: r * 2, opacity: i === 1 ? 0.18 : 0.07 }} />
        ))}
        <div className="orbit-nucleus">
          <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary to-primary-dark shadow-blue-lg">
            <i className="fas fa-brain text-white text-2xl mb-1" />
            <p className="text-white text-[10px] font-bold leading-tight">Digital<br />Strategy</p>
          </div>
        </div>
        {orbitNodes.map((node, i) => {
          const rad = (angle + i * 90) * (Math.PI / 180);
          const x = center + radius * Math.cos(rad) - 46;
          const y = center + radius * Math.sin(rad) - 46;
          const isActive = active === node.id;
          return (
            <motion.div
              key={node.id}
              className="orbit-node select-none"
              style={{ left: x, top: y, width: 92, height: 92, backgroundColor: node.bg, border: `2px solid ${node.color}${isActive ? '' : '30'}`, boxShadow: isActive ? `0 0 0 3px ${node.color}, 0 8px 30px ${node.color}40` : `0 4px 12px ${node.color}18` }}
              animate={{ scale: isActive ? 1.12 : 1 }}
              onClick={() => handleNode(node.id)}
            >
              <div className="absolute inset-x-0 -bottom-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-bold text-gray-900 text-center leading-tight px-1 block">{node.label}</span>
              </div>
              <i className={`${node.icon} text-xl mb-1`} style={{ color: node.color }} />
            </motion.div>
          );
        })}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="detail-card"
              style={{ width: 280 }}
            >
              <button
                onClick={() => { setActive(null); setPaused(false); }}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-white/45 hover:bg-black/10 transition-colors text-xs font-bold"
              >✕</button>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: orbitNodes[active].bg }}>
                <i className={`${orbitNodes[active].icon} text-lg`} style={{ color: orbitNodes[active].color }} />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{orbitNodes[active].title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{orbitNodes[active].desc}</p>
              <ul className="space-y-1.5">
                {orbitNodes[active].items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ backgroundColor: orbitNodes[active].color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                <i className="fab fa-whatsapp" /> Məsləhət al
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Side legend */}
      <div className="hidden lg:grid grid-cols-1 gap-4 w-72">
        {orbitNodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ x: 4 }}
            onClick={() => handleNode(node.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
              active === node.id ? 'shadow-card' : 'border-transparent hover:bg-primary/5 border-black/8'
            }`}
            style={active === node.id ? { backgroundColor: `${node.color}10`, borderColor: `${node.color}25` } : {}}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-none" style={{ backgroundColor: node.bg }}>
              <i className={`${node.icon} text-sm`} style={{ color: node.color }} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-xs">{node.title}</p>
              <p className="text-xs text-gray-600 line-clamp-1">{node.desc.slice(0, 45)}...</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RadialTimeline;
