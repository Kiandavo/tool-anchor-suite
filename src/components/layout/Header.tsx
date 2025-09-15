
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Menu, X } from 'lucide-react';
import laangarLogo from '@/assets/laangar-logo.png';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else if (location.pathname.startsWith('/tool/')) {
      const referrer = document.referrer;
      if (referrer && referrer.includes('/category/')) {
        const category = referrer.split('/category/')[1];
        navigate(`/category/${category}`);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const showBackButton = !!backUrl || (location.pathname !== "/" && !backUrl);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-slate-900/20' 
          : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl shadow-slate-900/30'
      }`}>
        {/* Futuristic Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Dynamic Light Beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent animate-pulse-subtle"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-400/20 via-transparent to-transparent animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
          
          {/* Holographic Particles */}
          <div className="absolute top-4 left-1/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-float"></div>
          <div className="absolute top-8 right-1/3 w-0.5 h-0.5 bg-blue-400/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-6 left-2/3 w-0.5 h-0.5 bg-violet-400/50 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Left Side - Tech Status Indicators */}
            <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400 font-mono">SYSTEM ACTIVE</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="w-0.5 h-0.5 bg-violet-400/30 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              </div>
            </div>

            {/* Center - Enhanced Logo Container */}
            <div className="flex-1 flex justify-center lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <Link
                to="/"
                className="relative group"
              >
                {/* Holographic Glow Ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Tech Border Animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-transparent to-blue-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse-subtle"></div>
                
                {/* Logo Container */}
                <div className="relative p-4 rounded-3xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-md border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-500 group-hover:scale-110 shadow-xl">
                  <img 
                    src={laangarLogo} 
                    alt="لنگر" 
                    className="h-12 w-auto filter brightness-110 contrast-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  />
                  {/* Inner Glow */}
                  <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </Link>
            </div>

            {/* Right Side - Control Panel */}
            <div className="flex items-center gap-3">
              <Link
                to="/all-tools"
                className="hidden lg:flex items-center gap-3 px-5 py-3 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl transition-all duration-300 text-sm font-support border border-slate-600/50 hover:border-cyan-400/50 group backdrop-blur-md shadow-lg hover:shadow-xl"
              >
                <span>همه ابزارها</span>
                <div className="w-2 h-2 bg-cyan-400/60 rounded-full group-hover:bg-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
              </Link>

              <Link
                to="/settings"
                className="p-3 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl transition-all duration-300 group backdrop-blur-md border border-slate-600/50 hover:border-violet-400/50 shadow-lg hover:shadow-xl"
                aria-label="تنظیمات"
              >
                <Settings size={20} className="group-hover:rotate-180 transition-transform duration-700 group-hover:text-violet-400" />
              </Link>

              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl transition-all duration-300 text-sm font-support border border-slate-600/50 hover:border-blue-400/50 backdrop-blur-md group shadow-lg hover:shadow-xl"
                >
                  <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform duration-300 group-hover:text-blue-400" />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              )}

              {/* Futuristic Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl transition-all duration-300 z-50 relative backdrop-blur-md border border-slate-600/50 hover:border-cyan-400/50 shadow-lg hover:shadow-xl"
                aria-label="منوی موبایل"
              >
                <div className="relative w-5 h-5">
                  <Menu 
                    size={20} 
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                    }`} 
                  />
                  <X 
                    size={20} 
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Futuristic Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/20 via-transparent via-50% via-transparent to-blue-400/20 blur-sm"></div>
      </header>

      {/* Futuristic Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl overflow-y-auto">
            {/* Tech Grid Overlay for Mobile Menu */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Mobile Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-slate-700/50">
              <h3 className="text-lg font-display text-white flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                منوی اصلی
              </h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="relative p-6 space-y-4">
              <Link
                to="/all-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full p-4 text-center text-cyan-400 font-support bg-slate-800/50 hover:bg-slate-700/60 rounded-2xl transition-all duration-300 border border-slate-600/50 hover:border-cyan-400/50 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                مشاهده همه ابزارها
              </Link>

              {/* Tech Status Display */}
              <div className="mt-8 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">وضعیت سیستم</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-mono">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
