import Navbar from '../Navbar';
import Footer from '../Footer';
import CommandMenu from '../CommandMenu';
import MobileBottomNav from '../MobileBottomNav';
import { MobileMenuProvider } from '../../context/MobileMenuContext';
import ParticleGalaxy from '../ParticleGalaxy';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <MobileMenuProvider>
      <div className="layout-shell relative min-h-screen bg-[#030712] text-white antialiased">
        {/* GLOBAL PREMIUM BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <ParticleGalaxy />
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] h-[700px] w-[700px] animate-blob rounded-full bg-blue-600/40 blur-[100px]" />
            <div className="animation-delay-2000 absolute top-[10%] right-[-10%] h-[700px] w-[700px] animate-blob rounded-full bg-indigo-600/30 blur-[100px]" />
            <div className="animation-delay-4000 absolute bottom-[-20%] left-[20%] h-[800px] w-[800px] animate-blob rounded-full bg-purple-600/30 blur-[120px]" />
          </div>
          <div className="vercel-grid absolute inset-0 opacity-[0.15]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_100%)] opacity-80" />
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <CommandMenu />
        <main className="relative overflow-x-hidden pb-16 md:pb-0 flex-grow">{children}</main>
        <Footer />
        <MobileBottomNav />
        </div>
      </div>
    </MobileMenuProvider>
  );
}
