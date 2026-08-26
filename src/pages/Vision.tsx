import LazyImage from '../components/ui/LazyImage';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Zap, ShieldCheck, SearchCode, Calendar, X, BarChart2, Mic, Video, Database, Cpu, Network } from 'lucide-react';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';

const newsItems = [
  {
    id: 1,
    title: 'SEO-dan GEO-ya Keçid: Süni İntellekt Axtarışı Dəyişdirir',
    desc: 'Ənənəvi SEO qaydaları dəyişir. Artıq axtarış sistemləri (Google, Bing) sadəcə linklər yox, AI əsaslı hazır cavablar verir. İndi markalar yalnız vebsaytlar üçün yox, Generative Engine Optimization (GEO) vasitəsilə süni intellekt botları (ChatGPT, Gemini) üçün də optimizasiya edilməlidir.',
    content: 'Son aylar ərzində Google SGE (Search Generative Experience) və digər AI axtarış alətləri veb trafikində ciddi dəyişikliklərə səbəb olub. Mütəxəssislərin proqnozlarına görə, yaxın 2 il ərzində klassik "açar söz" (keyword) SEO-su əhəmiyyətini böyük ölçüdə itirəcək. Əvəzində markalar öz məlumatlarını birbaşa AI modellərinin təlim məlumatlarına daxil edə biləcək şəkildə strukturlaşdırmalıdırlar (Generative Engine Optimization). Sizin veb saytınız bu yeni reallığa hazırdırmı?',
    date: '02 İyul 2026',
    icon: <SearchCode size={24} className="text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'Axtarış Sistemləri'
  },
  {
    id: 2,
    title: 'Agentic AI: Sadəcə Yazan Yox, Həm də İcra Edən Sistemlər',
    desc: 'AI artıq sadəcə mətn və şəkil generasiya etmir. "Agentic AI" (Avtonom Agentlər) sərbəst şəkildə qərar verir, rəqəmsal reklam kampaniyalarını idarə edir, büdcəni optimallaşdırır və müştərilərlə birbaşa əlaqə qurur. İnsan yalnız strategiyanı təyin edir.',
    content: 'Avtonom Agentlər (Agentic AI) dövrü başlayıb. Yeni nəsil AI sistemləri sadəcə sizin əmrlərinizi (prompt) gözləmir, həmçinin onlara verilən məqsədə çatmaq üçün sərbəst şəkildə addımlar atır. Məsələn, bir Agentic AI-a "bu ay satışları 20% artır" hədəfi verdikdə, o sərbəst şəkildə reklam mətnləri yazır, şəkillər yaradır, Google Ads-də kampaniyalar qurur, A/B testləri edir və nəticələrə uyğun büdcəni optimallaşdırır. İnsanın rolu isə bu prosesə ancaq kənardan nəzarət etmək və strateji hədəflər qoymaqdır.',
    date: '28 İyun 2026',
    icon: <Zap size={24} className="text-yellow-500" />,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'Avtomatlaşdırma'
  },
  {
    id: 3,
    title: 'Hiper-Fərdiləşdirmə (Hyper-Personalization 2.0)',
    desc: 'Böyük Verilənlər (Big Data) və Machine Learning birləşərək müştərilərə anında fərdiləşdirilmiş təcrübə təqdim edir. Sayta daxil olan hər bir şəxs üçün xüsusi olaraq dizayn, təkliflər və kontent real vaxt (real-time) rejimində dəyişir. Konversiyalar 3x artır.',
    content: 'Hiper-fərdiləşdirmə 2.0 (Hyper-Personalization 2.0) dövründə rəqəmsal platformalar hər bir istifadəçiyə fərqli görünür. Ziyarətçi sayta daxil olduğu saniyədə AI onun əvvəlki hərəkətlərini (zero-party və first-party data) analiz edərək saytın görünüşünü, təklif edilən məhsulları, hətta reklam mətninin tonunu (rəsmi və ya səmimi) dəyişdirir. Bu texnologiya sayəsində markalar müştəri məmnuniyyətini və satış (conversion) dərəcələrini 300%-dək artırmağı bacarıb.',
    date: '15 İyun 2026',
    icon: <Globe size={24} className="text-green-500" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    category: 'Marketinq'
  },
  {
    id: 4,
    title: 'Süni İntellekt Etikası və EEAT Faktorunun Yüksəlişi',
    desc: 'Avropada təsdiqlənən yeni qanunlarla AI tərəfindən yaradılan materiallar (Deepfake, Virtual İnfleuncer) bəyan edilməlidir. Google isə, orijinal insan təcrübəsini əks etdirən "EEAT" (Experience, Expertise, Authoritativeness, Trust) məzmununu daha çox önə çıxarır.',
    content: 'Süni İntellektlə yaradılan vizualların (deepfake) və mətnlərin çoxalması ilə etika sualları gündəmə gəlib. Avropa Birliyinin 2026-cı ildə tətbiq etdiyi yeni qanunvericilik markalardan AI tərəfindən yaradılan kontentləri açıq şəkildə işarələməyi (watermark və ya etiket) tələb edir. Eyni zamanda, axtarış sistemləri saxta və zərərli AI məzmunlarının qarşısını almaq üçün "Orijinal İnsan Təcrübəsi"nə əsaslanan (EEAT) məzmunları axtarışlarda daha yüksək mövqelərə çıxarır.',
    date: '10 İyun 2026',
    icon: <ShieldCheck size={24} className="text-red-500" />,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'Qanunvericilik'
  },
  {
    id: 5,
    title: 'Proqnozlaşdırıcı Analitika (Predictive AI): Müştəri Nə Alacağını Sizdən Əvvəl Bilir',
    desc: 'Böyük data və Süni İntellekt alqoritmləri birləşərək müştərinin növbəti addımını əvvəlcədən təxmin edir. Kampaniyalarınızı "bəlkə alarlar" ümidi ilə yox, "mütləq alacaqlar" əminliyi ilə qurun.',
    content: 'Ənənəvi rəqəmsal marketinq, istifadəçinin keçmişdə nə etdiyinə baxırdı (məsələn, sayta girib-girməməsi). Lakin Predictive AI (Proqnozlaşdırıcı Süni İntellekt) sayəsində artıq istifadəçinin gələcəkdə nə edəcəyini hesablamaq mümkündür. Makro-iqtisadi göstəricilərdən tutmuş hava durumuna qədər minlərlə dəyişəni saniyələr içində analiz edən AI, ən yüksək alış ehtimalı olan kütləni müəyyən edir və reklam büdcəsini məhz onlara yönəldir. Bu texnologiyanı biznesinə inteqrasiya edənlər, rəqabətdə haqsız üstünlük qazanırlar.',
    date: '12 Avqust 2026',
    icon: <BarChart2 size={24} className="text-indigo-500" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    category: 'Data Analitikası'
  },
  {
    id: 6,
    title: 'Səsli Axtarış və Süni İntellekt Assistentləri: Gələcəyin Axtarış Motorları',
    desc: 'İstifadəçilər artıq yazaraq deyil, danışaraq axtarış edirlər. Siri, Alexa, ChatGPT Voice kimi assistentlər üçün vebsaytlarınızı optimallaşdırmasınız, müştəriləriniz sizi tapa bilməyəcək.',
    content: 'Smartfonlar və ağıllı ev cihazlarının artması ilə Səsli Axtarış (Voice Search) qlobal axtarış həcminin 50%-ni keçmək üzrədir. İnsanlar "Bakıda ən yaxşı rəqəmsal marketinq eksperti" yazmaq əvəzinə, ChatGPT-yə səsli formada "Mənə süni intellekt avtomatlaşdırması edə biləcək peşəkar tap" deyirlər. Səsli axtarışlarda AI botlar yalnız 1 ən yaxşı cavab (Position Zero) səsləndirir. Buna görə də markaların məzmunları sual-cavab (FAQ) formatında və təbii danışıq dilinə uyğun olaraq (NPL) strukturlaşdırılmalıdır.',
    date: '05 Avqust 2026',
    icon: <Mic size={24} className="text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    category: 'Səsli Axtarış'
  },
  {
    id: 7,
    title: 'Video Marketinqdə Generativ AI İnqilabı: Sora və Runway',
    desc: 'Bahalı video çəkilişlər, günlərlə davam edən montaj işləri keçmişdə qalır. Mətndən-Videoya (Text-to-Video) texnologiyaları reklam yaradıcılığını (Creative) 100 qat sürətləndirir.',
    content: 'OpenAI-ın Sora modeli və Runway kimi Generativ AI alətləri reklam sənayesində yeni bir dövr başlatdı. İndi bir məhsulun fərqli məkanlarda, fərqli hava şəraitində və aktyorlarla videosunu yaratmaq üçün bir neçə kəlmə (prompt) yazmaq kifayətdir. Bu, xüsusilə TikTok, Reels və Shorts kimi qısametrajlı video platformalarında fəaliyyət göstərən bizneslər üçün inqilabi yenilikdir. Şirkətlər artıq məzmun istehsalına yox, doğru ideya və AI idarəetməsinə (Prompt Engineering) yatırım etməlidirlər.',
    date: '28 İyul 2026',
    icon: <Video size={24} className="text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
    category: 'Video Marketinq'
  },
  {
    id: 8,
    title: 'Ağıllı CRM: Müştəri Münasibətlərinin Süni İntellektlə İdarəedilməsi',
    desc: 'Gündəlik yüzlərlə müraciəti (Lead) əl ilə emal etmək satışları öldürür. AI dəstəkli CRM sistemləri müştərini tanıyır, təsnif edir və satış zənginə qədər avtomatik isidir.',
    content: 'Bir çox şirkət reklam vasitəsilə minlərlə potensial müştəri (Lead) əldə edir, lakin onların çoxu diqqətsizlik və ya gecikmələr səbəbindən itirilir. Süni intellektlə inteqrasiya olunmuş CRM (Customer Relationship Management) sistemləri, daxil olan hər bir müraciəti saniyələr içində analiz edir. Müştərinin yazdığı mesajın tonundan, baxdığı səhifələrdən onun alış potensialını (Lead Scoring) hesablayır. Zəif müştərilərə avtomatik qidalandırıcı (nurturing) e-poçtlar göndərir, isti müştəriləri isə dərhal satış təmsilçisinə yönləndirir.',
    date: '20 İyul 2026',
    icon: <Database size={24} className="text-orange-500" />,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    category: 'Avtomatlaşdırma'
  },
  {
    id: 9,
    title: 'Rəqəmsal Agentliklərin Sonu? "In-House" AI Marketinq Komandaları',
    desc: 'Bizneslər böyük büdcələri marketinq agentliklərinə vermək əvəzinə, daxili sistemlərinə Süni İntellekt alətlərini inteqrasiya edərək öz avtomatlaşdırılmış komandalarını qururlar.',
    content: 'Əvvəllər bizneslərin uğurlu marketinq üçün kopirayter, dizayner, media buyer və analitikdən ibarət böyük komandalara və ya agentliklərə ehtiyacı var idi. Lakin hazırda 1 peşəkar AI Marketinq Eksperti və doğru süni intellekt alətləri (Midjourney, ChatGPT, Zapier, Make) 10 nəfərlik komandanın işini təkbaşına və daha ucuz edə bilir. Biznes sahibləri üçün yeni trend, agentliklərə aylıq xidmət haqqı ödəmək yox, bir dəfə öz "In-house AI Sistemlərini" qurduraraq daimi və müstəqil şəkildə böyüməkdir.',
    date: '14 İyul 2026',
    icon: <Cpu size={24} className="text-cyan-500" />,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    category: 'Biznes Strategiyası'
  },
  {
    id: 10,
    title: 'Omnichannel AI: Müştərini Hər Platformada Avtomatik İzləyən Ekosistem',
    desc: 'Google, Meta, TikTok, LinkedIn və E-poçt. Süni intellekt bu kanalların hamısını bir mərkəzdən idarə edir və hər bir istifadəçiyə eyni ardıcıllıqla reklam göstərir.',
    content: 'İstifadəçilər bir məhsulu almazdan əvvəl orta hesabla 7-21 fərqli nöqtədə həmin marka ilə qarşılaşırlar. Omnichannel (Çoxkanallı) Marketinq müştərini hər yerdə izləmək deməkdir. Lakin bunu manuel olaraq etmək demək olar ki, qeyri-mümkündür. AI idarəetməsindəki Omnichannel strategiyası belə işləyir: Ziyarətçi sizi Google-da axtarır, 2 saat sonra Instagram-da videonuzu görür, səhəri gün e-poçtuna təklif gəlir, həftə sonu isə LinkedIn-də mütəxəssis məqalənizlə qarşılaşır. Süni intellekt bütün bu toxunuşları xüsusi ardıcıllıqla idarə edir.',
    date: '08 İyul 2026',
    icon: <Network size={24} className="text-teal-500" />,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    category: 'Çoxkanallı Marketinq'
  }
];

export default function Vision() {
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);

  const selectedNews = newsItems.find((n) => n.id === selectedNewsId);

  return (
    <div className="min-h-screen bg-transparent text-white pt-28 pb-20">
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
              onClick={() => setSelectedNewsId(news.id)}
              className="cursor-pointer group relative flex flex-col justify-between rounded-3xl bg-[#111111] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
                <LazyImage 
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

      {/* Modal / Popup for Full Article */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNewsId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-white/10 rounded-3xl shadow-2xl z-10 hide-scrollbar"
            >
              <button 
                onClick={() => setSelectedNewsId(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="w-full h-48 md:h-72 relative">
                <LazyImage 
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
              </div>

              <div className="p-6 md:p-10 -mt-10 relative z-10">
                <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-white/50">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white uppercase tracking-wider">
                    {selectedNews.category}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <Calendar size={14} />
                  <span>{selectedNews.date}</span>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  {selectedNews.title}
                </h2>
                
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
                  {selectedNews.content}
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10">
                    {selectedNews.icon}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Elvin Şahbazov</p>
                    <p className="text-white/40 text-xs">Rəqəmsal İnnovasiyalar İcmalı</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

