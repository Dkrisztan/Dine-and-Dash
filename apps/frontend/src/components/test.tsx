'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

export default function Test() {
  const getAccessToken = async () => {
    window.location.href = 'http://localhost:3001/auth/google/login';
  };

  return <Button onClick={getAccessToken}>Click me</Button>;
}
