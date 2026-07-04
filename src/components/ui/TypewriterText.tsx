import { useEffect, useState } from 'react';

export function TypewriterText({ text, speed = 30, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    
    // We already have the full text if it was fully typed before (React strict mode/re-renders)
    // To prevent restart on re-render unless text changes, we reset.
    let i = 0;
    setDisplayedText('');
    
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, hasStarted]);

  return <>{displayedText}</>;
}
