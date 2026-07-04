import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const manageMouseLeave = () => {
      setIsVisible(false);
    };

    const manageMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're hovering over a clickable element or element with data-cursor-text
      const clickable = target.closest('a, button, [role="button"], [role="tab"], input, select, textarea');
      const textElement = target.closest('[data-cursor-text]');
      
      if (textElement) {
        setIsHovering(true);
        setHoverText(textElement.getAttribute('data-cursor-text') || '');
      } else if (clickable) {
        setIsHovering(true);
        setHoverText('');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', manageMouseMove);
    window.addEventListener('mouseleave', manageMouseLeave);
    window.addEventListener('mouseenter', manageMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Initial setup to hide the default cursor and add global class
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      window.removeEventListener('mouseleave', manageMouseLeave);
      window.removeEventListener('mouseenter', manageMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small dot that follows instantly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovering ? 0 : 1
        }}
      />
      
      {/* Large circle that follows with spring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full border border-white/40 z-[9998] flex items-center justify-center overflow-hidden mix-blend-difference backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hoverText ? 80 : (isHovering ? 50 : 32),
          height: hoverText ? 80 : (isHovering ? 50 : 32),
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          scale: 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <motion.span
          className="text-black font-semibold text-[10px] tracking-wider uppercase whitespace-nowrap"
          animate={{
            opacity: hoverText ? 1 : 0,
            scale: hoverText ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          {hoverText}
        </motion.span>
      </motion.div>
    </>
  );
}
