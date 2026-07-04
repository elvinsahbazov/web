import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { springSmooth } from '../../lib/motion';

type AdPlatform = {
  id: string;
  name: string;
  color: string;
  description: string;
};

const adPlatforms: AdPlatform[] = [
  {
    id: 'meta',
    name: 'Meta Ads',
    color: '#1877F2',
    description:
      'Facebook, Instagram, WhatsApp və Threads ekosistemi vasitəsilə geniş kütləyə çatmaq. B2B/B2C retargeting, dəqiq demoqrafik hədəfləmə, WhatsApp API ilə avtomatlaşdırılmış satış və icma idarəetməsi.',
  },
  {
    id: 'google',
    name: 'Google Ads',
    color: '#4285F4',
    description:
      'Axtarış niyyəti olan isti müştəriləri (Search Intent) birbaşa satışa çevirmək. YouTube və Display (banner) reklamları ilə qlobal marka bilinirliyi yaratmaq və bütün veb ekosistemində güclü retargeting kampaniyaları qurmaq.',
  },
  {
    id: 'yandex',
    name: 'Yandex Direct',
    color: '#FC3F1D',
    description:
      'MDB və lokal bazarlarda axtarış sistemləri və partnyor şəbəkələri (RSY) vasitəsilə satışların artırılması.',
  },
  {
    id: 'vk',
    name: 'VK Ads',
    color: '#0077FF',
    description: 'Rusdilli seqmentdə xüsusi alqoritmlərlə hədəflənmiş sosial media kampaniyaları.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    color: '#0A66C2',
    description:
      'B2B qərar qəbuledicilərinə (CEO, HR, Direktorlar) və peşəkarlara birbaşa çıxış.',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    color: '#00f2fe',
    description:
      'Qısa video formatı ilə sürətli viral böyümə, Z və Millennial nəsillərinə dinamik satış.',
  },
  {
    id: 'x',
    name: 'X (Twitter) Ads',
    color: '#FFFFFF',
    description:
      'Real vaxt trendlərinə qoşulmaq, PR və texnoloji/maliyyə kütləsinə hədəflənmə.',
  },
  {
    id: 'microsoft',
    name: 'Microsoft Ads',
    color: '#00A4EF',
    description:
      'Bing axtarış sistemində daha yüksək alıcılıq qabiliyyəti olan korporativ B2B kütləsinə çıxış.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest Ads',
    color: '#E60023',
    description:
      'Vizual ilham axtaran istifadəçilərə e-ticarət məhsullarının və dizayn yönümlü xidmətlərin satışı.',
  },
  {
    id: 'snapchat',
    name: 'Snapchat Ads',
    color: '#FFFC00',
    description:
      'AR (Artırılmış Reallıq) və interaktiv reklamlarla gənc auditoriyada marka sadiqliyi yaratmaq.',
  },
  {
    id: 'telegram',
    name: 'Telegram Ads',
    color: '#24A1DE',
    description:
      'Xüsusi kanallarda və icmalarda birbaşa, yüksək konversiyalı və oxunan mətn əsaslı reklamlar.',
  },
];

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function activePillStyle(color: string): CSSProperties {
  return {
    color,
    borderColor: color,
    backgroundColor: hexToRgba(color, 0.1),
    boxShadow: `0 0 15px ${hexToRgba(color, 0.2)}`,
  };
}

export default function AdsPlatformsTabs() {
  const [activeId, setActiveId] = useState(adPlatforms[0].id);
  const active = adPlatforms.find((p) => p.id === activeId) ?? adPlatforms[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSmooth, delay: 0.58 }}
      className="mt-12 w-full max-w-2xl"
    >
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
        Reklam Platformaları
      </p>

      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Reklam platformaları">
        {adPlatforms.map((platform) => {
          const isActive = platform.id === activeId;
          return (
            <button
              key={platform.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(platform.id)}
              onMouseOver={() => setActiveId(platform.id)}
              onMouseMove={() => setActiveId(platform.id)}
              onPointerEnter={() => setActiveId(platform.id)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-all ${
                isActive
                  ? 'font-semibold'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              style={isActive ? activePillStyle(platform.color) : undefined}
            >
              {platform.name}
            </button>
          );
        })}
      </div>

      <div
        className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md relative overflow-hidden"
        role="tabpanel"
        aria-live="polite"
      >
        <AnimatePresence>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5, position: 'absolute' }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: active.color }}
            >
              {active.name}
            </p>
            <p className="text-sm leading-relaxed text-white/70 md:text-base">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
