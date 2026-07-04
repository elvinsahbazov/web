   
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';

export default function Blog() {
  const posts = blogs;

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 pb-20">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-16">
          <span className="section-label">Öyrən & İnkişaf et</span>
          <h1 className="section-title mt-6">
            Rəqəmsal Marketinq <br />
            <span className="text-gradient-blue">Bloqu</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Ən son trendlər, strategiyalar və AI avtomatlaşdırmaları haqqında məqalələr.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post, i) => (
                  <motion.div
                  key={post.id}
                  {...fadeUp(Math.min(i * 0.05, 0.25))}
                  data-cursor-text="Oxu"
                  className="bg-white/[0.03] backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-blue group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video bg-white/5 overflow-hidden relative">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                          <i className="fas fa-image text-4xl" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="text-xs text-white/40 mb-3 font-semibold tracking-wider">
                        {new Date(post.created_at).toLocaleDateString('az-AZ')}
                      </div>
                      <h3 className="font-bold text-xl text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-white/50 py-10">
                Hələlik heç bir məqalə yoxdur.
              </div>
            )}
          </div>
      </Container>
    </div>
  );
}
