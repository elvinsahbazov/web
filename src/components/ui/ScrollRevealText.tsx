import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%'],
  });

  const words = text.split(' ');

  return (
    <h2 ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        // Ensure hooks are called consistently by defining them inside the loop but before any conditionals
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </h2>
  );
}

function Word({ word, progress, range }: { word: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative mr-2 md:mr-3 lg:mr-4 mt-2">
      <span className="absolute opacity-10">{word}</span>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}
