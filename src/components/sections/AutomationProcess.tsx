import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

// 6. AUTOMATION PROCESS
// ─────────────────────────────────────────────────────────────────────────────
const autoSteps = [
  {
    num: '01', title: 'Proses Auditi', icon: 'fas fa-clipboard-list', color: C.blue,
    desc: 'Biznesinizin mövcud iş axışı, manual tapşırıqlar, zaman itkisi nöqtələri və avtomatlaşdırılabiləcək proseslər müəyyənləşdirilir.',
    items: ['İş axışı xəritəsi', 'Manual tapşırıq analizi', 'Vaxt itkisi nöqtələri', 'Prioritet sıralama'],
  },
  {
    num: '02', title: 'Avtomatlaşdırma Xəritəsi', icon: 'fas fa-project-diagram', color: C.blue,
    desc: 'Hər bir proses üçün avtomatlaşdırma ssenarisinin hazırlanması, alət seçimi (Make, Zapier, n8n), inteqrasiya nöqtələrinin müəyyənləşdirilməsi.',
    items: ['Ssenari dizaynı', 'Alət & platforma seçimi', 'İnteqrasiya xəritəsi', 'Test planı'],
  },
  {
    num: '03', title: 'Qurulum və İnteqrasiya', icon: 'fas fa-cogs', color: C.blue,
    desc: 'Seçilmiş alətlərin qurulması, CRM, email, mesajlaşma platformaları ilə inteqrasiyası, ilkin testlər və düzəlişlər.',
    items: ['Sistem qurulumu', 'CRM & email inteqrasiyası', 'WhatsApp & SMS sistemi', 'İlkin test dövrü'],
  },
  {
    num: '04', title: 'Optimizasiya', icon: 'fas fa-tachometer-alt', color: C.blue,
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
              activeStep === i ? 'shadow-card bg-white border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]' : 'border-white/60 bg-white/40 hover:bg-white/80'
            }`}
            style={activeStep === i ? { borderColor: `${s.color}40` } : {}}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-none font-black text-sm" style={{ fontFamily: 'Satoshi, Inter, sans-serif', backgroundColor: activeStep === i ? s.color : 'rgba(0,0,0,0.05)', color: activeStep === i ? '#fff' : 'rgba(0,0,0,0.6)' }}>
              {s.num}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.items[0]}</p>
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
          className="lg:col-span-3 rounded-3xl border border-white bg-white/70 backdrop-blur-md p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-card" style={{ backgroundColor: autoSteps[activeStep].color }}>
              <i className={`${autoSteps[activeStep].icon} text-white text-2xl`} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: autoSteps[activeStep].color }}>Addım {autoSteps[activeStep].num}</span>
              <h3 className="font-black text-gray-900 text-xl" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{autoSteps[activeStep].title}</h3>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{autoSteps[activeStep].desc}</p>
          <div className="grid grid-cols-2 gap-3">
            {autoSteps[activeStep].items.map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-none" style={{ backgroundColor: `${autoSteps[activeStep].color}15` }}>
                  <i className="fas fa-check text-[10px]" style={{ color: autoSteps[activeStep].color }} />
                </div>
                <span className="text-sm font-medium text-gray-800">{item}</span>
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

export default AutomationProcess;
