import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { springSmooth } from '../../lib/motion';

export type AdPlatform = {
  id: string;
  name: string;
  color: string;
  description: string;
  icon: string;
};

export const adPlatforms: AdPlatform[] = [
  {
    id: 'meta',
    name: 'Meta Ads',
    color: '#1877F2',
    icon: 'fab fa-meta',
    description:
      'Sadəcə "like" deyil, real satış gətirən kampaniyalar. Advantage+ və sınaqdan keçirilmiş strategiyalarla Facebook və Instagram-dan biznesinizə birbaşa müştəri axını, mürəkkəb retargeting və WhatsApp satış tunelləri qururuq.',
  },
  {
    id: 'google',
    name: 'Google Ads',
    color: '#4285F4',
    icon: 'fab fa-google',
    description:
      'Rəqibə getmədən, məhz sizi axtaran "isti" müştəriləri ələ keçirin. Performance Max və Search kampaniyaları ilə Google, YouTube və tərəfdaş saytlarda anında görünürlük və yüksək dönüşüm (ROI) təmin edirik.',
  },
  {
    id: 'yandex',
    name: 'Yandex Direct',
    color: '#FC3F1D',
    icon: 'fab fa-yandex',
    description:
      'MDB bazarı və alternativ axtarış motorlarında böyümək istəyənlər üçün ideal kanal. RSY şəbəkəsində rəqabətin daha az olduğu yerlərdə ucuz klik xərci (CPC) ilə geniş kütləyə çatıb birbaşa satışlar çıxarırıq.',
  },
  {
    id: 'vk',
    name: 'VK Ads',
    color: '#0077FF',
    icon: 'fab fa-vk',
    description:
      'Rusiya və MDB ölkələrinə məhsul/xidmət satmaq üçün ən effektiv platforma. Dərin maraq seqmentasiyası və Lead-form reklamları ilə rusdilli auditoriyada satışlarınızı sürətləndiririk.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    color: '#0A66C2',
    icon: 'fab fa-linkedin',
    description:
      'B2B sektorunda strateji tərəfdaşlıqlar və böyük müqavilələr üçün tək ünvan. Şirkət adı, vəzifə və sənayeyə görə birbaşa qərarverici şəxsləri (CEO, Direktorlar) hədəfləyərək yüksək keyfiyyətli potensial müştərilər (Lead) cəlb edirik.',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    color: '#00F2FE',
    icon: 'fab fa-tiktok',
    description:
      'Brendinizi darıxdırıcı olmaqdan xilas edin. Yüksək alıcılıq qabiliyyətinə malik gənc və dinamik auditoriyanı əyləndirərək alış-verişə məcbur edən aqressiv və viral qısa video reklam strategiyaları.',
  },
  {
    id: 'x',
    name: 'X (Twitter) Ads',
    color: '#1DA1F2',
    icon: 'fab fa-x-twitter',
    description:
      'Kütlənin diqqət mərkəzində və real-vaxt trendlərində olun. Xəbər, kripto, İT və Premium B2C/B2B kütləsini hədəfləyərək ən aktual müzakirələrdən birbaşa trafik və satış çəkirik.',
  },
  {
    id: 'microsoft',
    name: 'Microsoft Ads',
    color: '#00A4EF',
    icon: 'fab fa-microsoft',
    description:
      'Google-un səs-küyündən və rəqabətindən kənarda qalan gizli xəzinə. Bing və Yahoo istifadə edən, əsasən yaşlı, korporativ və alıcılıq qabiliyyəti yüksək seqmentə birbaşa hədəflənmə.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest Ads',
    color: '#E60023',
    icon: 'fab fa-pinterest',
    description:
      'E-ticarət və vizual məhsul satanlar üçün ilham mənbəyi. Məhsulunuzu birbaşa olaraq dizayn, geyim və ya "moodboard" axtaran müştərilərin qarşısına çıxararaq birbaşa səbətə yönləndiririk.',
  },
  {
    id: 'snapchat',
    name: 'Snapchat Ads',
    color: '#FFFC00',
    icon: 'fab fa-snapchat',
    description:
      'Xüsusilə Körfəz (Ərəbistan) və Avropa bazarlarında üstünlük təşkil edən, əyləncəni və sürətli istehlakı sevən kütlədən ucuz klik (CPC) və anında reaksiyalar (App Install/Satış) almaq üçün ideal platforma.',
  },
  {
    id: 'telegram',
    name: 'Telegram Ads',
    color: '#26A5E4',
    icon: 'fab fa-telegram',
    description:
      'Rəqiblərinizin oxucularını birbaşa özünüzə cəlb edin. Rəsmi Telegram reklamları vasitəsilə aidiyyəti biznes kanallarında sadə, lakin yüksək konversiyalı mesajlarla kütləvi müştəri axını yaradırıq.',
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
              className="mb-3 text-base font-bold uppercase tracking-[0.1em] flex items-center gap-2.5"
              style={{ color: active.color }}
            >
              <i className={`${active.icon} text-lg`} />
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
              <span className="flex items-center gap-2">
                <i className={platform.icon} style={{ color: isActive ? 'inherit' : platform.color }} />
                {platform.name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
