'use client';

import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '@/components/ui/loading';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a loading skeleton during SSR and initial hydration
  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return <>{children}</>;
} 