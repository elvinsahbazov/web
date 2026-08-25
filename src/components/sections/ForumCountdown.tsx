import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { C } from '../../lib/colors';
import Container from '../../components/ui/Container';

// 9. FORUM COUNTDOWN
// ─────────────────────────────────────────────────────────────────────────────
function ForumCountdown() {
  const target = new Date('2025-09-15T10:00:00');
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [{ val: time.d, label: 'Gün' }, { val: time.h, label: 'Saat' }, { val: time.m, label: 'Dəqiqə' }, { val: time.s, label: 'Saniyə' }];

  return (
    <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary to-primary-dark p-8 md:p-14 text-white">
      <div className="absolute inset-0 opacity-[0.06]">
        {[150, 260, 350, 440].map((size, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{ width: size, height: size, top: `${[10, 60, 20, 80][i]}%`, left: `${[75, 5, 50, 90][i]}%`, transform: 'translate(-50%,-50%)' }} />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
          <i className="fas fa-calendar-alt" /> Növbəti Forum
        </span>
        <h2 className="display-title text-3xl md:text-5xl text-white mb-4">Digital Marketing Forum 2025</h2>
        <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          Azərbaycanın ən böyük rəqəmsal marketinq forumu. Elvin Şahbazov ilə canlı öyrən!
        </p>
        <div className="flex justify-center gap-4 mb-10">
          {boxes.map(({ val, label }) => (
            <div key={label} className="countdown-box transform hover:scale-105 transition-transform">
              <span className="font-black text-3xl md:text-4xl text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                {String(val).padStart(2, '0')}
              </span>
              <span className="text-white/60 text-sm mt-2">{label}</span>
            </div>
          ))}
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfD-P6RhwGioRtXPreb4P1FsHd5flsJKXvnh7pokAaR4zPhUw/viewform?usp=sharing&ouid=101273263139991444708"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-black text-sm hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <i className="fas fa-external-link-alt" /> Google Form ilə Qeydiyyatdan Keç
        </a>
      </div>
    </div>
  );
}

export default ForumCountdown;
