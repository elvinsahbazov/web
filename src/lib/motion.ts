/** Linear-inspired spring presets */
export const springSnappy = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.75 };
export const springSmooth = { type: 'spring' as const, stiffness: 280, damping: 30, mass: 1 };
export const springReveal = { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.85 };
export const springCursor = { type: 'spring' as const, stiffness: 500, damping: 28, mass: 0.4 };
export const springCursorRing = { type: 'spring' as const, stiffness: 220, damping: 26, mass: 0.6 };

/** Legacy cubic-bezier — kept for gradual migration */
export const easePremium = [0.22, 1, 0.36, 1] as const;

export const revealContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springReveal,
  },
};

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { ...springReveal, delay },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { ...springSmooth, delay },
});

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
};
