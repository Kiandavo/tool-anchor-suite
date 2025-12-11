import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Menu, X, Grid3X3, Search, User, Home, BookOpen, Calculator, Sparkles, Keyboard } from 'lucide-react';
import langarLogo from '@/assets/laangar-logo.png';
import { useSearchModal } from '@/hooks/useSearchModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollProgress } from './ScrollProgress';
import { QuickLaunchBar } from '@/components/ui/QuickLaunchBar';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

const navItems = [
  { label: 'خانه', href: '/', icon: Home },
  { label: 'همه ابزارها', href: '/all-tools', icon: Grid3X3 },
  { label: 'محاسبه‌گر', href: '/category/calculators', icon: Calculator },
  { label: 'فال و طالع', href: '/category/readings', icon: Sparkles },
  { label: 'فرهنگ فارسی', href: '/category/persian-cultural', icon: BookOpen },
];

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openSearch } = useSearchModal();

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
  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Modern Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-border/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={langarLogo} 
                  alt="لنگر"
                  width={120}
                  height={40}
                  loading="eager"
                  fetchPriority="high"
                  className="h-10 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      active 
                        ? 'text-amber-600 dark:text-amber-400' 
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon size={16} />
                      {item.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 rounded-full border border-amber-500/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Launch Bar - Desktop */}
            <QuickLaunchBar className="hidden xl:flex" />

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openSearch}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary/70 rounded-full text-sm text-foreground/70 hover:text-foreground transition-all border border-border/30"
              >
                <Search size={16} />
                <span className="hidden md:inline">جستجو</span>
                <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-background/50 rounded text-xs text-muted-foreground border border-border/50">
                  /
                </kbd>
              </motion.button>


              {/* Keyboard Shortcuts Help */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new CustomEvent('show-shortcuts-help'))}
                className="hidden lg:flex p-2.5 bg-secondary/50 hover:bg-secondary/70 rounded-full text-foreground/70 hover:text-foreground transition-all border border-border/30"
                title="میانبرهای صفحه‌کلید (?)"
              >
                <Keyboard size={18} />
              </motion.button>

              {/* Back Button */}
              {showBackButton && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-3 py-2 bg-secondary/50 hover:bg-secondary/70 rounded-full text-sm text-foreground/70 hover:text-foreground transition-all border border-border/30"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline">بازگشت</span>
                </motion.button>
              )}

              {/* Settings */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/settings"
                  className="p-2.5 bg-secondary/50 hover:bg-secondary/70 rounded-full text-foreground/70 hover:text-foreground transition-all border border-border/30 flex items-center justify-center"
                >
                  <User size={18} />
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 bg-secondary/50 hover:bg-secondary/70 rounded-full text-foreground/70 hover:text-foreground transition-all border border-border/30"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-xl lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-background/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl lg:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <img 
                  src={langarLogo} 
                  alt="لنگر"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-secondary/50 hover:bg-secondary/70 rounded-full"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Search */}
              <div className="p-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:via-amber-500/20 hover:to-orange-500/20 rounded-2xl border border-amber-500/20 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Search size={18} className="text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">جستجو در ابزارها</p>
                    <p className="text-xs text-muted-foreground">یافتن سریع ابزار</p>
                  </div>
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 px-2">منو اصلی</p>
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          active 
                            ? 'bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' 
                            : 'hover:bg-secondary/50'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Settings */}
              <div className="p-4 border-t border-border/30 mt-4">
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-all"
                >
                  <Settings size={20} />
                  <span className="font-medium">تنظیمات</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
