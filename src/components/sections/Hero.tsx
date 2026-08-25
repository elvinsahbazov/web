import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Target, TrendingUp } from 'lucide-react';
import { revealContainer, revealItem, springSnappy, springSmooth } from '../../lib/motion';
import { useMobileMenu } from '../../context/MobileMenuContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { TypewriterText } from '../ui/TypewriterText';
import { MagneticButton } from '../ui/MagneticButton';
import { ParticleBackground } from '../ui/ParticleBackground';
import AdsPlatformsTabs from './AdsPlatformsTabs';



const stats = [
  { icon: TrendingUp, value: '10+', label: 'İl Təcrübə' },
  { icon: Target, value: '150+', label: 'Layihə' },
  { icon: BarChart2, value: '₼2M+', label: 'İdarə edilən büdcə' },
];



const heroSocials = [
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/elvinsahbazov', label: 'LinkedIn', brand: 'social-hover-linkedin' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/994999550001', label: 'WhatsApp', brand: 'social-hover-whatsapp' },
  { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@elvinsahbazov1', label: 'YouTube', brand: 'social-hover-youtube' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/elvin_sahbazov', label: 'Instagram', brand: 'social-hover-instagram' },
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/18wNYYGku2/', label: 'Facebook', brand: 'social-hover-facebook' },
  { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@elvinsahbazov_', label: 'TikTok', brand: 'social-hover-tiktok' },
  { icon: 'fab fa-x-twitter', href: 'https://x.com/ElvinSahbazov92', label: 'X', brand: 'social-hover-x' },
  { icon: 'fas fa-envelope', href: 'mailto:elvinsahbazovv@gmail.com', label: 'Gmail', brand: 'social-hover-gmail' },
];



export default function Hero() {
  const { content } = useSiteContent();
  const { isOpen: isMenuOpen } = useMobileMenu();

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-scroll md:bg-fixed"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`
      }}
    >
      <ParticleBackground />
      {/* Deep Navy/Corporate Overlay for premium look */}
      <div className="absolute inset-0 bg-[#00193b]/60 mix-blend-multiply pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000a1a]/80 via-[#00193b]/40 to-[#000000]/90 pointer-events-none z-0" />




      {/* TEXT LAYOUT (THE "CUBIX" CLEANLINESS) */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-[1920px] grid-cols-1 items-start px-4 pb-12 pt-32 md:grid-cols-[1fr_auto] md:gap-8 md:px-8 md:pb-16 md:pt-40 lg:px-12 xl:px-20 lg:pt-36">
        {/* LEFT — persona & authority */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col justify-center text-left"
        >
          <motion.h1
            variants={revealItem}
            className="font-satoshi mb-2 w-full text-[clamp(2.75rem,5vw,6rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
          >
            ELVİN <span className="bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text text-transparent">{content.hero_title_2 || 'ŞAHBAZOV'}</span>
          </motion.h1>

          <motion.div
            variants={revealItem}
            className="mb-10 w-full"
          >
            {content.hero_subtitle ? (
              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/70">
                {content.hero_subtitle}
              </p>
            ) : (
              <>
                <h2 className="text-[1.15rem] md:text-xl lg:text-2xl font-light leading-relaxed text-white/70 mb-2 md:whitespace-nowrap">
                  <span className="font-medium text-white">Rəqəmsal Marketinq</span> və <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Süni İntellektlə Avtomatlaşdırma</span> Mütəxəssisi.
                </h2>
                <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                  Şirkətlər üçün performansa əsaslanan innovativ marketinq və biznes avtomatlaşdırma strategiyaları.
                </p>
              </>
            )}
          </motion.div>

          <motion.div variants={revealItem} className="mb-6 flex flex-wrap gap-2">
            {[
              'Daha Çox Satış',
              'Sistemli Biznes',
              'Şəffaf Hesabat',
              'AI İnteqrasiyası'
            ].map((badge) => (
              <span
                key={badge}
                className="backdrop-blur-md border border-white/10 bg-white/[0.03] rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-300"
              >
                {badge}
              </span>
            ))}
          </motion.div>



          <motion.div variants={revealItem} className="mb-12 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <motion.a
                href="https://wa.me/994999550001"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springSnappy}
                className="btn-primary btn-hero shadow-blue-glow"
              >
                <i className="fab fa-whatsapp text-base" />
                Konsultasiya
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
                <Link to="/xidmetler" className="inline-flex items-center min-h-[48px] gap-2 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white/80 btn-hero hover:bg-white/[0.08] hover:text-white transition-colors">
                  {content.hero_button_2 || 'Xidmətlər'}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </MagneticButton>
          </motion.div>

          {/* Cubix authority stats — inline, no dividers */}
          <motion.div
            variants={revealContainer}
            className="grid max-w-lg grid-cols-3 gap-6 md:gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={revealItem} className="text-left">
                <stat.icon size={18} className="mb-3 text-primary" strokeWidth={2} />
                <p className="font-satoshi text-3xl font-black tracking-tight text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-white/45">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Manifesto card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSmooth, delay: 0.48 }}
            className="relative mt-16 w-full max-w-xl"
          >
            <div
              className="pointer-events-none absolute -inset-3 rounded-3xl bg-primary/10 blur-2xl opacity-60"
              aria-hidden="true"
            />
            <div
              className="relative rounded-2xl border border-white/10 border-l-4 border-l-primary p-6 shadow-2xl md:p-8"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              <p className="text-sm leading-relaxed text-white/80 md:text-base min-h-[44px]">
                <TypewriterText text="Hər əsrdə bir dönüş nöqtəsi olur və oyunun qaydaları dəyişir. Bu gün həmin nöqtənin adı " speed={20} delay={1000} />
                <span className="font-bold text-primary"><TypewriterText text="Süni İntellektdir." speed={20} delay={2780} /></span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base min-h-[44px]">
                <TypewriterText text="Bu dəyişikliyi vaxtında anlayanlar sabah bazarın lideri olur, gecikənlər isə bu gündən geridə qalmağa başlayır." speed={20} delay={3440} />
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base min-h-[22px]">
                <TypewriterText text="Texnologiya artıq seçim deyil — böyümənin mühərrikidir." speed={20} delay={6000} />
              </p>
              <p className="mt-5 block text-base font-black text-white md:text-lg min-h-[28px]">
                <TypewriterText text="Gələcək gözləyənlərin yox, indi hərəkət edənlərindir." speed={20} delay={7400} />
              </p>
            </div>
          </motion.div>

          {/* Ads Platforms Tabs */}
          <div className="mt-12 w-full lg:max-w-[1200px]">
            <AdsPlatformsTabs />
          </div>

        </motion.div>

        {/* RIGHT — Premium Image & Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            filter: isMenuOpen ? 'blur(20px) brightness(0.2)' : 'blur(0px) brightness(1)',
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 flex h-full w-full flex-col items-center justify-start md:mt-0"
        >
          {/* Main Photo Card */}
          <div className="relative w-full max-w-[380px] md:max-w-[480px]">
            {/* Glowing backdrop */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-primary/30 to-purple-500/20 blur-2xl opacity-50 animate-pulse" />

            {/* Image Container with Glassmorphism Border */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-white/5 to-transparent">
                <img
                  src={content.hero_image || 'https://drive.google.com/thumbnail?id=1YmSQizY-GCTKCiPg6UD2PPFOG0d_ap2o&sz=w1000'}
                  alt="Elvin Şahbazov"
                  className="w-full object-cover"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                  }}
                />
              </div>
            </div>


          </div>
        </motion.div>

      </div>
    </section>
  );
}
