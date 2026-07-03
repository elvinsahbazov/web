import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, ShieldCheck, SearchCode, Calendar } from 'lucide-react';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';

const newsItems = [
  {
    id: 1,
    title: 'SEO-dan GEO-ya Keçid: Süni İntellekt Axtarışı Dəyişdirir',
    desc: 'Ənənəvi SEO qaydaları dəyişir. Artıq axtarış sistemləri (Google, Bing) sadəcə linklər yox, AI əsaslı hazır cavablar verir. İndi markalar yalnız vebsaytlar üçün yox, Generative Engine Optimization (GEO) vasitəsilə süni intellekt botları (ChatGPT, Gemini) üçün də optimizasiya edilməlidir.',
    date: '02 İyul 2026',
    icon: <SearchCode size={24} className="text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1481481267499-1bd6230f2963?auto=format&fit=crop&q=80&w=800',
    category: 'Axtarış Sistemləri'
  },
  {
    id: 2,
    title: 'Agentic AI: Sadəcə Yazan Yox, Həm də İcra Edən Sistemlər',
    desc: 'AI artıq sadəcə mətn və şəkil generasiya etmir. "Agentic AI" (Avtonom Agentlər) sərbəst şəkildə qərar verir, rəqəmsal reklam kampaniyalarını idarə edir, büdcəni optimallaşdırır və müştərilərlə birbaşa əlaqə qurur. İnsan yalnız strategiyanı təyin edir.',
    date: '28 İyun 2026',
    icon: <Zap size={24} className="text-yellow-500" />,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'Avtomatlaşdırma'
  },
  {
    id: 3,
    title: 'Hiper-Fərdiləşdirmə (Hyper-Personalization 2.0)',
    desc: 'Böyük Verilənlər (Big Data) və Machine Learning birləşərək müştərilərə anında fərdiləşdirilmiş təcrübə təqdim edir. Sayta daxil olan hər bir şəxs üçün xüsusi olaraq dizayn, təkliflər və kontent real vaxt (real-time) rejimində dəyişir. Konversiyalar 3x artır.',
    date: '15 İyun 2026',
    icon: <Globe size={24} className="text-green-500" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    category: 'Marketinq'
  },
  {
    id: 4,
    title: 'Süni İntellekt Etikası və EEAT Faktorunun Yüksəlişi',
    desc: 'Avropada təsdiqlənən yeni qanunlarla AI tərəfindən yaradılan materiallar (Deepfake, Virtual İnfleuncer) bəyan edilməlidir. Google isə, orijinal insan təcrübəsini əks etdirən "EEAT" (Experience, Expertise, Authoritativeness, Trust) məzmununu daha çox önə çıxarır.',
    date: '10 İyun 2026',
    icon: <ShieldCheck size={24} className="text-red-500" />,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'Qanunvericilik'
  }
];

export default function Vision() {
  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <Container>
        {/* Header Section */}
        <motion.div {...fadeUp()} className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-white/80">
            <Globe size={14} className="text-blue-500" /> Rəqəmsal Dünyada Son Yeniliklər
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
            Texnologiya Sürətlə Dəyişir. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Siz Hazırsınız?</span>
          </h1>
          <p className="text-lg text-white/60 mx-auto max-w-2xl leading-relaxed">
            Rəqəmsal marketinq, süni intellekt (AI) və avtomatlaşdırma sahəsində dünyada baş verən ən son texnoloji yeniliklər, trendlər və SEO strategiyaları.
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {newsItems.map((news, i) => (
            <motion.article 
              key={news.id}
              {...fadeUp(i * 0.15)}
              className="group relative flex flex-col justify-between rounded-3xl bg-[#111111] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-bold tracking-wide text-white uppercase">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-white/40">
                  <Calendar size={14} />
                  <span>{news.date}</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  {news.title}
                </h2>
                
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8 flex-1">
                  {news.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                    {news.icon}
                  </div>
                  <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    Ətraflı oxu <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
}
