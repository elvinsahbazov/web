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
