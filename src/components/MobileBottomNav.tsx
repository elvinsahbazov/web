import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMobileMenu } from '../context/MobileMenuContext';

const navItems = [
  { path: '/', icon: 'fas fa-home', label: 'Əsas' },
  { path: '/xidmetler', icon: 'fas fa-layer-group', label: 'Xidmətlər' },
  { path: '/blog', icon: 'fas fa-newspaper', label: 'Bloq' },
  { path: '/elaqe', icon: 'fas fa-envelope', label: 'Əlaqə' },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { toggle } = useMobileMenu();

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="flex items-center justify-around px-1 h-16 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center flex-1 h-full z-10"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-white/5 rounded-xl mx-1 my-1"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <i 
                  className={`${item.icon} text-lg mb-1 transition-all duration-300 ${
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
          
          <button
            onClick={toggle}
            className="relative flex flex-col items-center justify-center flex-1 h-full z-10"
          >
            <i className="fas fa-bars text-lg mb-1 transition-colors duration-300 text-white/40" />
            <span 
              className="text-[9px] font-bold mt-0.5 transition-colors duration-300 text-white/40"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}
            >
              Menyu
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
