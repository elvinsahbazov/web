import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, MessageCircle, AlertCircle, Save, Info, Calculator as CalcIcon, Target, TrendingUp, Filter, Users, Banknote } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Container from '../components/ui/Container';

const InfoTooltip = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-flex items-center" onMouseLeave={() => setIsOpen(false)}>
      <button
        onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
        onMouseEnter={() => setIsOpen(true)}
        className="p-1 hover:bg-slate-100 rounded-full transition-colors ml-0.5 focus:outline-none"
      >
        <Info size={14} className={isOpen ? "text-blue-600" : "text-slate-400"} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-50 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-bold mb-1 text-blue-200">{title}</div>
            <div className="text-slate-200 leading-relaxed font-normal whitespace-normal">{content}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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
  fixedCosts: number;
  channels: Channel[];
};

type ForecastState = {
  targetRevenue: number;
  cpl: number;
  conversionRate: number;
};

const ALL_CHANNELS = [
  'Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 
  'Influencer & PR', 'SEO & Məzmun', 'E-mail & SMS', 'Snapchat / X Ads', 'Offline / TV'
];

const createChannels = (actives: Record<string, number>): Channel[] => {
  return ALL_CHANNELS.map(name => ({
    name,
    enabled: name in actives,
    budget: 0,
    roas: actives[name] || 2.0
  }));
};

