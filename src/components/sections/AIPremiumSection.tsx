import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

// 3. AI PREMIUM SECTION
// ─────────────────────────────────────────────────────────────────────────────
const aiCards = [
  {
    icon: 'fas fa-comments',
    title: 'AI Chatbot & Lead Bot',
    color: C.blue,
    gradient: 'from-primary to-primary-dark',
    features: ['24/7 cavab sistemi', 'Lead kvalifikasiyası', 'Avtomatik yönləndirmə', 'CRM sinxronizasiyası'],
    desc: 'Müştərilərinizə 7/24 ani cavab verin. AI chatbot potansial alıcıları avtomatik filtirlayır və satış komandasına yönləndirir.',
  },
  {
    icon: 'fas fa-sitemap',
    title: 'CRM & Lead Management',
    color: C.blue,
    gradient: 'from-primary to-primary-dark',
    features: ['Lead bazası idarəetməsi', 'Status və satış mərhələləri', 'Komanda paneli', 'Avtomatik follow-up'],
    desc: 'Bütün leadləriniz bir yerdə. Satış borusunu izləyin, mərhələlər arası keçişi avtomatlaşdırın, komanda performansını real vaxtda görün.',
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Analytics & Reporting',
    color: C.blue,
    gradient: 'from-primary to-primary-dark',
    features: ['Reklam izləmə & attribution', 'Satış funnel analizi', 'Data əsaslı qərarlar', 'Avtomatik hesabat'],
    desc: 'Hər klikdən hər satışa qədər izləyin. GA4, Meta Pixel, CRM verisi birləşdirilir — bir dashboard-da tam görüntü əldə edin.',
  },
];



function HoverCard({ card, i }: { card: any, i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // For 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const rect = currentTarget.getBoundingClientRect();
    
    // For background gradient glow
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
    
    // For 3D Tilt (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = clientX - rect.left;
    const mouseYPos = clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      {...fadeUp(Math.min(i * 0.05, 0.25))}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="Kəşf et"
      className="relative group rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 overflow-hidden cursor-default transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
    >
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${card.color}18, transparent 80%)`,
        }}
      />
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-blue relative z-10`}>
        <i className={`${card.icon} text-white text-xl`} />
      </div>
      <h3 className="font-black text-gray-900 text-xl mb-4 tracking-tight relative z-10" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{card.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-8 relative z-10">{card.desc}</p>
      <ul className="space-y-2.5 relative z-10">
        {card.features.map((f: string) => (
          <li key={f} className="flex items-center gap-2.5 text-sm">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-none" style={{ backgroundColor: `${card.color}22` }}>
              <i className="fas fa-check text-[9px]" style={{ color: card.color }} />
            </div>
            <span className="text-gray-700 text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-gray-200 relative z-10">
        <a
          href="https://wa.me/994999550001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors"
        >
          Ətraflı öyrən <ArrowRight size={13} />
        </a>
      </div>
    </motion.div>
  );
}

function AIPremiumSection() {
  return (
    <section className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <Container wide className="relative">
        <motion.div {...fadeUp()} className="text-center mb-20 md:mb-28 max-w-4xl mx-auto">
          <span className="section-label !bg-white !text-gray-800 !border-gray-200 !shadow-sm">
            <i className="fas fa-robot text-primary" /> AI-Powered Biznes
          </span>
          <h2 className="section-title !text-gray-900 mt-8">
            Biznes proseslərinizi AI ilə daha<br />
            <span className="text-gradient-blue">sürətli, ölçülə bilən</span> və avtomatik<br />
            idarə olunan sistemə çevirin.
          </h2>
          <p className="section-subtitle !text-gray-600 mx-auto">
            Manual işlər bitir. AI işçilərinizi avtomatlaşdırır, leadlər itmir, satış böyüyür.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {aiCards.map((card, i) => (
            <HoverCard key={card.title} card={card} i={i} />
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="text-center mt-20">
          <a
            href="https://wa.me/994999550001"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="fab fa-whatsapp text-base" /> Pulsuz AI Konsultasiya Al
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

export default AIPremiumSection;
