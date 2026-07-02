/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogs } from '../data/blogs';
import Container from '../components/ui/Container';
import { fadeUp } from '../lib/motion';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fast network request
    setTimeout(() => {
      const found = blogs.find(b => b.slug === slug);
      setPost(found || null);
      setLoading(false);
    }, 400);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-black mb-4">Məqalə tapılmadı</h1>
        <Link to="/blog" className="text-primary hover:underline">Bloqa qayıt</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <Container>
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Bloqa qayıt
          </Link>
          
          <h1 className="font-black text-3xl md:text-5xl text-black leading-tight mb-6" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-black/50 mb-10 pb-10 border-b border-black/5">
            <div className="flex items-center gap-2">
              <i className="fas fa-calendar-alt" />
              {new Date(post.created_at).toLocaleDateString('az-AZ')}
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-user-circle" />
              Elvin Şahbazov
            </div>
          </div>

          {post.cover_image && (
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-10 bg-black/5">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div 
            className="prose prose-lg prose-blue max-w-none text-black/80"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </motion.div>
      </Container>
    </div>
  );
}
