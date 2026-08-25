import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { SiteContentProvider } from './context/SiteContentContext';
import Layout from './components/layout/Layout';
import Preloader from './components/Preloader';
import AIChatbot from './components/AIChatbot';
import SmoothScroll from './components/ui/SmoothScroll';

// Lazy load pages for Code Splitting
const IndexPage = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Vision = lazy(() => import('./pages/Vision'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Elaqe = lazy(() => import('./pages/Elaqe'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Admin = lazy(() => import('./pages/Admin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

// Fallback loader while downloading chunk
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#030712]">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
  </div>
);

import ErrorBoundary from './components/ErrorBoundary';

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <LayoutShell>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </ErrorBoundary>
      </LayoutShell>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <SiteContentProvider>
          <Preloader />
          <AIChatbot />
          <AppRoutes />
        </SiteContentProvider>
      </SmoothScroll>
    </BrowserRouter>
  );
}
