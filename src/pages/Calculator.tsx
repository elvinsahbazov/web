import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';
import { C, blueShades } from '../lib/colors';

// ─── Types ────────────────────────────────────────────────────────────────────
type Channel = {
  name: string;
  budget: number;
  roas: number;
  enabled: boolean;
};

type CalcState = {
  productPrice: number;
  cogs: number;
  channels: Channel[];
};

// ─── Presets ──────────────────────────────────────────────────────────────────
const presets: Record<string, Partial<CalcState>> = {
  ecommerce: {
    productPrice: 120,
    cogs: 40,
    channels: [
      { name: 'Facebook/Instagram', budget: 1500, roas: 4.2, enabled: true },
      { name: 'Google Ads', budget: 1200, roas: 5.1, enabled: true },
      { name: 'TikTok Ads', budget: 500, roas: 2.8, enabled: true },
      { name: 'Yandex Direct', budget: 300, roas: 3.5, enabled: false },
      { name: 'Email Marketing', budget: 150, roas: 8.0, enabled: true },
      { name: 'VK Ads', budget: 200, roas: 2.0, enabled: false },
    ],
  },
  clinic: {
    productPrice: 350,
    cogs: 80,
    channels: [
      { name: 'Facebook/Instagram', budget: 2000, roas: 3.5, enabled: true },
      { name: 'Google Ads', budget: 2500, roas: 4.8, enabled: true },
      { name: 'TikTok Ads', budget: 300, roas: 2.2, enabled: false },
      { name: 'Yandex Direct', budget: 800, roas: 3.0, enabled: true },
      { name: 'Email Marketing', budget: 200, roas: 6.0, enabled: true },
      { name: 'VK Ads', budget: 100, roas: 1.5, enabled: false },
    ],
  },
  dental: {
    productPrice: 280,
    cogs: 60,
    channels: [
      { name: 'Facebook/Instagram', budget: 1200, roas: 3.8, enabled: true },
      { name: 'Google Ads', budget: 1500, roas: 5.5, enabled: true },
      { name: 'TikTok Ads', budget: 400, roas: 2.5, enabled: false },
      { name: 'Yandex Direct', budget: 600, roas: 3.2, enabled: true },
      { name: 'Email Marketing', budget: 150, roas: 7.0, enabled: true },
      { name: 'VK Ads', budget: 0, roas: 1.8, enabled: false },
    ],
  },
  saas: {
    productPrice: 990,
    cogs: 120,
    channels: [
      { name: 'Facebook/Instagram', budget: 3000, roas: 2.8, enabled: true },
      { name: 'Google Ads', budget: 4000, roas: 4.2, enabled: true },
      { name: 'TikTok Ads', budget: 0, roas: 1.5, enabled: false },
      { name: 'Yandex Direct', budget: 500, roas: 2.0, enabled: false },
      { name: 'Email Marketing', budget: 500, roas: 12.0, enabled: true },
      { name: 'VK Ads', budget: 0, roas: 1.5, enabled: false },
    ],
  },
  restaurant: {
    productPrice: 45,
    cogs: 20,
    channels: [
      { name: 'Facebook/Instagram', budget: 800, roas: 3.5, enabled: true },
      { name: 'Google Ads', budget: 600, roas: 4.0, enabled: true },
      { name: 'TikTok Ads', budget: 400, roas: 3.0, enabled: true },
      { name: 'Yandex Direct', budget: 200, roas: 2.5, enabled: false },
      { name: 'Email Marketing', budget: 100, roas: 5.0, enabled: true },
      { name: 'VK Ads', budget: 100, roas: 2.0, enabled: false },
    ],
  },
};

const defaultState: CalcState = {
  productPrice: 200,
  cogs: 80,
  channels: [
    { name: 'Facebook/Instagram', budget: 1000, roas: 3.5, enabled: true },
    { name: 'Google Ads', budget: 1000, roas: 4.5, enabled: true },
    { name: 'TikTok Ads', budget: 500, roas: 2.5, enabled: false },
    { name: 'Yandex Direct', budget: 500, roas: 3.0, enabled: false },
    { name: 'Email Marketing', budget: 200, roas: 7.0, enabled: true },
    { name: 'VK Ads', budget: 300, roas: 2.0, enabled: false },
  ],
};

