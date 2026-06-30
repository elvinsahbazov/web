import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SiteContentProvider } from './context/SiteContentContext';
import Layout from './components/layout/Layout';
import Preloader from './components/Preloader';
import IndexPage from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Vision from './pages/Vision';
import Calculator from './pages/Calculator';
import Elaqe from './pages/Elaqe';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import AIChatbot from './components/AIChatbot';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <LayoutShell>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/haqqimda" element={<About />} />
          <Route path="/xidmetler" element={<Services />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/hesablayici" element={<Calculator />} />
          <Route path="/elaqe" element={<Elaqe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </LayoutShell>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteContentProvider>
      <Preloader />
      <AIChatbot />
      <AppRoutes />
          </SiteContentProvider>
    </BrowserRouter>
  );
}
