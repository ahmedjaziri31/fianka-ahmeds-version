'use client';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useAppStore, useCartStore } from '@/store';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { OrderForm } from '@/components/checkout/OrderForm';
import { Invoice } from '@/components/checkout/Invoice';
import { SearchModal } from '@/components/ui/SearchModal';
import { useRouter } from 'next/navigation';
import { Order } from '@/types';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAppStore();
  const { itemCount, clearCart } = useCartStore();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const handleSearchClick = () => {
    setIsSearchOpen(true);
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
        promo_code: promoCode,
        user_id: user?.id
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
      
      clearCart();
      setIsOrderFormOpen(false);
      setCurrentOrder(result.order);
      setIsInvoiceOpen(true);
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande');
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled 
            ? "border-b border-gray-200 bg-white shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          {/* Initial Design - Single Horizontal Line */}
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 py-4 md:py-6"
          )}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/fianka-logo.gif"
                  alt="Fianka Logo"
                  width={50}
                  height={50}
                  className="rounded-lg md:w-16 md:h-16"
                />
              </Link>

              {/* Navigation Links - Center */}
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/homme" className="text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-3 py-2">
                  {t('nav.homme')}
                </Link>
                <Link href="/femme" className="text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-3 py-2">
                  {t('nav.femme')}
                </Link>
                <Link href="/unisexe" className="text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-3 py-2">
                  {t('nav.unisexe')}
                </Link>
                <Link href="/" className="text-sm font-medium transition-colors text-white hover:text-dune-gold focus:outline-none px-3 py-2">
                  {t('nav.fianka')}
                </Link>
              </nav>

              {/* Action Icons - Right */}
              <div className="flex items-center space-x-3 md:space-x-4">
                {/* Search Icon */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 md:h-10 md:w-10 p-0 text-white hover:text-dune-gold hover:bg-white/10 rounded-full"
                  onClick={handleSearchClick}
                >
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

                {/* Mobile Menu Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden h-8 w-8 p-0 text-white hover:text-dune-gold hover:bg-white/10 rounded-full"
                  onClick={toggleMobileMenu}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Scrolled Design - Clean Compact Layout */}
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            isScrolled ? "opacity-100 py-3 md:py-4" : "opacity-0 h-0 overflow-hidden"
          )}>
            <div className="flex items-center justify-between w-full">
              {/* Compact Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/fianka-logo.gif"
                  alt="Fianka Logo"
                  width={40}
                  height={40}
                  className="h-8 w-8 rounded-lg md:h-10 md:w-10"
                />
              </Link>

              {/* Compact Navigation */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <Link href="/homme" className="text-sm font-medium transition-colors text-gray-700 hover:text-gray-900 focus:outline-none px-2 py-1">
                  {t('nav.homme')}
                </Link>
                <Link href="/femme" className="text-sm font-medium transition-colors text-gray-700 hover:text-gray-900 focus:outline-none px-2 py-1">
                  {t('nav.femme')}
                </Link>
                <Link href="/unisexe" className="text-sm font-medium transition-colors text-gray-700 hover:text-gray-900 focus:outline-none px-2 py-1">
                  {t('nav.unisexe')}
                </Link>
                <Link href="/" className="text-sm font-medium transition-colors text-gray-700 hover:text-gray-900 focus:outline-none px-2 py-1">
                  {t('nav.fianka')}
                </Link>
              </nav>

              {/* Compact Icons */}
              <div className="flex items-center space-x-1 md:space-x-2">
                {/* Search Icon */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 md:h-9 md:w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                  onClick={handleSearchClick}
                >
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

                {/* Mobile Menu Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden h-8 w-8 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                  onClick={toggleMobileMenu}
                >
                  {isMobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
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
          "fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Image
                src="/fianka-logo.gif"
                alt="Fianka Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMobileMenu}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <div className="space-y-4">
                <Link 
                  href="/homme" 
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                  onClick={closeMobileMenu}
                >
                  {t('nav.homme')}
                </Link>
                <Link 
                  href="/femme" 
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                  onClick={closeMobileMenu}
                >
                  {t('nav.femme')}
                </Link>
                <Link 
                  href="/unisexe" 
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                  onClick={closeMobileMenu}
                >
                  {t('nav.unisexe')}
                </Link>
                <Link 
                  href="/" 
                  className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors py-3 border-b border-gray-100"
                  onClick={closeMobileMenu}
                >
                  {t('nav.fianka')}
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
      </nav>

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

      {/* Invoice */}
      {currentOrder && (
        <Invoice 
          isOpen={isInvoiceOpen}
          onClose={() => {
            setIsInvoiceOpen(false);
            setCurrentOrder(null);
          }}
          order={currentOrder}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
} 