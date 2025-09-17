import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    const applyTheme = (currentTheme: Theme) => {
      // Remove existing theme classes
      root.classList.remove('dark', 'light');
      body.classList.remove('dark', 'light');
      
      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        body.classList.add(systemTheme);
        root.setAttribute('data-theme', systemTheme);
      } else {
        root.classList.add(currentTheme);
        body.classList.add(currentTheme);
        root.setAttribute('data-theme', currentTheme);
      }
      
      // Force re-render of all components
      window.dispatchEvent(new Event('themechange'));
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, setTheme };
};