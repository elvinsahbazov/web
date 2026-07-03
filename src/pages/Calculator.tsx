import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, MessageCircle, AlertCircle, Save, Info, Calculator as CalcIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Container from '../components/ui/Container';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type Channel = {
  name: string;
  enabled: boolean;
  budget: number;
  roas: number;
};

type CalcState = {
  presetName: string;
  productPrice: number;
  cogs: number;
  channels: Channel[];
};

const PRESETS: Record<string, { price: number; cogs: number; channels: Channel[] }> = {
  'E-ticarət': { price: 50, cogs: 20, channels: [ { name: 'Meta Ads', enabled: true, budget: 1500, roas: 4.5 }, { name: 'Google Ads', enabled: true, budget: 1000, roas: 3.5 }, { name: 'TikTok Ads', enabled: false, budget: 500, roas: 2.5 }, { name: 'Email M.', enabled: false, budget: 100, roas: 6.0 } ] },
  'Tibb & Klinika': { price: 150, cogs: 30, channels: [ { name: 'Meta Ads', enabled: true, budget: 2000, roas: 3.0 }, { name: 'Google Ads', enabled: true, budget: 3000, roas: 4.0 }, { name: 'TikTok Ads', enabled: false, budget: 500, roas: 1.5 }, { name: 'Email M.', enabled: false, budget: 100, roas: 2.0 } ] },
  'Daşınmaz Əmlak': { price: 150000, cogs: 120000, channels: [ { name: 'Meta Ads', enabled: true, budget: 3000, roas: 15.0 }, { name: 'Google Ads', enabled: true, budget: 5000, roas: 20.0 }, { name: 'TikTok Ads', enabled: false, budget: 1000, roas: 8.0 }, { name: 'Email M.', enabled: false, budget: 500, roas: 5.0 } ] },
  'Restoran / Kafe': { price: 40, cogs: 12, channels: [ { name: 'Meta Ads', enabled: true, budget: 800, roas: 2.5 }, { name: 'Google Ads', enabled: false, budget: 300, roas: 1.5 }, { name: 'TikTok Ads', enabled: true, budget: 400, roas: 3.0 }, { name: 'Email M.', enabled: false, budget: 50, roas: 1.0 } ] },
  'B2B Xidmətlər': { price: 1000, cogs: 300, channels: [ { name: 'Meta Ads', enabled: false, budget: 500, roas: 2.0 }, { name: 'Google Ads', enabled: true, budget: 2500, roas: 5.0 }, { name: 'LinkedIn Ads', enabled: true, budget: 1500, roas: 3.5 }, { name: 'Email M.', enabled: true, budget: 200, roas: 8.0 } ] },
  'Təhsil / Kurslar': { price: 250, cogs: 50, channels: [ { name: 'Meta Ads', enabled: true, budget: 1500, roas: 4.0 }, { name: 'Google Ads', enabled: true, budget: 1000, roas: 3.0 }, { name: 'TikTok Ads', enabled: true, budget: 800, roas: 5.0 }, { name: 'Email M.', enabled: false, budget: 150, roas: 2.0 } ] },
  'Gözəllik & SPA': { price: 80, cogs: 15, channels: [ { name: 'Meta Ads', enabled: true, budget: 1200, roas: 4.5 }, { name: 'Google Ads', enabled: false, budget: 500, roas: 2.0 }, { name: 'TikTok Ads', enabled: true, budget: 700, roas: 3.5 }, { name: 'Email M.', enabled: false, budget: 100, roas: 1.5 } ] },
  'Turizm / Səyahət': { price: 800, cogs: 600, channels: [ { name: 'Meta Ads', enabled: true, budget: 2500, roas: 5.0 }, { name: 'Google Ads', enabled: true, budget: 3500, roas: 6.5 }, { name: 'TikTok Ads', enabled: false, budget: 1000, roas: 3.0 }, { name: 'Email M.', enabled: true, budget: 300, roas: 8.0 } ] },
  'Hüquq / Konsaltinq': { price: 500, cogs: 50, channels: [ { name: 'Meta Ads', enabled: false, budget: 800, roas: 2.0 }, { name: 'Google Ads', enabled: true, budget: 2000, roas: 6.0 }, { name: 'LinkedIn Ads', enabled: true, budget: 1000, roas: 4.0 }, { name: 'Email M.', enabled: false, budget: 100, roas: 3.0 } ] },
  'Fitnes & İdman': { price: 60, cogs: 10, channels: [ { name: 'Meta Ads', enabled: true, budget: 1000, roas: 3.5 }, { name: 'Google Ads', enabled: false, budget: 400, roas: 1.5 }, { name: 'TikTok Ads', enabled: true, budget: 800, roas: 4.0 }, { name: 'Email M.', enabled: false, budget: 100, roas: 2.0 } ] },
  'Tikinti & Təmir': { price: 5000, cogs: 3500, channels: [ { name: 'Meta Ads', enabled: true, budget: 2000, roas: 8.0 }, { name: 'Google Ads', enabled: true, budget: 4000, roas: 12.0 }, { name: 'TikTok Ads', enabled: false, budget: 500, roas: 2.0 }, { name: 'Email M.', enabled: false, budget: 200, roas: 1.0 } ] },
  'Digər': { price: 100, cogs: 40, channels: [ { name: 'Meta Ads', enabled: true, budget: 1000, roas: 3.0 }, { name: 'Google Ads', enabled: true, budget: 1000, roas: 3.0 }, { name: 'TikTok Ads', enabled: false, budget: 500, roas: 2.0 }, { name: 'Email M.', enabled: false, budget: 100, roas: 2.0 } ] },
};

