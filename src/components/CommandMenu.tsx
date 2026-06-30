import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Command, Search } from 'lucide-react';
import { springSnappy } from '../lib/motion';

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  action: () => void;
};

const navItems = [
  { path: '/', label: 'Ana Səhifə' },
  { path: '/haqqimda', label: 'Haqqımda' },
  { path: '/xidmetler', label: 'Xidmətlər' },
  { path: '/vision', label: 'Rəqəmsal Vision' },
  { path: '/hesablayici', label: 'ROI Hesablayıcı' },
  { path: '/elaqe', label: 'Əlaqə' },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const items: CommandItem[] = useMemo(() => {
    const base: CommandItem[] = navItems.map((item) => ({
      id: item.path,
      label: item.label,
      hint: 'Keçid',
      action: () => {
        navigate(item.path);
        close();
      },
    }));

    base.push({
      id: 'whatsapp',
      label: 'WhatsApp ilə əlaqə',
      hint: 'Xarici',
      action: () => {
        window.open('https://wa.me/994999550001', '_blank', 'noopener,noreferrer');
        close();
      },
    });

    if (!query.trim()) return base;

    const q = query.toLowerCase();
    return base.filter((item) => item.label.toLowerCase().includes(q));
  }, [close, navigate, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(items.length, 1));
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % Math.max(items.length, 1));
      }

      if (event.key === 'Enter' && items[activeIndex]) {
        event.preventDefault();
        items[activeIndex].action();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, close, items, open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 px-4 pt-[min(18vh,140px)] backdrop-blur-md"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={springSnappy}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-black/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.65),0_0_60px_rgba(0,123,255,0.08)] backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
              <Search size={16} className="shrink-0 text-white/35" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Səhifə axtar..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <kbd className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-white/40 sm:inline-flex">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[min(50vh,360px)] overflow-y-auto p-2">
              {items.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-white/35">Nəticə tapılmadı</li>
              ) : (
                items.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      data-magnetic
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={item.action}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                        index === activeIndex
                          ? 'bg-white/[0.06] text-white'
                          : 'text-white/70 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="flex items-center gap-2 text-[11px] text-white/30">
                        {item.hint}
                        <ArrowUpRight size={12} />
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5 text-[11px] text-white/30">
              <span className="inline-flex items-center gap-1.5">
                <Command size={11} />
                Command Menu
              </span>
              <span className="hidden sm:inline">↑↓ naviqasiya · Enter seç</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
