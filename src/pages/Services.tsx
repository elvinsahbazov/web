
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';
import { C } from '../lib/colors';
import { supabase } from '../lib/supabase';
import { useSiteContent } from '../context/SiteContentContext';

// ─── ScrollSpy Hook ─────────────────────────────────────────────────────────
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// ─── Services Data ───────────────────────────────────────────────────────────
const services = [
  {
    icon: 'fas fa-bullhorn',
    title: 'Performance Marketinq',
    color: C.blue,
    desc: 'Meta, Google, TikTok, Yandex platformalarında ROI-a fokuslanmış reklam kampaniyalarının idarə edilməsi.',
    features: ['Kampaniya strategiyası', 'A/B test', 'Auditoriya seqmentasiyası', 'Hesabat & analiz'],
  },
  {
    icon: 'fas fa-robot',
    title: 'Süni İntellektlə Biznes Avtomatlaşdırması',
    color: C.blue,
    desc: 'Təkcə CRM yox, müştəri xidmətləri (AI Çatbotlar), daxili əməliyyatlar, sənəd dövriyyəsi və marketinq proseslərinin AI ilə tam avtomatlaşdırılması.',
    features: ['AI Çatbot və Səs Agentləri', 'Bütün biznes proseslərin avtomatlaşdırılması', 'CRM və ERP İnteqrasiyası', '24/7 İşləyən AI İşçilər'],
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Data Analitika & Hesabat',
    color: C.blue,
    desc: 'GA4, Meta Pixel, Yandex Metrica konfiqurasiyası, dashboard qurulması və dərin analiz.',
    features: ['GA4 konfiqurasiyası', 'Custom dashboardlar', 'Attribution modeli', 'Conversion tracking'],
  },
  {
    icon: 'fas fa-search',
    title: 'SEO & Kontent Strategiyası',
    color: C.blue,
    desc: 'Texniki SEO, açar söz tədqiqatı, kontent planlaması və link building strategiyaları.',
    features: ['Texniki SEO audit', 'Açar söz analizi', 'Kontent planı', 'Link building'],
  },
  {
    icon: 'fas fa-laptop-code',
    title: 'Vebsaytların Hazırlanması',
    color: C.blue,
    desc: 'Yüksək konversiyalı, sürətli və müasir dizayna malik korporativ və e-ticarət saytları.',
    features: ['Müasir UI/UX', 'SEO uyğun kodlama', 'Sürət optimizasiyası', 'Responsive dizayn'],
  },
  {
    icon: 'fas fa-funnel-dollar',
    title: 'Satış Hunisi & CRO',
    color: C.blue,
    desc: 'Landing page optimizasiyası, A/B testlər, konversiya hunisi qurulması və CRO auditi.',
    features: ['Landing page dizayn', 'Huni analizi', 'CRO strategiyası', 'Heat mapping'],
  },
];

const bizdevItems = [
  {
    icon: 'fas fa-handshake',
    title: 'Biznes İnkişaf Strategiyası',
    desc: 'Yeni bazar imkanlarının müəyyənləşdirilməsi, tərəfdaşlıq inkişafı və gəlir artırım strategiyaları.',
    color: C.blue,
  },
  {
    icon: 'fas fa-store',
    title: 'E-ticarət Qurulması',
    desc: 'Online mağaza qurulması, ödəniş sistemləri inteqrasiyası, stok idarəetməsi avtomatlaşdırması.',
    color: C.blue,
  },
  {
    icon: 'fas fa-people-arrows',
    title: 'B2B Lead Generation',
    desc: 'LinkedIn outreach, email kampaniyaları, webinar funnel sistemi ilə keyfiyyətli B2B leadlər.',
    color: C.blue,
  },
  {
    icon: 'fas fa-coins',
    title: 'Monetizasiya Strategiyası',
    desc: 'Mövcud auditoriyadan maksimum gəlir əldə etmək üçün çoxşaxəli monetizasiya modeli.',
    color: C.blue,
  },
];

