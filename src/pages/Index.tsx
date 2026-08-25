 
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';
import Hero from '../components/sections/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import { fadeUp } from '../lib/motion';
import { C } from '../lib/colors';

import AIPremiumSection from '../components/sections/AIPremiumSection';
import RadialTimeline from '../components/sections/RadialTimeline';
import ROIWizard from '../components/sections/ROIWizard';
import AutomationProcess from '../components/sections/AutomationProcess';
import FAQ from '../components/sections/FAQ';
import FlipCards from '../components/sections/FlipCards';
import ForumCountdown from '../components/sections/ForumCountdown';
import SEO from '../components/SEO';
// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function IndexPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <SEO />

      <div className="relative z-0">
        <Hero />
      </div>

      <div className="relative z-10 bg-transparent">
        <MarqueeTicker />

        {/* LIGHT GLASSMORPHIC THEME WRAPPER FOR MIDDLE SECTIONS */}
        <div className="relative z-20 bg-white/90 backdrop-blur-3xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[40px] mx-4 md:mx-8 my-10 overflow-hidden text-gray-900">

          <AIPremiumSection />

          <section className="section-py overflow-hidden">
            <Container wide>
              <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
                <span className="section-label !bg-gray-100 !text-gray-800 !border-gray-200"><i className="fas fa-sync-alt" /> İş Prosesi</span>
                <h2 className="section-title !text-gray-900 mt-8">Necə işləyirik?</h2>
                <p className="section-subtitle !text-gray-600 mx-auto">
                  Hər layihə 4 mərhələdən keçir. Detalları görmək üçün orbitdəki nöqtəyə klikləyin.
                </p>
          </motion.div>
          <div className="overflow-x-auto pb-4">
            <RadialTimeline />
          </div>
        </Container>
      </section>


      <section className="section-py">
        <Container wide>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label !bg-gray-100 !text-gray-800 !border-gray-200"><i className="fas fa-cogs" /> Avtomatlaşdırma</span>
            <h2 className="section-title !text-gray-900 mt-8">Avtomatlaşdırma Prosesi</h2>
            <p className="section-subtitle !text-gray-600 mx-auto">
              4 addımda biznesinizi tam avtomatlaşdırırıq. Hər addımı klikləyib ətraflı öyrənin.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <AutomationProcess />
          </motion.div>
        </Container>
      </section>

      <section className="section-py bg-transparent text-gray-900">
        <Container>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label !bg-gray-100 !text-gray-800 !border-gray-200"><i className="fas fa-question-circle" /> Sual & Cavab</span>
            <h2 className="section-title !text-gray-900 mt-8">Tez-tez verilən suallar</h2>
            <p className="section-subtitle !text-gray-600 mx-auto">Müştərilərimin ən çox soruşduğu suallar və ətraflı cavablar.</p>
          </motion.div>
          <FAQ />
          <motion.div {...fadeUp(0.3)} className="text-center mt-16 md:mt-20">
            <p className="text-gray-600 mb-6 text-sm">Başqa sualınız var?</p>
            <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <i className="fab fa-whatsapp text-sm" /> WhatsApp-da soruşun
            </a>
          </motion.div>
        </Container>
      </section>

      <section className="section-py">
        <Container wide>
          <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <span className="section-label !bg-gray-100 !text-gray-800 !border-gray-200"><i className="fas fa-star" /> Niyə Biz?</span>
            <h2 className="section-title !text-gray-900 mt-8">Xidmətlər & Üstünlüklər</h2>
            <p className="section-subtitle !text-gray-600 mx-auto">Kartların üzərindən keçin — hər bir xidmətin detallarını görün.</p>
          </motion.div>
          <FlipCards />
        </Container>
      </section>
      <section className="section-py bg-transparent text-gray-900 pb-24">
        <Container>
          <ForumCountdown />
        </Container>
      </section>

        {/* END LIGHT GLASSMORPHIC THEME WRAPPER */}
        </div>

      </div>

    </div>
  );
}
