import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Database, Cpu, Layers } from 'lucide-react';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';
import { C } from '../lib/colors';

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = ['reqemsal-sahibkar', 'reqemsal-telebe'];

const sahibkarBento = [
  {
    icon: <Database size={22} />,
    title: 'Data-Driven Visioner',
    desc: 'Hər qərar məlumata əsaslanır. Emosiyalarla deyil, nəticələrlə idarə edilən biznes qurulur.',
    color: C.blue,
    bg: 'from-[#E8F2FF] to-white',
    span: 'col-span-1',
  },
  {
    icon: <Cpu size={22} />,
    title: 'AI-İlk Yanaşma',
    desc: 'Süni intellekt sadəcə bir alət deyil – biznes modelin əsasıdır. Avtomatlaşdırma ilə miqyas artırılır.',
    color: C.blue,
    bg: 'from-[#E8F2FF] to-white',
    span: 'col-span-1 md:col-span-2',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'ROI Fokus',
    desc: 'Hər xərclənən manat geri dönməlidir. ROAS, LTV və CAC daim izlənilir.',
    color: C.blue,
    bg: 'from-[#E8F2FF] to-white',
    span: 'col-span-1',
  },
  {
    icon: <Layers size={22} />,
    title: 'Çeviklik & İnnovasiya',
    desc: 'Bazar dəyişkəndir. Sürətli adaptasiya, eksperiment mədəniyyəti və iterativ yanaşma uğurun açarıdır.',
    color: C.blue,
    bg: 'from-[#E8F2FF] to-white',
    span: 'col-span-1',
  },
];

const principles = [
  { num: '01', title: 'Ölçmək', desc: 'Ölçülməyən şey idarə edilə bilməz. Hər metrik izlənilir.' },
  { num: '02', title: 'Test etmək', desc: 'Fərziyyəni test et. Doğru olanı böyüt, yanlışı kəs.' },
  { num: '03', title: 'Optimallaşdırmaq', desc: 'Heç vaxt "kifayətdir" demə. Davamlı inkişaf şüarıdır.' },
  { num: '04', title: 'Miqyaslandırmaq', desc: 'Uğurlu sistemi sistemləşdir, sonra böyüt.' },
];

const techSkills = [
  { name: 'Google Analytics 4', level: 95, color: C.blue },
  { name: 'Meta Business Suite', level: 92, color: C.blue },
  { name: 'Python (Data Analysis)', level: 70, color: C.blue },
  { name: 'SQL & Database', level: 75, color: C.blue },
  { name: 'Make / Zapier', level: 88, color: C.blue },
  { name: 'AI Prompt Engineering', level: 90, color: C.blue },
  { name: 'Looker Studio', level: 85, color: C.blue },
  { name: 'CRM Systems', level: 88, color: C.blue },
];

const studentValues = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Texnologiyaya Yiyələnmə',
    desc: 'Ən son alətlər, platformalar və AI texnologiyalarını aktiv olaraq öyrənir.',
    color: C.blue,
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Məlumat Savadlılığı',
    desc: 'Raw datadan anlamlı insight çıxarmaq, vizuallaşdırmaq və qərar qəbul etmək.',
    color: C.blue,
  },
  {
    icon: 'fas fa-brain',
    title: 'Kritik Düşüncə',
    desc: 'Hər cür iddia sorğulanır, sübut edilir, sonra tətbiq edilir.',
    color: C.blue,
  },
  {
    icon: 'fas fa-infinity',
    title: 'Sonsuz Öyrənmə Dövrü',
    desc: 'Kurs, sertifikat, kitab, podcast – öyrənmə heç vaxt dayanmır.',
    color: C.blue,
  },
];

const learningResources = [
  { type: 'Kurs Platformaları', items: ['Google Skillshop', 'Meta Blueprint', 'HubSpot Academy', 'Coursera', 'Udemy'] },
  { type: 'Analitika Alətləri', items: ['GA4', 'Looker Studio', 'Tableau', 'Power BI', 'Mixpanel'] },
  { type: 'Avtomatlaşdırma', items: ['Make (Integromat)', 'Zapier', 'n8n', 'ActiveCampaign', 'Klaviyo'] },
  { type: 'AI & Data', items: ['ChatGPT Pro', 'Claude AI', 'Python', 'SQL', 'BigQuery'] },
];