const channelColors: Record<string, string> = {
  'Facebook/Instagram': blueShades[0],
  'Google Ads': blueShades[1],
  'TikTok Ads': blueShades[2],
  'Yandex Direct': blueShades[3],
  'Email Marketing': blueShades[4],
  'VK Ads': blueShades[5],
};

// ─── Gatekeeper Modal ─────────────────────────────────────────────────────────
function GatekeeperModal({ onPass }: { onPass: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!name.trim()) { setError('Adınızı daxil edin.'); return; }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
      setError('Yalnız Gmail ünvanı (@gmail.com) qəbul edilir.');
      return;
    }
    localStorage.setItem('calc_user', JSON.stringify({ name, email }));
    onPass();
  };

  return (
    <div className="modal-backdrop">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal-box"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-calculator text-2xl text-primary" />
          </div>
          <h2 className="font-poppins font-black text-2xl text-black mb-2">
            Smart Reklam Hesablayıcı PRO
          </h2>
          <p className="text-sm text-black/55">
            Xidmətdən istifadə etmək üçün məlumatlarınızı daxil edin.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black/70 mb-2">
              Ad Soyad <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="input-field"
              placeholder="Adınız Soyadınız"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black/70 mb-2">
              Gmail ünvanı <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="input-field"
              placeholder="example@gmail.com"
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl text-black text-xs" style={{ backgroundColor: C.blueSoft }}>
              <i className="fas fa-exclamation-circle" />
              {error}
            </div>
          )}
          <button onClick={submit} className="btn-primary w-full justify-center py-3.5">
            Hesablayıcıya Daxil ol <i className="fas fa-arrow-right ml-1" />
          </button>
        </div>
        <p className="text-xs text-black/40 text-center mt-4">
          Məlumatlarınız yalnız bu hesablayıcı üçün istifadə edilir.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Doughnut Canvas Chart ────────────────────────────────────────────────────
function DoughnutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = data.reduce((s, d) => s + d.value, 0);
    if (total === 0) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(cx, cy) - 20;
    const inner = r * 0.55;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let startAngle = -Math.PI / 2;

    data.forEach((d) => {
      const slice = (d.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
      startAngle += slice;
    });

    // Inner circle (donut hole)
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, 2 * Math.PI);
    ctx.fillStyle = C.white;
    ctx.fill();

    // Center text
    ctx.fillStyle = C.black;
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px Inter';
    ctx.fillText('Büdcə', cx, cy - 6);
    ctx.font = 'bold 18px Poppins';
    ctx.fillStyle = C.blue;
    ctx.fillText(`₼${total.toLocaleString()}`, cx, cy + 16);
  }, [data]);

  return <canvas ref={canvasRef} width={240} height={240} className="mx-auto" />;
}

// ─── Bar Canvas Chart ─────────────────────────────────────────────────────────
function BarChart({ data }: { data: { label: string; revenue: number; profit: number; color: string }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const pad = { top: 20, bottom: 40, left: 50, right: 20 };
    const chartH = h - pad.top - pad.bottom;
    const chartW = w - pad.left - pad.right;

    ctx.clearRect(0, 0, w, h);

    const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.profit)), 1);
    const barW = chartW / data.length / 2.5;
    const gap = chartW / data.length;

    // Grid lines
    ctx.strokeStyle = C.border;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + chartH - (i / 4) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      ctx.fillStyle = C.muted;
      ctx.font = '10px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(`₼${Math.round((maxVal * i) / 4).toLocaleString()}`, pad.left - 5, y + 4);
    }

    data.forEach((d, i) => {
      const x = pad.left + i * gap + gap / 2;
      const revH = (d.revenue / maxVal) * chartH;
      const profH = (d.profit / maxVal) * chartH;

      // Revenue bar
      ctx.fillStyle = d.color;
      ctx.fillRect(x - barW - 2, pad.top + chartH - revH, barW, revH);

      // Profit bar
      ctx.fillStyle = C.blue;
      ctx.fillRect(x + 2, pad.top + chartH - profH, barW, profH);

      // Label
      ctx.fillStyle = C.muted;
      ctx.font = '9px Inter';
      ctx.textAlign = 'center';
      const shortLabel = d.label.split('/')[0];
      ctx.fillText(shortLabel, x, h - 10);
    });
  }, [data]);

  return <canvas ref={canvasRef} width={500} height={260} style={{ width: '100%', height: 'auto' }} />;
}

