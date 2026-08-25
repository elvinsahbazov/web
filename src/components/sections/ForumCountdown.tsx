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
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { setErrorMsg('Ad və email məcburidir.'); return; }
    setStatus('loading');
    setErrorMsg('');
    const { error } = await supabase.from('forum_leads').insert({
      full_name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      business_type: form.businessType.trim() || null,
      source: 'forum_block',
    });
    if (error) { setStatus('error'); setErrorMsg('Xəta baş verdi. Yenidən cəhd edin.'); }
    else setStatus('success');
  };

  const boxes = [{ val: time.d, label: 'Gün' }, { val: time.h, label: 'Saat' }, { val: time.m, label: 'Dəqiqə' }, { val: time.s, label: 'Saniyə' }];

  return (
    <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary to-primary-dark p-8 md:p-14 text-white">
      <div className="absolute inset-0 opacity-[0.06]">
        {[150, 260, 350, 440].map((size, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{ width: size, height: size, top: `${[10, 60, 20, 80][i]}%`, left: `${[75, 5, 50, 90][i]}%`, transform: 'translate(-50%,-50%)' }} />
        ))}
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/20 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
            <i className="fas fa-calendar-alt" /> Növbəti Forum
          </span>
          <h2 className="display-title text-3xl md:text-4xl text-white mb-3">Digital Marketing Forum 2025</h2>
          <p className="text-white/75 mb-8 leading-relaxed">Azərbaycanın ən böyük rəqəmsal marketinq forumu. Elvin Şahbazov ilə canlı öyrən!</p>
          <div className="flex justify-center lg:justify-start gap-3 mb-8">
            {boxes.map(({ val, label }) => (
              <div key={label} className="countdown-box">
                <span className="font-black text-2xl text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{String(val).padStart(2, '0')}</span>
                <span className="text-white/60 text-xs mt-1">{label}</span>
              </div>
            ))}
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfD-P6RhwGioRtXPreb4P1FsHd5flsJKXvnh7pokAaR4zPhUw/viewform?usp=sharing&ouid=101273263139991444708"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/25 text-white rounded-full font-semibold text-sm hover:bg-white/25 transition-all"
          >
            <i className="fas fa-external-link-alt text-xs" /> Google Formu Aç
          </a>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-7">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto mb-4 text-white" size={48} />
              <h3 className="font-black text-xl text-white mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Qeydiyyat Alındı!</h3>
              <p className="text-white/75 text-sm">Tezliklə sizinlə əlaqə saxlanılacaq!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h3 className="font-black text-lg text-white mb-1" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Pulsuz Qeydiyyat</h3>
              <p className="text-white/65 text-xs mb-4">Məlumatlarınızı daxil edin, biz sizinlə əlaqə saxlayaq.</p>
              {['Ad Soyad *', 'Email *', 'Telefon (WhatsApp)', 'Biznes növü / Sahə'].map((ph, idx) => (
                <input
                  key={ph}
                  type={idx === 1 ? 'email' : idx === 2 ? 'tel' : 'text'}
                  placeholder={ph}
                  required={idx < 2}
                  value={[form.name, form.email, form.phone, form.businessType][idx]}
                  onChange={(e) => {
                    const keys = ['name', 'email', 'phone', 'businessType'] as const;
                    setForm((f) => ({ ...f, [keys[idx]]: e.target.value }));
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/45 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
              ))}
              {errorMsg && <p className="text-white/80 text-xs bg-white/10 rounded-xl px-3 py-2">{errorMsg}</p>}
              <button
                type="submit" disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary rounded-full font-black text-sm hover:shadow-xl transition-all disabled:opacity-60"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
              >
                {status === 'loading' ? <><i className="fas fa-spinner fa-spin" /> Göndərilir...</> : <><i className="fas fa-ticket-alt" /> Pulsuz Qeydiyyat <ArrowRight size={13} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForumCountdown;
