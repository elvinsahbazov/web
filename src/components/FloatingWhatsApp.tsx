import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easePremium } from '../lib/motion';

const WHATSAPP_URL = 'https://wa.me/994999550001';
const TOOLTIP_DELAY_MS = 10_000;
const TOOLTIP_VISIBLE_MS = 2_000;

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowTooltip(true), TOOLTIP_DELAY_MS);
    const hideTimer = window.setTimeout(
      () => setShowTooltip(false),
      TOOLTIP_DELAY_MS + TOOLTIP_VISIBLE_MS,
    );

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="ai-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.45, ease: easePremium }}
            className="max-w-[260px] rounded-2xl rounded-br-sm border border-white/10 bg-black/60 px-5 py-3 text-sm text-white/90 shadow-2xl backdrop-blur-2xl sm:max-w-xs"
          >
            👋 Hansı xidmətlə maraqlanırsınız? Gəlin müzakirə edək.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-magnetic
        aria-label="WhatsApp ilə əlaqə"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: easePremium }}
        whileHover={{ scale: 1.1 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-transform duration-300"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/25" aria-hidden="true" />
        <span
          className="absolute inset-0 animate-pulse rounded-full ring-2 ring-[#25D366]/40"
          aria-hidden="true"
        />
        <i className="fab fa-whatsapp relative text-2xl" />
      </motion.a>
    </div>
  );
}
