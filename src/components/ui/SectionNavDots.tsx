import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'essential-tools', label: 'ابزارهای ضروری' },
  { id: 'quick-tools', label: 'ابزارهای سریع' },
  { id: 'tools-sections', label: 'همه ابزارها' },
  { id: 'popular-tools', label: 'محبوب‌ترین‌ها' },
  { id: 'persian-cultural', label: 'فرهنگ فارسی' },
  { id: 'readings', label: 'فال و طالع' },
  { id: 'categories', label: 'دسته‌بندی‌ها' },
];

export const SectionNavDots = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Show dots after scrolling past hero
      setIsVisible(window.scrollY > 400);

      // Find active section
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

  if (!isVisible) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {sections.map((section) => (
        <div key={section.id} className="group relative flex items-center">
          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card/95 backdrop-blur-sm border border-border/50 text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none"
          >
            {section.label}
          </motion.span>

          {/* Dot */}
          <button
            onClick={() => scrollToElement(section.id)}
            className="relative p-1"
            aria-label={`Go to ${section.label}`}
          >
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
            {activeSection === section.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full bg-amber-500/20 blur-sm"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </div>
      ))}
    </motion.nav>
  );
};
