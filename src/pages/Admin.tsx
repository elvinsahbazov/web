import LazyImage from '../components/ui/LazyImage';
   
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Settings, Briefcase, Plus, 
  Edit2, Trash2, X, Check, Save, LogOut, Menu, LayoutTemplate, MessageSquare, Users, Mail
} from 'lucide-react';

// Reusable Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border ${
        type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-700' : 'bg-red-500/100/10 border-red-500/20 text-red-700'
      } backdrop-blur-md`}
    >
      <div className={`p-2 rounded-full ${type === 'success' ? 'bg-green-500/20' : 'bg-red-500/100/20'}`}>
        {type === 'success' ? <Check size={16} /> : <X size={16} />}
      </div>
      <p className="font-semibold text-sm">{message}</p>
      <button onClick={onClose} className="ml-2 text-current opacity-50 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </motion.div>
  );
};

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'blog' | 'services' | 'portfolio' | 'pages' | 'messages' | 'subscribers'>('blog');
  
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);
  
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Site Content State
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [contentSaving, setContentSaving] = useState<string | null>(null);

  // Edit State
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  const [srvTitle, setSrvTitle] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvIcon, setSrvIcon] = useState('fas fa-star');
  const [services, setServices] = useState<any[]>([]);

  const [portTitle, setPortTitle] = useState('');
  const [portImage, setPortImage] = useState('');
  const [portLink, setPortLink] = useState('');
  const [portfolio, setPortfolio] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAuth(true);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(!!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (auth) fetchData();
  }, [auth, activeTab]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  async function fetchData() {
    if(activeTab === 'blog') {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (data) setPosts(data);
    } else if(activeTab === 'services') {
      const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (data) setServices(data);
    } else if(activeTab === 'portfolio') {
      const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
      if (data) setPortfolio(data);
    } else if(activeTab === 'pages') {
      const { data } = await supabase.from('site_content').select('*').order('section', { ascending: true });
      if (data) setSiteContent(data);
    } else if(activeTab === 'messages') {
      const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (data) setMessages(data);
    } else if(activeTab === 'subscribers') {
      const { data } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
      if (data) setSubscribers(data);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() !== 'elvin000111sahbazov') {
      showToast('Yanlış şifrə!', 'error');
      return;
    }
    
    const userEmail = email.trim().toLowerCase() || 'sahbazovelvin92@gmail.com';
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: password.trim()
    });

    if (error) {
      showToast('Giriş xətası. Məlumatları yoxlayın.', 'error');
    } else {
      setAuth(true);
      showToast('Xoş gəldiniz, Elvin!', 'success');
    }
  };

  const resetForms = () => {
    setEditingItem(null);
    setTitle(''); setSlug(''); setContent(''); setCoverImage(''); setExcerpt(''); setPublished(true);
    setSrvTitle(''); setSrvDesc(''); setSrvIcon('');
    setPortTitle(''); setPortImage(''); setPortLink('');
  };

  const handleEditClick = (item: any, type: string) => {
    setEditingItem(item);
    if (type === 'blog') {
      setTitle(item.title); setSlug(item.slug); setContent(item.content); setCoverImage(item.cover_image); setExcerpt(item.excerpt || ''); setPublished(item.published ?? true);
    } else if (type === 'services') {
      setSrvTitle(item.title); setSrvDesc(item.description); setSrvIcon(item.icon);
    } else if (type === 'portfolio') {
      setPortTitle(item.title); setPortImage(item.image_url); setPortLink(item.link_url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveItem = async (e: React.FormEvent, table: string) => {
    e.preventDefault();
    let payload = {};
    if (table === 'posts') payload = { title, slug, excerpt, content, cover_image: coverImage, published };
    else if (table === 'services') payload = { title: srvTitle, description: srvDesc, icon: srvIcon, published: true };
    else if (table === 'portfolio') payload = { title: portTitle, image_url: portImage, link_url: portLink, published: true };

    let error;
    if (editingItem) {
      const res = await supabase.from(table).update(payload).eq('id', editingItem.id);
      error = res.error;
    } else {
      const res = await supabase.from(table).insert([payload]);
      error = res.error;
    }

    if (error) {
      showToast('Xəta: ' + error.message, 'error');
    } else {
      showToast(editingItem ? 'Məlumat yeniləndi!' : 'Yeni məlumat əlavə edildi!', 'success');
      resetForms();
      fetchData();
    }
  };

  const handleSaveContent = async (id: string, value: string) => {
    setContentSaving(id);
    const { error } = await supabase.from('site_content').update({ value }).eq('id', id);
    if (error) {
      showToast('Xəta: ' + error.message, 'error');
    } else {
      showToast('Məzmun yadda saxlanıldı!', 'success');
      fetchData();
    }
    setContentSaving(null);
  };

  const handleDelete = async (table: string, id: string) => {
    if(confirm('Silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz!')) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) showToast('Xəta: ' + error.message, 'error');
      else {
        showToast('Məlumat silindi!', 'success');
        fetchData();
      }
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-4">
        <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#09090b] p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/5 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Settings size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center mb-2 text-white/90">Admin Panel</h2>
          <p className="text-center text-white/50 text-sm mb-8">İdarəetmə panelinə daxil olmaq üçün məlumatları yazın</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-wide">E-poçt ünvanı</label>
              <input type="email" placeholder="admin@example.com" required className="w-full px-5 py-4 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-wide">Şifrə</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="w-full px-5 py-4 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1">Daxil ol</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'blog', label: 'Bloq İdarəetməsi', icon: FileText },
    { id: 'services', label: 'Xidmətlər', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: LayoutDashboard },
    { id: 'pages', label: 'Səhifə Məzmunu', icon: LayoutTemplate },
    { id: 'messages', label: 'Gələn Mesajlar', icon: MessageSquare },
    { id: 'subscribers', label: 'Abunəçilər', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white flex">
      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#09090b] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-8 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20">
                <Settings size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white/90 leading-tight">Admin</h1>
                <p className="text-xs text-white/50 font-medium">Dashboard</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white/80">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); resetForms(); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'text-white/70 hover:bg-[#18181b] hover:text-white'
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? 'text-blue-600' : 'text-white/40'} />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button 
              onClick={async () => { await supabase.auth.signOut(); setAuth(false); showToast('Sistemdən çıxıldı', 'info' as any); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-500/100/10 transition-colors"
            >
              <LogOut size={18} /> Çıxış et
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72 min-h-screen">
        <header className="bg-[#09090b] border-b border-white/10 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-white/70 p-2 -ml-2 rounded-lg hover:bg-[#09090b]/5">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-white/90 capitalize">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-white/90">Elvin Şahbazov</span>
              <span className="text-xs text-white/50">Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden">
              <LazyImage src="https://drive.google.com/thumbnail?id=1YmSQizY-GCTKCiPg6UD2PPFOG0d_ap2o&sz=w200" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          
          {/* CREATE/EDIT FORM */}
          {(activeTab === 'blog' || activeTab === 'services' || activeTab === 'portfolio') && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#09090b] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-white/10 p-6 md:p-8 mb-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white/90 flex items-center gap-2">
                  {editingItem ? <Edit2 size={24} className="text-blue-600" /> : <Plus size={24} className="text-blue-600" />}
                  {editingItem ? 'Redaktə Et' : 'Yeni Əlavə Et'}
                </h3>
                {editingItem && (
                  <button onClick={resetForms} className="text-sm font-semibold text-white/50 hover:text-white/90 flex items-center gap-1">
                    <X size={16} /> Ləğv et
                  </button>
                )}
              </div>
              
              {activeTab === 'blog' && (
                <form onSubmit={(e) => handleSaveItem(e, 'posts')} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Başlıq</label>
                      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Slug (URL linki)</label>
                      <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Qısa məzmun (Excerpt)</label>
                      <input type="text" required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Şəkil URL</label>
                      <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 outline-none" />
                      {coverImage && <LazyImage src={coverImage} alt="Preview" className="mt-4 w-full h-32 object-cover rounded-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" />}
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                      <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm font-bold text-white/80">Yayımda (Published)</span>
                    </label>
                  </div>
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-bold text-white/80 mb-2">Məzmun (HTML / Mətn)</label>
                    <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full flex-1 min-h-[200px] px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 outline-none resize-none font-mono text-sm leading-relaxed" placeholder="<h1>Başlıq</h1><p>Mətn...</p>" />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                      {editingItem ? <><Save size={18} /> Yenilə</> : <><Plus size={18} /> Paylaş</>}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'services' && (
                <form onSubmit={(e) => handleSaveItem(e, 'services')} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Xidmət Adı</label>
                      <input type="text" required value={srvTitle} onChange={(e) => setSrvTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">İkona Klasi (məs: fas fa-rocket)</label>
                      <div className="flex gap-4">
                        <input type="text" required value={srvIcon} onChange={(e) => setSrvIcon(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 outline-none focus:border-blue-500" />
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                          <i className={`${srvIcon} text-xl`} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2">Qısa Açıqlama</label>
                    <textarea rows={4} required value={srvDesc} onChange={(e) => setSrvDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 outline-none focus:border-blue-500 resize-none" />
                  </div>
                  <button type="submit" className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                     {editingItem ? <><Save size={18} /> Yenilə</> : <><Plus size={18} /> Əlavə et</>}
                  </button>
                </form>
              )}

              {activeTab === 'portfolio' && (
                <form onSubmit={(e) => handleSaveItem(e, 'portfolio')} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Layihə Adı</label>
                      <input type="text" required value={portTitle} onChange={(e) => setPortTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Link URL</label>
                      <input type="text" value={portLink} onChange={(e) => setPortLink(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2">Şəkil URL</label>
                    <input type="text" required value={portImage} onChange={(e) => setPortImage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 outline-none focus:border-blue-500 mb-4" />
                    {portImage && <LazyImage src={portImage} alt="Preview" className="w-48 h-32 object-cover rounded-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" />}
                  </div>
                  <button type="submit" className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                     {editingItem ? <><Save size={18} /> Yenilə</> : <><Plus size={18} /> Əlavə et</>}
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {/* LIST ITEMS */}
          {activeTab !== 'pages' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#09090b] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden">
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#18181b]/50">
                <h3 className="text-lg font-bold text-white/90">Mövcud Siyahı</h3>
                <span className="bg-blue-100 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                  {activeTab === 'blog' ? posts.length : activeTab === 'services' ? services.length : activeTab === 'portfolio' ? portfolio.length : activeTab === 'messages' ? messages.length : subscribers.length} Qeyd
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {activeTab === 'blog' && posts.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-[#18181b] transition-colors group">
                    <div className="flex items-center gap-4">
                      {item.cover_image && <LazyImage src={item.cover_image} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" />}
                      <div>
                        <h4 className="font-bold text-white/90">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-white/50">/{item.slug}</p>
                          {!item.published && <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold">Gizlidir</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button aria-label="Redaktə et" onClick={() => handleEditClick(item, 'blog')} className="p-2 text-blue-600 bg-blue-500/10 rounded-lg hover:bg-blue-100 transition-colors"><Edit2 size={16} /></button>
                      <button aria-label="Sil" onClick={() => handleDelete('posts', item.id)} className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                
                {activeTab === 'services' && services.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-[#18181b] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#09090b]/5 text-white/70 rounded-lg flex items-center justify-center text-xl"><i className={item.icon} /></div>
                      <div>
                        <h4 className="font-bold text-white/90">{item.title}</h4>
                        <p className="text-xs text-white/50 mt-1 line-clamp-1 max-w-md">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button aria-label="Redaktə et" onClick={() => handleEditClick(item, 'services')} className="p-2 text-blue-600 bg-blue-500/10 rounded-lg hover:bg-blue-100 transition-colors"><Edit2 size={16} /></button>
                      <button aria-label="Sil" onClick={() => handleDelete('services', item.id)} className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}

                {activeTab === 'portfolio' && portfolio.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-[#18181b] transition-colors group">
                    <div className="flex items-center gap-4">
                      {item.image_url && <LazyImage src={item.image_url} alt="" className="w-20 h-14 rounded-lg object-cover border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" />}
                      <h4 className="font-bold text-white/90">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button aria-label="Redaktə et" onClick={() => handleEditClick(item, 'portfolio')} className="p-2 text-blue-600 bg-blue-500/10 rounded-lg hover:bg-blue-100 transition-colors"><Edit2 size={16} /></button>
                      <button aria-label="Sil" onClick={() => handleDelete('portfolio', item.id)} className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                
                {activeTab === 'messages' && messages.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-[#18181b] transition-colors group gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-white/90">{item.full_name}</h4>
                        <span className="text-xs bg-[#09090b]/5 text-white/70 px-2 py-1 rounded-md">{new Date(item.created_at).toLocaleDateString('az')}</span>
                      </div>
                      <a href={`mailto:${item.email}`} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 mb-2">
                        <Mail size={14} /> {item.email}
                      </a>
                      <p className="text-sm text-white/70 bg-[#09090b] p-4 rounded-xl border border-white/5">{item.message}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button aria-label="Sil" onClick={() => handleDelete('contact_submissions', item.id)} className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}

                {activeTab === 'subscribers' && subscribers.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-[#18181b] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center"><Mail size={18} /></div>
                      <div>
                        <h4 className="font-bold text-white/90">{item.email}</h4>
                        <p className="text-xs text-white/50 mt-1">Mənbə: {item.source} • Tarix: {new Date(item.created_at).toLocaleDateString('az')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button aria-label="Sil" onClick={() => handleDelete('newsletter_subscribers', item.id)} className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                
                {/* Empty states */}
                {((activeTab === 'blog' && posts.length === 0) || 
                  (activeTab === 'services' && services.length === 0) || 
                  (activeTab === 'portfolio' && portfolio.length === 0) ||
                  (activeTab === 'messages' && messages.length === 0) ||
                  (activeTab === 'subscribers' && subscribers.length === 0)) && (
                  <div className="p-12 flex flex-col items-center justify-center text-white/40">
                    <LayoutDashboard size={48} className="mb-4 opacity-20" />
                    <p className="font-medium">Hələ heç bir məlumat yoxdur</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* PAGES CONTENT */}
          {activeTab === 'pages' && (
            <div className="space-y-10">
              {['hero', 'about', 'services', 'vision', 'contact', 'footer'].map((section, idx) => {
                const sectionItems = siteContent.filter(item => item.section === section);
                if(sectionItems.length === 0) return null;
                return (
                  <motion.div key={section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-[#09090b] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden">
                    <div className="px-8 py-5 border-b border-white/5 bg-[#18181b]/50">
                      <h3 className="text-xl font-bold text-white/90 capitalize flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                        {section} Bölməsi
                      </h3>
                    </div>
                    <div className="p-8 space-y-8">
                      {sectionItems.map(item => (
                        <div key={item.id} className="group">
                          <label className="block font-bold text-sm text-white/80 mb-2">{item.label}</label>
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                              {item.type === 'textarea' ? (
                                <textarea rows={4} defaultValue={item.value} id={`input-${item.id}`} className="w-full px-5 py-4 rounded-2xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none leading-relaxed" />
                              ) : (
                                <input type="text" defaultValue={item.value} id={`input-${item.id}`} className="w-full px-5 py-4 rounded-2xl bg-[#18181b] border border-white/10 focus:bg-[#09090b] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
                              )}
                              
                              {/* Image preview heuristic */}
                              {item.type !== 'textarea' && (item.value.includes('http') && (item.value.includes('image') || item.value.includes('thumbnail') || item.value.includes('.png') || item.value.includes('.jpg'))) && (
                                <div className="mt-4 p-2 bg-[#18181b] rounded-xl border border-white/5 inline-block">
                                  <LazyImage src={item.value} alt="" className="h-24 rounded-lg object-contain" />
                                </div>
                              )}
                            </div>
                            <div className="md:w-32 shrink-0">
                              <button 
                                onClick={() => handleSaveContent(item.id, (document.getElementById(`input-${item.id}`) as HTMLInputElement).value)}
                                disabled={contentSaving === item.id}
                                className="w-full h-14 md:h-full min-h-[3.5rem] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                              >
                                {contentSaving === item.id ? <i className="fas fa-spinner fa-spin" /> : <><Save size={18} /> Saxla</>}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

