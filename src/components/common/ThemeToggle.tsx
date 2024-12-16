// components/common/ThemeToggle.tsx
'use client';
import { useState, useEffect } from 'react';
import { setTheme } from '../../lib/theme';

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1] as 'light' | 'dark';
    setCurrentTheme(storedTheme || 'light');
  }, []);

  const toggleTheme = async () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    await setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {currentTheme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    </button>
  );
};

export default ThemeToggle;