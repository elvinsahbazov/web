import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

// 8. FLIP CARDS
// ─────────────────────────────────────────────────────────────────────────────
const flipCards = [
  {
    num: '01', title: 'Performans Marketinqi', icon: 'fas fa-rocket', color: C.blue,
    front: 'Yalnız Nəticəyə Yönəlmiş Reklamlar',
    back: 'Google, Meta, TikTok və digər şəbəkələrdə sınaqdan keçirilmiş strategiyalarla büdcənizi boşa xərcləmədən yüksək ROI gətirən kampaniyalar qururuq.',
    backItems: ['Çoxkanallı Kampaniyalar', 'Yüksək ROI (Gəlirlilik)', 'Retargeting Sistemləri', 'A/B Testlər'],
  },
  {
    num: '02', title: 'Veb Saytların Hazırlanması', icon: 'fas fa-laptop-code', color: C.black,
    front: 'Sizin 24/7 İşləyən Rəqəmsal Filialınız',
    back: 'Sürətli, müasir UI/UX dizayna malik və birbaşa satışa (dönüşümə) hesablanmış korporativ saytların və e-ticarət platformalarının sıfırdan yığılması.',
    backItems: ['Müasir UI/UX Dizayn', 'E-ticarət (E-commerce)', 'Sürətli və Təhlükəsiz', 'Mobil Uyğunluq'],
  },
  {
    num: '03', title: 'SEO & GEO Optimizasiya', icon: 'fas fa-search-location', color: C.blue,
    front: 'Axtarışlarda və Xəritələrdə Birinci Olun',
    back: 'Google-da orqanik (ödənişsiz) ön sıralara çıxmaq və Google Maps, Yandex Maps (GEO) üzərindən yerli müştərilərinizi rəqiblərdən öncə qazanmaq üçün dərin optimizasiya.',
    backItems: ['Texniki SEO', 'Açar Söz Analizi', 'Google Maps (Local SEO)', 'Yandex Maps'],
  },
  {
    num: '04', title: 'AI Avtomatlaşdırma', icon: 'fas fa-robot', color: C.black,
    front: 'Biznesinizin 24/7 Avtopilotu',
    back: 'Müştəri xidmətləri, satış prosesləri və gündəlik əməliyyatlarınızı AI botlar və sistemlərlə avtomatlaşdıraraq vaxta və insan resurslarına qənaət edirik.',
    backItems: ['AI Chatbotlar', 'CRM İnteqrasiyası', 'Satış Avtomatlaşdırması', '24/7 Dəstək Sistemi'],
  },
  {
    num: '05', title: 'Funnel Optimizasiyası', icon: 'fas fa-filter', color: C.blue,
    front: 'Ziyarətçidən Sadiq Müştəriyə',
    back: 'Müştərinin markanızla ilk təmasından alışa qədər olan yolunu (Customer Journey) incələyir və alışa keçmə faizini maksimuma çatdırırıq.',
    backItems: ['Landing Page Optimizasiyası', 'Conversion Rate (CRO)', 'Müştəri Yolu (Journey)', 'Email & WhatsApp ardıcıllığı'],
  },
  {
    num: '06', title: 'B2B Lead Generation', icon: 'fas fa-handshake', color: C.black,
    front: 'Böyük Müqavilələr və Strateji Satışlar',
    back: 'LinkedIn və digər korporativ platformalar vasitəsilə şirkət rəhbərlərini (CEO, Direktorlar) hədəfləyərək biznesiniz üçün "isti" və keyfiyyətli potensial müştərilər toplayırıq.',
    backItems: ['LinkedIn Ads', 'Birbaşa Qərarvericilər', 'Lead Form Kampaniyaları', 'B2B Şəbəkə (Networking)'],
  },
];

function FlipCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {flipCards.map((card, i) => (
        <motion.div
          key={card.num}
          {...fadeUp(Math.min(i * 0.05, 0.2))}
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
              <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{card.front}</p>
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

export default FlipCards;
