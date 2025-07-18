'use client';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useAppStore, useCartStore } from '@/store';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { OrderForm } from '@/components/checkout/OrderForm';
import { useRouter } from 'next/navigation';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAppStore();
  const { itemCount, clearCart } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push('/profile');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleOrderSubmit = async (shippingAddress: import('@/types').ShippingAddress) => {
    try {
      const { items, promoCode } = useCartStore.getState();
      
      const orderData = {
        items,
        shipping_address: shippingAddress,
        promo_code: promoCode
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      
      // Clear cart after successful order
      clearCart();
      
      // Close form
      setIsOrderFormOpen(false);
      
      // Show success message or redirect
      alert('Commande créée avec succès!');
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande');
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "border-b border-gray-200 bg-white shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Initial Design - Large Logo with Tabs Below */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          <div className="flex flex-col items-center py-6 md:py-8">
            {/* Large Logo */}
            <Link href="/" className="flex items-center mb-4 md:mb-6">
              <Image
                src="/fianka-logo.gif"
                alt="Fianka Logo"
                width={60}
                height={60}
                className="rounded-lg md:w-20 md:h-20"
              />
            </Link>

            {/* Navigation Tabs and Icons Row */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl space-y-4 md:space-y-0">
              {/* Navigation tabs */}
              <div className="flex-1 flex justify-center">
                <nav className="flex items-center space-x-4 md:space-x-8">
                  <Link href="/homme" className="text-xs md:text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-2 py-2">
                    HOMME
                  </Link>
                  <Link href="/femme" className="text-xs md:text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-2 py-2">
                    FEMME
                  </Link>
                  <Link href="/unisexe" className="text-xs md:text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-2 py-2">
                    UNISEXE
                  </Link>
                  <Link href="/fianka" className="text-xs md:text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-2 py-2">
                    FIANKA
                  </Link>
                </nav>
              </div>

              {/* Action icons on the right */}
              <div className="flex items-center space-x-3 md:space-x-4">
                {/* Search Icon */}
                <Button variant="ghost" size="sm" className="h-8 w-8 md:h-10 md:w-10 p-0 text-white hover:text-dune-gold hover:bg-white/10 rounded-full">
                  <Search className="h-4 w-4 md:h-5 md:w-5" />
                </Button>

                {/* Shopping Cart */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 md:h-10 md:w-10 p-0 text-white hover:text-dune-gold hover:bg-white/10 rounded-full relative"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                  {/* Cart badge */}
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </Button>

                              {/* Profile Icon */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 md:h-10 md:w-10 p-0 text-white hover:text-dune-gold hover:bg-white/10 rounded-full"
                onClick={handleProfileClick}
              >
                <User className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolled Design - Clean Compact Layout */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isScrolled ? "opacity-100 h-12 md:h-14" : "opacity-0 h-0 overflow-hidden"
        )}>
          <div className="flex h-12 md:h-14 items-center justify-between">
            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="flex items-center sm:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                onClick={toggleMobileMenu}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>

            {/* Logo in center on mobile, left on desktop */}
            <div className="flex items-center sm:mr-auto">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/fianka-logo.gif"
                  alt="Fianka Logo"
                  width={32}
                  height={32}
                  className="rounded-lg md:w-10 md:h-10"
                />
              </Link>
            </div>

            {/* Navigation tabs in center - Hidden on mobile */}
            <div className="hidden sm:flex flex-1 justify-center">
              <nav className="flex items-center space-x-4 md:space-x-8">
                <Link href="/homme" className="text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  HOMME
                </Link>
                <Link href="/femme" className="text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  FEMME
                </Link>
                <Link href="/unisexe" className="text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  UNISEXE
                </Link>
                <Link href="/fianka" className="text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  FIANKA
                </Link>
              </nav>
            </div>

            {/* Action icons on the right */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Search Icon */}
              <Button variant="ghost" size="sm" className="h-8 w-8 md:h-9 md:w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>

              {/* Shopping Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 md:h-9 md:w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                {/* Cart badge */}
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-3.5 w-3.5 md:h-4 md:w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Button>

              {/* Profile Icon */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 md:h-9 md:w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                onClick={handleProfileClick}
              >
                <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Side Menu */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out sm:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
              <Image
                src="/fianka-logo.gif"
                alt="Fianka Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              onClick={closeMobileMenu}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-4">
              <Link 
                href="/homme" 
                className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                HOMME
              </Link>
              <Link 
                href="/femme" 
                className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                FEMME
              </Link>
              <Link 
                href="/unisexe" 
                className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                UNISEXE
              </Link>
              <Link 
                href="/fianka" 
                className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                FIANKA
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Fianka
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Order Form */}
      <OrderForm 
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </nav>
  );
} 