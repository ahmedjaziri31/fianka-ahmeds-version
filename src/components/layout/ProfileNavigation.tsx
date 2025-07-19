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

export function ProfileNavigation() {
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
        user_id: user?.id // Include user ID if logged in
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
      
      // Show invoice instead of alert
      setCurrentOrder(result.order);
      setIsInvoiceOpen(true);
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/fianka-logo.gif"
                  alt="Fianka Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </Link>
            </div>

            {/* Navigation tabs in center - Hidden on mobile */}
            <div className="flex-1 flex justify-center">
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
            </div>

            {/* Icons on the right */}
            <div className="flex items-center space-x-2">
              {/* Search Icon - Hidden on mobile */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex h-9 w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                onClick={handleSearchClick}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Shopping Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-4 w-4" />
                {/* Cart badge */}
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Button>

              {/* Profile Icon - Active State - Hidden on mobile */}
              <Button variant="ghost" size="sm" className="hidden md:flex h-9 w-9 p-0 text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full">
                <User className="h-4 w-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden h-9 w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <Link 
                href="/homme" 
                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                {t('nav.homme')}
              </Link>
              <Link 
                href="/femme" 
                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                {t('nav.femme')}
              </Link>
              <Link 
                href="/unisexe" 
                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                {t('nav.unisexe')}
              </Link>
              <Link 
                href="/" 
                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                {t('nav.fianka')}
              </Link>
              
              {/* Mobile Profile Actions */}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <div className="text-sm font-medium text-gray-900 py-2 px-3">
                  {user?.name || user?.email}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm font-medium py-2 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  Se déconnecter
                </Button>
              </div>
            </div>
          </div>
        )}
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
 