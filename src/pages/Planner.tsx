import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/ui/Container';

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
  { id: 'awareness', label: 'Marka Tanınması (Brand Awareness)', icon: 'fa-bullhorn' },
  { id: 'leads', label: 'Potensial Müştəri (Lead Generation)', icon: 'fa-user-plus' },
  { id: 'sales', label: 'Birbaşa Satış (Direct Sales)', icon: 'fa-shopping-cart' },
  { id: 'retention', label: 'Müştəri Sadiqliyi (Retention)', icon: 'fa-heart' }
];

const BUDGETS = [
  { id: 'low', label: '500 - 1,000 ₼' },
  { id: 'medium', label: '1,000 - 5,000 ₼' },
  { id: 'high', label: '5,000+ ₼' }
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

  const [isGenerating, setIsGenerating] = useState(false);

  const toggleGoal = (id: string) => {
    setState(s => ({
      ...s,
      goals: s.goals.includes(id) ? s.goals.filter(g => g !== id) : [...s.goals, id]
    }));
  };

  const generatePlan = () => {
    setIsGenerating(true);
    setStep(3);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
    }, 2000); // Simulate AI generation delay
  };

  const getPlanDetails = () => {
    const industryName = state.industry === 'Digər' ? state.otherIndustry : state.industry;
    let allocations = [
      { channel: 'Meta Ads (FB/IG)', pct: 40, color: '#1877F2' },
      { channel: 'Google Ads', pct: 30, color: '#DB4437' },
      { channel: 'SEO & Content', pct: 20, color: '#F4B400' },
      { channel: 'Email/Retargeting', pct: 10, color: '#0F9D58' }
    ];

    if (state.audience === 'B2B' || state.industry.includes('B2B') || state.industry.includes('Hüquq')) {
      allocations = [
        { channel: 'LinkedIn & B2B', pct: 30, color: '#0A66C2' },
        { channel: 'Google Search Ads', pct: 40, color: '#DB4437' },
        { channel: 'SEO & Məqalə', pct: 20, color: '#F4B400' },
        { channel: 'Email Marketinq', pct: 10, color: '#0F9D58' }
      ];
    } else if (state.industry.includes('E-ticarət')) {
      allocations = [
        { channel: 'Meta Ads (Conversion)', pct: 50, color: '#1877F2' },
        { channel: 'Google Shopping', pct: 30, color: '#DB4437' },
        { channel: 'TikTok Ads', pct: 10, color: '#000000' },
        { channel: 'Retargeting (Kataloq)', pct: 10, color: '#F4B400' }
      ];
    } else if (state.industry.includes('Klinika') || state.industry.includes('Gözəllik') || state.industry.includes('Tibb')) {
      allocations = [
        { channel: 'Meta Ads (Mesaj/Lead)', pct: 50, color: '#1877F2' },
        { channel: 'Google Local/Search', pct: 30, color: '#DB4437' },
        { channel: 'TikTok (Before/After)', pct: 20, color: '#000000' }
      ];
    }

    const contentTips = state.industry.includes('E-ticarət')
      ? ['UGC (İstifadəçi Yaratdığı) Video məzmunlar', 'Dinamik məhsul kataloqları', 'Endirim və kampaniya qrafikləri']
      : (state.industry.includes('Klinika') || state.industry.includes('Tibb'))
      ? ['Xəstə rəyləri və "Əvvəl/Sonra" videoları', 'Həkimlərin məlumatverici videoları', 'Klinika daxili yüksək keyfiyyətli fotolar']
      : state.audience === 'B2B'
      ? ['Sənaye hesabatları (Whitepapers)', 'Case Study (Uğur hekayələri)', 'Webinar və LinkedIn məqalələri']
      : ['İzləyici ilə interaktiv sual-cavab postları', 'Xidmətin arxa plan (Behind the scenes) çəkilişləri', 'Yüksək keyfiyyətli vizual təqdimatlar'];

    return { industryName, allocations, contentTips };
  };

  const exportWhatsApp = () => {
    const { industryName } = getPlanDetails();
    const msg = `📊 *Yeni Marketinq Planı Tələbi*\n\nSektor: ${industryName}\nAuditoriya: ${state.audience}\nBüdcə: ${state.budget}\nHədəflər: ${state.goals.join(', ')}\n\n_Salam, bu məlumatlar əsasında strategiyanı müzakirə etmək istəyirəm._`;
    window.open(`https://wa.me/994999550001?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 md:pt-32 pb-20">
      <Container wide>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="badge bg-primary/10 text-primary mb-3">
              <i className="fas fa-chess-knight" /> Süni İntellektlə Planlama
            </span>
            <h1 className="text-3xl md:text-5xl font-poppins font-black text-black mb-4">
              Marketinq Strategiyası Qurucusu
            </h1>
            <p className="text-black/60">
              Biznesinizin sektoruna, büdcəsinə və hədəflərinə uyğun detallı marketinq planı yaradın.
            </p>
          </div>

          {/* Steps Wrapper */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-black/5">
            <AnimatePresence mode="wait">
              {/* STEP 1: Business Profile */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-poppins font-bold text-black mb-6">1. Biznes Profiliniz</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-3">Sektorunuz (Fəaliyyət Sahəsi)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {INDUSTRIES.map(ind => (
                          <button
                            key={ind}
                            onClick={() => setState({ ...state, industry: ind })}
                            className={`p-3 rounded-xl border text-left text-sm transition-all ${
                              state.industry === ind ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-black/10 text-black/70 hover:border-black/30'
                            }`}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                      {state.industry === 'Digər' && (
                        <motion.input
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          type="text" placeholder="Sektorunuzu qeyd edin..."
                          className="input-field mt-3"
                          value={state.otherIndustry} onChange={e => setState({ ...state, otherIndustry: e.target.value })}
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-3">Hədəf Auditoriyanız</label>
                      <div className="flex gap-3">
                        {['B2C', 'B2B'].map(aud => (
                          <button
                            key={aud} onClick={() => setState({ ...state, audience: aud as any })}
                            className={`flex-1 py-3 rounded-xl border text-center transition-all ${
                              state.audience === aud ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-black/10 text-black/70 hover:border-black/30'
                            }`}
                          >
                            {aud === 'B2C' ? 'B2C (Son İstehlakçı)' : 'B2B (Şirkətlər)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-3">Aylıq Marketinq Büdcəniz</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {BUDGETS.map(b => (
                          <button
                            key={b.id} onClick={() => setState({ ...state, budget: b.label })}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              state.budget === b.label ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-black/10 text-black/70 hover:border-black/30'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        onClick={() => setStep(2)} 
                        disabled={!state.industry || (state.industry === 'Digər' && !state.otherIndustry) || !state.audience || !state.budget}
                        className="btn-primary py-3 px-8 disabled:opacity-50"
                      >
                        Növbəti <i className="fas fa-arrow-right ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Goals */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => setStep(1)} className="text-black/50 hover:text-black mb-4 text-sm flex items-center gap-2">
                    <i className="fas fa-arrow-left" /> Geri
                  </button>
                  <h2 className="text-xl font-poppins font-bold text-black mb-2">2. Əsas Hədəfləriniz</h2>
                  <p className="text-black/50 text-sm mb-6">Nəyə nail olmaq istədiyinizi seçin (Birdən çox seçə bilərsiniz).</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {GOALS.map(goal => (
                      <button
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          state.goals.includes(goal.id) ? 'border-primary bg-primary/5 text-primary' : 'border-black/10 text-black/70 hover:border-black/30'
                        }`}
                      >
                        <i className={`fas ${goal.icon} text-2xl mb-3 ${state.goals.includes(goal.id) ? 'text-primary' : 'text-black/30'}`} />
                        <h3 className="font-semibold">{goal.label}</h3>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button 
                      onClick={generatePlan} 
                      disabled={state.goals.length === 0}
                      className="btn-primary py-3 px-8 disabled:opacity-50"
                    >
                      Planı Yarat <i className="fas fa-magic ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Loading / Generating */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-black/10" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  </div>
                  <h2 className="text-xl font-poppins font-bold text-black mb-2">Süni İntellekt analiz edir...</h2>
                  <p className="text-black/50">Məlumatlarınız əsasında fərdi strategiya formalaşdırılır.</p>
                </motion.div>
              )}

              {/* STEP 4: Results */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                      <span className="badge bg-green-500/10 text-green-600 mb-2">
                        <i className="fas fa-check-circle" /> Plan Hazırdır
                      </span>
                      <h2 className="text-2xl font-poppins font-black text-black">Sizin Marketinq Strategiyanız</h2>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-black text-sm font-semibold transition-colors flex items-center gap-2 print-hide">
                        <i className="fas fa-file-pdf" /> PDF
                      </button>
                      <button onClick={exportWhatsApp} className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors flex items-center gap-2 print-hide">
                        <i className="fab fa-whatsapp text-lg" /> Müzakirə Et
                      </button>
                    </div>
                  </div>

                  {/* Plan Content */}
                  <div className="space-y-8">
                    {/* Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-[#F8FAFC]">
                        <p className="text-xs text-black/50 mb-1">Sektor</p>
                        <p className="font-semibold text-black">{getPlanDetails().industryName}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#F8FAFC]">
                        <p className="text-xs text-black/50 mb-1">Auditoriya</p>
                        <p className="font-semibold text-black">{state.audience}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#F8FAFC]">
                        <p className="text-xs text-black/50 mb-1">Büdcə</p>
                        <p className="font-semibold text-black">{state.budget}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#F8FAFC]">
                        <p className="text-xs text-black/50 mb-1">Əsas Hədəf</p>
                        <p className="font-semibold text-black">{state.goals.length} Seçim</p>
                      </div>
                    </div>

                    {/* Allocations */}
                    <div>
                      <h3 className="font-poppins font-bold text-lg text-black mb-4"><i className="fas fa-chart-pie text-primary mr-2" /> Tövsiyə Edilən Büdcə Bölgüsü</h3>
                      <div className="space-y-4">
                        {getPlanDetails().allocations.map(a => (
                          <div key={a.channel}>
                            <div className="flex justify-between text-sm mb-1 font-medium">
                              <span>{a.channel}</span>
                              <span>{a.pct}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} animate={{ width: `${a.pct}%` }} 
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full rounded-full" style={{ backgroundColor: a.color }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Tips */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl border border-black/10">
                        <h3 className="font-poppins font-bold text-lg text-black mb-4"><i className="fas fa-camera text-primary mr-2" /> Məzmun (Content) Strategiyası</h3>
                        <ul className="space-y-3">
                          {getPlanDetails().contentTips.map((tip, i) => (
                            <li key={i} className="flex gap-3 text-sm text-black/70">
                              <i className="fas fa-check text-primary mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 rounded-2xl border border-black/10">
                        <h3 className="font-poppins font-bold text-lg text-black mb-4"><i className="fas fa-cogs text-primary mr-2" /> Texniki Addımlar</h3>
                        <ul className="space-y-3">
                          <li className="flex gap-3 text-sm text-black/70"><i className="fas fa-check text-primary mt-0.5" /> Meta Pixel və Conversions API quraşdırılması</li>
                          <li className="flex gap-3 text-sm text-black/70"><i className="fas fa-check text-primary mt-0.5" /> Google Analytics 4 (GA4) təməl qurulumu</li>
                          <li className="flex gap-3 text-sm text-black/70"><i className="fas fa-check text-primary mt-0.5" /> CRM inteqrasiyası ilə lead (müştəri) toplanması</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Reset */}
                    <div className="pt-6 border-t border-black/10 text-center print-hide">
                      <button onClick={() => setStep(1)} className="text-black/50 hover:text-black font-medium text-sm transition-colors">
                        <i className="fas fa-redo mr-2" /> Yenidən Hesabla
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
}
