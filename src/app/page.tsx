'use client';

import { Navigation } from '@/components/layout/Navigation';
import { HomePage } from '@/features/home/HomePage';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HomePage />
    </div>
  );
}
