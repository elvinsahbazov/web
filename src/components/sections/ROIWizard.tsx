import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

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

export default ROIWizard;
