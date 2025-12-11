import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Search, ArrowUp, Home } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  icon: React.ReactNode;
}

const shortcuts: Shortcut[] = [
  { keys: ['/', 'Ctrl+K'], description: 'باز کردن جستجو', icon: <Search className="w-4 h-4" /> },
  { keys: ['Home'], description: 'رفتن به بالای صفحه', icon: <Home className="w-4 h-4" /> },
  { keys: ['Esc'], description: 'بستن منوها', icon: <X className="w-4 h-4" /> },
  { keys: ['↑', '↓'], description: 'حرکت بین بخش‌ها', icon: <ArrowUp className="w-4 h-4" /> },
];

export const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle shortcuts modal with ?
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setIsOpen(prev => !prev);
      }
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      // Scroll to top with Home
      if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Help trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-4 z-40 hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-all shadow-sm"
        aria-label="میانبرهای صفحه‌کلید"
      >
        <span className="text-xs font-medium">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Command className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-semibold">میانبرهای صفحه‌کلید</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{shortcut.icon}</span>
                      <span className="text-sm">{shortcut.description}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map((key, i) => (
                        <React.Fragment key={i}>
                          <kbd className="px-2 py-1 text-xs font-medium bg-background border border-border rounded-md shadow-sm">
                            {key}
                          </kbd>
                          {i < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">یا</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                برای نمایش این راهنما، کلید ? را فشار دهید
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
