/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';
import Hero from '../components/sections/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import { fadeUp } from '../lib/motion';
import { C } from '../lib/colors';

// ─────────────────────────────────────────────────────────────────────────────
// 3. AI PREMIUM SECTION
// ─────────────────────────────────────────────────────────────────────────────
const aiCards = [
  {
    icon: 'fas fa-comments',
    title: 'AI Chatbot & Lead Bot',
    color: C.blue,
    gradient: 'from-primary to-primary-dark',
    features: ['24/7 cavab sistemi', 'Lead kvalifikasiyası', 'Avtomatik yönləndirmə', 'CRM sinxronizasiyası'],
    desc: 'Müştərilərinizə 7/24 ani cavab verin. AI chatbot potansial alıcıları avtomatik filtirlayır və satış komandasına yönləndirir.',
  },
  {
    icon: 'fas fa-sitemap',
    title: 'CRM & Lead Management',
    color: C.blue,
    gradient: 'from-primary to-primary-dark',
    features: ['Lead bazası idarəetməsi', 'Status və satış mərhələləri', 'Komanda paneli', 'Avtomatik follow-up'],
    desc: 'Bütün leadləriniz bir yerdə. Satış borusunu izləyin, mərhələlər arası keçişi avtomatlaşdırın, komanda performansını real vaxtda görün.',
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Analytics & Reporting',
    color: C.blue,
    gradient: 'from-primary to-primary-dark',
    features: ['Reklam izləmə & attribution', 'Satış funnel analizi', 'Data əsaslı qərarlar', 'Avtomatik hesabat'],
    desc: 'Hər klikdən hər satışa qədər izləyin. GA4, Meta Pixel, CRM verisi birləşdirilir — bir dashboard-da tam görüntü əldə edin.',
  },
];

import { useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';

function HoverCard({ card, i }: { card: any, i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // For 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const rect = currentTarget.getBoundingClientRect();
    
    // For background gradient glow
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
    
    // For 3D Tilt (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = clientX - rect.left;
    const mouseYPos = clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      {...fadeUp(i * 0.12)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="Kəşf et"
      className="relative group rounded-3xl bg-white/5 border border-white/10 p-8 lg:p-10 overflow-hidden cursor-default transition-all duration-300 hover:border-primary/40"
    >
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${card.color}18, transparent 80%)`,
        }}
      />
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-blue relative z-10`}>
        <i className={`${card.icon} text-white text-xl`} />
      </div>
      <h3 className="font-black text-white text-xl mb-4 tracking-tight relative z-10" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{card.title}</h3>
      <p className="text-white/65 text-sm leading-relaxed mb-8 relative z-10">{card.desc}</p>
      <ul className="space-y-2.5 relative z-10">
        {card.features.map((f: string) => (
          <li key={f} className="flex items-center gap-2.5 text-sm">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-none" style={{ backgroundColor: `${card.color}22` }}>
              <i className="fas fa-check text-[9px]" style={{ color: card.color }} />
            </div>
            <span className="text-white/85 text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
        <a
          href="https://wa.me/994999550001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors"
        >
          Ətraflı öyrən <ArrowRight size={13} />
        </a>
      </div>
    </motion.div>
  );
}

function AIPremiumSection() {
  return (
    <section className="section-py section-black relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.12] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <Container wide className="relative">
        <motion.div {...fadeUp()} className="text-center mb-20 md:mb-28 max-w-4xl mx-auto">
          <span className="section-label">
            <i className="fas fa-robot text-primary" /> AI-Powered Biznes
          </span>
          <h2 className="section-title mt-8">
            Biznes proseslərinizi AI ilə daha<br />
            <span className="text-gradient-blue">sürətli, ölçülə bilən</span> və avtomatik<br />
            idarə olunan sistemə çevirin.
          </h2>
          <p className="section-subtitle mx-auto">
            Manual işlər bitir. AI işçilərinizi avtomatlaşdırır, leadlər itmir, satış böyüyür.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {aiCards.map((card, i) => (
            <HoverCard key={card.title} card={card} i={i} />
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="text-center mt-20">
          <a
            href="https://wa.me/994999550001"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="fab fa-whatsapp text-base" /> Pulsuz AI Konsultasiya Al
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
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
                <span className="text-[10px] font-bold text-white/90 text-center leading-tight px-1 block">{node.label}</span>
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
              <h4 className="font-black text-white text-sm mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{orbitNodes[active].title}</h4>
              <p className="text-xs text-muted leading-relaxed mb-3">{orbitNodes[active].desc}</p>
              <ul className="space-y-1.5">
                {orbitNodes[active].items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/60">
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
              <p className="font-semibold text-white text-xs">{node.title}</p>
              <p className="text-xs text-muted line-clamp-1">{node.desc.slice(0, 45)}...</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ROI CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
type WizardData = { price: number; cogs: number; targetSales: number; adBudget: number; avgCpc: number; ctr: number; convRate: number; channel: string; };

const wizardDefaults: WizardData = { price: 300, cogs: 120, targetSales: 50, adBudget: 1000, avgCpc: 0.25, ctr: 2.5, convRate: 3, channel: 'meta' };

function ROIWizard() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<WizardData>(wizardDefaults);
  const stepLabels = ['Məlumatlar', 'Məqsədlər', 'Reklam & Funnel', 'Nəticələr'];

  const margin = d.price > 0 ? ((d.price - d.cogs) / d.price) * 100 : 0;
  const profitPerSale = d.price - d.cogs;
  const funnelClicks = d.adBudget / Math.max(d.avgCpc, 0.01);
  const funnelLeads = funnelClicks * (d.ctr / 100);
  const funnelSales = funnelLeads * (d.convRate / 100);
  const grossRevenue = funnelSales * d.price;
  const netProfit = grossRevenue - grossRevenue * (d.cogs / d.price) - d.adBudget;
  const roas = d.adBudget > 0 ? grossRevenue / d.adBudget : 0;
  const isProfit = netProfit > 0;
  const targetRevNeeded = d.targetSales * d.price;

  const upd = (k: keyof WizardData, v: string | number) =>
    setD((prev) => ({ ...prev, [k]: typeof v === 'string' && k !== 'channel' ? parseFloat(v) || 0 : v }));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step tabs */}
      <div className="flex gap-1.5 mb-8 p-1.5 bg-black/5 rounded-2xl">
        {stepLabels.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex-1 py-4 text-center text-sm font-bold tracking-wide transition-all ${
              i === step ? 'bg-white text-primary shadow-sm rounded-xl' : i < step ? 'text-white' : 'text-white/45'
            }`}
          >
            <span className="hidden sm:inline">{i + 1}. </span>
            <span className="truncate">{s}</span>
          </button>
        ))}
      </div>
      <div className="h-1 bg-black/5 rounded-full mb-8 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${((step + 1) / 4) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white font-semibold mb-2">Məhsul / Xidmət Qiyməti (₼)</label>
                <input type="number" value={d.price} onChange={(e) => upd('price', e.target.value)} className="input-field" placeholder="300" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white font-semibold mb-2">Maya / Özünə Dəyər (₼)</label>
                <input type="number" value={d.cogs} onChange={(e) => upd('cogs', e.target.value)} className="input-field" placeholder="120" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/6 border border-primary/15 rounded-2xl p-4 text-center">
                <p className="text-xs text-muted mb-1">Marja</p>
                <p className="font-black text-3xl text-primary tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{margin.toFixed(1)}%</p>
              </div>
              <div className="bg-primary/5 border border-black/10 rounded-2xl p-4 text-center">
                <p className="text-xs text-muted mb-1">Hər satışdan qazanc</p>
                <p className="font-black text-3xl text-white tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>₼{profitPerSale}</p>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="btn-primary w-full justify-center">Növbəti Addım <ArrowRight size={15} /></button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3">
                Satış Həcmi (Ay): <span className="text-primary">{d.targetSales}</span>
              </label>
              <input type="range" min="1" max="500" value={d.targetSales} onChange={(e) => upd('targetSales', e.target.value)} className="range-slider w-full" />
              <div className="flex justify-between text-xs text-white/45 mt-1"><span>1</span><span>500</span></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Hədəf satış', value: d.targetSales, color: 'text-primary' },
                { label: 'Hədəf dövriyyə', value: `₼${targetRevNeeded.toLocaleString()}`, color: 'text-white/80' },
                { label: 'Xalis mənfəət', value: `₼${(profitPerSale * d.targetSales).toLocaleString()}`, color: 'text-white/80' },
              ].map((item) => (
                <div key={item.label} className="bg-primary/5 border border-black/10 rounded-2xl p-4 text-center">
                  <p className="text-xs text-muted mb-1">{item.label}</p>
                  <p className={`font-black text-lg tracking-tight ${item.color}`} style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-outline flex-1 justify-center">Geri</button>
              <button onClick={() => setStep(2)} className="btn-primary flex-1 justify-center">Növbəti <ArrowRight size={14} /></button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white font-semibold mb-2">Reklam Kanalı</label>
                <select value={d.channel} onChange={(e) => upd('channel', e.target.value)} className="select-field">
                  <option value="meta">Meta (FB/IG)</option>
                  <option value="google">Google Ads</option>
                  <option value="tiktok">TikTok Ads</option>
                  <option value="yandex">Yandex Direct</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white font-semibold mb-2">Aylıq Reklam Büdcəsi (₼)</label>
                <input type="number" value={d.adBudget} onChange={(e) => upd('adBudget', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white font-semibold mb-2">Ortalama CPC (₼)</label>
                <input type="number" step="0.01" value={d.avgCpc} onChange={(e) => upd('avgCpc', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white font-semibold mb-2">CTR (%)</label>
                <input type="number" step="0.1" value={d.ctr} onChange={(e) => upd('ctr', e.target.value)} className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white font-semibold mb-3">
                Konversiya dərəcəsi: <span className="text-primary font-black">{d.convRate}%</span>
              </label>
              <input type="range" min="0.1" max="20" step="0.1" value={d.convRate} onChange={(e) => upd('convRate', e.target.value)} className="range-slider w-full" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">Geri</button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1 justify-center">Nəticələrə bax <ArrowRight size={14} /></button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
            <div className={`flex items-center gap-3 p-4 rounded-2xl border ${isProfit ? 'bg-primary/5 border-primary/20' : 'bg-black/5 border-black/15'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-none ${isProfit ? 'bg-primary/15' : 'bg-black/10'}`}>
                <i className={`fas ${isProfit ? 'fa-check-circle text-primary' : 'fa-times-circle text-white'} text-xl`} />
              </div>
              <div>
                <p className={`font-black text-base ${isProfit ? 'text-primary' : 'text-white'}`} style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  {isProfit ? 'Səmərəli Kampaniya' : 'Zərərli Kampaniya'}
                </p>
                <p className="text-xs text-muted">{isProfit ? 'Bu parametrlərlə reklam gəlirlidir.' : 'Büdcə və ya konversiya optimallaşdırması lazımdır.'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Kliklər', value: Math.round(funnelClicks).toLocaleString(), color: C.blue, icon: 'fa-mouse-pointer' },
                { label: 'Leadlər', value: Math.round(funnelLeads).toLocaleString(), color: C.blueDark, icon: 'fa-user-plus' },
                { label: 'Satışlar', value: Math.round(funnelSales).toLocaleString(), color: C.blueLight, icon: 'fa-shopping-bag' },
                { label: 'ROAS', value: `${roas.toFixed(1)}x`, color: C.black, icon: 'fa-chart-bar' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-3 text-center" style={{ backgroundColor: `${item.color}0d`, border: `1px solid ${item.color}20` }}>
                  <i className={`fas ${item.icon} text-sm mb-1`} style={{ color: item.color }} />
                  <p className="font-black text-xl tracking-tight" style={{ color: item.color, fontFamily: 'Satoshi, Inter, sans-serif' }}>{item.value}</p>
                  <p className="text-xs text-muted">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-primary rounded-2xl p-4 text-white text-center">
                <p className="text-white/70 text-xs mb-1">Gözlənilən Gəlir</p>
                <p className="font-black text-2xl tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>₼{Math.round(grossRevenue).toLocaleString()}</p>
              </div>
              <div className={`rounded-2xl p-4 text-white text-center ${isProfit ? 'bg-black' : 'bg-black/70'}`}>
                <p className="text-white/70 text-xs mb-1">Xalis Mənfəət</p>
                <p className="font-black text-2xl tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>₼{Math.round(netProfit).toLocaleString()}</p>
              </div>
              <div className="bg-primary-dark rounded-2xl p-4 text-white text-center">
                <p className="text-white/70 text-xs mb-1">Marja</p>
                <p className="font-black text-2xl tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{margin.toFixed(1)}%</p>
              </div>
            </div>
            <p className="text-center text-xs text-white/45">* Bu simulyasiya yalnız istiqamət üçündür. Real nəticələr müxtəlif ola bilər.</p>
            <div className="flex gap-3">
              <button onClick={() => { setStep(0); setD(wizardDefaults); }} className="btn-outline flex-1 justify-center text-sm">
                <i className="fas fa-redo mr-1.5" /> Sıfırla
              </button>
              <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center text-sm">
                <i className="fab fa-whatsapp" /> Məsləhət Al
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. AUTOMATION PROCESS
// ─────────────────────────────────────────────────────────────────────────────
const autoSteps = [
  {
    num: '01', title: 'Proses Auditi', icon: 'fas fa-clipboard-list', color: C.blue,
    desc: 'Biznesinizin mövcud iş axışı, manual tapşırıqlar, zaman itkisi nöqtələri və avtomatlaşdırılabiləcək proseslər müəyyənləşdirilir.',
    items: ['İş axışı xəritəsi', 'Manual tapşırıq analizi', 'Vaxt itkisi nöqtələri', 'Prioritet sıralama'],
  },
  {
    num: '02', title: 'Avtomatlaşdırma Xəritəsi', icon: 'fas fa-project-diagram', color: C.black,
    desc: 'Hər bir proses üçün avtomatlaşdırma ssenarisinin hazırlanması, alət seçimi (Make, Zapier, n8n), inteqrasiya nöqtələrinin müəyyənləşdirilməsi.',
    items: ['Ssenari dizaynı', 'Alət & platforma seçimi', 'İnteqrasiya xəritəsi', 'Test planı'],
  },
  {
    num: '03', title: 'Qurulum və İnteqrasiya', icon: 'fas fa-cogs', color: C.blue,
    desc: 'Seçilmiş alətlərin qurulması, CRM, email, mesajlaşma platformaları ilə inteqrasiyası, ilkin testlər və düzəlişlər.',
    items: ['Sistem qurulumu', 'CRM & email inteqrasiyası', 'WhatsApp & SMS sistemi', 'İlkin test dövrü'],
  },
  {
    num: '04', title: 'Optimizasiya', icon: 'fas fa-tachometer-alt', color: C.black,
    desc: 'Canlı sistemin monitorinqi, performans göstəricilərinə əsasən optimallaşdırma, yeni proses əlavələri və davamlı inkişaf.',
    items: ['Canlı monitorinq', 'Performans analizi', 'Davamlı inkişaf', 'Aylıq hesabat'],
  },
];

function AutomationProcess() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {autoSteps.map((s, i) => (
          <motion.button
            key={s.num}
            onClick={() => setActiveStep(i)}
            whileHover={{ x: 3 }}
            className={`flex-none lg:flex items-center gap-4 text-left p-4 rounded-2xl border transition-all duration-300 min-w-[180px] lg:min-w-0 ${
              activeStep === i ? 'shadow-card' : 'border-black/8 bg-white hover:border-black/15'
            }`}
            style={activeStep === i ? { backgroundColor: `${s.color}0a`, borderColor: `${s.color}25` } : {}}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-none font-black text-sm" style={{ fontFamily: 'Satoshi, Inter, sans-serif', backgroundColor: activeStep === i ? s.color : `${s.color}18`, color: activeStep === i ? '#fff' : s.color }}>
              {s.num}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white text-sm">{s.title}</p>
              <p className="text-xs text-white/60 mt-0.5">{s.items[0]}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-3 card p-8"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-card" style={{ backgroundColor: autoSteps[activeStep].color }}>
              <i className={`${autoSteps[activeStep].icon} text-white text-2xl`} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: autoSteps[activeStep].color }}>Addım {autoSteps[activeStep].num}</span>
              <h3 className="font-black text-white text-xl" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{autoSteps[activeStep].title}</h3>
            </div>
          </div>
          <p className="text-white/60 leading-relaxed mb-6">{autoSteps[activeStep].desc}</p>
          <div className="grid grid-cols-2 gap-3">
            {autoSteps[activeStep].items.map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl" style={{ backgroundColor: `${autoSteps[activeStep].color}08`, border: `1px solid ${autoSteps[activeStep].color}15` }}>
                <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-none" style={{ backgroundColor: `${autoSteps[activeStep].color}20` }}>
                  <i className="fas fa-check text-[10px]" style={{ color: autoSteps[activeStep].color }} />
                </div>
                <span className="text-sm font-medium text-white font-semibold">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {activeStep < 3 && (
              <button onClick={() => setActiveStep(activeStep + 1)} className="btn-primary text-sm">
                Növbəti addım <ArrowRight size={14} />
              </button>
            )}
            {activeStep === 3 && (
              <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                <i className="fab fa-whatsapp" /> Başlayaq!
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. FAQ
// ─────────────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Reklam büdcəsi nə qədər olmalıdır?',
    a: 'Büdcə biznes növünə, hədəf bazara və istənilən nəticəyə görə dəyişir. Ümumiyyətlə, aylıq ₼500-dən başlayan büdcələrlə işləyirik. İlk audit zamanı sizin üçün optimal büdcəni birlikdə müəyyənləşdiririk. Unutmayın: az büdcə ilə sürətli nəticə almaq çətin, amma ağıllı büdcə bölgüsü ilə maksimum ROI əldə etmək mümkündür.',
  },
  {
    q: 'Nəticələrə zəmanət verirsinizmi?',
    a: 'Heç bir reklam agentliyi 100% nəticə zəmanlayamaz — bu sənayedə standart qaydadır. Ancaq biz şəffaf hesabat, data əsasında optimizasiya və davamlı test metodologiyası ilə ən yüksək nəticəni əldə etmək üçün çalışırıq. Hər ay detallı hesabat alacaqsınız və qərarlar birgə qəbul ediləcək.',
  },
  {
    q: 'Hansı platforma mənə daha uyğundur?',
    a: 'Bu, hədəf auditoriyanızdan asılıdır. B2C satış üçün Meta (Facebook/Instagram) və TikTok güclüdür. Axtarış niyyəti olan müştərilər üçün Google Ads ideal seçimdir. B2B üçün LinkedIn effektiv nəticə verir. Yandex isə Rusiya bazarı üçün əvəzolunmazdır. İlk addımda audit aparırıq — sonra optimal platformanı birlikdə seçirik.',
  },
  {
    q: 'Konsultasiya ödənişlidirmi?',
    a: 'İlk konsultasiya PULSUZ! 30-60 dəqiqəlik görüşdə biznesinizi, hədəflərinizi və mövcud vəziyyəti qiymətləndiririk. Bundan sonra sizə uyğun xidmət paketi və büdcə planı təqdim edilir. WhatsApp üzərindən əlaqə saxlayaraq randevu götürün.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
            open === i
              ? 'border-primary/25 bg-white shadow-card'
              : 'border-black/8 bg-white hover:border-black/15'
          }`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-none text-xs font-black ${open === i ? 'bg-primary text-white' : 'bg-black/5 text-muted'}`}>
                {i + 1}
              </div>
              <span className="font-semibold text-white text-sm">{faq.q}</span>
            </div>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={16} className={open === i ? 'text-primary' : 'text-white/45'} />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="px-6 pb-6">
                  <div className="ml-10 text-sm text-white/60 leading-relaxed border-t border-black/8 pt-4">
                    {faq.a}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. FLIP CARDS
// ─────────────────────────────────────────────────────────────────────────────
const flipCards = [
  {
    num: '01', title: 'İnnovativ Yanaşma', icon: 'fas fa-lightbulb', color: C.blue,
    front: 'Hər layihəyə yaradıcı və fərqli perspektivdən yanaşırıq.',
    back: 'Sənayenin ən son trendlərini, AI alətlərini və experiment-əsaslı metodologiyanı birləşdirərək rəqibdən fərqli həllər yaradırıq.',
    backItems: ['Trend analizi', 'AI-powered həllər', 'Creative testing', 'Blue ocean strategiyası'],
  },
  {
    num: '02', title: 'Data-Driven Strategiya', icon: 'fas fa-chart-bar', color: C.black,
    front: 'Hər qərar məlumata əsaslanır. Emosiyalar yox, nəticələr.',
    back: 'GA4, Meta Analytics, CRM məlumatlarını birləşdirib biznesiniz üçün ən effektiv strategiyanı qururuq.',
    backItems: ['GA4 analitika', 'Funnel analizi', 'Attribution model', 'ROI hesabatları'],
  },
  {
    num: '03', title: 'Yaradıcı Həllər', icon: 'fas fa-palette', color: C.blue,
    front: 'Sıradanlıqdan fərqli — istər kontent, istər reklam, istər strategiya.',
    back: 'Hədəf auditoriyanızın diqqətini çəkən, brend səsinizi gücləndirən və konversiya edən kreativ materiallar hazırlayırıq.',
    backItems: ['Creative konsepsiya', 'Video & image ads', 'A/B testlər', 'Brand voice'],
  },
  {
    num: '04', title: 'Funnel Optimizasiyası', icon: 'fas fa-funnel-dollar', color: C.black,
    front: 'Ziyarətçidən müştəriyə gedən yolu mükəmməl edirik.',
    back: 'TOFU, MOFU, BOFU mərhələlərinin hər birini optimizasiya edərək konversiya faizini artırırıq.',
    backItems: ['Landing page CRO', 'Email sekvensləri', 'Retargeting', 'Checkout optimallaşdırma'],
  },
  {
    num: '05', title: 'Biznes Analitikası', icon: 'fas fa-database', color: C.blue,
    front: 'Rəqəmlər arxasındakı həqiqi mənzərəni göstəririk.',
    back: 'Həftəlik/aylıq hesabatlar, custom dashboard, KPI izləmə — bütün məlumatlarınız bir yerdə, anlaşılan formatda.',
    backItems: ['Custom dashboard', 'KPI izləmə', 'Competitor analiz', 'Market intelligence'],
  },
  {
    num: '06', title: 'AI-Optimizasiya', icon: 'fas fa-robot', color: C.black,
    front: 'Süni intellekt kampaniyalarınızı 24/7 optimizasiya edir.',
    back: 'Smart bidding, audience expansion, creative refresh — AI alətləri ilə reklam xərclərinizi azaldır, ROAS-ı artırırıq.',
    backItems: ['Smart bidding', 'AI audience', 'Auto creative', 'Predictive budget'],
  },
];

function FlipCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {flipCards.map((card, i) => (
        <motion.div
          key={card.num}
          {...fadeUp(i * 0.07)}
          className="flip-card"
          style={{ height: 248 }}
        >
          <div className="flip-inner w-full h-full">
            <div className="flip-front bg-white border border-black/8 shadow-card flex flex-col p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${card.color}12` }}>
                  <i className={`${card.icon} text-lg`} style={{ color: card.color }} />
                </div>
                <span className="font-black text-5xl leading-none" style={{ color: `${card.color}12`, fontFamily: 'Satoshi, Inter, sans-serif' }}>{card.num}</span>
              </div>
              <h3 className="font-black text-white text-base mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{card.title}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{card.front}</p>
              <p className="text-xs mt-3 font-semibold" style={{ color: card.color }}>Hover edin →</p>
            </div>
            <div className="flip-back flex flex-col p-6" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)` }}>
              <h3 className="font-black text-white text-sm mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{card.title}</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-4">{card.back}</p>
              <ul className="space-y-1.5 flex-1">
                {card.backItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/90 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-none" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/18 hover:bg-white/28 px-3 py-1.5 rounded-full transition-colors">
                <i className="fab fa-whatsapp" /> Əlaqə
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. FORUM COUNTDOWN
// ─────────────────────────────────────────────────────────────────────────────
function ForumCountdown() {
  const target = new Date('2025-09-15T10:00:00');
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { setErrorMsg('Ad və email məcburidir.'); return; }
    setStatus('loading');
    setErrorMsg('');
    const { error } = await supabase.from('forum_leads').insert({
      full_name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      business_type: form.businessType.trim() || null,
      source: 'forum_block',
    });
    if (error) { setStatus('error'); setErrorMsg('Xəta baş verdi. Yenidən cəhd edin.'); }
    else setStatus('success');
  };

  const boxes = [{ val: time.d, label: 'Gün' }, { val: time.h, label: 'Saat' }, { val: time.m, label: 'Dəqiqə' }, { val: time.s, label: 'Saniyə' }];

  return (
    <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary to-primary-dark p-8 md:p-14 text-white">
      <div className="absolute inset-0 opacity-[0.06]">
        {[150, 260, 350, 440].map((size, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{ width: size, height: size, top: `${[10, 60, 20, 80][i]}%`, left: `${[75, 5, 50, 90][i]}%`, transform: 'translate(-50%,-50%)' }} />
        ))}
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
            <i className="fas fa-calendar-alt" /> Növbəti Forum
          </span>
          <h2 className="display-title text-3xl md:text-4xl text-white mb-3">Digital Marketing Forum 2025</h2>
          <p className="text-white/75 mb-8 leading-relaxed">Azərbaycanın ən böyük rəqəmsal marketinq forumu. Elvin Şahbazov ilə canlı öyrən!</p>
          <div className="flex justify-center lg:justify-start gap-3 mb-8">
            {boxes.map(({ val, label }) => (
              <div key={label} className="countdown-box">
                <span className="font-black text-2xl text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{String(val).padStart(2, '0')}</span>
                <span className="text-white/60 text-xs mt-1">{label}</span>
              </div>
            ))}
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfD-P6RhwGioRtXPreb4P1FsHd5flsJKXvnh7pokAaR4zPhUw/viewform?usp=sharing&ouid=101273263139991444708"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white rounded-full font-semibold text-sm hover:bg-white/25 transition-all"
          >
            <i className="fas fa-external-link-alt text-xs" /> Google Formu Aç
          </a>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-7">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto mb-4 text-white" size={48} />
              <h3 className="font-black text-xl text-white mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Qeydiyyat Alındı!</h3>
              <p className="text-white/75 text-sm">Tezliklə sizinlə əlaqə saxlanılacaq!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h3 className="font-black text-lg text-white mb-1" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Pulsuz Qeydiyyat</h3>
              <p className="text-white/65 text-xs mb-4">Məlumatlarınızı daxil edin, biz sizinlə əlaqə saxlayaq.</p>
              {['Ad Soyad *', 'Email *', 'Telefon (WhatsApp)', 'Biznes növü / Sahə'].map((ph, idx) => (
                <input
                  key={ph}
                  type={idx === 1 ? 'email' : idx === 2 ? 'tel' : 'text'}
                  placeholder={ph}
                  required={idx < 2}
                  value={[form.name, form.email, form.phone, form.businessType][idx]}
                  onChange={(e) => {
                    const keys = ['name', 'email', 'phone', 'businessType'] as const;
                    setForm((f) => ({ ...f, [keys[idx]]: e.target.value }));
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/45 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
              ))}
              {errorMsg && <p className="text-white/80 text-xs bg-white/10 rounded-xl px-3 py-2">{errorMsg}</p>}
              <button
                type="submit" disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary rounded-full font-black text-sm hover:shadow-xl transition-all disabled:opacity-60"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
              >
                {status === 'loading' ? <><i className="fas fa-spinner fa-spin" /> Göndərilir...</> : <><i className="fas fa-ticket-alt" /> Pulsuz Qeydiyyat <ArrowRight size={13} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function IndexPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="relative z-0">
        <Hero />
      </div>

      <div className="relative z-10 bg-transparent">
        <MarqueeTicker />


      <AIPremiumSection />

      <section className="section-py section-alt overflow-hidden">
        <Container wide>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label"><i className="fas fa-sync-alt" /> İş Prosesi</span>
            <h2 className="section-title mt-8">Necə işləyirik?</h2>
            <p className="section-subtitle mx-auto">
              Hər layihə 4 mərhələdən keçir. Detalları görmək üçün orbitdəki nöqtəyə klikləyin.
            </p>
          </motion.div>
          <div className="overflow-x-auto pb-4">
            <RadialTimeline />
          </div>
        </Container>
      </section>


      <section className="section-py section-alt">
        <Container wide>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label"><i className="fas fa-cogs" /> Avtomatlaşdırma</span>
            <h2 className="section-title mt-8">Avtomatlaşdırma Prosesi</h2>
            <p className="section-subtitle mx-auto">
              4 addımda biznesinizi tam avtomatlaşdırırıq. Hər addımı klikləyib ətraflı öyrənin.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <AutomationProcess />
          </motion.div>
        </Container>
      </section>

      <section className="section-py bg-transparent text-white">
        <Container>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label"><i className="fas fa-question-circle" /> Sual & Cavab</span>
            <h2 className="section-title mt-8">Tez-tez verilən suallar</h2>
            <p className="section-subtitle mx-auto">Müştərilərimin ən çox soruşduğu suallar və ətraflı cavablar.</p>
          </motion.div>
          <FAQ />
          <motion.div {...fadeUp(0.3)} className="text-center mt-16 md:mt-20">
            <p className="text-muted mb-6 text-sm">Başqa sualınız var?</p>
            <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <i className="fab fa-whatsapp text-sm" /> WhatsApp-da soruşun
            </a>
          </motion.div>
        </Container>
      </section>

      <section className="section-py section-alt">
        <Container wide>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label"><i className="fas fa-star" /> Niyə Biz?</span>
            <h2 className="section-title mt-8">Xidmətlər & Üstünlüklər</h2>
            <p className="section-subtitle mx-auto">Kartların üzərindən keçin — hər bir xidmətin detallarını görün.</p>
          </motion.div>
          <FlipCards />
        </Container>
      </section>
      <section className="section-py bg-transparent text-white pb-24">
        <Container>
          <ForumCountdown />
        </Container>
      </section>
      </div>

    </div>
  );
}
