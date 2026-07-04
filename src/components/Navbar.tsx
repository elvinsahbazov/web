import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { easePremium } from '../lib/motion';
import { useMobileMenu } from '../context/MobileMenuContext';
import MobileMenu, { mobileNavLinks } from './MobileMenu';

const SCROLL_THRESHOLD = 50;

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

  const isMinimal = false;

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
          isScrolled || location.pathname !== '/'
            ? 'border-b border-white/10 bg-[#000a1a]/95 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <nav
          className={`flex w-full items-center transition-all duration-500 ease-out ${
            isMinimal ? 'justify-end' : 'justify-between'
          }`}
        >
          <div className={`flex flex-col gap-2 transition-all duration-500 ease-out min-w-0 ${
              isMinimal
                ? 'pointer-events-none w-0 -translate-x-5 opacity-0'
                : 'w-auto translate-x-0 opacity-100'
            }`}>
            <Link
              to="/"
              data-magnetic
              className="hover:opacity-90 min-w-0 flex flex-col xl:flex-row xl:items-end"
            >
              <span
                className="text-sm font-bold tracking-widest text-white sm:text-base block shrink-0"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
              >
                ELVİN ŞAHBAZOV
              </span>
              <span className="text-gray-400 text-[10px] sm:text-xs font-medium tracking-normal block xl:inline xl:ml-1 mt-0.5 xl:mt-0 leading-tight xl:pb-0.5">
                / Digital Marketing and AI Automation Expert
              </span>
            </Link>
            
            <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .nav-socials::-webkit-scrollbar { display: none; }
              `}</style>
              {[
                { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/elvinsahbazov', label: 'LinkedIn', brand: 'social-hover-linkedin' },
                { icon: 'fab fa-whatsapp', href: 'https://wa.me/994999550001', label: 'WhatsApp', brand: 'social-hover-whatsapp' },
                { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@elvinsahbazov1', label: 'YouTube', brand: 'social-hover-youtube' },
                { icon: 'fab fa-instagram', href: 'https://www.instagram.com/elvin_sahbazov', label: 'Instagram', brand: 'social-hover-instagram' },
                { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/18wNYYGku2/', label: 'Facebook', brand: 'social-hover-facebook' },
                { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@elvinsahbazov_', label: 'TikTok', brand: 'social-hover-tiktok' },
                { icon: 'fab fa-x-twitter', href: 'https://x.com/ElvinSahbazov92', label: 'X', brand: 'social-hover-x' },
                { icon: 'fas fa-envelope', href: 'mailto:elvinsahbazovv@gmail.com', label: 'Gmail', brand: 'social-hover-gmail' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-white/[0.06] nav-socials ${social.brand}`}
                >
                  <i className={`${social.icon} text-[11px] sm:text-xs`} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6 flex-shrink-0 ml-4 self-end pb-1 xl:self-center xl:pb-0">
            {/* DESKTOP MENU LINKS */}
            <div className="hidden lg:flex items-center justify-center gap-6 mr-4">
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

            <a
              href="https://wa.me/994999550001"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className={`flex items-center gap-2 overflow-hidden rounded-full shadow-lg shadow-[#25D366]/20 bg-[#25D366] px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-white transition-all duration-500 ease-out hover:bg-[#1DA851] w-auto scale-100 opacity-100`}
            >
              <i className="fab fa-whatsapp text-sm md:text-base text-white" />
              <span className="inline">WhatsApp</span>
            </a>
          </div>
        </nav>
      </motion.header>

      <MobileMenu />
    </>
  );
}
