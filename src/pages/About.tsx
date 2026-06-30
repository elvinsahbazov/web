import { motion } from 'framer-motion';
import { BookOpen, Award, Briefcase, Target, GraduationCap } from 'lucide-react';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';
import { C } from '../lib/colors';
import { useSiteContent } from '../context/SiteContentContext';

const ABOUT_IMAGE =
  'https://drive.google.com/thumbnail?id=17punt_lVpXaUSqdoz0x8TPNSKDnFkgkT&sz=w1200';

const certIds = [
  '1K58rPLSZeyq8jFhu7Cpfdv7uZRjwBvCG',
  '1TgC7Qba0s_UlNUkVLNmV5TjyXeMW0BJC',
  '1tbAboA42zubETJlU3CBN7wnqlsLiFifw',
  '1dK9K3MGM0l6ANxl9oEYWy08A8qjnYkWk',
  '1nRX166vn9slkt725LdxoC5WIIypHkkoT',
  '1ip31FJWpCvHcRU4DIHbhnighAmbzfRaX',
  '11lK3Y5_O14mPxhZfw_dt7QMH9J0Dz9F7',
  '1WoWNYc6eLlJh-Nz1s5-1Ou7Texewv2di',
  '1ch7UCtejKnab6f2mW_FsRVDGEpXBMbdG',
  '1nCSoYQT09oyVZhBCFMweNcn84EUv9yFB',
  '1rTHEjA-63slAbtcIPhiwAjlHM1YALZTp',
  '1QLyKhvIG0PMTT07TpEwJgSlkETYPdIYj',
];

const certLabels = [
  'Google GA4 Certification',
  'Google Ads Display',
  'AI-Powered Performance Ads',
  'Foundations of Business Intelligence',
  'Google Data Analytics',
  'Digital Marketing & E-commerce',
  'Meta Marketing Analytics',
  'Meta Data Analytics',
  'Meta Social Media Marketing',
  'HubSpot Digital Marketing',
  'HubSpot SEO Certification',
  'DMI Social Media Fundamentals',
];

const certs = certIds.map((id, i) => ({
  id,
  label: certLabels[i] || `Sertifikat ${i + 1}`,
  thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w640`,
  view: `https://drive.google.com/file/d/${id}/view`,
}));

const certificationGroups = [
  {
    org: 'Google',
    icon: 'fab fa-google',
    color: C.blue,
    items: [
      'Google Analytics 4 (GA4)',
      'Google Ads Display Certification',
      'AI-Powered Performance Ads',
      'Foundations of Business Intelligence',
      'Google Data Analytics',
      'Digital Marketing & E-commerce',
    ],
  },
  {
    org: 'Meta',
    icon: 'fab fa-facebook',
    color: C.black,
    items: ['Meta Marketing Analytics Foundation', 'Meta Data Analytics', 'Meta Social Media Marketing'],
  },
  {
    org: 'HubSpot',
    icon: 'fas fa-h-square',
    color: C.blue,
    items: ['HubSpot Digital Marketing Certification', 'HubSpot SEO Certification'],
  },
  {
    org: 'DMI',
    icon: 'fas fa-graduation-cap',
    color: C.black,
    items: ['Social Media & Digital Marketing Fundamentals'],
  },
];

const books = [
  { title: 'Marketinq və Bazar', icon: '📊', desc: 'Bazar anlayışı, tələb-təklif balansı və marketinq strategiyaları.' },
  { title: 'BREND', icon: '🏷️', desc: 'Brend identifikasiyası, loyallıq və mövqeləndirmə strategiyaları.' },
  { title: 'Rəqəmsal Strategiya', icon: '💡', desc: 'Rəqəmsal kanallar üzrə inteqrasiya edilmiş strategiya modeli.' },
  { title: 'Rəqəmsalda Müştəri davranışları', icon: '🧠', desc: 'Online müştəri psixologiyası, davranış analizi və persona qurma.' },
];

const fadeUpLocal = fadeUp;

