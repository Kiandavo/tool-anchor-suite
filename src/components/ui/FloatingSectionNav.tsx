import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'essential-tools', label: 'ضروری' },
  { id: 'quick-tools', label: 'سریع' },
  { id: 'tools-sections', label: 'ابزارها' },
  { id: 'popular-tools', label: 'محبوب' },
  { id: 'persian-cultural', label: 'فرهنگی' },
  { id: 'readings', label: 'فال' },
  { id: 'categories', label: 'دسته‌ها' },
];

export const FloatingSectionNav = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToElement, scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2 py-2 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg"
        >
          <div className="flex items-center gap-1">
            {/* Back to top button */}
            <button
              onClick={() => scrollToTop()}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="بازگشت به بالا"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-border/50 mx-1" />

            {/* Section buttons */}
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToElement(section.id)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  activeSection === section.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={`رفتن به ${section.label}`}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