export default function Vision() {
  const active = useScrollSpy(sectionIds);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.innerWidth < 768 ? 130 : 40;
    const top = el.getBoundingClientRect().top + window.scrollY - (64 + offset);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'reqemsal-sahibkar', label: 'RƏQƏMSAl SAHİBKAR' },
    { id: 'reqemsal-telebe', label: 'RƏQƏMSAl TƏLƏBƏ' },
  ];

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32">
      <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-xl border-b border-black/8 md:hidden">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className={`flex-none px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                active === n.id
                  ? 'bg-primary text-white'
                  : 'bg-[#F8FAFC] text-black/55 hover:bg-primary/8 hover:text-primary'
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <Container wide className="py-12 md:py-16">
        <div className="flex gap-12 lg:gap-16">
          <aside className="hidden md:block w-56 flex-none">
            <div className="scrollspy-sidebar">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className={`w-full px-5 py-3 rounded-2xl text-sm font-bold text-left tracking-wide transition-all duration-300 ${
                    active === n.id
                      ? 'bg-primary text-white shadow-blue'
                      : 'text-black/55 bg-[#F8FAFC] hover:bg-primary/8 hover:text-primary'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 min-w-0 space-y-32 md:space-y-40">
            <section id="reqemsal-sahibkar">
              <motion.div {...fadeUp()} className="mb-12 md:mb-16">
                <span className="section-label">
                  <i className="fas fa-rocket" /> Rəqəmsal Sahibkar
                </span>
                <h2 className="section-title mt-8">Rəqəmsal Sahibkar Kimdir?</h2>
                <p className="section-subtitle">
                  Data, texnologiya və yaradıcılığın kəsişimindəki lider profil.
                </p>
              </motion.div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                {sahibkarBento.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bento-card p-6 bg-gradient-to-br ${b.bg} ${b.span}`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                      style={{ backgroundColor: b.color }}
                    >
                      {b.icon}
                    </div>
                    <h3 className="font-bold text-black mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{b.title}</h3>
                    <p className="text-sm text-black/70 leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Principles */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card mb-12"
              >
                <h3 className="font-bold text-xl text-black mb-6" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  4 Əsas Prinsip
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {principles.map((p, i) => (
                    <motion.div
                      key={p.num}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center p-4 rounded-2xl bg-[#F8FAFC]"
                    >
                      <span className="font-black text-3xl text-primary/20 block" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{p.num}</span>
                      <h4 className="font-bold text-black text-sm mt-1" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{p.title}</h4>
                      <p className="text-xs text-black/55 mt-1 leading-relaxed">{p.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-l-4 border-primary pl-6 py-2"
              >
                <p className="font-semibold text-xl text-black italic" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  "Rəqəmsal sahibkar olmaq sürəti deyil – ağıllı sürəti tərəfdar tutur."
                </p>
                <cite className="text-sm text-black/55 not-italic mt-2 block">
                  — Elvin Şahbazov
                </cite>
              </motion.blockquote>
            </section>

            {/* Rəqəmsal Tələbə */}
            <section id="reqemsal-telebe" className="rounded-4xl section-alt border border-black/8 p-8 md:p-14 -mx-2 md:mx-0">
              <motion.div {...fadeUp()} className="mb-12 md:mb-16">
                <span className="section-label">
                  <i className="fas fa-user-graduate" /> Rəqəmsal Tələbə
                </span>
                <h2 className="section-title mt-8">Rəqəmsal Tələbə Kimdir?</h2>
                <p className="section-subtitle">
                  Texnologiya, data və rəqəmsal bacarıqlara yiyələnən müasir öyrənən profili.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                {studentValues.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: C.blueSoft }}>
                      <i className={`${v.icon} text-xl text-primary`} />
                    </div>
                    <h3 className="font-bold text-black mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{v.title}</h3>
                    <p className="text-sm text-black/55 leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tech Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 shadow-card mb-10"
              >
                <h3 className="font-bold text-xl text-black mb-6" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  Texniki Bacarıq Xəritəsi
                </h3>
                <div className="space-y-4">
                  {techSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-black/70">{skill.name}</span>
                        <span className="text-xs font-bold text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: C.blue }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Learning Resources */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-xl text-black mb-6" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  Öyrənmə Ekosistemi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {learningResources.map((r) => (
                    <div key={r.type} className="bg-white rounded-2xl p-4 shadow-card">
                      <h4 className="font-semibold text-xs text-primary uppercase tracking-wide mb-3">{r.type}</h4>
                      <ul className="space-y-1.5">
                        {r.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-black/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-none" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10 text-center"
              >
                <a
                  href="https://wa.me/994999550001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
                >
                  <i className="fab fa-whatsapp" /> Mentorluq üçün Əlaqə
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            </section>
          </main>
        </div>
      </Container>
    </div>
  );
}
