'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      <SunIcon className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <MoonIcon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