// ─── 18 Training Modules ─────────────────────────────────────────────────────
const modules = [
  {
    num: '01', title: 'Rəqəmsal Marketinqin Əsasları',
    learn: ['Marketinq Əsasları', 'Müştəri Səyahəti', 'Alıcı Personası', 'Bazar Araşdırması', 'Huni Strategiyası', 'Marketinq KPI-ları', 'Rəqib Analizi'],
  },
  {
    num: '02', title: 'Meta Ads Masterklass',
    learn: ['Facebook Reklamları', 'Instagram Reklamları', 'Business Manager', 'Pixel', 'Conversion API', 'CBO', 'ABO', 'Miqyaslama (Scaling)', 'Retargetinq'],
  },
  {
    num: '03', title: 'Google Ads Masterklass',
    learn: ['Axtarış Reklamları', 'Display Reklamları', 'YouTube Reklamları', 'Demand Gen', 'Performance Max', 'Shopping Reklamları', 'Açar Söz Araşdırması', 'Smart Bidding'],
  },
  {
    num: '04', title: 'Analitika və İzləmə',
    learn: ['GA4', 'Google Tag Manager', 'Konversiya İzləmə', 'Hadisələr (Events)', 'Server Side Tracking', 'UTM İzləmə', 'Dashboard'],
  },
  {
    num: '05', title: 'SEO Masterklass',
    learn: ['On Page SEO', 'Texniki SEO', 'Yerli SEO', 'Açar Söz Araşdırması', 'Search Console', 'AI SEO'],
  },
  {
    num: '06', title: 'Kontent Marketinq',
    learn: ['Kopiraytinq', 'Storytelling', 'Kontent Strategiyası', 'Video Marketinq', 'Viral Kontent', 'Sosial Media Kontenti'],
  },
  {
    num: '07', title: 'Email Marketinq & CRM',
    learn: ['Email Huniləri', 'Lead Generation', 'Avtomatlaşdırma', 'CRM', 'Seqmentasiya', 'Müştəri Dövrü'],
  },
  {
    num: '08', title: 'TikTok Ads & Yandex Ads',
    learn: ['TikTok Reklamları', 'Spark Ads', 'Pixel', 'Yandex Direct', 'Kreativ Strategiya', 'Retargetinq'],
  },
  {
    num: '09', title: 'Konversiya Optimizasiyası (CRO)',
    learn: ['Landing Page-lər', 'UX', 'CTA', 'Hunilər', 'A/B Testləri', 'Heatmap Analizi'],
  },
  {
    num: '10', title: 'Sosial Media Marketinqi',
    learn: ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube', 'Threads', 'Pinterest'],
  },
  {
    num: '11', title: 'Brend Strategiyası',
    learn: ['Brend Kimliyi', 'Mövqeləndirmə', 'USP', 'Səs Tonu', 'Vizual Kimlik'],
  },
  {
    num: '12', title: 'Marketinq Analitikası & BI',
    learn: ['Looker Studio', 'Dashboard-lar', 'KPI Analizi', 'Hesabatlar', 'Business Intelligence'],
  },
  {
    num: '13', title: 'AI Marketinq Alətləri',
    learn: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Midjourney', 'Flux', 'ElevenLabs', 'HeyGen', 'Canva AI', 'Runway'],
  },
  {
    num: '14', title: 'Süni İntellektlə Avtomatlaşdırma Masterklass',
    isPremium: true,
    learn: ['AI Agentlər', 'OpenAI API', 'Claude API', 'Gemini API', 'MCP', 'Zapier', 'Make', 'n8n', 'AI Çatbotlar', 'WhatsApp Avtomatlaşdırması', 'Instagram Avtomatlaşdırması', 'Email Avtomatlaşdırması', 'CRM Avtomatlaşdırması', 'Lead Avtomatlaşdırması', 'AI Səs Agentləri', 'İş Axını Avtomatlaşdırması'],
  },
  {
    num: '15', title: 'E-ticarət Marketinqi',
    learn: ['Shopify', 'WooCommerce', 'Məhsul Marketinqi', 'Shopping Kampaniyaları', 'ROAS', 'LTV', 'Upsell', 'Cross Sell'],
  },
  {
    num: '16', title: 'Reklam Büdcəsinin İdarəedilməsi',
    learn: ['ROAS', 'ROI', 'CAC', 'CPL', 'CPM', 'CPC', 'Büdcə Bölgüsü', 'Kampaniyaların Miqyaslanması'],
  },
  {
    num: '17', title: 'Frilans, Agentlik & Portfolio',
    learn: ['Portfolio', 'LinkedIn', 'Upwork', 'Fiverr', 'Müştəri Cəlbi', 'Təklif Yazma', 'Qiymətləndirmə Strategiyası', 'Karyera İnkişafı'],
  },
  {
    num: '18', title: 'Yekun Layihə & Sertifikatlaşdırma',
    learn: ['Tam Marketinq Strategiyası', 'Tam Huni', 'Süni İntellektlə Avtomatlaşdırma İnteqrasiyası', 'Kampaniya Başlatma', 'Müştəri Təqdimatı', 'Karyeraya Hazırlıq', 'Məzuniyyət Sertifikatı'],
  },
];

