import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Target, TrendingUp } from 'lucide-react';
import { revealContainer, revealItem, springSnappy, springSmooth } from '../../lib/motion';
import { useMobileMenu } from '../../context/MobileMenuContext';
import { useSiteContent } from '../../context/SiteContentContext';
import AdsPlatformsTabs from './AdsPlatformsTabs';



const stats = [
  { icon: TrendingUp, value: '10+', label: 'İl Təcrübə' },
  { icon: Target, value: '150+', label: 'Layihə' },
  { icon: BarChart2, value: '₼2M+', label: 'İdarə edilən büdcə' },
];

const badges = ['ROI Focused', 'AI Expert', '7+ Platforma'];

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
    <section className="relative min-h-screen overflow-hidden bg-transparent pt-20">

      

      {/* TEXT LAYOUT (THE "CUBIX" CLEANLINESS) */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-6 pb-24 pt-28 md:grid-cols-2 md:px-12 md:pb-32 md:pt-32">
        {/* LEFT — persona & authority */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col justify-center text-left pt-12 md:pt-0"
        >
          <motion.h1
            variants={revealItem}
            className="font-satoshi mb-8 max-w-xl text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
          >
            ELVİN
            <span className="block text-gradient-blue">{content.hero_title_2 || 'ŞAHBAZOV'}</span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mb-10 max-w-xl text-base font-medium leading-relaxed text-slate-400 md:text-lg"
          >
            {content.hero_subtitle || 'Rəqəmsal Marketinq və Süni intellektlə avtomatlaşdırma Mütəxəssisi. Şirkətlər üçün performansa əsaslanan reklam və avtomatlaşdırma strategiyaları.'}
          </motion.p>

          <motion.div variants={revealItem} className="mb-10 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/90"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div variants={revealItem} className="mb-12 flex flex-wrap items-center gap-4">
            <motion.a
              href="https://wa.me/994999550001"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
              className="btn-primary btn-hero shadow-blue-glow"
            >
              <i className="fab fa-whatsapp text-base" />
              Konsultasiya
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
              <Link to="/xidmetler" data-magnetic className="inline-flex items-center gap-2 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/5 text-white btn-hero hover:bg-white/[0.08] transition-colors">
                {content.hero_button_2 || 'Xidmətlər'}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={revealItem} className="mb-14 flex flex-wrap gap-3">
            {heroSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-magnetic
                className={`social-icon-btn ${social.brand}`}
              >
                <i className={`${social.icon} text-base`} />
              </a>
            ))}
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
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                Hər əsrdə bir dönüş nöqtəsi olur və oyunun qaydaları dəyişir. Bu gün həmin nöqtənin
                adı <span className="font-bold text-primary">Süni İntellektdir.</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                Bu dəyişikliyi vaxtında anlayanlar sabah bazarın lideri olur, gecikənlər isə bu
                gündən geridə qalmağa başlayır.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                Texnologiya artıq seçim deyil — böyümənin mühərrikidir.
              </p>
              <p className="mt-5 block text-base font-black text-white md:text-lg">
                Gələcək gözləyənlərin yox, indi hərəkət edənlərindir.
              </p>
            </div>
          </motion.div>

          <div className="mt-16 w-full max-w-xl">
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
          className="relative mt-16 flex h-full w-full items-center justify-center md:mt-0"
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

            {/* Floating Element 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-4 top-12 md:-right-12 md:top-20 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 shadow-xl backdrop-blur-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary flex-none">
                <i className="fas fa-robot text-lg" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Avtomatlaşdırma</p>
                <p className="text-sm font-bold text-white whitespace-nowrap">AI Sistemləri</p>
              </div>
            </motion.div>

            {/* Floating Element 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 bottom-16 md:-left-12 md:bottom-24 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 shadow-xl backdrop-blur-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400 flex-none">
                <i className="fas fa-chart-line text-lg" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Performans</p>
                <p className="text-sm font-bold text-white whitespace-nowrap">+45% ROI Artımı</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
