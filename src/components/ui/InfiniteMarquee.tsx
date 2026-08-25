import React from 'react';

const words = [
  "SÜNİ İNTELLEKT",
  "BİZNES AVTOMATLAŞDIRMASI",
  "RƏQƏMSAL MARKETİNQ",
  "DATA ANALİZİ",
  "PERFORMANS MARKETİNQ",
  "SÜNİ İNTELLEKT",
  "BİZNES AVTOMATLAŞDIRMASI",
  "RƏQƏMSAL MARKETİNQ",
];

export const InfiniteMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black/40 border-y border-white/5 py-4 md:py-6 z-20 flex whitespace-nowrap">
      <div className="animate-marquee inline-block flex items-center">
        {words.map((word, index) => (
          <React.Fragment key={`marquee-1-${index}`}>
            <span className="mx-6 md:mx-10 text-sm md:text-lg font-bold tracking-widest text-white/40 font-satoshi uppercase">
              {word}
            </span>
            <span className="text-primary/50 text-xl">✦</span>
          </React.Fragment>
        ))}
      </div>
      <div className="animate-marquee inline-block flex items-center absolute top-0 py-4 md:py-6">
        {words.map((word, index) => (
          <React.Fragment key={`marquee-2-${index}`}>
            <span className="mx-6 md:mx-10 text-sm md:text-lg font-bold tracking-widest text-white/40 font-satoshi uppercase">
              {word}
            </span>
            <span className="text-primary/50 text-xl">✦</span>
          </React.Fragment>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};
