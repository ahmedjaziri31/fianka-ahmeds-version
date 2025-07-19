'use client';

import { Button } from '@/components/ui/button';
import { useAppStore, useCartStore } from '@/store';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { OrderForm } from '@/components/checkout/OrderForm';
import { Invoice } from '@/components/checkout/Invoice';
import { SearchModal } from '@/components/ui/SearchModal';
import { useRouter } from 'next/navigation';
import { Order } from '@/types';
import { cn } from '@/lib/utils';

interface CollectionNavigationProps {
  activeSection?: 'femme' | 'homme' | 'unisexe';
}

export function CollectionNavigation({ activeSection }: CollectionNavigationProps) {
  const { user, logout } = useAppStore();
  const { itemCount, clearCart } = useCartStore();
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
      console.error('Order submission error:', error);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/fianka-logo.gif"
                alt="Fianka"
                width={50}
                height={50}
                className="h-8 w-8 rounded-lg"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Fianka
              </Link>
              <Link
                href="/femme"
                className={cn(
                  "text-gray-700 hover:text-gray-900 transition-colors",
                  activeSection === 'femme' && "font-semibold text-gray-900"
                )}
              >
                {t('nav.femme')}
              </Link>
              <Link
                href="/homme"
                className={cn(
                  "text-gray-700 hover:text-gray-900 transition-colors",
                  activeSection === 'homme' && "font-semibold text-gray-900"
                )}
              >
                {t('nav.homme')}
              </Link>
              <Link
                href="/unisexe"
                className={cn(
                  "text-gray-700 hover:text-gray-900 transition-colors",
                  activeSection === 'unisexe' && "font-semibold text-gray-900"
                )}
              >
                {t('nav.unisexe')}
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex"
                onClick={handleSearchClick}
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCartClick}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>

              {user ? (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{user.firstName}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    {t('auth.logout')}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden md:flex"
                >
                  <User className="h-4 w-4 mr-1" />
                  {t('auth.login')}
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Fianka
                </Link>
                <Link
                  href="/femme"
                  className={cn(
                    "block text-gray-700 hover:text-gray-900 transition-colors",
                    activeSection === 'femme' && "font-semibold text-gray-900"
                  )}
                  onClick={closeMobileMenu}
                >
                  {t('nav.femme')}
                </Link>
                <Link
                  href="/homme"
                  className={cn(
                    "block text-gray-700 hover:text-gray-900 transition-colors",
                    activeSection === 'homme' && "font-semibold text-gray-900"
                  )}
                  onClick={closeMobileMenu}
                >
                  {t('nav.homme')}
                </Link>
                <Link
                  href="/unisexe"
                  className={cn(
                    "block text-gray-700 hover:text-gray-900 transition-colors",
                    activeSection === 'unisexe' && "font-semibold text-gray-900"
                  )}
                  onClick={closeMobileMenu}
                >
                  {t('nav.unisexe')}
                </Link>

                {!user && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      closeMobileMenu();
                    }}
                    className="w-full justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('auth.login')}
                  </Button>
                )}

                {user && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Hello, {user.firstName}</p>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="w-full justify-start"
                    >
                      {t('auth.logout')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Order Form Modal */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onSubmit={handleOrderSubmit}
      />

      {/* Invoice Modal */}
      <Invoice
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={currentOrder}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
