
import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Always use light theme
  const [theme, setTheme] = useState<'light'>('light');

  useEffect(() => {
    console.log('useDarkMode: Forcing light theme');
    
    // Always apply light theme
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    localStorage.setItem('theme', 'light');
    
    console.log('Light theme applied via useDarkMode hook');
  }, []);

  const applyTheme = () => {
    // Always ensure light theme
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    console.log('Light theme re-applied');
  };

  // Call applyTheme on mount
  useEffect(() => {
    applyTheme();
  }, []);

  return { 
    theme: 'light' as const, 
    setTheme: () => {
      console.log('Theme change requested but locked to light mode');
    }, // No-op since we only support light theme
    systemPrefersDark: false 
  };
}
