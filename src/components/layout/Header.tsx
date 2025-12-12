import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Search, LayoutGrid, ChevronDown, Calculator, FileText, Image, Calendar, Sparkles, Globe } from 'lucide-react';
const langarLogo = '/assets/laangar-logo.png';
import { useSearchModal } from '@/hooks/useSearchModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollProgress } from './ScrollProgress';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

// Category items for dropdown - using clean URLs
const categoryItems = [
  { label: 'محاسبه‌گرها', href: '/calculators', icon: Calculator },
  { label: 'ابزارهای متنی', href: '/text-tools', icon: FileText },
  { label: 'ابزارهای تصویر', href: '/image-tools', icon: Image },
  { label: 'فرهنگ فارسی', href: '/persian-tools', icon: Calendar },
  { label: 'فال و طالع‌بینی', href: '/readings', icon: Sparkles },
  { label: 'سئو و وب', href: '/seo-tools', icon: Globe },
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
  const isCategoryActive = categoryItems.some(item => location.pathname === item.href);

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
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={langarLogo} 
                alt="لنگر"
                width={200}
                height={64}
                loading="eager"
                // @ts-expect-error - React 18 doesn't fully support fetchpriority yet
                fetchpriority="high"
                className="h-16 w-auto transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* All Tools */}
              <Link
                to="/all-tools"
                className={cn(
                  'relative px-3 py-1.5 rounded-md text-sm transition-colors',
                  isActive('/all-tools') 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="flex items-center gap-1.5">
                  <LayoutGrid size={15} className={isActive('/all-tools') ? 'text-primary' : ''} />
                  همه ابزارها
                </span>
                {isActive('/all-tools') && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'relative flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors',
                      isCategoryActive 
                        ? 'text-foreground font-medium' 
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span>دسته‌بندی‌ها</span>
                    <ChevronDown size={14} />
                    {isCategoryActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg z-[100]">
                  {categoryItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 cursor-pointer',
                            active && 'bg-secondary font-medium'
                          )}
                        >
                          <Icon size={16} className={active ? 'text-primary' : 'text-muted-foreground'} />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
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
              className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-background border-l border-border lg:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <img 
                  src={langarLogo} 
                  alt="لنگر"
                  width={140}
                  height={48}
                  className="h-12 w-auto"
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

              {/* All Tools Link */}
              <div className="px-3 py-2">
                <Link
                  to="/all-tools"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                    isActive('/all-tools') 
                      ? 'bg-secondary text-foreground font-medium' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  )}
                >
                  <LayoutGrid size={18} className={isActive('/all-tools') ? 'text-primary' : ''} />
                  <span>همه ابزارها</span>
                </Link>
              </div>

              {/* Categories Section */}
              <div className="px-3 py-2">
                <p className="text-xs text-muted-foreground mb-2 px-3">دسته‌بندی‌ها</p>
                {categoryItems.map((item, index) => {
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
