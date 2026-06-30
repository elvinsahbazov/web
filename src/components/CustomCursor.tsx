import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { springCursor, springCursorRing } from '../lib/motion';

const MAGNETIC_STRENGTH = 0.32;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, springCursor);
  const dotY = useSpring(rawY, springCursor);
  const ringX = useSpring(rawX, springCursorRing);
  const ringY = useSpring(rawY, springCursorRing);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (event: MouseEvent) => {
      let x = event.clientX;
      let y = event.clientY;
      const target = event.target as HTMLElement | null;

      const magneticTarget = target?.closest('[data-magnetic]');
      const textTarget = target?.closest('[data-cursor-text]');

      if (textTarget) {
        setCursorText(textTarget.getAttribute('data-cursor-text') || '');
        setHovering(true);
      } else if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x += (centerX - x) * MAGNETIC_STRENGTH;
        y += (centerY - y) * MAGNETIC_STRENGTH;
        setHovering(true);
        setCursorText('');
      } else {
        setHovering(false);
        setCursorText('');
      }

      rawX.set(x);
      rawY.set(y);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? (cursorText ? 0 : 1.65) : 1, // Hide ring when text is shown
          opacity: visible ? (hovering && !cursorText ? 0.95 : (cursorText ? 0 : 0.45)) : 0,
        }}
        transition={springCursorRing}
      />
      <motion.div
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: cursorText ? 3.5 : (hovering ? 1.25 : 1),
          opacity: visible ? 1 : 0,
          backgroundColor: cursorText ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
          mixBlendMode: cursorText ? 'normal' : 'difference'
        }}
        transition={springCursor}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[6px] font-bold text-black text-center whitespace-nowrap leading-none px-1"
            style={{ transformOrigin: 'center' }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
