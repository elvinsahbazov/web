import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { springReveal, springSmooth } from '../lib/motion';
import { useMobileMenu } from '../context/MobileMenuContext';

export const mobileNavLinks = [
  { path: '/', label: 'Ana Səhifə' },
  { path: '/haqqimda', label: 'Haqqımda' },
  { path: '/xidmetler', label: 'Xidmətlər' },
  { path: '/vision', label: 'Rəqəmsal' },
  { path: '/hesablayici', label: 'Hesablayıcı' },
  { path: '/blog', label: 'Bloq' },
  { path: '/elaqe', label: 'Əlaqə' },
] as const;

const menuSocials = [
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/elvinsahbazov', brand: 'bg-[#0077b5] border-[#0077b5]' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/994999550001', brand: 'bg-[#25D366] border-[#25D366]' },
  { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@elvinsahbazov1', brand: 'bg-[#FF0000] border-[#FF0000]' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/elvin_sahbazov', brand: 'bg-[#E1306C] border-[#E1306C]' },
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/18wNYYGku2/', brand: 'bg-[#1877F2] border-[#1877F2]' },
  { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@elvinsahbazov_', brand: 'bg-[#000000] border-gray-600' },
  { icon: 'fab fa-x-twitter', href: 'https://x.com/ElvinSahbazov92', brand: 'bg-[#000000] border-gray-600' },
  { icon: 'fas fa-envelope', href: 'mailto:elvinsahbazovv@gmail.com', brand: 'bg-[#EA4335] border-[#EA4335]' },
];

const menuContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
  exit: { opacity: 0, y: 24, transition: { duration: 0.2 } },
};

export default function MobileMenu() {
  const { isOpen, close } = useMobileMenu();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] h-screen w-full bg-black/95 backdrop-blur-3xl"
          aria-hidden={!isOpen}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springSmooth}
            className="relative flex h-full flex-col px-6 pb-10 pt-28 md:px-12"
          >
            <motion.nav
              variants={menuContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-1 flex-col items-center justify-center gap-4 md:gap-6"
              aria-label="Mobil naviqasiya"
            >
              {mobileNavLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.path} variants={menuItem}>
                    <Link
                      to={link.path}
                      onClick={close}
                      data-magnetic
                      className={`font-satoshi block text-4xl font-bold transition-all duration-300 hover:translate-x-4 hover:text-blue-500 md:text-6xl ${
                        isActive ? 'text-blue-500' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.footer
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ ...springSmooth, delay: 0.35 }}
              className="absolute bottom-0 left-0 right-0 border-t border-white/5 px-6 py-8 md:px-12"
            >
              <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 md:text-xs">
                Rəqəmsal Marketinq & Süni İntellekt Avtomatlaşdırma Mütəxəssisi
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 px-2 mt-2">
                {menuSocials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border text-white shadow-sm transition-transform active:scale-95 ${social.brand}`}
                  >
                    <i className={`${social.icon} text-base`} />
                  </a>
                ))}
              </div>
            </motion.footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
