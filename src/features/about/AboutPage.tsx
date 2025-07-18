'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 border-pine bg-gradient-to-br from-dune-light to-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-porto">About Fianka</CardTitle>
            <CardDescription className="text-paddy">
              Learn about our architecture and technology stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none text-paddy">
              <h3>Architecture Overview</h3>
              <p>
                Fianka is built with a focus on scalability, maintainability, and developer experience.
                Our architecture follows modern best practices and leverages cutting-edge technologies.
              </p>
              
              <h3>Technology Stack</h3>
              <ul>
                <li><strong>Framework:</strong> Next.js 15 with App Router</li>
                <li><strong>Language:</strong> TypeScript</li>
                <li><strong>Styling:</strong> Tailwind CSS</li>
                <li><strong>Components:</strong> shadcn/ui</li>
                <li><strong>Routing:</strong> TanStack Router</li>
                <li><strong>State Management:</strong> Zustand</li>
              </ul>

              <h3>Project Structure</h3>
              <p>
                The project follows a feature-based architecture where each feature contains its own
                components, state, and logic. This promotes code organization and scalability.
              </p>
            </div>
            
            <div className="mt-6">
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 