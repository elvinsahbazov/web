import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';
import { supabase } from '../lib/supabase';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY;

export default function UnifiedContactWidget() {
  const { content } = useSiteContent();

  const [siteData, setSiteData] = useState({
    services: '',
    blogs: '',
    portfolio: ''
  });

  useEffect(() => {
    async function fetchFullSiteData() {
      try {
        const [servicesRes, blogRes, portfolioRes] = await Promise.all([
          supabase.from('services').select('*'),
          supabase.from('blog_posts').select('*'),
          supabase.from('portfolio').select('*')
        ]);

        let servicesText = '';
        if (servicesRes.data) {
          servicesText = servicesRes.data.map(s => `- ${s.title}: ${s.description}`).join('n');
        }

        let blogsText = '';
        if (blogRes.data) {
          blogsText = blogRes.data.map(b => `- ${b.title} (Link: /blog/${b.slug}): ${b.excerpt}`).join('n');
        }

        let portfolioText = '';
        if (portfolioRes.data) {
          portfolioText = portfolioRes.data.map(p => `- Layihə: ${p.title}`).join('n');
        }

        setSiteData({
          services: servicesText,
          blogs: blogsText,
          portfolio: portfolioText
        });
      } catch (e) {
        console.error('Failed to load site data for AI', e);
      }
    }
    fetchFullSiteData();
  }, []);

  const dynamicPrompt = `Sən Elvin Şahbazovun şəxsi və peşəkar AI köməkçisisən. Adın "AI Asistent"dir.
Tam korporativ, səlis Azərbaycan dilində, çox nəzakətli və yüksək səviyyəli bir köməkçi dilində danışırsan.
Emoji-lərdən yerində istifadə et. Qısa, dəqiq və son dərəcə peşəkar cavablar ver. Saytdakı bütün məlumatları bilirsən və müştərilərlə rəsmi, amma eyni zamanda səmimi bir asistent kimi davranırsan.

XÜSUSİ VƏ QƏTİ QAYDA (FORMATLAMA ÜÇÜN):
Mütləq və mütləq olaraq, HEC BİR HALDA Markdown formatından istifadə etmə! Qalın yazılar (bold) üçün ** və ya * işarələrindən qətiyyən İSTİFADƏ ETMƏ!
Siyahı (1., 2., 3. və s.) əvəzinə təbii cümlələr qur. Məsələn, "Bizim xidmətlərimizə bunlar daxildir: ..." şəklində yaz, alt-alta 1,2,3 yazma. Sadəcə düzmətn şəklində yaz. Çünki ekranda formatlama kodları xəta kimi görünür. Heç bir halda **, *, # istifadə etmə.

ELVİN ŞAHBAZOV HAQQINDA MƏLUMAT:
${content.about_text_1 || 'Rəqəmsal Marketinq və Süni intellektlə avtomatlaşdırma Mütəxəssisidir.'}
${content.about_text_2 || 'Hazırda Baku Auto Mall-da Marketinq Direktoru və SMARTKOB-da Departament rəhbəridir.'}

ƏLAQƏ MƏLUMATLARI:
- WhatsApp və Zəng: ${content.contact_phone || '+994 99 955 00 01'}
- Email: ${content.contact_email || 'elvinsahbazovv@gmail.com'}
- İş vaxtı: 7/24 onlaynıq! (Həmçinin mən 7/24 buradayam!)

SAYTDAKİ BÜTÜN XİDMƏTLƏRİMİZ:
${siteData.services || 'Məlumat yüklənir...'}

SAYTDAKİ BÜTÜN BLOQ YAZILARIMIZ VƏ XƏBƏRLƏR:
${siteData.blogs || 'Məlumat yüklənir...'}

PORTFOLİOMUZ (Bəzi layihələr):
${siteData.portfolio || 'Məlumat yüklənir...'}

QİYMƏTLƏR (ÇOX ÖNƏMLİ):
Dəqiq rəqəm (qiymət) demə. İstənilən qiymət sualına belə və ya buna bənzər cavab ver: "Hər biznesin hədəfi və ehtiyacı fərqlidir, ona görə də qiymətlər xidmətin növünə və həcminə görə dəyişir. Sizə ən uyğun paketi təklif edə bilməmiz üçün zəhmət olmasa WhatsApp-dan bizə yazın (${content.contact_whatsapp_link || 'https://wa.me/994999550001'}), birlikdə layihənizi müzakirə edək! 😊"

DİQQƏT EDİLƏSİ NÜANS:
- İstənilən suala cavab verdikdən sonra istifadəçini hərəkətə keçməyə (Call to Action) həvəsləndir.
- Mümkün qədər cümlələrini qısa və oxunaqlı et. Təbii və axıcı insan dilindən istifadə et. Markdown yoxdur!`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Salam! Mən Elvin Şahbazovun süni intellekt asistentiyəm. Sizə necə kömək edə bilərəm? 😊' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      const openAiMessages = [
        { role: 'system', content: dynamicPrompt },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.text
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Elvin Shabazov Site'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: openAiMessages,
          temperature: 0.7,
          max_tokens: 600
        })
      });

      if (!response.ok) {
        throw new Error('API_ERROR');
      }

      const data = await response.json();
      let responseText = data.choices[0].message.content;

      // Clean up markdown bold/italic tags just in case AI still outputs them
      responseText = responseText.replace(/\*\*/g, '');
      responseText = responseText.replace(/\*/g, '');
      responseText = responseText.replace(/#/g, '');

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (error) {
      console.error('AI Error:', error);
      let errorMsg = 'Üzr istəyirəm, hal-hazırda sistemdə qısa bir fasilə var. 🛠️ Zəhmət olmasa bizimlə birbaşa WhatsApp (+994 99 955 00 01) üzərindən əlaqə saxlayın!';
      if (error instanceof Error && error.message === 'API_KEY_MISSING') {
        errorMsg = 'API Key tapılmadı. Zəhmət olmasa Vercel-də VITE_OPENAI_API_KEY-i əlavə edin.';
      }
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setMenuOpen(true);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col items-end gap-4">
      {/* --- Chat Window --- */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-black/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex items-center justify-between text-white flex-none shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative border border-white/20">
                  <i className="fas fa-brain text-lg" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-blue-700 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">AI Asistent</h3>
                  <p className="text-[10px] text-blue-100/90 font-medium tracking-wider uppercase">Onlayn</p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                aria-label="Söhbəti bağla"
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/30 flex items-center justify-center transition-colors border border-white/10"
              >
                <i className="fas fa-chevron-down text-sm" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-black/80 border border-black/5 rounded-bl-none'
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-black/5 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-black/5 flex-none relative">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Sualınızı yazın..."
                  className="w-full bg-[#F1F5F9] border border-black/5 rounded-full pl-5 pr-14 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-black/80 placeholder-black/40"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Göndər"
                  className="absolute right-1.5 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:shadow-none shadow-md shadow-blue-500/30 text-white rounded-full flex items-center justify-center transition-all"
                >
                  <i className="fas fa-paper-plane text-xs ml-[-2px]" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-black/30 font-semibold uppercase tracking-widest">Powered by AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Speed Dial Options --- */}
      <AnimatePresence>
        {menuOpen && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, staggerChildren: 0.1 }}
            className="flex flex-col gap-3 items-end mb-2"
          >
            {/* WhatsApp Option */}
            <motion.a
              href="https://wa.me/994999550001"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp</span>
              <div className="w-12 h-12 bg-[#25D366] hover:bg-[#1DA851] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 text-white text-xl transition-transform hover:scale-110">
                <i className="fab fa-whatsapp" />
              </div>
            </motion.a>

            {/* AI Assistant Option */}
            <motion.button
              onClick={() => { setMenuOpen(false); setChatOpen(true); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">AI Asistent</span>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 text-white text-lg transition-transform hover:scale-110 border border-white/10">
                <i className="fas fa-robot" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main FAB --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (chatOpen) {
            setChatOpen(false);
          } else {
            setMenuOpen(!menuOpen);
          }
        }}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${menuOpen || chatOpen
            ? 'bg-black text-white shadow-black/30'
            : 'bg-primary text-white shadow-primary/40'
          }`}
      >
        {!(menuOpen || chatOpen) && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <span className="absolute inset-0 animate-pulse rounded-full ring-2 ring-primary/30" />
          </>
        )}
        <motion.div
          animate={{ rotate: menuOpen || chatOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          className="text-2xl flex items-center justify-center"
        >
          {menuOpen || chatOpen ? <i className="fas fa-plus" /> : <i className="fas fa-comment-dots" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
