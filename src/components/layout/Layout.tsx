import Navbar from '../Navbar';
import Footer from '../Footer';
import CommandMenu from '../CommandMenu';
import MobileBottomNav from '../MobileBottomNav';
import { MobileMenuProvider } from '../../context/MobileMenuContext';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <MobileMenuProvider>
      <div className="layout-shell relative min-h-screen bg-black text-white antialiased">
        <Navbar />
        <CommandMenu />
        <main className="relative overflow-x-hidden pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </div>
    </MobileMenuProvider>
  );
}