const channelColors: Record<string, string> = {
  'Meta Ads': '#2563eb', // Blue-600
  'Google Ads': '#ef4444', // Red-500
  'TikTok Ads': '#000000',
  'LinkedIn Ads': '#0284c7', // Sky-600
  'Email M.': '#10b981', // Emerald-500
};

export default function Calculator() {
  const [passed, setPassed] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Lead Gen State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitStatus('loading');
    setTimeout(() => {
      localStorage.setItem('calc_user', JSON.stringify({ name, email }));
      setSubmitStatus('idle');
      setPassed(true);
    }, 800);
  };

  useEffect(() => {
    const user = localStorage.getItem('calc_user');
    if (user) {
      try {
        const p = JSON.parse(user);
        if (p.name && p.email) {
          setName(p.name);
          setEmail(p.email);
          setPassed(true);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const [state, setState] = useState<CalcState>(() => {
    const saved = localStorage.getItem('calc_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      presetName: 'E-ticarət',
      productPrice: PRESETS['E-ticarət'].price,
      cogs: PRESETS['E-ticarət'].cogs,
      channels: PRESETS['E-ticarət'].channels,
    };
  });

  const userInfo = (() => {
    try { return JSON.parse(localStorage.getItem('calc_user') || '{}') as { name?: string; email?: string }; } catch { return {}; }
  })();
  const userName = userInfo.name || '';
  const userEmail = userInfo.email || '';

  useEffect(() => {
    if (passed) localStorage.setItem('calc_state', JSON.stringify(state));
  }, [state, passed]);

  // CALCULATION LOGIC
  const margin = state.productPrice > 0
    ? ((state.productPrice - state.cogs) / state.productPrice) * 100
    : 0;

  const enabledChannels = state.channels.filter((c) => c.enabled);
  const totalBudget = enabledChannels.reduce((s, c) => s + c.budget, 0);
  const totalRevenue = enabledChannels.reduce((s, c) => s + c.budget * c.roas, 0);
  const totalProfit = totalRevenue * (margin / 100);
  const netProfit = totalProfit - totalBudget;
  const blendedROAS = totalBudget > 0 ? totalRevenue / totalBudget : 0;
  const breakEvenROAS = margin > 0 ? 100 / margin : 0;
  
  const estSales = state.productPrice > 0 ? totalRevenue / state.productPrice : 0;
  const cpa = estSales > 0 ? totalBudget / estSales : 0;
  const roi = totalBudget > 0 ? (netProfit / totalBudget) * 100 : 0;

  const saveSession = useCallback(async () => {
    if (!passed || !userEmail) return;
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 600);
  }, [passed, userEmail]);

  useEffect(() => {
    const timer = setInterval(saveSession, 60000); // 1 minute auto-save
    return () => clearInterval(timer);
  }, [saveSession]);

  const updatePreset = (pName: string) => {
    const p = PRESETS[pName] || PRESETS['Digər'];
    setState({
      presetName: pName,
      productPrice: p.price,
      cogs: p.cogs,
      channels: JSON.parse(JSON.stringify(p.channels)),
    });
  };

  const updateChannel = (idx: number, field: keyof Channel, val: any) => {
    const newChannels = [...state.channels];
    newChannels[idx] = { ...newChannels[idx], [field]: val };
    setState({ ...state, channels: newChannels });
  };

  // EXPORTS
  const exportPDF = () => {
    alert('PDF ixracı hazırda hazırlanır (simulyasiya). Nəticələrinizi yadda saxladıq.');
  };

  const exportCSV = () => {
    const rows = [
      ['Smart Reklam Hesabatı'],
      ['İstifadəçi', userName],
      ['Baza Növü', state.presetName],
      ['Qiymət', state.productPrice],
      ['Maya Dəyəri', state.cogs],
      ['Marja (%)', margin.toFixed(1)],
      [],
      ['Kanal', 'Büdcə (₼)', 'ROAS', 'Gəlir (₼)', 'Mənfəət (₼)'],
      ...enabledChannels.map((c) => [
        c.name,
        c.budget,
        c.roas,
        (c.budget * c.roas).toFixed(0),
        (c.budget * c.roas * (margin / 100)).toFixed(0),
      ]),
      ['CƏMI', totalBudget, blendedROAS.toFixed(2), totalRevenue.toFixed(0), netProfit.toFixed(0)],
      [],
      ['Əlavə Metriklər'],
      ['Təxmini Satış Sayı', estSales.toFixed(0)],
      ['Orta Müştəri Qazanma Dəyəri (CAC/CPA)', cpa.toFixed(2)],
      ['ROI (İnvestisiya Gəlirliyi)', `${roi.toFixed(1)}%`]
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-roas-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportWhatsApp = () => {
    const msg = `📊 *Smart Reklam Hesabatı PRO*

👤 ${userName}
💼 Sektor: ${state.presetName}

💰 Ümumi Büdcə: ₼${totalBudget.toLocaleString()}
📈 Gözlənilən Gəlir: ₼${totalRevenue.toFixed(0)}
🎯 Blended ROAS: ${blendedROAS.toFixed(2)}x
💵 Xalis Mənfəət: ₼${netProfit.toFixed(0)}
⚠️ Break-Even ROAS: ${breakEvenROAS.toFixed(2)}x

📦 Təxmini Satış: ${estSales.toFixed(0)} ədəd
🤝 Orta CAC / CPA: ₼${cpa.toFixed(2)}
🚀 ROI: ${roi.toFixed(1)}%

_Hesablama elvinsahbazov.com tərəfindən_`;
    window.open(`https://wa.me/994999550001?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // CHARTS
  const doughnutData = {
    labels: enabledChannels.map(c => c.name),
    datasets: [{
      data: enabledChannels.map(c => c.budget),
      backgroundColor: enabledChannels.map(c => channelColors[c.name] || '#3b82f6'),
      borderWidth: 0,
    }],
  };
  
  const barData = {
    labels: enabledChannels.map(c => c.name),
    datasets: [
      {
        label: 'Gəlir (₼)',
        data: enabledChannels.map(c => c.budget * c.roas),
        backgroundColor: '#93c5fd', // blue-300
        borderRadius: 4,
      },
      {
        label: 'Mənfəət (₼)',
        data: enabledChannels.map(c => c.budget * c.roas * (margin / 100)),
        backgroundColor: '#2563eb', // blue-600
        borderRadius: 4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 13 },
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      y: { border: { display: false }, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter' } } },
      x: { border: { display: false }, grid: { display: false }, ticks: { font: { family: 'Inter' } } }
    }
  };

  if (!passed) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-inter text-slate-900 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 shadow-sm mx-auto">
              <CalcIcon size={28} />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Smart Reklam Hesablayıcı <span className="text-blue-600">PRO</span></h1>
            <p className="text-slate-500 text-center text-sm mb-8">
              Reklam büdcənizin gəlirliyini və xalis mənfəəti simulyasiya edərək düzgün qərar verin.
            </p>
            <form onSubmit={handleStart} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Adınız</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Məs: Elvin Şahbazov"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="elaqe@domain.com"
                />
              </div>
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-2"
              >
                {submitStatus === 'loading' ? 'Yüklənir...' : 'Sistemə Daxil Ol'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-inter text-slate-900 selection:bg-blue-500/30">
      <Container>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Smart Reklam Hesablayıcı</h1>
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">PRO</span>
            </div>
            <p className="text-slate-500 text-sm">
              Xoş gəldiniz, <span className="font-semibold text-slate-700">{userName}</span>! Təxmini ROAS və gəlir ssenarilərinizi formalaşdırın.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center text-xs text-slate-400 mr-2">
              {saveStatus === 'saving' && <><Save size={14} className="mr-1 animate-pulse" /> Saxlanılır...</>}
              {saveStatus === 'saved' && <><Save size={14} className="mr-1 text-emerald-500" /> Saxlanıldı</>}
            </div>
            
            <button onClick={exportPDF} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <FileText size={16} /> <span className="hidden sm:inline">PDF</span>
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Download size={16} /> <span className="hidden sm:inline">CSV</span>
            </button>
            <button onClick={exportWhatsApp} className="flex items-center gap-2 px-3 py-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#1DA851] text-sm font-medium rounded-lg hover:bg-[#25D366]/20 transition-colors shadow-sm">
              <MessageCircle size={16} /> <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN (70%) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Card 1: Əsas Məlumatlar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                Əsas Məlumatlar
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Biznes Növü (Preset)</label>
                  <select
                    value={state.presetName}
                    onChange={(e) => updatePreset(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                  >
                    {Object.keys(PRESETS).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Xidmət / Məhsul Qiyməti (₼)</label>
                    <input
                      type="number"
                      value={state.productPrice}
                      onChange={(e) => setState({ ...state, productPrice: +e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Maya Dəyəri (COGS) (₼)</label>
                    <input
                      type="number"
                      value={state.cogs}
                      onChange={(e) => setState({ ...state, cogs: +e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between border border-blue-100">
                <span className="text-sm font-medium text-blue-800">Hesablanmış Ümumi Marja (Gross Margin)</span>
                <span className="text-2xl font-black text-blue-600">{margin.toFixed(1)}%</span>
              </div>
            </motion.div>

            {/* Card 2: Reklam Kanalları */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  Reklam Kanalları
                </h2>
                <div className="bg-amber-50 text-amber-800 border border-amber-200/50 rounded-xl px-3 py-2 text-xs flex gap-2 max-w-sm">
                  <Info size={16} className="shrink-0 mt-0.5 text-amber-600" />
                  <p>
                    <strong className="font-semibold">ROAS nədir?</strong> 1₼ xərc qarşılığında neçə ₼ gəlir gözlədiyinizdir (Məs: 4.5 = 1₼ xərcə 4.5₼ gəlir).
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {state.channels.map((ch, i) => (
                  <div
                    key={ch.name}
                    className={`grid grid-cols-[auto_1fr_120px_100px] gap-4 items-center p-3 rounded-xl border transition-all ${
                      ch.enabled ? 'border-slate-200 bg-white shadow-sm' : 'border-slate-100 bg-slate-50/50 opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={ch.enabled}
                      onChange={(e) => updateChannel(i, 'enabled', e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-3 h-3 rounded-full flex-none" style={{ backgroundColor: channelColors[ch.name] || '#3b82f6' }} />
                      <span className="font-medium text-sm text-slate-700 truncate">{ch.name}</span>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Büdcə (₼)</label>
                      <input
                        type="number"
                        value={ch.budget}
                        onChange={(e) => updateChannel(i, 'budget', +e.target.value)}
                        disabled={!ch.enabled}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none disabled:bg-transparent disabled:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">ROAS (Qat)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={ch.roas}
                        onChange={(e) => updateChannel(i, 'roas', +e.target.value)}
                        disabled={!ch.enabled}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none disabled:bg-transparent disabled:border-transparent transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-sm mb-4">Büdcə Bölgüsü</h3>
                <div className="relative h-48">
                  <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-semibold text-slate-400">CƏMİ</span>
                    <span className="text-lg font-bold">₼{totalBudget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {enabledChannels.map((c) => (
                    <div key={c.name} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: channelColors[c.name] }} />
                        <span className="text-slate-600">{c.name}</span>
                      </div>
                      <span className="font-semibold">₼{c.budget.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-sm mb-4">Gəlir & Mənfəət</h3>
                <div className="h-48">
                  <Bar data={barData} options={chartOptions as any} />
                </div>
                <div className="flex gap-4 mt-4 justify-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-300" />
                    <span className="text-slate-600">Gəlir</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                    <span className="text-slate-600">Mənfəət</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN (30% Sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Total Highlight */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-blue-600 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CalcIcon size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-blue-100 text-sm font-medium mb-1">Ümumi Reklam Büdcəsi</p>
                <p className="text-4xl font-black mb-2 tracking-tight">₼{totalBudget.toLocaleString()}</p>
                <div className="inline-flex items-center px-2 py-1 bg-blue-500/50 rounded text-xs font-semibold">
                  Aktiv kanallar: {enabledChannels.length}
                </div>
              </div>
            </motion.div>

            {/* Metrics List */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="space-y-1">
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium">Gözlənilən Gəlir</span>
                  <span className="font-bold text-blue-600 text-lg">₼{totalRevenue.toFixed(0)}</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium">Xalis Mənfəət</span>
                  <span className={`font-bold text-lg ${netProfit >= 0 ? 'text-blue-600' : 'text-red-500'}`}>₼{netProfit.toFixed(0)}</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5" title="Return on Investment (Sərmayə Gəlirliyi)">
                    ROI <Info size={12} className="text-slate-400" />
                  </span>
                  <span className={`font-bold ${roi >= 0 ? 'text-slate-900' : 'text-red-500'}`}>{roi.toFixed(1)}%</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5" title="Orta hesabla ümumi reklam gəlir qatınız">
                    Blended ROAS <Info size={12} className="text-slate-400" />
                  </span>
                  <span className="font-bold text-slate-900">{blendedROAS.toFixed(2)}x</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5" title="Zərər etməmək üçün minimum tələb olunan ROAS">
                    Break-Even ROAS <Info size={12} className="text-slate-400" />
                  </span>
                  <span className="font-bold text-blue-600">{breakEvenROAS.toFixed(2)}x</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium">Təxmini Satış Sayı</span>
                  <span className="font-bold text-slate-900">{estSales.toFixed(0)} ədəd</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-500 font-medium">Orta CAC / CPA</span>
                  <span className="font-bold text-slate-900">₼{cpa.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Risk Alert */}
            <AnimatePresence>
              {blendedROAS < breakEvenROAS && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 overflow-hidden"
                >
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-red-800 text-sm mb-0.5">Risk Var! Zərər edirsiniz.</h4>
                    <p className="text-xs text-red-600/90 font-medium">
                      Mövcud ROAS göstəriciniz zərərsizlik nöqtəsindən ({(breakEvenROAS - blendedROAS).toFixed(2)}x) aşağıdır. Büdcəni və ya strategiyanızı optimallaşdırın.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
              <p className="text-sm font-medium text-slate-600 mb-4">Hesabatınızı mütəxəssislə müzakirə edin.</p>
              <a
                href="https://wa.me/994999550001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-sm transition-all"
              >
                <MessageCircle size={18} /> Məsləhət Al
              </a>
              <button
                onClick={() => { localStorage.removeItem('calc_user'); setPassed(false); }}
                className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Sistemdən Çıxış
              </button>
            </motion.div>

          </div>
        </div>
      </Container>
    </div>
  );
}
