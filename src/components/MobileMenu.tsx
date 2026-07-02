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
  { path: '/planlama', label: 'Planlama' },
  { path: '/blog', label: 'Bloq' },
  { path: '/elaqe', label: 'Əlaqə' },
] as const;

const menuSocials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elvinsahbazov' },
  { label: 'WhatsApp', href: 'https://wa.me/994999550001' },
] as const;

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
              <div className="flex items-center justify-center gap-8">
                {menuSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    {social.label}
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
