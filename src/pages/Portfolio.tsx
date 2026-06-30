import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import { supabase } from '../lib/supabase';
import { fadeUp } from '../lib/motion';

export default function Portfolio() {
  const [dbPortfolio, setDbPortfolio] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPortfolio() {
      const { data } = await supabase.from('portfolio').select('*').eq('published', true).order('created_at', { ascending: false });
      if (data) {
        setDbPortfolio(data);
      }
    }
    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-16">
          <span className="section-label inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4">
            <i className="fas fa-briefcase" /> Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
            Uğurlu Layihələrimiz
          </h1>
          <p className="text-black/60 max-w-2xl mx-auto text-lg">
            Real nəticələr, ROAS artımı və uğur hekayələrimiz. Layihələrin üzərinə klikləyərək ətraflı baxa bilərsiniz.
          </p>
        </motion.div>

        {dbPortfolio.length === 0 ? (
          <div className="text-center text-black/50 py-20 bg-white rounded-3xl border border-black/5">
            Hazırda portfel layihəsi yoxdur. Zəhmət olmasa admin paneldən əlavə edin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbPortfolio.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.link_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp(i * 0.1)}
                data-cursor-text="Bax"
                className="group block bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full bg-black/5 overflow-hidden relative">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur text-black font-bold text-sm px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Layihəyə Bax <i className="fas fa-arrow-right ml-1" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-black mb-2" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{item.title}</h3>
                  {item.description && <p className="text-black/60 text-sm line-clamp-2">{item.description}</p>}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
