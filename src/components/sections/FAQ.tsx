import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

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
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-none text-xs font-black ${open === i ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                {i + 1}
              </div>
              <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
            </div>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={16} className={open === i ? 'text-primary' : 'text-gray-400'} />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="px-6 pb-6">
                  <div className="ml-10 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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

export default FAQ;
