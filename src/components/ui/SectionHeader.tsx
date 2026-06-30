import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

type Props = {
  label: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  delay?: number;
};

export default function SectionHeader({ label, title, subtitle, align = 'center', delay = 0 }: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div {...fadeUp(delay)} className={`mb-16 md:mb-24 max-w-3xl ${alignClass}`}>
      <div className={`inline-flex items-center gap-2 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
        {label}
      </div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </motion.div>
  );
}
