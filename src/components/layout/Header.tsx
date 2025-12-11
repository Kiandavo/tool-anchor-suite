import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Search, Home, BookOpen, Calculator, Sparkles, LayoutGrid } from 'lucide-react';
const langarLogo = '/assets/laangar-logo.png';
import { useSearchModal } from '@/hooks/useSearchModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollProgress } from './ScrollProgress';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

const navItems = [
  { label: 'خانه', href: '/', icon: Home },
  { label: 'همه ابزارها', href: '/all-tools', icon: LayoutGrid },
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
      <ScrollProgress />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-background/95 backdrop-blur-xl border-b border-border/40' 
            : 'bg-background/50 backdrop-blur-sm'
        )}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src={langarLogo} 
                alt="لنگر"
                width={120}
                height={40}
                loading="eager"
                fetchPriority="high"
                className="h-10 w-auto"
              />
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
                    className={cn(
                      'relative px-3 py-1.5 rounded-md text-sm transition-colors',
                      active 
                        ? 'text-foreground font-medium' 
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon size={15} className={active ? 'text-primary' : ''} />
                      {item.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <button
                onClick={openSearch}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/60 transition-colors"
              >
                <Search size={16} />
                <span className="hidden sm:inline">جستجو</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-muted rounded border border-border/50">
                  /
                </kbd>
              </button>

              {/* Back Button */}
              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/60 transition-colors"
                >
                  <ArrowRight size={15} />
                  <span>بازگشت</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/60 transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-background border-l border-border lg:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <img 
                  src={langarLogo} 
                  alt="لنگر"
                  width={100}
                  height={36}
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="p-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="flex items-center gap-3 w-full p-3 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors"
                >
                  <Search size={18} />
                  <span className="text-sm">جستجو در ابزارها</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="px-3 py-2">
                <p className="text-xs text-muted-foreground mb-2 px-3">منو</p>
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                          active 
                            ? 'bg-secondary text-foreground font-medium' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                        )}
                      >
                        <Icon size={18} className={active ? 'text-primary' : ''} />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
