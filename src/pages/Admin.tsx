import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'blog' | 'services' | 'portfolio' | 'pages'>('blog');
  

  // Site Content State
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [contentSaving, setContentSaving] = useState<string | null>(null);

  // Blog State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  // Services State
  const [srvTitle, setSrvTitle] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvIcon, setSrvIcon] = useState('fas fa-star');
  const [services, setServices] = useState<any[]>([]);

  // Portfolio State
  const [portTitle, setPortTitle] = useState('');
  const [portImage, setPortImage] = useState('');
  const [portLink, setPortLink] = useState('');
  const [portfolio, setPortfolio] = useState<any[]>([]);

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth, activeTab]);

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
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setAuth(true);
    else alert('Yanlış şifrə!');
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('posts').insert([{ title, slug, content, cover_image: coverImage, published: true }]);
    if (error) alert('Xəta: ' + error.message);
    else { alert('Uğurlu!'); setTitle(''); setSlug(''); setContent(''); setCoverImage(''); fetchData(); }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('services').insert([{ title: srvTitle, description: srvDesc, icon: srvIcon, published: true }]);
    if (error) alert('Xəta: ' + error.message);
    else { alert('Uğurlu!'); setSrvTitle(''); setSrvDesc(''); fetchData(); }
  };

  const handleCreatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('portfolio').insert([{ title: portTitle, image_url: portImage, link_url: portLink, published: true }]);
    if (error) alert('Xəta: ' + error.message);
    else { alert('Uğurlu!'); setPortTitle(''); setPortImage(''); setPortLink(''); fetchData(); }
  };


  const handleSaveContent = async (id: string, value: string) => {
    setContentSaving(id);
    const { error } = await supabase.from('site_content').update({ value }).eq('id', id);
    if (error) alert('Xəta: ' + error.message);
    else {
      alert('Yadda saxlanıldı!');
      fetchData();
    }
    setContentSaving(null);
  };

  const handleDelete = async (table: string, id: string) => {
    if(confirm('Silmək istədiyinizə əminsiniz?')) {
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-20">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-lg border border-black/5 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
          <input type="password" placeholder="Şifrə (admin123)" className="w-full px-4 py-3 rounded-xl border mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl">Daxil ol</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <Container>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-black">Qlobal Admin Dashboard</h1>
          <button onClick={() => setAuth(false)} className="text-sm font-semibold text-red-500">Çıxış</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('blog')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'blog' ? 'bg-primary text-white' : 'bg-white text-black/60'}`}>Bloq</button>
          <button onClick={() => setActiveTab('services')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'services' ? 'bg-primary text-white' : 'bg-white text-black/60'}`}>Xidmətlər</button>
          <button onClick={() => setActiveTab('portfolio')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'portfolio' ? 'bg-primary text-white' : 'bg-white text-black/60'}`}>Portfolio</button>
          <button onClick={() => setActiveTab('pages')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'pages' ? 'bg-primary text-white' : 'bg-white text-black/60'}`}>Səhifə Məzmunu</button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* CREATE FORM */}
          {activeTab !== 'pages' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
            <h2 className="text-xl font-bold mb-6">Yeni Əlavə Et</h2>
            
            {activeTab === 'blog' && (
              <form onSubmit={handleCreateBlog} className="space-y-4">
                <input type="text" placeholder="Başlıq" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <input type="text" placeholder="Slug (url)" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <input type="text" placeholder="Şəkil URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <textarea rows={6} placeholder="Məzmun (HTML)" required value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl">Paylaş</button>
              </form>
            )}

            {activeTab === 'services' && (
              <form onSubmit={handleCreateService} className="space-y-4">
                <input type="text" placeholder="Xidmət Adı" required value={srvTitle} onChange={(e) => setSrvTitle(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <input type="text" placeholder="İkona (məs: fas fa-rocket)" required value={srvIcon} onChange={(e) => setSrvIcon(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <textarea rows={4} placeholder="Açıqlama" required value={srvDesc} onChange={(e) => setSrvDesc(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl">Əlavə et</button>
              </form>
            )}

            {activeTab === 'portfolio' && (
              <form onSubmit={handleCreatePortfolio} className="space-y-4">
                <input type="text" placeholder="Layihə Adı" required value={portTitle} onChange={(e) => setPortTitle(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <input type="text" placeholder="Şəkil URL" required value={portImage} onChange={(e) => setPortImage(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <input type="text" placeholder="Link URL" value={portLink} onChange={(e) => setPortLink(e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
                <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl">Əlavə et</button>
              </form>
            )}
          </div>
          )}

          {/* LIST */}
          {activeTab !== 'pages' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
            <h2 className="text-xl font-bold mb-6">Mövcud Siyahı</h2>
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {activeTab === 'blog' && posts.map(item => (
                <div key={item.id} className="flex justify-between p-4 border rounded-xl items-center"><span className="font-bold text-sm">{item.title}</span><button onClick={()=>handleDelete('posts', item.id)} className="text-red-500 font-bold">Sil</button></div>
              ))}
              {activeTab === 'services' && services.map(item => (
                <div key={item.id} className="flex justify-between p-4 border rounded-xl items-center"><span className="font-bold text-sm">{item.title}</span><button onClick={()=>handleDelete('services', item.id)} className="text-red-500 font-bold">Sil</button></div>
              ))}
              {activeTab === 'portfolio' && portfolio.map(item => (
                <div key={item.id} className="flex justify-between p-4 border rounded-xl items-center"><span className="font-bold text-sm">{item.title}</span><button onClick={()=>handleDelete('portfolio', item.id)} className="text-red-500 font-bold">Sil</button></div>
              ))}
            </div>
          </div>
          )}
            {activeTab === 'pages' && (
              <div className="space-y-8 col-span-1 lg:col-span-2">
                {['hero', 'about', 'services', 'vision', 'contact', 'footer'].map(section => {
                  const sectionItems = siteContent.filter(item => item.section === section);
                  if(sectionItems.length === 0) return null;
                  return (
                    <div key={section} className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
                      <h2 className="text-2xl font-bold mb-6 capitalize">{section} Bölməsi</h2>
                      <div className="space-y-6">
                        {sectionItems.map(item => (
                          <div key={item.id} className="flex flex-col gap-2">
                            <label className="font-bold text-sm text-gray-700">{item.label}</label>
                            <div className="flex gap-4">
                              {item.type === 'textarea' ? (
                                <textarea rows={4} defaultValue={item.value} id={`input-${item.id}`} className="w-full px-4 py-2 border rounded-xl" />
                              ) : (
                                <input type="text" defaultValue={item.value} id={`input-${item.id}`} className="w-full px-4 py-2 border rounded-xl" />
                              )}
                              <button 
                                onClick={() => handleSaveContent(item.id, (document.getElementById(`input-${item.id}`) as HTMLInputElement).value)}
                                disabled={contentSaving === item.id}
                                className="px-6 py-2 bg-primary text-white font-bold rounded-xl whitespace-nowrap"
                              >
                                {contentSaving === item.id ? '...' : 'Yadda Saxla'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}


        </div>
      </Container>
    </div>
  );
}
