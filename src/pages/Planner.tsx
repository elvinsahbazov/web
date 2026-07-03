import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, Wallet, Target, Rocket, 
  BrainCircuit, CheckCircle2, FileText, MessageCircle,
  RotateCcw, Check, ArrowRight, ArrowLeft, Loader2,
  Megaphone, UserPlus, ShoppingCart, Heart, Activity
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Container from '../components/ui/Container';

ChartJS.register(ArcElement, Tooltip, Legend);

const INDUSTRIES = [
  'E-ticarət (Online Satış)',
  'Tibb və Klinika',
  'Daşınmaz Əmlak',
  'Restoran və Kafe',
  'B2B Xidmətlər (Şirkətlər üçün)',
  'Təhsil və Təlim (Kurslar)',
  'Gözəllik Salonu və SPA',
  'Turizm və Səyahət',
  'Hüquq və Konsaltinq',
  'Fitnes və İdman',
  'Tikinti və Təmir',
  'Digər'
];

const GOALS = [
  { id: 'awareness', label: 'Marka Tanınması (Brand Awareness)', icon: Megaphone, desc: 'Daha çox insanın sizi tanıması və markanıza güvənməsi.' },
  { id: 'leads', label: 'Potensial Müştəri (Lead Generation)', icon: UserPlus, desc: 'Xidmətlərinizlə maraqlanan şəxslərin əlaqə nömrələrinin toplanması.' },
  { id: 'sales', label: 'Birbaşa Satış (Direct Sales)', icon: ShoppingCart, desc: 'Məhsul və ya xidmətlərinizin birbaşa satışı və sifarişlərin artması.' },
  { id: 'retention', label: 'Müştəri Sadiqliyi (Retention)', icon: Heart, desc: 'Köhnə müştərilərin yenidən alış etməsi və LTV-nin artırılması.' }
];

const BUDGETS = [
  { id: 'low', label: '500 - 1,000 ₼' },
  { id: 'medium', label: '1,000 - 5,000 ₼' },
  { id: 'high', label: '5,000+ ₼' }
];

const STEPS = [
  { num: 1, title: 'Biznes Profili', icon: Building2 },
  { num: 2, title: 'Əsas Hədəflər', icon: Target },
  { num: 3, title: 'Süni İntellekt Analizi', icon: BrainCircuit },
  { num: 4, title: 'Sizin Strategiyanız', icon: Rocket }
];

type PlannerState = {
  industry: string;
  otherIndustry: string;
  audience: 'B2B' | 'B2C' | '';
  budget: string;
  goals: string[];
};

