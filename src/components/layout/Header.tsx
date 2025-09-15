
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Home, Menu, X, Calculator, Type, Sparkles, Wrench, ChevronDown } from 'lucide-react';
import logoSvg from '@/assets/logo.svg';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(null);

  const mainCategories = [
    { 
      id: 'calculators', 
      name: 'محاسبات', 
      icon: Calculator,
      subcategories: ['calculator', 'utility']
    },
    { 
      id: 'text-image', 
      name: 'متن و تصویر', 
      icon: Type,
      subcategories: ['text', 'image', 'design']
    },
    { 
      id: 'persian-culture', 
      name: 'فرهنگ پارسی', 
      icon: Sparkles,
      subcategories: ['persian-cultural', 'readings']
    },
    { 
      id: 'tools', 
      name: 'سایر ابزارها', 
      icon: Wrench,
      subcategories: ['productivity', 'educational', 'random']
    }
  ];

  const handleMouseEnter = (categoryId: string) => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
      setDropdownTimer(null);
    }
    setOpenDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setOpenDropdown(null);
    }, 800); // Increased delay to 800ms
    setDropdownTimer(timer);
  };

  const handleDropdownClick = (categoryId: string) => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);  
      setDropdownTimer(null);
    }
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  const handleMenuItemClick = () => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
      setDropdownTimer(null);
    }
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  const categoryLabels: Record<string, string> = {
    calculator: 'ماشین‌حساب',
    text: 'متن',
    image: 'تصویر',
    design: 'طراحی',
    utility: 'ابزار کاربردی',
    'persian-cultural': 'فرهنگ پارسی',
    readings: 'فال و خواندنی',
    productivity: 'بهره‌وری',
    educational: 'آموزشی',
    random: 'تصادفی'
  };

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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/95 backdrop-blur-md border-b border-primary/20 shadow-lg' 
          : 'bg-primary border-b border-primary/30 shadow-md'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Centered on Mobile, Left on Desktop */}
            <div className="flex-1 lg:flex-none">
              <Link
                to="/"
                className="flex items-center justify-center lg:justify-start text-white hover:text-primary-foreground/90 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mr-3 shadow-lg backdrop-blur-sm border border-white/20">
                  <span className="text-lg font-bold text-white">ل</span>
                </div>
                <span className="text-heading-md font-display bg-gradient-to-r from-white to-primary-foreground/90 bg-clip-text text-transparent smooth-fonts">لنگر</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainCategories.map((category) => (
                <div key={category.id} className="relative group">
                  <button
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownClick(category.id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium group"
                  >
                    <category.icon size={16} className="group-hover:scale-110 transition-transform" />
                    <span>{category.name}</span>
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === category.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openDropdown === category.id && (
                    <div 
                      className="absolute top-full left-0 pt-2 z-50"
                      onMouseEnter={() => handleMouseEnter(category.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white shadow-2xl border border-gray-200 rounded-lg min-w-48 overflow-hidden">
                        {category.subcategories.map((subcat) => (
                          <Link
                            key={subcat}
                            to={`/category/${subcat}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMenuItemClick();
                            }}
                            className="block px-4 py-3 text-gray-800 hover:bg-primary/10 hover:text-primary transition-colors text-sm first:rounded-t-lg last:rounded-b-lg"
                          >
                            {categoryLabels[subcat]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/all-tools"
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium mr-2 border border-white/20"
              >
                همه ابزارها
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/settings"
                className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                aria-label="تنظیمات"
              >
                <Settings size={20} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>

              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-sm font-medium border border-white/20"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="منوی موبایل"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-primary/98 backdrop-blur-md border-b border-primary/20 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4 mb-6">
                {mainCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center gap-3 p-3 text-white font-medium bg-white/10 rounded-xl">
                      <category.icon size={20} />
                      <span>{category.name}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pr-8">
                      {category.subcategories.map((subcat) => (
                        <Link
                          key={subcat}
                          to={`/category/${subcat}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 text-sm"
                        >
                          {categoryLabels[subcat]}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/all-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full p-4 text-center text-white font-medium bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
              >
                مشاهده همه ابزارها
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
