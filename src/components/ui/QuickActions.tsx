import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Star, Clock, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      id: 'search',
      label: 'جستجو',
      icon: <Search className="w-4 h-4" />,
      action: () => {
        // Trigger search modal - dispatch custom event
        window.dispatchEvent(new CustomEvent('open-search'));
        setIsOpen(false);
      },
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'popular',
      label: 'ابزارهای محبوب',
      icon: <Star className="w-4 h-4" />,
      action: () => {
        document.getElementById('popular-tools')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      color: 'from-yellow-500 to-amber-500',
    },
    {
      id: 'readings',
      label: 'فال و طالع',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => {
        document.getElementById('readings')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'categories',
      label: 'دسته‌بندی‌ها',
      icon: <Clock className="w-4 h-4" />,
      action: () => {
        navigate('/categories');
        setIsOpen(false);
      },
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/50 backdrop-blur-sm"
            />

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3 items-end"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={action.action}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span className="text-sm font-medium">{action.label}</span>
                  <div className={`p-2 rounded-full bg-gradient-to-r ${action.color} text-white`}>
                    {action.icon}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className={`relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-card border border-border'
            : 'bg-gradient-to-r from-yellow-500 to-amber-500'
        }`}
        aria-label={isOpen ? 'بستن منو' : 'دسترسی سریع'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-full h-full"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};
