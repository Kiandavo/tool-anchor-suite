
import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Check for system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Get saved theme or default to 'system'
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'dark' | 'light' | 'system') || 'system';
  });

  useEffect(() => {
    // Apply theme when component mounts or theme changes
    applyTheme(theme);
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const applyTheme = (selectedTheme: string) => {
    if (selectedTheme === 'dark' || (selectedTheme === 'system' && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, setTheme, systemPrefersDark };
}
