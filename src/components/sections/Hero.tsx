import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Target, TrendingUp } from 'lucide-react';
import { revealContainer, revealItem, springSnappy, springSmooth } from '../../lib/motion';
import { useMobileMenu } from '../../context/MobileMenuContext';
import AdsPlatformsTabs from './AdsPlatformsTabs';

const PROFILE_IMAGE =
  'https://drive.google.com/thumbnail?id=1YmSQizY-GCTKCiPg6UD2PPFOG0d_ap2o&sz=w1000';

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
];

export default function Hero() {
  const { isOpen: isMenuOpen } = useMobileMenu();

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Stripe ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.14)_0%,transparent_68%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[640px] w-[640px] translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="vercel-grid absolute inset-0 opacity-[0.35]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1800px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-28 md:grid-cols-[1fr_0.95fr] md:gap-8 md:px-10 2xl:px-20 md:pb-32 md:pt-32 lg:gap-16">
        {/* LEFT — persona & authority */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center"
        >
          <motion.h1
            variants={revealItem}
            className="font-satoshi mb-8 max-w-xl text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
          >
            ELVİN
            <span className="block text-gradient-blue">ŞAHBAZOV</span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mb-10 max-w-xl text-base font-medium leading-relaxed text-slate-400 md:text-lg"
          >
            Rəqəmsal Marketinq & Süni İntellekt Avtomatlaşdırma Mütəxəssisi
          </motion.p>

          <motion.div variants={revealItem} className="mb-10 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="stripe-glass-pill text-xs font-medium tracking-wide text-white/90"
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
              <Link to="/xidmetler" data-magnetic className="btn-outline-dark btn-hero">
                Xidmətlər
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
            className="relative mt-16 w-full max-w-2xl"
          >
            <div
              className="pointer-events-none absolute -inset-3 rounded-3xl bg-blue-500/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl border border-white/10 border-l-4 border-l-blue-500 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                Hər əsrdə bir dönüş nöqtəsi olur və oyunun qaydaları dəyişir. Bu gün həmin nöqtənin
                adı <span className="font-semibold text-blue-500">Süni İntellektdir.</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-400 md:text-base">
                Bu dəyişikliyi vaxtında anlayanlar sabah bazarın lideri olur, gecikənlər isə bu
                gündən geridə qalmağa başlayır.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-400 md:text-base">
                Texnologiya artıq seçim deyil — böyümənin mühərrikidir.
              </p>
              <p className="mt-5 block text-base font-bold text-white md:text-lg">
                Gələcək gözləyənlərin yox, indi hərəkət edənlərindir.
              </p>
            </div>
          </motion.div>

          <AdsPlatformsTabs />
        </motion.div>

        {/* RIGHT — clean keynote portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: 'blur(12px)' }}
          animate={{
            opacity: 1,
            x: 0,
            filter: isMenuOpen ? 'blur(20px) brightness(0.2)' : 'blur(0px) brightness(1)',
            scale: isMenuOpen ? 0.95 : 1,
          }}
          transition={springSmooth}
          className="relative flex items-end justify-center md:justify-end"
        >
          <div
            className="pointer-events-none absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.22)_0%,transparent_70%)] blur-3xl"
            aria-hidden="true"
          />

          <motion.img
            src={PROFILE_IMAGE}
            alt="Elvin Şahbazov — Rəqəmsal Marketinq & Süni İntellekt Avtomatlaşdırma Mütəxəssisi"
            className="hero-portrait relative z-[1] w-full max-w-[520px] object-contain object-bottom md:max-h-[88vh] md:max-w-none"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSmooth, delay: 0.22 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
