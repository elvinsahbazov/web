import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { easePremium } from '../lib/motion';
import { useMobileMenu } from '../context/MobileMenuContext';
import MobileMenu, { mobileNavLinks } from './MobileMenu';

const SCROLL_THRESHOLD = 20;

/** Asymmetrical tech lines → X on open */
function TechMenuToggle({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-[5px] block h-[2px] rounded-full bg-white"
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
      <header
        className={`fixed top-0 w-full px-6 py-4 transition-all duration-300 ease-out md:px-10 md:py-5 ${
          isOpen ? 'z-[101]' : 'z-50'
        } ${
          isScrolled || location.pathname !== '/'
            ? 'bg-[#000a1a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="flex w-full items-center justify-between mx-auto max-w-7xl">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
          >
            <span
              className="text-lg md:text-xl font-bold tracking-widest text-white block transition-colors group-hover:text-primary"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
            >
              ELVİN ŞAHBAZOV
            </span>
          </Link>

          {/* DESKTOP MENU LINKS */}
          <div className="hidden lg:flex items-center justify-center gap-8 flex-1 px-8">
            {mobileNavLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-300 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-lg'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE (WhatsApp CTA + Mobile Toggle) */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://wa.me/994999550001"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 rounded-full shadow-lg shadow-[#25D366]/20 bg-[#25D366] px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1DA851] hover:scale-105"
            >
              <i className="fab fa-whatsapp text-lg" />
              <span>Konsultasiya</span>
            </a>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button
              type="button"
              aria-label={isOpen ? 'Menyunu bağla' : 'Menyunu aç'}
              aria-expanded={isOpen}
              onClick={toggle}
              className={`lg:hidden relative z-[101] h-12 w-12 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 ${isOpen ? 'border-white/20 bg-white/10' : ''}`}
            >
              <TechMenuToggle open={isOpen} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu />
    </>
  );
}
