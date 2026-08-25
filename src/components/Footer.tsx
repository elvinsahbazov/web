import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Container from './ui/Container';
import { C } from '../lib/colors';
import { useSiteContent } from '../context/SiteContentContext';

const PROFILE_IMAGE =
  'https://drive.google.com/thumbnail?id=1YmSQizY-GCTKCiPg6UD2PPFOG0d_ap2o&sz=w200';

const socials = [
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/elvinsahbazov', label: 'LinkedIn', brand: 'social-hover-linkedin' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/elvin_sahbazov', label: 'Instagram', brand: 'social-hover-instagram' },
  { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@elvinsahbazov1', label: 'YouTube', brand: 'social-hover-youtube' },
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/18wNYYGku2/', label: 'Facebook', brand: 'social-hover-facebook' },
  { icon: 'fab fa-tiktok', href: 'https://www.tiktok.com/@elvinsahbazov_', label: 'TikTok', brand: 'social-hover-tiktok' },
  { icon: 'fab fa-x-twitter', href: 'https://x.com/ElvinSahbazov92', label: 'X', brand: 'social-hover-x' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/994999550001', label: 'WhatsApp', brand: 'social-hover-whatsapp' },
  { icon: 'fas fa-envelope', href: 'mailto:elvinsahbazovv@gmail.com', label: 'Gmail', brand: 'social-hover-gmail' },
];

const navLinks = [
  { path: '/', label: 'Ana Səhifə' },
  { path: '/haqqimda', label: 'Haqqımda' },
  { path: '/xidmetler', label: 'Xidmətlər' },
  { path: '/vision', label: 'Rəqəmsal' },
  { path: '/hesablayici', label: 'Hesablayıcı' },
  { path: '/elaqe', label: 'Əlaqə' },
];

export default function Footer() {
  const { content } = useSiteContent();
  return (
    <footer className="text-white" style={{ backgroundColor: C.black }}>
      <div className="border-b border-white/5">
        <Container className="py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-3">Hazırsınız?</p>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
              Biznesinizi rəqəmsal dünyada<br className="hidden md:block" /> irəli aparaq
            </h3>
          </motion.div>
          <div className="flex flex-wrap gap-4">
            <a
              href={content.contact_whatsapp_link || 'https://wa.me/994999550001'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <i className="fab fa-whatsapp" /> WhatsApp ilə Əlaqə
            </a>
            <Link
              to="/elaqe"
              className="btn-outline border-white/15 bg-transparent text-white hover:bg-white/5 hover:border-white/25 hover:text-white"
            >
              Müraciət Formu <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={PROFILE_IMAGE}
                alt="Elvin Şahbazov"
                className="h-10 w-10 shrink-0 rounded-2xl object-cover object-top ring-1 ring-white/10"
              />
              <span className="font-black text-lg text-white tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                Elvin Şahbazov
              </span>
            </div>
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white/90 mb-1.5">
                Rəqəmsal Marketinq & AI Avtomatlaşdırma Eksperti
              </h4>
              <p className="text-xs leading-relaxed text-white/50">
                Süni intellekt əsaslı innovativ həllərlə bizneslərin rəqəmsal inkişafı və sürətli böyüməsi.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap mb-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-magnetic
                  className={`social-icon-btn ${s.brand}`}
                >
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>

          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Səhifələr</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h4 className="font-semibold text-xs uppercase tracking-[0.2em] text-white/50 mb-5">Birbaşa Əlaqə</h4>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${content.contact_email || 'elvinsahbazovv@gmail.com'}`} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                    <Mail size={13} /> {content.contact_email || 'elvinsahbazovv@gmail.com'}
                  </a>
                </li>
                <li>
                  <a href={content.contact_whatsapp_link || 'https://wa.me/994999550001'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                    <Phone size={13} /> {content.contact_phone || '+994 99 955 00 01'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 hidden">
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-white/50 text-xs">{content.footer_copyright || `© ${new Date().getFullYear()} Elvin Şahbazov. Bütün hüquqlar qorunur.`}</p>
        </div>
      </Container>
    </footer>
  );
}
