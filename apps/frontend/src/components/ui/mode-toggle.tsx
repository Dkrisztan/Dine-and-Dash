'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      {resolvedTheme === 'light' ? <SunIcon className='h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100' /> : <MoonIcon className='h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
