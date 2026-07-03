import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMobileMenu } from '../context/MobileMenuContext';

const navItems = [
  { path: '/', icon: 'fas fa-home', label: 'Əsas' },
  { path: '/haqqimda', icon: 'fas fa-user-tie', label: 'Haqqımda' },
  { path: '/xidmetler', icon: 'fas fa-layer-group', label: 'Xidmətlər' },
  { path: '/vision', icon: 'fas fa-eye', label: 'Rəqəmsal' },
  { path: '/hesablayici', icon: 'fas fa-calculator', label: 'Hesablayıcı' },
  { path: '/blog', icon: 'fas fa-newspaper', label: 'Bloq' },
  { path: '/elaqe', icon: 'fas fa-envelope', label: 'Əlaqə' },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { toggle } = useMobileMenu();

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        <div 
          className="flex items-center h-16 relative overflow-x-auto touch-pan-x snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center h-full z-10 shrink-0 min-w-[72px] snap-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-white/10 rounded-xl mx-1 my-1"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <i 
                  className={`${item.icon} text-[20px] mb-1 transition-all duration-300 ${
                    isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] scale-110' : 'text-white/40'
                  }`} 
                />
                <span 
                  className={`text-[9px] font-bold mt-0.5 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}
                  style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
