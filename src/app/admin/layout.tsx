'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Package, Mail, Home } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: Home,
      exact: true
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      icon: Package,
      exact: false
    },
    {
      href: '/admin/newsletter',
      label: 'Newsletter',
      icon: Mail,
      exact: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Fianka Admin
              </Link>
            </div>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? pathname === item.href 
                  : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 