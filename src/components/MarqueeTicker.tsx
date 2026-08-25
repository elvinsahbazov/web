const tickerItems = [
  'SATIŞLARINIZI ARTIRIN',
  'REAL NƏTİCƏLƏR',
  'ÖDƏNİŞSİZ İLK AUDİT',
  'SÜNİ İNTELLEKT STRATEGİYASI',
  'DƏQİQ HƏDƏFLƏMƏ',
  'BİZNESİNİZİ BÖYÜDÜN',
  'AI İLƏ AVTOMATLAŞDIRMA',
  'ROAS OPTİMİZASİYASI',
  'DATA-DRIVEN QƏRARLAR',
];

const TICKER_HIGHLIGHTS = [
  'SÜNİ İNTELLEKT',
  'DATA-DRIVEN',
  'AVTOMATLAŞDIRMA',
  'AVTOMATİZASİYA',
  'ROAS',
  'ROI',
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedPhrase({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${TICKER_HIGHLIGHTS.map(escapeRegExp)
      .sort((a, b) => b.length - a.length)
      .join('|')})`,
    'gi',
  );
  const parts = text.split(pattern).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const isHighlight = TICKER_HIGHLIGHTS.some(
          (keyword) => keyword.toLowerCase() === part.toLowerCase(),
        );
        return (
          <span key={`${part}-${index}`} className={isHighlight ? 'text-slate-100' : 'text-slate-500'}>
            {part}
          </span>
        );
      })}
    </>
  );
}

function TickerTrack({ copyKey }: { copyKey: string }) {
  return (
    <>
      {tickerItems.map((item, i) => (
        <span key={`${copyKey}-${i}`} className="flex shrink-0 items-center whitespace-nowrap">
          <span className="text-sm md:text-lg font-bold uppercase tracking-[0.15em]">
            <HighlightedPhrase text={item} />
          </span>
          <span className="mx-6 md:mx-10 text-primary/50 text-xl" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

/** Obsidian data-stream ticker — Vercel × Stripe aesthetic */
export default function MarqueeTicker() {
  return (
    <div className="border-t border-white/5 bg-black py-4" aria-label="Xidmət axını">
      <div
        className="group cursor-default overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <div
          className="ticker-track flex w-max items-center will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '60s' }}
        >
          <TickerTrack copyKey="a" />
          <TickerTrack copyKey="b" />
        </div>
      </div>
    </div>
  );
}