const whyChooseUs = [
  { icon: 'fas fa-briefcase', text: 'Real Müştəri Layihələri' },
  { icon: 'fas fa-robot', text: 'Süni İntellektlə Avtomatlaşdırma Təlimi' },
  { icon: 'fas fa-user-tie', text: 'Mentorluq' },
  { icon: 'fas fa-chart-line', text: 'Karyera Dəstəyi' },
  { icon: 'fas fa-folder-open', text: 'Portfolio Yaradılması' },
  { icon: 'fas fa-certificate', text: 'Beynəlxalq Sertifikat' },
  { icon: 'fas fa-users', text: 'Ömürlük İcma (Community)' },
  { icon: 'fas fa-laptop-code', text: 'Praktiki Öyrənmə' },
];

const whoIsThisFor = [
  'Yeni Başlayanlar', 'Sahibkarlar', 'Biznes Sahibləri', 'Marketinq Mütəxəssisləri', 'Frilanserlər', 'E-ticarət Sahibləri', 'Tələbələr', 'Agentlik Rəhbərləri'
];


const sectionIds = ['xidmetlerim', 'biznes-inkisaf', 'telim'];

export default function Services() {
  const active = useScrollSpy(sectionIds);
  const { content } = useSiteContent();
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('services').select('*').eq('published', true).order('created_at', { ascending: true });
      if (data && data.length > 0) {
        setDbServices(data);
      }
    }
    fetchServices();
  }, []);

  const displayServices = dbServices.length > 0
    ? dbServices.map(s => ({
      icon: s.icon || 'fas fa-star',
      title: s.title,
      color: C.blue,
      desc: s.description,
      features: ['Xüsusi strategiya', 'Məlumata əsaslanan', 'Daimi nəzarət'] // Fallback features if not in DB schema yet
    }))
    : services;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.innerWidth < 768 ? 130 : 40;
    const top = el.getBoundingClientRect().top + window.scrollY - (64 + offset);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'xidmetlerim', label: 'XİDMƏTLƏRİM' },
    { id: 'biznes-inkisaf', label: 'BİZNES İNKİŞAF' },
    { id: 'telim', label: 'TƏLİM' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white pt-28 md:pt-32">
      <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-xl border-b border-black/8 md:hidden">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className={`flex-none px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${active === n.id
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
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-56 flex-none">
            <div className="scrollspy-sidebar">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className={`w-full px-5 py-3 rounded-2xl text-sm font-bold text-left tracking-wide transition-all duration-300 ${active === n.id
                    ? 'bg-primary text-white shadow-blue'
                    : 'text-black/55 bg-[#F8FAFC] hover:bg-primary/8 hover:text-primary'
                    }`}
                >
                  {n.label}
                </button>
              ))}
              <div className="mt-6 card bg-primary/5 p-4">
                <p className="text-xs font-semibold text-black mb-3">Məsləhət lazımdır?</p>
                <a
                  href="https://wa.me/994999550001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-4 py-2 w-full justify-center"
                >
                  <i className="fab fa-whatsapp" /> Əlaqə
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-32 md:space-y-40">
            <section id="xidmetlerim">
              <motion.div
                {...fadeUp()}
                className="mb-12 md:mb-16"
              >
                <span className="section-label">
                  <i className="fas fa-briefcase" /> Xidmətlərim
                </span>
                <h2 className="section-title mt-8">{content.services_main_title || 'Peşəkar Xidmətlər'}</h2>
                <p className="section-subtitle">
                  {content.services_main_subtitle || 'ROI-a fokuslanmış, məlumata əsaslanan marketinq xidmətləri.'}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayServices.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="card card-hover group cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${s.color}15` }}
                    >
                      <i className={`${s.icon} text-xl`} style={{ color: s.color }} />
                    </div>
                    <h3 className="font-bold text-black mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{s.title}</h3>
                    <p className="text-sm text-black/55 leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-1.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ backgroundColor: s.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-black/8">
                      <a
                        href="https://wa.me/994999550001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                        style={{ color: s.color }}
                      >
                        Ətraflı <ArrowRight size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* BİZNES İNKİŞAF */}
            <section id="biznes-inkisaf">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="section-label">
                  <i className="fas fa-chart-line" /> Biznes İnkişaf
                </span>
                <h2 className="section-title mt-4">{content.services_bizdev_title || 'Biznes İnkişaf Xidmətləri'}</h2>
                <p className="section-subtitle">
                  {content.services_bizdev_subtitle || 'Biznesinizi böyütmək üçün strateji yanaşmalar və hazır həllər.'}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bizdevItems.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card card-hover group"
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: C.blueSoft }}>
                      <i className={`${b.icon} text-xl text-primary`} />
                    </div>
                    <h3 className="font-bold text-black mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{b.title}</h3>
                    <p className="text-sm text-black/55 leading-relaxed">{b.desc}</p>
                    <div className="mt-4 pt-4 border-t border-black/8">
                      <a
                        href="https://wa.me/994999550001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-primary"
                      >
                        Müzakirə et <ArrowRight size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* TƏLİM */}
            <section id="telim" className="mt-24 mb-10 pt-16 pb-24 px-6 md:px-12 rounded-[2rem] md:rounded-[3rem] bg-[#0A0A0A] text-white relative overflow-hidden shadow-2xl border border-white/10">
              {/* Premium Gradient Backgrounds */}
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(0,123,255,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-[radial-gradient(circle,rgba(0,123,255,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />
              <div className="vercel-grid absolute inset-0 opacity-20 pointer-events-none" />

              <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                    <i className="fas fa-star" /> Beynəlxalq Səviyyəli Kurs
                  </span>
                  <h2 className="font-satoshi text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: content.services_course_title || 'Rəqəmsal Marketinq & <br class="hidden md:block"/><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Süni İntellektlə Avtomatlaşdırma Kursu</span>' }} />
                  <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    {content.services_course_subtitle || 'Rəqəmsal Marketinq və Süni İntellektlə Avtomatlaşdırmanı real layihələr, mentorluq və beynəlxalq səviyyəli bacarıqlarla öyrənin.'}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {['18 Modul', 'Real Layihələr', 'Süni İntellektlə Avtomatlaşdırma', 'Karyera Dəstəyi', 'Sertifikat'].map((badge) => (
                      <span key={badge} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-medium backdrop-blur-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                  {modules.map((m, i) => (
                    <motion.div
                      key={m.num}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover="hover"
                      className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,123,255,0.12)]"
                    >
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-3xl font-black text-white/10 group-hover:text-blue-500/30 transition-colors duration-500 font-satoshi">
                            {m.num}
                          </span>
                          <motion.div
                            variants={{
                              hover: { x: 5, opacity: 1 }
                            }}
                            initial={{ x: 0, opacity: 0.5 }}
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500"
                          >
                            <i className="fas fa-arrow-right text-sm" />
                          </motion.div>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-4 leading-snug font-satoshi">
                          {m.title}
                        </h4>

                        <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
                          <ul className="space-y-2 mt-4 pt-4 border-t border-white/10">
                            {m.learn.map((l) => (
                              <li key={l} className="flex items-start gap-2 text-white/70 text-sm">
                                <span className="text-blue-400 mt-1">
                                  <i className="fas fa-check-circle text-[10px]" />
                                </span>
                                {l}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6">
                            <span className="text-blue-400 text-sm font-semibold flex items-center gap-1">
                              Ətraflı bax <i className="fas fa-chevron-right text-[10px]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Why Choose Us */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-24"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12 font-satoshi">Niyə Bizim Kursu Seçməlisiniz?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {whyChooseUs.map((feature, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-3 transition-colors hover:bg-white/[0.04]">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <i className={`${feature.icon} text-lg`} />
                        </div>
                        <span className="text-white/80 text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Who is this for */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-24"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12 font-satoshi">Bu Kurs Kimlər Üçündür?</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {whoIsThisFor.map((target, i) => (
                      <span key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium transition-all hover:bg-white/10 hover:text-white cursor-default">
                        {target}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Premium CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 p-10 md:p-16 text-center"
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                  <div className="relative z-10 max-w-2xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 font-satoshi">
                      Rəqəmsal Marketinq və Suni intelektle avtomatlaşdirma Mutexesisi Olun
                    </h3>
                    <p className="text-blue-100 text-base md:text-lg mb-10 leading-relaxed">
                      Şirkətlərin bu gün axtardığı bacarıqları öyrənin və real layihələr, AI avtomatlaşdırması və mentorluqla gələcəyə hazır karyera qurun.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <a href="https://wa.me/994999550001" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                        İndi Qoşul
                      </a>
                      <a href="/Elvin_Sahbazov_Sillabus.pdf" download="Elvin_Sahbazov_Sillabus.pdf" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                        <i className="fas fa-file-pdf mr-2" /> Sillabusu Yüklə
                      </a>
                    </div>

                    <div className="mt-12 text-blue-100/60 font-medium text-sm border-t border-white/10 pt-6">
                      Elvin Şahbazov / Rəqəmsal Marketinq və Suni intelektle avtomatlaşdirma Mutexesisi
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>
        </div>
      </Container>
    </div>
  );
}