export default function Planner() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<PlannerState>({
    industry: '',
    otherIndustry: '',
    audience: '',
    budget: '',
    goals: []
  });

  const toggleGoal = (id: string) => {
    setState(s => ({
      ...s,
      goals: s.goals.includes(id) ? s.goals.filter(g => g !== id) : [...s.goals, id]
    }));
  };

  const generatePlan = () => {
    setStep(3);
    setTimeout(() => {
      setStep(4);
    }, 2500); // Simulate AI generation delay
  };

  const getPlanDetails = () => {
    const industryName = state.industry === 'Digər' ? state.otherIndustry : state.industry;
    let allocations = [
      { channel: 'Meta Ads (FB/IG)', pct: 40, color: '#3b82f6' }, // blue-500
      { channel: 'Google Ads', pct: 30, color: '#ef4444' }, // red-500
      { channel: 'SEO & Content', pct: 20, color: '#eab308' }, // yellow-500
      { channel: 'Email/Retargeting', pct: 10, color: '#10b981' } // emerald-500
    ];

    if (state.audience === 'B2B' || state.industry.includes('B2B') || state.industry.includes('Hüquq')) {
      allocations = [
        { channel: 'LinkedIn & B2B', pct: 40, color: '#0284c7' }, // sky-600
        { channel: 'Google Search Ads', pct: 30, color: '#ef4444' },
        { channel: 'SEO & Məqalə', pct: 20, color: '#eab308' },
        { channel: 'Email Marketinq', pct: 10, color: '#10b981' }
      ];
    } else if (state.industry.includes('E-ticarət')) {
      allocations = [
        { channel: 'Meta Ads (Conversion)', pct: 50, color: '#3b82f6' },
        { channel: 'Google Shopping', pct: 25, color: '#ef4444' },
        { channel: 'TikTok Ads', pct: 15, color: '#000000' },
        { channel: 'Retargeting', pct: 10, color: '#f59e0b' } // amber-500
      ];
    } else if (state.industry.includes('Klinika') || state.industry.includes('Gözəllik') || state.industry.includes('Tibb')) {
      allocations = [
        { channel: 'Meta Ads (Mesaj/Lead)', pct: 50, color: '#3b82f6' },
        { channel: 'Google Local/Search', pct: 30, color: '#ef4444' },
        { channel: 'TikTok (Before/After)', pct: 20, color: '#000000' }
      ];
    }

    const contentTips = state.industry.includes('E-ticarət')
      ? ['UGC (İstifadəçi Yaratdığı) Video məzmunlar', 'Dinamik məhsul kataloqları (DPA)', 'Endirim və kampaniya hədəfli qrafiklər']
      : (state.industry.includes('Klinika') || state.industry.includes('Tibb'))
      ? ['Xəstə rəyləri və "Əvvəl/Sonra" videoları', 'Həkimlərin məlumatverici videoları (Qısa format)', 'Klinika daxili yüksək keyfiyyətli (Professional) fotolar']
      : state.audience === 'B2B'
      ? ['Sənaye hesabatları (Whitepapers) və məqalələr', 'Case Study (Uğur hekayələri və statistikalar)', 'Webinar dəvətləri və LinkedIn Carousel postları']
      : ['İzləyici ilə interaktiv sual-cavab (Polls) postları', 'Xidmətin arxa plan (Behind the scenes) çəkilişləri', 'Müştəri rəyləri (Social Proof)'];

    const roadmap = [
      { month: 'Ay 1', title: 'Qurulum və Test (Foundation)', desc: 'İzləmə kodlarının (Pixel, GA4) quraşdırılması, ilk A/B test reklamlarının işə salınması və auditoriyanın isidilməsi.' },
      { month: 'Ay 2', title: 'Optimallaşdırma (Optimization)', desc: 'Test nəticələrinə əsasən qalib reklamların seçilməsi, zəif kanalların dayandırılması və Retargeting (yenidən hədəfləmə) başlanması.' },
      { month: 'Ay 3', title: 'Böyümə (Scaling)', desc: 'Gəlirli kanallara büdcənin artırılması (Scale), CPL/CAC xərclərinin stabilləşdirilməsi və LTV (Müştəri Həyat Boyu Dəyəri) üzərində iş.' }
    ];

    return { industryName, allocations, contentTips, roadmap };
  };

  const exportWhatsApp = () => {
    const { industryName } = getPlanDetails();
    const msg = `📊 *Yeni Marketinq Planı (PRO)*

🏢 Sektor: ${industryName}
👥 Auditoriya: ${state.audience}
💰 Büdcə: ${state.budget}
🎯 Hədəflər: ${state.goals.join(', ')}

_Salam, bu Süni İntellekt strategiyasını təhlil edib əməkdaşlıq barədə müzakirə etmək istəyirəm._`;
    window.open(`https://wa.me/994999550001?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const isStep1Valid = state.industry && (state.industry !== 'Digər' || state.otherIndustry.trim() !== '') && state.audience && state.budget;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-inter text-slate-900 selection:bg-blue-500/30">
      <Container>
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs mb-4">
            <BrainCircuit size={16} /> Süni İntellektlə Marketinq Planlama
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
            Marketinq Strategiyası <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Qurucusu</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Sektorunuzu və büdcənizi daxil edin, sizin üçün ən effektiv və müasir rəqəmsal addımları simulyasiya edək.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (Progress Tracker) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-28">
              <h3 className="font-bold text-lg mb-6">Mərhələlər</h3>
              <div className="space-y-6">
                {STEPS.map((s, idx) => {
                  const isActive = step === s.num;
                  const isPast = step > s.num;
                  const Icon = s.icon;
                  return (
                    <div key={s.num} className="flex items-start gap-4">
                      <div className={`flex flex-col items-center gap-2 ${idx !== STEPS.length - 1 ? 'h-full' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          isActive ? 'border-blue-600 bg-blue-50 text-blue-600' :
                          isPast ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-slate-50 text-slate-400'
                        }`}>
                          {isPast ? <Check size={18} /> : <Icon size={18} />}
                        </div>
                        {idx !== STEPS.length - 1 && (
                          <div className={`w-0.5 h-10 ${isPast ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                        )}
                      </div>
                      <div className="pt-2">
                        <p className={`font-bold text-sm ${isActive || isPast ? 'text-slate-900' : 'text-slate-400'}`}>{s.title}</p>
                        <p className="text-xs text-slate-400">
                          {s.num === 1 && 'Biznes məlumatları'}
                          {s.num === 2 && 'Məqsədiniz'}
                          {s.num === 3 && 'Alqoritm analizi'}
                          {s.num === 4 && 'Detallı plan'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT AREA (Form / Result) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-200/50 border border-slate-200 min-h-[500px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center lg:hidden">
                        <Building2 size={20} />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">1. Biznes Profiliniz</h2>
                    </div>

                    {/* Sektor */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
                        <Building2 size={16} className="text-slate-400" /> Sektorunuz (Fəaliyyət Sahəsi)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {INDUSTRIES.map(ind => (
                          <button
                            key={ind}
                            onClick={() => setState({ ...state, industry: ind })}
                            className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                              state.industry === ind ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                      
                      <AnimatePresence>
                        {state.industry === 'Digər' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden"
                          >
                            <input
                              type="text" placeholder="Zəhmət olmasa, sektorunuzun adını yazın..."
                              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                                !state.otherIndustry ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'
                              }`}
                              value={state.otherIndustry} onChange={e => setState({ ...state, otherIndustry: e.target.value })}
                            />
                            {!state.otherIndustry && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><Activity size={12}/> Davam etmək üçün bu sahəni mütləq doldurun.</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="h-px w-full bg-slate-100"></div>

                    {/* Auditoriya */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
                        <Users size={16} className="text-slate-400" /> Hədəf Auditoriyanız
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {['B2C', 'B2B'].map(aud => (
                          <button
                            key={aud} onClick={() => setState({ ...state, audience: aud as any })}
                            className={`p-4 rounded-xl border text-center font-bold transition-all ${
                              state.audience === aud ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {aud === 'B2C' ? 'B2C (Son İstehlakçı)' : 'B2B (Şirkətlər)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px w-full bg-slate-100"></div>

                    {/* Büdcə */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
                        <Wallet size={16} className="text-slate-400" /> Aylıq Marketinq Büdcəniz
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {BUDGETS.map(b => (
                          <button
                            key={b.id} onClick={() => setState({ ...state, budget: b.label })}
                            className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                              state.budget === b.label ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 flex justify-end">
                      <button 
                        onClick={() => setStep(2)} 
                        disabled={!isStep1Valid}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                      >
                        Növbəti Addım <ArrowRight size={18} />
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    
                    <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-700 font-semibold text-sm flex items-center gap-1.5 transition-colors">
                      <ArrowLeft size={16} /> Geri Qayıt
                    </button>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center lg:hidden">
                          <Target size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">2. Əsas Hədəfləriniz</h2>
                      </div>
                      <p className="text-slate-500 text-sm">Nəyə nail olmaq istədiyinizi seçin (Çoxsaylı seçim edə bilərsiniz).</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {GOALS.map(goal => {
                        const isSelected = state.goals.includes(goal.id);
                        const GoalIcon = goal.icon;
                        return (
                          <button
                            key={goal.id}
                            onClick={() => toggleGoal(goal.id)}
                            className={`p-5 rounded-2xl border text-left transition-all ${
                              isSelected ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                              <GoalIcon size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">{goal.label}</h3>
                            <p className={`text-xs ${isSelected ? 'text-blue-600/80' : 'text-slate-500'}`}>{goal.desc}</p>
                          </button>
                        )
                      })}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button 
                        onClick={generatePlan} 
                        disabled={state.goals.length === 0}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                      >
                        Planı Generasiya Et <BrainCircuit size={18} />
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* STEP 3 - Loading */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center min-h-[400px]">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl animate-pulse"></div>
                      <div className="w-20 h-20 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center relative z-10">
                        <Loader2 size={32} className="text-blue-600 animate-spin" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Süni İntellekt Analiz Edir...</h2>
                    <p className="text-slate-500 max-w-sm mx-auto">Sektorunuz, büdcəniz və hədəflərinizə əsasən optimal marketinq strategiyası və büdcə bölgüsü hesablanır.</p>
                  </motion.div>
                )}

                {/* STEP 4 - Results */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-3">
                          <CheckCircle2 size={14} /> Plan Hazırdır
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900">Sizin Marketinq Strategiyanız</h2>
                      </div>
                      <div className="flex flex-wrap gap-2 print-hide">
                        <button onClick={() => window.print()} className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors flex items-center gap-2">
                          <FileText size={16} /> PDF Yüklə
                        </button>
                        <button onClick={exportWhatsApp} className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md transition-colors flex items-center gap-2">
                          <MessageCircle size={16} /> Ekspertlə Bölüş
                        </button>
                      </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Sektor</p>
                        <p className="font-bold text-slate-900 truncate" title={getPlanDetails().industryName}>{getPlanDetails().industryName}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Auditoriya</p>
                        <p className="font-bold text-slate-900">{state.audience}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Büdcə</p>
                        <p className="font-bold text-slate-900">{state.budget}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Hədəf</p>
                        <p className="font-bold text-slate-900">{state.goals.length} Seçim</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Allocations (Chart) */}
                      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                          Tövsiyə Edilən Büdcə Bölgüsü
                        </h3>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="h-48 relative mb-6">
                            <Doughnut 
                              data={{
                                labels: getPlanDetails().allocations.map(a => a.channel),
                                datasets: [{
                                  data: getPlanDetails().allocations.map(a => a.pct),
                                  backgroundColor: getPlanDetails().allocations.map(a => a.color),
                                  borderWidth: 0,
                                  hoverOffset: 4
                                }]
                              }}
                              options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="text-2xl font-black text-slate-900">100%</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {getPlanDetails().allocations.map(a => (
                              <div key={a.channel} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }}></div>
                                  <span className="font-semibold text-slate-700">{a.channel}</span>
                                </div>
                                <span className="font-black text-slate-900">{a.pct}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right side: Tips & Tech */}
                      <div className="space-y-6 flex flex-col">
                        
                        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
                          <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                            Məzmun Strategiyası
                          </h3>
                          <ul className="space-y-3">
                            {getPlanDetails().contentTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-blue-800 font-medium">
                                <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
                          <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-slate-600 rounded-full"></div>
                            Texniki Əsaslar
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                              <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                              <span>Meta Pixel və Conversions API quraşdırılması</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                              <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                              <span>Google Analytics 4 (GA4) Event (Hadisə) tənzimləmələri</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                              <CheckCircle2 size={18} className="text-slate-400 shrink-0 mt-0.5" />
                              <span>CRM İnteqrasiyası ilə müştəri məlumatlarının (Lead) qorunması</span>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>

                    {/* Roadmap Timeline */}
                    <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm mt-8">
                      <h3 className="font-bold text-xl text-slate-900 mb-8 flex items-center gap-2">
                        <Activity size={24} className="text-blue-600" /> 3 Aylıq Yol Xəritəsi (Roadmap)
                      </h3>
                      
                      <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-10 pb-4">
                        {getPlanDetails().roadmap.map((rm, i) => (
                          <div key={i} className="relative pl-6 md:pl-8">
                            <div className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-white border-4 border-blue-500"></div>
                            <span className="text-blue-600 font-bold text-xs uppercase tracking-wider bg-blue-50 px-2 py-1 rounded mb-2 inline-block">{rm.month}</span>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">{rm.title}</h4>
                            <p className="text-slate-600 text-sm">{rm.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="text-center pt-8 border-t border-slate-100 print-hide">
                      <button onClick={() => {setStep(1); setState({...state, goals: []})}} className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 font-bold transition-colors">
                        <RotateCcw size={16} /> Yenidən Hesabla
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
