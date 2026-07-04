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
        <nav className="flex w-full items-center justify-between">
          {/* LOGO & SOCIALS */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <span
                className="text-lg md:text-xl font-bold tracking-widest text-white block transition-colors group-hover:text-primary"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
              >
                ELVİN ŞAHBAZOV <span className="text-gray-400 text-xs sm:text-sm font-medium tracking-normal hidden xl:inline ml-1">/ Digital Marketing and AI Automation Expert</span>
              </span>
            </Link>
            
            <div className="hidden xl:flex items-center gap-1.5 opacity-100">
              {[
                { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/elvinsahbazov', brand: 'bg-[#0077b5] border-[#0077b5]' },
                { icon: 'fab fa-whatsapp', href: 'https://wa.me/994999550001', brand: 'bg-[#25D366] border-[#25D366]' },
                { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@elvinsahbazov1', brand: 'bg-[#FF0000] border-[#FF0000]' },
                { icon: 'fab fa-instagram', href: 'https://www.instagram.com/elvin_sahbazov', brand: 'bg-[#E1306C] border-[#E1306C]' },
                { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/18wNYYGku2/', brand: 'bg-[#1877F2] border-[#1877F2]' },
                { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@elvinsahbazov_', brand: 'bg-[#000000] border-gray-600' },
                { icon: 'fas fa-envelope', href: 'mailto:elvinsahbazovv@gmail.com', brand: 'bg-[#EA4335] border-[#EA4335]' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-6 w-6 items-center justify-center rounded-md border text-white transition-all duration-300 hover:scale-110 shadow-sm ${social.brand}`}
                >
                  <i className={`${social.icon} text-[11px]`} />
                </a>
              ))}
            </div>
          </div>

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
