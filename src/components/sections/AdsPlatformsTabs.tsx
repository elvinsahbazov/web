import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { springSmooth } from '../../lib/motion';

export type AdPlatform = {
  id: string;
  name: string;
  color: string;
  description: string;
};

export const adPlatforms: AdPlatform[] = [
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
      'B2B satışlar üçün peşəkar seqmentasiya. Vəzifə, sənaye və şirkət böyüklüyünə görə qərar vericilərə (Decision Makers) birbaşa çıxış.',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    color: '#00F2FE',
    description:
      'Z nəsli və millennial auditoriya üçün viral video kampaniyalar. E-ticarət satışlarını artırmaq üçün yaradıcı formatlar.',
  },
  {
    id: 'x',
    name: 'X (Twitter) Ads',
    color: '#1DA1F2',
    description:
      'Real vaxt trendlərinə uyğunlaşan kampaniyalar, müzakirələrə inteqrasiya və seqmentləşdirilmiş B2B/B2C kommunikasiyası.',
  },
  {
    id: 'microsoft',
    name: 'Microsoft Ads',
    color: '#00A4EF',
    description:
      'Bing, Yahoo və DuckDuckGo istifadəçilərinə çatmaq. Daha yüksək alıcılıq qabiliyyətinə malik fərqli auditoriya.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest Ads',
    color: '#E60023',
    description:
      'Vizual axtarış və alış-veriş niyyəti olan auditoriya üçün e-ticarət və kataloq reklamları.',
  },
  {
    id: 'snapchat',
    name: 'Snapchat Ads',
    color: '#FFFC00',
    description:
      'Gənc auditoriya üçün interaktiv AR (Artırılmış Reallıq) linzaları və video reklam formatları.',
  },
  {
    id: 'telegram',
    name: 'Telegram Ads',
    color: '#26A5E4',
    description:
      'Böyük qruplar və kanallar vasitəsilə spesifik maraq dairəsi olan kütlələrə kütləvi mesajlaşma və reklam.',
  },
];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
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

export function AdsPlatformCard({ activeId }: { activeId: string }) {
  const active = adPlatforms.find((p) => p.id === activeId) ?? adPlatforms[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSmooth, delay: 0.58 }}
      className="relative w-full max-w-xl"
    >
      <div
        className="pointer-events-none absolute -inset-3 rounded-3xl blur-2xl opacity-40 transition-colors duration-300"
        style={{ backgroundColor: active.color }}
        aria-hidden="true"
      />
      <div
        className="relative rounded-2xl border border-white/10 border-l-4 p-5 sm:p-6 shadow-2xl md:p-8 transition-colors duration-300 overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)',
          borderLeftColor: active.color
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <p
              className="mb-3 text-base font-bold uppercase tracking-[0.1em]"
              style={{ color: active.color }}
            >
              {active.name}
            </p>
            <p className="text-sm leading-relaxed text-white/80 md:text-base min-h-[66px]">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AdsPlatformsTabs({ activeId, setActiveId }: { activeId: string, setActiveId: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSmooth, delay: 0.58 }}
      className="w-full max-w-full"
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
        Reklam Platformaları
      </p>

      <div 
        className="flex overflow-x-auto gap-2.5 pb-4 snap-x [&::-webkit-scrollbar]:hidden" 
        role="tablist" 
        aria-label="Reklam platformaları"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
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
              className={`flex-shrink-0 snap-start whitespace-nowrap cursor-pointer rounded-full border px-4 py-2 text-sm transition-all ${
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
    </motion.div>
  );
}
