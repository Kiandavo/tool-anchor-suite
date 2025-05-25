
import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Always use light theme
  const [theme, setTheme] = useState<'light'>('light');

  useEffect(() => {
    // Always apply light theme
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const applyTheme = () => {
    // Always ensure light theme
    document.documentElement.classList.remove('dark');
  };

  return { 
    theme: 'light' as const, 
    setTheme: () => {}, // No-op since we only support light theme
    systemPrefersDark: false 
  };
}