const PRESETS: Record<string, { price: number; cogs: number; fixedCosts: number; channels: Channel[] }> = {
  'E-ticarət': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 4.5, 'Google Ads': 3.5, 'TikTok Ads': 2.5, 'E-mail & SMS': 6.0, 'Influencer & PR': 3.0 }) },
  'Tibb & Klinika': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 3.0, 'Google Ads': 4.0, 'SEO & Məzmun': 5.0, 'Offline / TV': 1.5 }) },
  'Daşınmaz Əmlak': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 15.0, 'Google Ads': 20.0, 'LinkedIn Ads': 10.0, 'Offline / TV': 5.0 }) },
  'Restoran / Kafe': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 2.5, 'TikTok Ads': 3.0, 'Influencer & PR': 2.5, 'Offline / TV': 1.0 }) },
  'B2B Xidmətlər': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Google Ads': 5.0, 'LinkedIn Ads': 4.5, 'E-mail & SMS': 8.0, 'SEO & Məzmun': 4.0 }) },
  'Təhsil / Kurslar': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 4.0, 'Google Ads': 3.0, 'TikTok Ads': 5.0, 'Influencer & PR': 3.5 }) },
  'Gözəllik & SPA': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 4.5, 'TikTok Ads': 3.5, 'Influencer & PR': 4.0 }) },
  'Turizm / Otel': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 5.0, 'Google Ads': 6.0, 'SEO & Məzmun': 4.0, 'Influencer & PR': 3.0 }) },
  'Hüquq / Konsaltinq': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Google Ads': 4.5, 'LinkedIn Ads': 4.0, 'SEO & Məzmun': 3.5 }) },
  'Fitnes / İdman': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 3.5, 'TikTok Ads': 4.0, 'Influencer & PR': 2.5 }) },
  'Tikinti / Təmir': { price: 0, cogs: 0, fixedCosts: 0, channels: createChannels({ 'Meta Ads': 6.0, 'Google Ads': 5.0, 'Offline / TV': 3.0 }) }
};

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<'roas' | 'forecast'>('roas');
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    setPassed(true);
  }, []);

  const [state, setState] = useState<CalcState>(() => {
    const saved = localStorage.getItem('calc_state');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        // Force refresh if old channel list length (not 9)
        if (parsed && parsed.channels && parsed.channels.length === ALL_CHANNELS.length) {
          return parsed; 
        }
      } catch (e) { /* ignore */ }
    }
    return {
      presetName: 'E-ticarət',
      productPrice: PRESETS['E-ticarət'].price,
      cogs: PRESETS['E-ticarət'].cogs,
      fixedCosts: PRESETS['E-ticarət'].fixedCosts || 0,
      channels: PRESETS['E-ticarət'].channels,
    };
  });

  const [forecastState, setForecastState] = useState<ForecastState>(() => {
    const saved = localStorage.getItem('calc_forecast_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      targetRevenue: 10000,
      cpl: 2.0,
      conversionRate: 5.0
    };
  });

  const userInfo = (() => {
    try { return JSON.parse(localStorage.getItem('calc_user') || '{}') as { name?: string; email?: string }; } catch { return {}; }
  })();
  const userName = userInfo.name || '';

  useEffect(() => {
    if (passed) {
      localStorage.setItem('calc_state', JSON.stringify(state));
      localStorage.setItem('calc_forecast_state', JSON.stringify(forecastState));
    }
  }, [state, forecastState, passed]);

  // ROAS CALCULATION LOGIC
  const margin = state.productPrice > 0 ? ((state.productPrice - state.cogs) / state.productPrice) * 100 : 0;
  const enabledChannels = state.channels.filter((c) => c.enabled);
  const totalBudget = enabledChannels.reduce((s, c) => s + c.budget, 0);
  const totalRevenue = enabledChannels.reduce((s, c) => s + c.budget * c.roas, 0);
  const totalProfit = totalRevenue * (margin / 100);
  const fixedCosts = state.fixedCosts || 0;
  const netProfit = totalProfit - totalBudget - fixedCosts;
  const blendedROAS = totalBudget > 0 ? totalRevenue / totalBudget : 0;
  const breakEvenROAS = margin > 0 ? 100 / margin : 0;
  const estSales = state.productPrice > 0 ? totalRevenue / state.productPrice : 0;
  const cpa = estSales > 0 ? totalBudget / estSales : 0;
  const roi = totalBudget > 0 ? (netProfit / totalBudget) * 100 : 0;

  // FORECAST CALCULATION LOGIC
  const f_salesNeeded = state.productPrice > 0 ? forecastState.targetRevenue / state.productPrice : 0;
  const f_leadsNeeded = forecastState.conversionRate > 0 ? f_salesNeeded / (forecastState.conversionRate / 100) : 0;
  const f_requiredBudget = f_leadsNeeded * forecastState.cpl;
  const f_expectedROAS = f_requiredBudget > 0 ? forecastState.targetRevenue / f_requiredBudget : 0;

  const loadPreset = (presetName: string) => {
    const p = PRESETS[presetName];
    if (p) {
      setState(s => ({
        ...s,
        presetName,
        channels: p.channels,
      }));
    }
  };

  const updateChannel = (idx: number, field: keyof Channel, value: number | boolean) => {
    setState(s => {
      const newChannels = [...s.channels];
      newChannels[idx] = { ...newChannels[idx], [field]: value };
      return { ...s, channels: newChannels };
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const generateReportText = () => {
    if (activeTab === 'roas') {
      return `📊 *ROAS VƏ QAZANC HESABATIM*

🏢 Sektor: ${state.presetName}
💰 Məhsul Qiyməti: ₼${state.productPrice}
📦 Maya Dəyəri: ₼${state.cogs}

💸 Ümumi Büdcə: ₼${totalBudget}
📈 Gözlənilən Gəlir: ₼${totalRevenue.toFixed(0)}
💎 Xalis Mənfəət: ₼${netProfit.toFixed(0)}

🚀 ROI: ${roi.toFixed(1)}%
🎯 Blended ROAS: ${blendedROAS.toFixed(2)}x
⚖️ Break-Even ROAS: ${breakEvenROAS.toFixed(2)}x
🛍 Təxmini Satış: ${estSales.toFixed(0)} ədəd

_Bu hesabat Elvin Şahbazov-un ROAS Hesablayıcısı tərəfindən generasiya edilmişdir._`;
    } else {
      return `🔮 *MARKETİNQ PROQNOZ HESABATIM*

🎯 Hədəf Gəlir: ₼${forecastState.targetRevenue.toLocaleString()}
💰 Məhsul Qiyməti: ₼${state.productPrice}

📊 *Hədəfə Çatmaq Üçün Tələblər:*
💸 Tələb Olunan Büdcə: ₼${f_requiredBudget.toFixed(0)}
📩 Tələb Olunan Mesaj/Lead: ${f_leadsNeeded.toFixed(0)} ədəd
🛍 Tələb Olunan Satış: ${f_salesNeeded.toFixed(0)} ədəd

🎯 Gözlənilən ROAS: ${f_expectedROAS.toFixed(2)}x

_Bu hesabat Elvin Şahbazov-un Proqnoz Paneli tərəfindən generasiya edilmişdir._`;
    }
  };

  const exportWhatsApp = () => {
    const msg = generateReportText();
    window.open(`https://wa.me/994999550001?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-inter">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs mb-4">
              <TrendingUp size={16} /> Data-Driven Marketinq
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
              Marketinq & <span className="text-blue-600">ROAS</span> Paneli
            </h1>
            <p className="text-slate-500 text-lg">Xərclərinizi hesablayın və ya hədəflərinizə çatmaq üçün proqnozlar qurun.</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => window.print()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all print-hide"
            >
              <FileText size={18} /> PDF
            </button>
            <button
              onClick={exportWhatsApp}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all print-hide"
            >
              <MessageCircle size={18} /> WhatsApp <span className="hidden sm:inline">ilə Göndər</span>
            </button>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-slate-200/60 rounded-2xl w-full max-w-sm mb-8 relative">
          <button
            onClick={() => setActiveTab('roas')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all z-10 ${
              activeTab === 'roas' ? 'text-blue-700 shadow-sm bg-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <CalcIcon size={16} /> ROAS Hesablayıcı
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all z-10 ${
              activeTab === 'forecast' ? 'text-blue-700 shadow-sm bg-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Target size={16} /> Proqnoz Paneli
          </button>
        </div>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: ROAS CALCULATOR */}
          {activeTab === 'roas' && (
            <motion.div key="roas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* 1. Presets */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Filter size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Sənaye Şablonları</h2>
                      <p className="text-sm text-slate-500">Biznes növünüzü seçin, ortalama ROAS dəyərləri avtomatik yüklənsin.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(PRESETS).map(p => (
                      <button
                        key={p}
                        onClick={() => loadPreset(p)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          state.presetName === p
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Basic Data */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Məhsul/Xidmət Məlumatları</h2>
                      <p className="text-sm text-slate-500">Dəqiq mənfəəti (Marrjı) hesablamaq üçün daxil edin.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Orta Satış Qiyməti (AOV) ₼</label>
                      <input
                        type="number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={state.productPrice === 0 ? '' : state.productPrice}
                        onChange={(e) => setState(s => ({ ...s, productPrice: Number(e.target.value) }))}
                        onFocus={handleFocus}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Məhsulun Maya Dəyəri (COGS) ₼</label>
                      <input
                        type="number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={state.cogs === 0 ? '' : state.cogs}
                        onChange={(e) => setState(s => ({ ...s, cogs: Number(e.target.value) }))}
                        onFocus={handleFocus}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Aylıq Sabit Xərclər (Agentlik, Çəkiliş, Alətlər) ₼
                        <InfoTooltip title="Sabit Xərclər" content="Marketinq agentliyi, SMM, çəkiliş komandası, proqramlar kimi reklam büdcəsi xaricindəki əlavə aylıq xərclər." />
                      </label>
                      <input
                        type="number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={state.fixedCosts === 0 ? '' : state.fixedCosts}
                        onChange={(e) => setState(s => ({ ...s, fixedCosts: Number(e.target.value) }))}
                        onFocus={handleFocus}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {state.productPrice > 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100">
                      Mənfəət Marjı: {margin.toFixed(1)}%
                    </div>
                  )}
                </div>

                {/* 3. Channels */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Target size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Reklam Kanalları</h2>
                      <p className="text-sm text-slate-500">Aylıq reklam büdcənizi və hədəf ROAS-ı daxil edin.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 text-sm">
                          <th className="pb-3 font-semibold w-12">Aktiv</th>
                          <th className="pb-3 font-semibold">Kanal Adı</th>
                          <th className="pb-3 font-semibold w-40">Büdcə (₼)</th>
                          <th className="pb-3 font-semibold w-32">Hədəf ROAS</th>
                          <th className="pb-3 font-semibold text-right">Gözlənilən Gəlir</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {state.channels.map((channel, idx) => (
                          <tr key={idx} className={`transition-colors ${!channel.enabled ? 'opacity-50 grayscale' : ''}`}>
                            <td className="py-4">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={channel.enabled}
                                  onChange={(e) => updateChannel(idx, 'enabled', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </td>
                            <td className="py-4 font-bold text-slate-700">{channel.name}</td>
                            <td className="py-4 pr-4">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₼</span>
                                <input
                                  type="number"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                                  value={channel.budget === 0 ? '' : channel.budget}
                                  onChange={(e) => updateChannel(idx, 'budget', Number(e.target.value))}
                                  onFocus={handleFocus}
                                  disabled={!channel.enabled}
                                  placeholder="0"
                                />
                              </div>
                            </td>
                            <td className="py-4 pr-4">
                              <div className="relative">
                                <input
                                  type="number"
                                  step="0.1"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                                  value={channel.roas === 0 ? '' : channel.roas}
                                  onChange={(e) => updateChannel(idx, 'roas', Number(e.target.value))}
                                  onFocus={handleFocus}
                                  disabled={!channel.enabled}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">x</span>
                              </div>
                            </td>
                            <td className="py-4 text-right font-black text-slate-900">
                              ₼{(channel.budget * channel.roas).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Chart View */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 overflow-hidden">
                  <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                    Məsrəf vs Gəlir Qrafiki
                  </h3>
                  <div className="h-64 w-full">
                    <Bar 
                      data={{
                        labels: enabledChannels.map(c => c.name),
                        datasets: [
                          { label: 'Büdcə (Məsrəf)', data: enabledChannels.map(c => c.budget), backgroundColor: '#cbd5e1', borderRadius: 4 },
                          { label: 'Gözlənilən Gəlir', data: enabledChannels.map(c => c.budget * c.roas), backgroundColor: '#3b82f6', borderRadius: 4 },
                          { label: 'Xalis Mənfəət', data: enabledChannels.map(c => (c.budget * c.roas) * (margin / 100) - c.budget), backgroundColor: '#10b981', borderRadius: 4 }
                        ]
                      }}
                      options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }, plugins: { legend: { display: false } } }}
                    />
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                <div className="bg-blue-600 rounded-3xl shadow-md p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 opacity-10">
                    <CalcIcon size={140} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-2">Ümumi Reklam Büdcəsi</p>
                    <p className="text-4xl md:text-5xl font-black mb-3 tracking-tight">₼{totalBudget.toLocaleString()}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-500 rounded-lg text-xs font-bold border border-blue-400">
                      Aktiv kanallar: {enabledChannels.length}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold">Gözlənilən Gəlir</span>
                      <span className="font-black text-slate-900 text-xl">₼{totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold">Xalis Mənfəət</span>
                      <span className={`font-black text-xl ${netProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>₼{netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold flex items-center">
                        ROI
                        <InfoTooltip title="Return on Investment" content="Sərmayə Gəlirliyi. Yatırılan hər 1 ₼ reklam büdcəsindən əldə edilən xalis gəlir faizidir." />
                      </span>
                      <span className={`font-black text-lg ${roi >= 0 ? 'text-blue-600' : 'text-red-500'}`}>{roi.toFixed(1)}%</span>
                    </div>
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold flex items-center">
                        Blended ROAS
                        <InfoTooltip title="Blended ROAS (Ümumi ROAS)" content="Bütün reklam kanallarının cəmindən əldə edilən orta gəlir qatıdır. Reklamın ümumi səmərəliliyini göstərir." />
                      </span>
                      <span className="font-black text-slate-900 text-lg">{blendedROAS.toFixed(2)}x</span>
                    </div>
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold flex items-center">
                        Break-Even ROAS
                        <InfoTooltip title="Break-Even ROAS (Zərərsizlik Nöqtəsi)" content="Reklamdan zərər etməmək (sıfıra-sıfır çıxmaq) üçün əldə etməli olduğunuz minimum ROAS dəyəridir." />
                      </span>
                      <span className="font-black text-blue-600 text-lg">{breakEvenROAS.toFixed(2)}x</span>
                    </div>
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold">Təxmini Satış</span>
                      <span className="font-black text-slate-900 text-lg">{estSales.toFixed(0)} ədəd</span>
                    </div>
                    <div className="h-px w-full bg-slate-100" />
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-slate-500 font-bold flex items-center">
                        Orta CAC / CPA
                        <InfoTooltip title="CAC (Müştəri Əldəetmə Xərci)" content="1 yeni məhsul sifarişi (və ya müştəri) qazanmaq üçün xərclənən orta reklam məbləğidir." />
                      </span>
                      <span className="font-black text-slate-900 text-lg">₼{cpa.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {blendedROAS < breakEvenROAS && blendedROAS > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 border border-red-200 rounded-3xl p-6 flex gap-4">
                      <AlertCircle className="text-red-500 shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="font-black text-red-900 mb-1">Kritik Risk! Zərər edirsiniz.</h4>
                        <p className="text-sm text-red-700 font-medium leading-relaxed">
                          Mövcud ROAS göstəriciniz zərərsizlik nöqtəsindən ({(breakEvenROAS - blendedROAS).toFixed(2)}x) aşağıdır. Ya məhsulun satış qiymətini qaldırın, ya da reklam optimizasiyası edin.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FORECAST PANEL */}
          {activeTab === 'forecast' && (
            <motion.div key="forecast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: INPUTS */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* 1. Məhsul Qiyməti (Shared) */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Baza Məlumatı</h2>
                      <p className="text-sm text-slate-500">Məhsul və ya Xidmətinizin satış qiyməti.</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Orta Satış Qiyməti (AOV) ₼</label>
                    <input
                      type="number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={state.productPrice === 0 ? '' : state.productPrice}
                      onChange={(e) => setState(s => ({ ...s, productPrice: Number(e.target.value) }))}
                      onFocus={handleFocus}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* 2. Forecast Variables */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                      <Target size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Hədəf Dəyişənləri</h2>
                      <p className="text-sm text-slate-500">Qazanmaq istədiyiniz məbləğ və dönüşüm (conversion) ehtimalları.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
                        Hədəflənən Gəlir ₼
                        <InfoTooltip title="Hədəf Gəlir" content="Bu ay reklamdan qazanmaq istədiyiniz ümumi dövriyyə məbləği." />
                      </label>
                      <input
                        type="number"
                        className="w-full bg-indigo-50/50 border border-indigo-200 rounded-xl px-4 py-4 text-xl font-black text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={forecastState.targetRevenue === 0 ? '' : forecastState.targetRevenue}
                        onChange={(e) => setForecastState(s => ({ ...s, targetRevenue: Number(e.target.value) }))}
                        onFocus={handleFocus}
                        placeholder="Məs: 50000"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
                          Mesaj/Lead Xərci (CPL) ₼
                          <InfoTooltip title="CPL / CPM" content="1 potensial müştəridən mesaj almaq, yaxud nömrəsini götürmək sizə neçəyə başa gəlir? (Məs: 1.5 AZN)" />
                        </label>
                        <input
                          type="number" step="0.1"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          value={forecastState.cpl === 0 ? '' : forecastState.cpl}
                          onChange={(e) => setForecastState(s => ({ ...s, cpl: Number(e.target.value) }))}
                          onFocus={handleFocus}
                          placeholder="1.5"
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
                          Çevrilmə Faizi (CR) %
                          <InfoTooltip title="Conversion Rate (CR)" content="Sizə yazan və ya müraciət edən hər 100 nəfərdən orta hesabla neçəsi məhsulu alır? (Məs: 10%)" />
                        </label>
                        <input
                          type="number" step="0.1"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          value={forecastState.conversionRate === 0 ? '' : forecastState.conversionRate}
                          onChange={(e) => setForecastState(s => ({ ...s, conversionRate: Number(e.target.value) }))}
                          onFocus={handleFocus}
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: RESULTS & FUNNEL */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="bg-indigo-600 rounded-3xl shadow-md p-6 md:p-10 text-white relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-4 opacity-10">
                    <Target size={180} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">Hədəfə Çatmaq Üçün Tələb Olunan Büdcə</p>
                    <p className="text-4xl md:text-5xl font-black mb-1 tracking-tight">₼{f_requiredBudget.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <p className="text-indigo-200 font-medium text-sm mt-3">Bu məbləği xərcləyərək {forecastState.targetRevenue.toLocaleString()} ₼ qazana bilərsiniz.</p>
                  </div>
                </div>

                {/* The Funnel */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                    Proqnoz Qıfı (Funnel)
                  </h3>

                  <div className="space-y-3 relative">
                    
                    {/* Stage 1: Traffic/Leads */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between z-10 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Tələb Olunan Müraciət</p>
                          <p className="font-bold text-slate-900">{f_leadsNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })} Lead (Mesaj)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Büdcə Xərci</p>
                        <p className="font-bold text-red-500">-₼{f_requiredBudget.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>

                    {/* Funnel Arrow */}
                    <div className="w-full flex justify-center -my-2 relative z-0">
                      <div className="w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300">
                        ↓
                      </div>
                    </div>

                    {/* Stage 2: Sales */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between z-10 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                          <CalcIcon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Tələb Olunan Satış</p>
                          <p className="font-bold text-slate-900">{f_salesNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })} Satış (Sifariş)</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Dönüşüm</p>
                        <p className="font-bold text-slate-900">{forecastState.conversionRate}%</p>
                      </div>
                    </div>

                    {/* Funnel Arrow */}
                    <div className="w-full flex justify-center -my-2 relative z-0">
                      <div className="w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300">
                        ↓
                      </div>
                    </div>

                    {/* Stage 3: Revenue */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between z-10 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                          <Banknote size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-indigo-400 uppercase">Hədəflənən Gəlir</p>
                          <p className="font-black text-indigo-900 text-lg">₼{forecastState.targetRevenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-indigo-400 font-bold uppercase">Gözlənilən ROAS</p>
                        <p className="font-black text-indigo-700 text-lg">{f_expectedROAS.toFixed(2)}x</p>
                      </div>
                    </div>

                  </div>
                </div>

                {state.productPrice === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                    <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-amber-700 font-medium">Proqnozların düzgün hesablanması üçün sol tərəfdən "Məhsul Qiyməti" xanasını doldurmağınız xahiş olunur.</p>
                  </div>
                )}
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </Container>
    </div>
  );
}