// ─── Main Calculator ──────────────────────────────────────────────────────────
export default function Calculator() {
  const [passed, setPassed] = useState(() => !!localStorage.getItem('calc_user'));
  const [state, setState] = useState<CalcState>(() => {
    const saved = localStorage.getItem('calc_state');
    return saved ? JSON.parse(saved) : defaultState;
  });
  const [selectedPreset, setSelectedPreset] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const userInfo = (() => {
    try { return JSON.parse(localStorage.getItem('calc_user') || '{}') as { name?: string; email?: string }; } catch { return {}; }
  })();
  const userName = userInfo.name || '';
  const userEmail = userInfo.email || '';

  useEffect(() => {
    if (passed) localStorage.setItem('calc_state', JSON.stringify(state));
  }, [state, passed]);

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

  const saveSession = useCallback(async () => {
    if (!passed || !userEmail) return;
    setSaveStatus('saving');
    
    // Yadda saxlama prosesini simulyasiya edirik (Backend tələb etmədən)
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  }, [passed, userEmail]);

  // Debounced auto-save: 3 s after the user stops changing values
  useEffect(() => {
    if (!passed) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(saveSession, 3000);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [state, passed, saveSession]);

  const applyPreset = (key: string) => {
    if (!key) return;
    const p = presets[key];
    if (!p) return;
    setSelectedPreset(key);
    setState((s) => ({
      ...s,
      ...(p.productPrice !== undefined ? { productPrice: p.productPrice } : {}),
      ...(p.cogs !== undefined ? { cogs: p.cogs } : {}),
      ...(p.channels !== undefined ? { channels: p.channels } : {}),
    }));
  };

  const updateChannel = (idx: number, field: keyof Channel, val: string | number | boolean) => {
    setState((s) => {
      const ch = [...s.channels];
      ch[idx] = { ...ch[idx], [field]: val };
      return { ...s, channels: ch };
    });
  };

  const exportCSV = () => {
    const rows = [
      ['Kanal', 'Büdcə (₼)', 'ROAS', 'Gəlir (₼)', 'Mənfəət (₼)'],
      ...enabledChannels.map((c) => [
        c.name,
        c.budget,
        c.roas,
        (c.budget * c.roas).toFixed(0),
        (c.budget * c.roas * (margin / 100)).toFixed(0),
      ]),
      ['CƏMI', totalBudget, blendedROAS.toFixed(2), totalRevenue.toFixed(0), netProfit.toFixed(0)],
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reklam-hesabat-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportWhatsApp = () => {
    const msg = `📊 *Smart Reklam Hesabatı*\n\n👤 ${userName}\n\n💰 Ümumi Büdcə: ₼${totalBudget.toLocaleString()}\n📈 Gözlənilən Gəlir: ₼${totalRevenue.toFixed(0)}\n🎯 Blended ROAS: ${blendedROAS.toFixed(2)}x\n💵 Xalis Mənfəət: ₼${netProfit.toFixed(0)}\n⚠️ Break-Even ROAS: ${breakEvenROAS.toFixed(2)}x\n\n_Hesablama elvinsahbazov.com tərəfindən_`;
    window.open(`https://wa.me/994999550001?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const doughnutData = enabledChannels.map((c) => ({
    label: c.name,
    value: c.budget,
    color: channelColors[c.name] || C.blue,
  }));

  const barData = enabledChannels.map((c) => ({
    label: c.name,
    revenue: c.budget * c.roas,
    profit: c.budget * c.roas * (margin / 100),
    color: channelColors[c.name] || C.blue,
  }));

  if (!passed) return <GatekeeperModal onPass={() => setPassed(true)} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 md:pt-32">
      <Container wide className="py-12 md:py-20">
        {/* Header */}
        <motion.div
          {...fadeUp()}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <span className="badge bg-primary/10 text-primary mb-2">
              <i className="fas fa-calculator" /> PRO Hesablayıcı
            </span>
            <h1 className="section-title">Smart Reklam Hesablayıcı PRO</h1>
            {userName && (
              <p className="text-sm text-black/55 mt-1">
                Xoş gəldiniz, <strong className="text-black/70">{userName}</strong>!
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {saveStatus !== 'idle' && (
              <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                saveStatus === 'saving' ? 'bg-[#F8FAFC] text-black/55' :
                saveStatus === 'saved' ? 'bg-primary/10 text-primary' :
                'bg-black/5 text-black'
              }`}>
                {saveStatus === 'saving' && <i className="fas fa-spinner fa-spin text-xs" />}
                {saveStatus === 'saved' && <i className="fas fa-check-circle text-xs" />}
                {saveStatus === 'error' && <i className="fas fa-exclamation-circle text-xs" />}
                {saveStatus === 'saving' ? 'Saxlanılır...' : saveStatus === 'saved' ? 'Saxlandı' : 'Xəta'}
              </span>
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 text-black/70 text-sm font-semibold hover:bg-black/10 transition-colors"
            >
              <FileText size={14} /> PDF
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
            >
              <Download size={14} /> CSV
            </button>
            <button
              onClick={exportWhatsApp}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/15 transition-colors"
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preset + Base Inputs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="font-poppins font-bold text-black mb-5">Əsas Məlumatlar</h3>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black/70 mb-2">
                  Biznes Növü (Preset)
                </label>
                <select
                  value={selectedPreset}
                  onChange={(e) => applyPreset(e.target.value)}
                  className="select-field"
                >
                  <option value="">Seçin...</option>
                  <option value="ecommerce">E-ticarət</option>
                  <option value="clinic">Klinika</option>
                  <option value="dental">Dental Klinika</option>
                  <option value="saas">SaaS / Tech</option>
                  <option value="restaurant">Restoran</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black/70 mb-2">
                    Məhsul/Xidmət Qiyməti (₼)
                  </label>
                  <input
                    type="number"
                    value={state.productPrice}
                    onChange={(e) => setState((s) => ({ ...s, productPrice: +e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black/70 mb-2">
                    Maya Dəyəri (₼)
                  </label>
                  <input
                    type="number"
                    value={state.cogs}
                    onChange={(e) => setState((s) => ({ ...s, cogs: +e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between bg-primary/5 rounded-2xl p-4">
                <span className="text-sm font-medium text-black/70">Marja</span>
                <span className="font-poppins font-black text-2xl text-primary">{margin.toFixed(1)}%</span>
              </div>
            </motion.div>

            {/* Channel Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="font-poppins font-bold text-black mb-5">Reklam Kanalları</h3>
              <div className="space-y-3">
                {state.channels.map((ch, i) => (
                  <div
                    key={ch.name}
                    className={`grid grid-cols-[auto_1fr_120px_100px] gap-3 items-center p-4 rounded-2xl transition-all duration-200 ${
                      ch.enabled
                        ? 'bg-white shadow-sm border border-black/8'
                        : 'bg-[#F8FAFC] opacity-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={ch.enabled}
                      onChange={(e) => updateChannel(i, 'enabled', e.target.checked)}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-3 h-3 rounded-full flex-none"
                        style={{ backgroundColor: channelColors[ch.name] || C.blue }}
                      />
                      <span className="text-sm font-medium text-black/70 truncate">{ch.name}</span>
                    </div>
                    <div>
                      <label className="block text-xs text-black/40 mb-1">Büdcə (₼)</label>
                      <input
                        type="number"
                        value={ch.budget}
                        onChange={(e) => updateChannel(i, 'budget', +e.target.value)}
                        disabled={!ch.enabled}
                        className="input-field py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-black/40 mb-1">ROAS</label>
                      <input
                        type="number"
                        step="0.1"
                        value={ch.roas}
                        onChange={(e) => updateChannel(i, 'roas', +e.target.value)}
                        disabled={!ch.enabled}
                        className="input-field py-1.5 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="card">
                <h4 className="font-poppins font-semibold text-black mb-4 text-sm">
                  Büdcə Bölgüsü
                </h4>
                <DoughnutChart data={doughnutData} />
                <div className="mt-4 space-y-1">
                  {doughnutData.map((d) => (
                    <div key={d.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-black/70">{d.label.split('/')[0]}</span>
                      </div>
                      <span className="font-semibold text-black/70">₼{d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h4 className="font-poppins font-semibold text-black mb-4 text-sm">
                  Gəlir & Mənfəət
                </h4>
                <BarChart data={barData} />
                <div className="flex gap-4 mt-3 justify-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-primary/60" />
                    <span className="text-black/55">Gəlir</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                    <span className="text-black/55">Mənfəət</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Results */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="result-card"
            >
              <p className="text-white/70 text-xs mb-1">Ümumi Reklam Büdcəsi</p>
              <p className="font-poppins font-black text-4xl">₼{totalBudget.toLocaleString()}</p>
              <p className="text-white/60 text-xs mt-1">Aktiv kanallar: {enabledChannels.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="space-y-4">
                {[
                  { label: 'Gözlənilən Gəlir', value: `₼${totalRevenue.toFixed(0)}`, color: 'text-primary', bg: 'bg-primary/5' },
                  { label: 'Xalis Mənfəət', value: `₼${netProfit.toFixed(0)}`, color: netProfit >= 0 ? 'text-primary' : 'text-black', bg: netProfit >= 0 ? 'bg-primary/5' : 'bg-black/5' },
                  { label: 'Blended ROAS', value: `${blendedROAS.toFixed(2)}x`, color: blendedROAS >= breakEvenROAS ? 'text-primary' : 'text-black', bg: 'bg-[#F8FAFC]' },
                  { label: 'Break-Even ROAS', value: `${breakEvenROAS.toFixed(2)}x`, color: 'text-primary', bg: 'bg-primary/5' },
                  { label: 'Marja', value: `${margin.toFixed(1)}%`, color: 'text-black/70', bg: 'bg-[#F8FAFC]' },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center justify-between p-3 rounded-xl ${item.bg}`}>
                    <span className="text-xs text-black/55">{item.label}</span>
                    <span className={`font-poppins font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className={`card border-2 ${
                blendedROAS >= breakEvenROAS
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-black/20 bg-black/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  blendedROAS >= breakEvenROAS ? 'bg-primary/10' : 'bg-black/10'
                }`}>
                  <i className={`fas ${blendedROAS >= breakEvenROAS ? 'fa-check-circle text-primary' : 'fa-exclamation-circle text-black'} text-xl`} />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${blendedROAS >= breakEvenROAS ? 'text-primary' : 'text-black'}`}>
                    {blendedROAS >= breakEvenROAS ? 'Sərfəli Kampaniya' : 'Risk Var!'}
                  </p>
                  <p className="text-xs text-black/55">
                    {blendedROAS >= breakEvenROAS
                      ? `ROAS ${(blendedROAS - breakEvenROAS).toFixed(2)}x üstündür`
                      : `ROAS ${(breakEvenROAS - blendedROAS).toFixed(2)}x aşağıdır`}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card text-center"
            >
              <p className="text-sm text-black/70 mb-4">
                Hesabatınızı mütəxəssislə müzakirə edin.
              </p>
              <a
                href="https://wa.me/994999550001"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <i className="fab fa-whatsapp" /> Məsləhət Al
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem('calc_user');
                  setPassed(false);
                }}
                className="mt-3 text-xs text-black/40 hover:text-black/70 transition-colors"
              >
                Çıxış
              </button>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
