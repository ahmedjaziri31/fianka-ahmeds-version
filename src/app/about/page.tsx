'use client';

import { Navigation } from '@/components/layout/Navigation';
import { AboutPage } from '@/features/about/AboutPage';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AboutPage />
    </div>
  );
} 