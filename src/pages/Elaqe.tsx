import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';
import { C } from '../lib/colors';
import { useSiteContent } from '../context/SiteContentContext';



function linkIconStyle(link: any): CSSProperties {
  if ('brandGradient' in link) {
    return { background: link.brandGradient };
  }
  return { backgroundColor: link.brandColor };
}

function linkIconColor(link: any): string {
  if ('brandColor' in link) return link.brandColor;
  return '#E1306C';
}

const subjects = [
  'Reklam kampaniyası',
  'AI avtomatlaşdırma',
  'Konsultasiya',
  'Tədris & Kurs',
  'Digər',
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Elaqe() {
  const { content } = useSiteContent();

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      label: 'Telefon / WhatsApp',
      value: content.contact_phone || '+994 99 955 00 01',
      href: content.contact_whatsapp_link || 'https://wa.me/994999550001',
      color: C.blue,
      bg: 'bg-primary/5',
    },
    {
      icon: <Mail size={20} />,
      label: 'E-mail',
      value: content.contact_email || 'elvinsahbazovv@gmail.com',
      href: `mailto:${content.contact_email || 'elvinsahbazovv@gmail.com'}`,
      color: C.black,
      bg: 'bg-black/5',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Yer',
      value: content.contact_address || 'Bakı, Azərbaycan',
      href: '#',
      color: C.blue,
      bg: 'bg-primary/5',
    },
    {
      icon: <Clock size={20} />,
      label: 'İş saatları',
      value: 'B.e – Cümə: 09:00 – 19:00',
      href: '#',
      color: C.black,
      bg: 'bg-black/5',
    },
  ];

  const socialLinks = [
    {
      href: content.linkedin_link || 'https://www.linkedin.com/in/elvinsahbazov',
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
      sub: 'Professional Network',
      brandColor: '#0A66C2',
    },
    {
      href: content.instagram_link || 'https://www.instagram.com/elvin_sahbazov',
      icon: 'fab fa-instagram',
      label: 'Instagram',
      sub: '@elvin_sahbazov',
      brandGradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    },
    {
      href: content.facebook_link || 'https://www.facebook.com/share/18wNYYGku2/',
      icon: 'fab fa-facebook-f',
      label: 'Facebook',
      sub: 'Elvin Şahbazov',
      brandColor: '#1877F2',
    },
    {
      href: 'https://www.tiktok.com/@elvinsahbazov_',
      icon: 'fab fa-tiktok',
      label: 'TikTok',
      sub: '@elvinsahbazov_',
      brandColor: '#010101',
    },
    {
      href: 'https://x.com/ElvinSahbazov92',
      icon: 'fab fa-x-twitter',
      label: 'X (Twitter)',
      sub: '@ElvinSahbazov92',
      brandColor: '#000000',
    },
    {
      href: content.contact_whatsapp_link || 'https://wa.me/994999550001',
      icon: 'fab fa-whatsapp',
      label: 'WhatsApp',
      sub: content.contact_phone || '+994 99 955 00 01',
      brandColor: '#25D366',
    },
    {
      href: `mailto:${content.contact_email || 'elvinsahbazovv@gmail.com'}`,
      icon: 'fas fa-envelope',
      label: 'Email',
      sub: content.contact_email || 'elvinsahbazovv@gmail.com',
      brandColor: '#EA4335',
    },
    {
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSfD-P6RhwGioRtXPreb4P1FsHd5flsJKXvnh7pokAaR4zPhUw/viewform?usp=sharing&ouid=101273263139991444708',
      icon: 'fas fa-ticket-alt',
      label: 'Forum Qeydiyyat',
      sub: 'Digital Marketing Forum 2025',
      brandColor: '#007BFF',
    },
  ];

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm(prev => ({ ...prev, [name]: value.replace(/[^\d\+\-\s]/g, '') }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('loading');

    const { error } = await supabase.from('contact_submissions').insert({
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      subject: form.subject || null,
      message: form.message.trim(),
      page_source: 'contact',
    });

    const googleFormsUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfD-P6RhwGioRtXPreb4P1FsHd5flsJKXvnh7pokAaR4zPhUw/formResponse";
    const formData = new URLSearchParams();
    formData.append("entry.635463488", form.full_name.trim());
    formData.append("entry.914307651", form.email.trim().toLowerCase());
    formData.append("entry.464079801", form.phone.trim());
    formData.append("entry.2140819732", form.subject ? form.subject.trim() : "Əlaqə bölməsi müraciəti");
    formData.append("entry.1463037034", "Vebsayt (Əlaqə)");

    try {
      await fetch(googleFormsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });
    } catch (err) {
      console.error("Google form error", err);
    }

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white pt-36 md:pt-40 pb-32">
      <Container wide className="py-20 md:py-24">
        <motion.div
          {...fadeUp()}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <span className="section-label">
            <MessageCircle size={12} /> Əlaqə
          </span>
          <h1 className="section-title mt-8 leading-tight" dangerouslySetInnerHTML={{ __html: content.contact_page_title || 'Biznesiniz üçün <span class="text-gradient-blue">doğru addımı</span><br />birlikdə ataq' }} />
          <p className="section-subtitle mx-auto">
            {content.contact_page_subtitle || 'Pulsuz ilkin audit üçün əlaqə saxlayın. 24 saat ərzində cavab alacaqsınız.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact cards */}
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 p-6 rounded-3xl border border-white/10 ${c.bg} transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-none text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.icon}
                </div>
                <div className="border-white/10">
                  <p className="text-xs text-white/50 mb-0.5">{c.label}</p>
                  <p className="text-sm font-semibold text-white/90 group-hover:text-primary transition-colors">
                    {c.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="p-8 rounded-3xl bg-white border border-black/8 shadow-card">
              <p className="text-xs text-black/40 font-semibold uppercase tracking-widest mb-4">
                Sosial Şəbəkələr
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/8 bg-[#F8FAFC] transition-all duration-300 hover:scale-110 hover:shadow-md"
                    style={{ color: linkIconColor(s) }}
                  >
                    <i className={`${s.icon} text-base`} />
                  </a>
                ))}
              </div>
            </div>

            <motion.a
              href={content.contact_whatsapp_link || "https://wa.me/994999550001"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 p-6 rounded-3xl bg-primary text-white font-bold text-sm shadow-blue"
            >
              <i className="fab fa-whatsapp text-xl" />
              WhatsApp ilə Ani Əlaqə
            </motion.a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-3"
          >
            <div className="card p-8 md:p-10">
              <h2 className="font-poppins font-bold text-xl text-black mb-6">
                Müraciət Formu
              </h2>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <CheckCircle size={36} className="text-primary" />
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-black mb-2">
                    Müraciətiniz qəbul edildi!
                  </h3>
                  <p className="text-black/55 text-sm max-w-xs">
                    24 saat ərzində sizinlə əlaqə saxlanılacaq. WhatsApp üzərindən də əlaqə saxlaya bilərsiniz.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 btn-primary text-sm"
                  >
                    Yeni müraciət
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-black/55 mb-1.5">
                        Ad Soyad <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Adınızı daxil edin"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black/55 mb-1.5">
                        E-mail <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="email@domain.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-black/55 mb-1.5">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        pattern="^[\+]?[0-9\s\-]{7,15}$"
                        title="Düzgün nömrə daxil edin (məs: 0501234567)"
                        placeholder="+994 XX XXX XX XX"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black/55 mb-1.5">
                        Mövzu
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="select-field"
                      >
                        <option value="">Seçin...</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black/55 mb-1.5">
                      Mesaj <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Biznesiniz haqqında qısaca məlumat verin, nə istədiyinizi yazın..."
                      className="input-field resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-black text-xs border border-black/10 rounded-xl px-4 py-3" style={{ backgroundColor: C.blueSoft }}>
                      Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Göndərilir...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Müraciəti Göndər
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-black/40 text-center">
                    Məlumatlarınız üçüncü tərəflərlə paylaşılmır.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.25)} className="mt-16 md:mt-20">
          <div className="mb-8 text-center">
            <h2 className="font-poppins text-2xl font-bold text-white md:text-3xl">
              Bütün əlaqə kanalları
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
              Sosial şəbəkələr, email və digər platformalar üzərindən birbaşa əlaqə saxlayın.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="linktree-link group"
              >
                <div
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-105"
                  style={linkIconStyle(link)}
                >
                  <i className={`${link.icon} text-sm`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-black">{link.label}</p>
                  <p className="truncate text-xs text-black/55">{link.sub}</p>
                </div>
                <i className="fas fa-external-link-alt text-xs text-black/20 transition-colors group-hover:text-primary" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