function AboutHero() {
  const { content } = useSiteContent();
  return (
    <section className="hero-batuhan relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-0 top-1/3 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.12)_0%,transparent_70%)] blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        className="hero-portrait-layer pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[52%]"
      >
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/60 to-transparent lg:from-black lg:via-black/25 lg:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-[1] h-[18%] bg-gradient-to-t from-black/70 to-transparent lg:hidden" />
        <img src={content.about_image || ABOUT_IMAGE} alt="Elvin Şahbazov" />
      </motion.div>

      <div className="relative z-[3] mx-auto max-w-[1600px]">
        <div className="grid min-h-[min(105svh,960px)] grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 pb-12 pt-32 md:px-10 md:pt-36 lg:px-14 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary md:mb-8 md:text-xs"
              >
                <i className="fas fa-user" /> Haqqımda
              </motion.span>

              <h1
                className="display-title mb-6 text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.02] md:mb-8"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-white"
                >
                  ELVİN
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-gradient-blue"
                >
                  ŞAHBAZOV
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.65 }}
                className="mb-3 max-w-lg text-base font-medium leading-relaxed text-white/90 md:text-xl"
              >
                Digital Marketing & AI Automation Specialist
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56, duration: 0.65 }}
                className="inline-flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
              >
                <p className="font-black text-sm text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  Elvin Şahbazov
                </p>
                <p className="text-xs text-white/55">Marketing Director & AI Specialist</p>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative min-h-[50vh] overflow-hidden lg:hidden">
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-transparent" />
            <img
              src={content.about_image || ABOUT_IMAGE}
              alt=""
              aria-hidden="true"
              className="h-[118%] w-full object-cover object-[50%_12%] -translate-y-[10%]"
            />
          </div>
        </div>
      </div>

      <div className="hero-batuhan-diagonal" aria-hidden="true" />
    </section>
  );
}

function DarkCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const { content } = useSiteContent();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AboutHero />

      <section className="relative z-[1] -mt-1 py-20 md:py-28">
        <Container wide>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {/* About Card */}
            <motion.div {...fadeUpLocal(0.05)} className="md:col-span-2 lg:col-span-3">
              <DarkCard>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <i className="fas fa-user text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                    {content.about_title || 'Haqqımda'}
                  </h3>
                </div>
                <div className="no-scrollbar max-h-72 space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed text-white/65">
                  <p dangerouslySetInnerHTML={{ __html: content.about_desc_1 || 'Mən <strong class="text-white">Elvin Şahbazov</strong> – rəqəmsal marketinq, süni intellektlə avtomatlaşdırma, biznes inkişafı və rəqəmsal idarəetmə sistemləri üzrə fəaliyyət göstərən mütəxəssis, təlimçi və rəhbərəm.' }} />
                  <p dangerouslySetInnerHTML={{ __html: content.about_desc_2 || 'Hazırda fəaliyyətimi <strong class="text-white">Qafqazın ən böyük Avtomobil Mərkəzi olan Baku Auto Mall-da Marketinq Direktoru</strong>, eyni zamanda <strong class="text-white">SMARTKOB – Rəqəmsal İdarəetmə Mərkəzində Marketinq və Biznes İnkişafı Departamentinin Rəhbəri</strong> kimi davam etdirirəm.' }} />
                  <p>
                    Marketinq sahəsində məqsədim yalnız reklam kampaniyaları idarə etmək deyil. Əsas hədəfim bizneslər üçün ölçülə bilən nəticələrə əsaslanan, davamlı və tam idarə olunan rəqəmsal marketinq sistemləri qurmaqdır.
                  </p>
                  <p>
                    Peşəkar bilik və bacarıqlarım <strong className="text-white">Google, Meta, HubSpot Academy</strong> və <strong className="text-white">Digital Marketing Institute (DMI)</strong> tərəfindən verilmiş beynəlxalq sertifikatlarla təsdiqlənmişdir.
                  </p>
                  <p>
                    Bu günə qədər <strong className="text-white">10-dan çox şirkət üçün</strong> rəqəmsal transformasiya, marketinq strategiyalarının hazırlanması, satış sistemlərinin qurulması və analitika əsaslı idarəetmə layihələrini uğurla həyata keçirmişəm.
                  </p>
                  <p>
                    Missiyam bizneslərin rəqəmsal transformasiyasına rəhbərlik etmək, süni intellekt və avtomatlaşdırma texnologiyalarını real biznes nəticələrinə çevirmək, şirkətlərin satışlarını artıran, idarəetməni sadələşdirən və uzunmüddətli inkişafı təmin edən sistemlər qurmaqdır.
                  </p>
                </div>
              </DarkCard>
            </motion.div>

            {/* Hazırda Card */}
            <motion.div {...fadeUpLocal(0.1)}>
              <DarkCard className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <Briefcase size={18} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                    Hazırda
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary" />
                    <div>
                      <p className="text-xs font-semibold text-white">Marketing Director</p>
                      <p className="text-xs text-white/55">Baku Auto Mall – Qafqazın ən böyük auto mərkəzi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary/50" />
                    <div>
                      <p className="text-xs font-semibold text-white">Head of Marketing & Business Dev.</p>
                      <p className="text-xs text-white/55">SMARTKOB – Rəqəmsal İdarəetmə Mərkəzi</p>
                    </div>
                  </div>
                </div>
              </DarkCard>
            </motion.div>

            {/* Education */}
            <motion.div {...fadeUpLocal(0.15)} className="md:col-span-2">
              <DarkCard>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <GraduationCap size={18} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                    Təhsil
                  </h3>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
                    AÜ
                  </div>
                  <div>
                    <p className="font-semibold text-white">Atatürk Universiteti</p>
                    <p className="text-sm text-white/55">İqtisadiyyat Fakültəsi</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['İşletme', 'Ekonomi', 'Pazarlama'].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DarkCard>
            </motion.div>

            {/* Mission */}
            <motion.div {...fadeUpLocal(0.2)}>
              <DarkCard className="h-full border-primary/30 bg-gradient-to-br from-primary/20 to-primary-dark/10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                  <Target size={18} className="text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  Missiyam
                </h3>
                <p className="text-sm leading-relaxed text-white/75">
                  Azərbaycanlı biznesləri rəqəmsal dünyada inkişaf etdirmək, ölçülə bilən nəticələrlə böyüməyə kömək etmək.
                </p>
              </DarkCard>
            </motion.div>

            {/* Books */}
            <motion.div {...fadeUpLocal(0.25)} className="md:col-span-3 lg:col-span-4">
              <DarkCard>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <BookOpen size={18} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                    Kitablarım
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {books.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center transition-colors hover:border-primary/30"
                    >
                      <div className="mb-2 text-3xl">{b.icon}</div>
                      <p
                        className="mb-1 text-xs font-semibold leading-tight text-white"
                        style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
                      >
                        {b.title}
                      </p>
                      <p className="text-xs leading-relaxed text-white/55">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </DarkCard>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <Container wide>
          <motion.div {...fadeUpLocal()} className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              <Award size={14} /> Sertifikatlar
            </span>
            <h2
              className="mt-8 font-black text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight text-white"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
            >
              Beynəlxalq Sertifikatlar
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/55">
              Google, Meta, HubSpot və DMI-dan alınmış sertifikatlar.
            </p>
          </motion.div>

          <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificationGroups.map((g, i) => (
              <motion.div
                key={g.org}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <DarkCard className="h-full hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,123,255,0.12)]">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg text-white"
                      style={{ backgroundColor: g.color === C.black ? '#111' : g.color }}
                    >
                      <i className={g.icon} />
                    </div>
                    <h4 className="font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                      {g.org}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/65">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
                          style={{ backgroundColor: g.color === C.black ? '#fff' : g.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </DarkCard>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUpLocal(0.2)}>
            <h3 className="mb-6 text-xl font-bold text-white" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
              Sertifikat Qalereyası
            </h3>
            <div className="cert-scroll">
              {certs.map((c) => (
                <a
                  key={c.id}
                  href={c.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="cert-item group border-white/10 hover:border-primary/30"
                  title={c.label}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={c.thumb}
                      alt={c.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-end bg-primary/0 transition-all duration-300 group-hover:bg-primary/10">
                      <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="truncate text-xs font-semibold text-white">{c.label}</p>
                        <p className="text-xs text-white/70">Baxmaq üçün klik et</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
