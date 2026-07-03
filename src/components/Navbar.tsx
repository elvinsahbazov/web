import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { easePremium } from '../lib/motion';
import { useMobileMenu } from '../context/MobileMenuContext';
import MobileMenu from './MobileMenu';

const SCROLL_THRESHOLD = 50;

/** Asymmetrical tech lines → X on open */
function TechMenuToggle({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-[5px] block h-[2px] rounded-full bg-slate-900"
        initial={false}
        animate={
          open
            ? { width: 24, rotate: 45, top: 9, left: 0 }
            : { width: 22, rotate: 0, top: 5, left: 0 }
        }
        transition={{ duration: 0.38, ease: easePremium }}
        style={{ transformOrigin: 'center' }}
      />
      <motion.span
        className="absolute block h-[2px] rounded-full bg-primary"
        initial={false}
        animate={
          open
            ? { width: 24, rotate: -45, top: 9, left: 0 }
            : { width: 14, rotate: 0, top: 15, left: 10 }
        }
        transition={{ duration: 0.38, ease: easePremium }}
        style={{ transformOrigin: 'center' }}
      />
    </span>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, toggle, close } = useMobileMenu();
  const location = useLocation();

  const isMinimal = isScrolled && !isOpen;

  useEffect(() => {
    close();
  }, [location, close]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: easePremium, delay: 0.08 }}
        className={`fixed top-0 w-full px-6 py-5 transition-all duration-500 ease-out md:px-10 md:py-6 ${
          isOpen ? 'z-[101]' : 'z-50'
        } ${
          isMinimal
            ? 'border-b border-transparent bg-transparent backdrop-blur-none'
            : 'border-b border-white/10 bg-black/40 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/20'
        }`}
      >
        <nav
          className={`flex w-full items-center transition-all duration-500 ease-out ${
            isMinimal ? 'justify-end' : 'justify-between'
          }`}
        >
          <Link
            to="/"
            data-magnetic
            className={`overflow-hidden transition-all duration-500 ease-out hover:opacity-90 ${
              isMinimal
                ? 'pointer-events-none w-0 -translate-x-5 opacity-0'
                : 'w-auto translate-x-0 opacity-100'
            }`}
          >
            <span
              className="whitespace-nowrap text-sm font-bold uppercase tracking-widest text-slate-900 sm:text-base"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
            >
              ELVİN ŞAHBAZOV
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-6">
            <a
              href="https://wa.me/994999550001"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className={`flex items-center gap-2 overflow-hidden rounded-full shadow-lg shadow-[#25D366]/20 bg-[#25D366] px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-white transition-all duration-500 ease-out hover:bg-[#1DA851] ${
                isMinimal
                  ? 'pointer-events-none w-0 scale-95 border-0 p-0 opacity-0'
                  : 'w-auto scale-100 opacity-100'
              }`}
            >
              <i className="fab fa-whatsapp text-sm md:text-base text-white" />
              <span className="inline">WhatsApp</span>
            </a>

            <button
              type="button"
              data-magnetic
              aria-label={isOpen ? 'Menyunu bağla' : 'Menyunu aç'}
              aria-expanded={isOpen}
              onClick={toggle}
              className={`hidden md:flex relative z-[101] h-12 w-12 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-900/10 bg-slate-900/5 transition-all duration-500 hover:bg-slate-900/10 ${
                isMinimal ? 'shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-md' : ''
              } ${isOpen ? 'border-slate-900/20 bg-slate-900/10' : ''}`}
            >
              <motion.span
                className="flex items-center justify-center"
                animate={{ scale: isOpen ? 1.05 : 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <TechMenuToggle open={isOpen} />
              </motion.span>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu />
    </>
  );
}
