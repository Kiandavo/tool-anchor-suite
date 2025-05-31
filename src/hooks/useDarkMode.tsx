
import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Always force light theme
  const [theme] = useState<'light'>('light');

  useEffect(() => {
    console.log('useDarkMode: Enforcing light theme only');
    
    // Always apply light theme
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
    localStorage.setItem('theme', 'light');
    
    console.log('Light theme enforced via useDarkMode hook');
  }, []);

  return { 
    theme: 'light' as const, 
    setTheme: () => {
      console.log('Theme change blocked - locked to light mode');
    },
    systemPrefersDark: false 
  };
}
