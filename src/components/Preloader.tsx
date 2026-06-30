import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border border-primary/15" />
        <div className="absolute inset-3 rounded-full border border-t-primary border-r-primary/30 border-b-transparent border-l-transparent animate-spin" />
        <span className="font-black text-3xl text-gradient-blue" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>E</span>
      </div>
      <p
        className="font-semibold text-muted text-xs tracking-[0.35em] uppercase"
        style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
      >
        Elvin Şahbazov
      </p>
    </motion.div>
  );
}
