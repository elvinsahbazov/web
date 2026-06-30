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
];

export default function Hero() {
  const { content } = useSiteContent();
  const { isOpen: isMenuOpen } = useMobileMenu();

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Stripe ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.14)_0%,transparent_68%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[640px] w-[640px] translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="vercel-grid absolute inset-0 opacity-[0.35]" />
      </div>

      

      {/* TEXT LAYOUT (THE "CUBIX" CLEANLINESS) */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-6 pb-24 pt-28 md:grid-cols-2 md:px-12 md:pb-32 md:pt-32">
        {/* LEFT — persona & authority */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center text-left"
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
            Rəqəmsal Marketinq & Süni İntellekt Avtomatlaşdırma Mütəxəssisi
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
              <Link to="/xidmetler" data-magnetic className="bg-white/[0.03] backdrop-blur-xl border border-white/5 text-white btn-hero hover:bg-white/[0.08] transition-colors">
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
              className="pointer-events-none absolute -inset-3 rounded-3xl bg-blue-500/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl border border-white/5 border-l-4 border-l-blue-500 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:p-8">
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

          <div className="mt-16 w-full max-w-xl">
            <AdsPlatformsTabs />
          </div>
        </motion.div>

        {/* RIGHT — Image Container (Mobile: In flow, Desktop: Absolute full height) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            filter: isMenuOpen ? 'blur(20px) brightness(0.2)' : 'blur(0px) brightness(1)',
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 flex h-full w-full items-end justify-center md:absolute md:right-0 md:top-0 md:mt-0 md:w-1/2 md:z-0"
        >
          <img
            src={content.hero_image || 'https://drive.google.com/thumbnail?id=1YmSQizY-GCTKCiPg6UD2PPFOG0d_ap2o&sz=w1000'}
            alt="Elvin Şahbazov"
            className="w-full max-w-[420px] object-contain object-bottom md:max-w-none md:h-full md:w-full md:object-cover md:object-right-top [mask-image:linear-gradient(to_top,transparent_0%,black_15%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]"
          />
        </motion.div>

      </div>
    </section>
  );
}
