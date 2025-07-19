'use client';

import { Button } from '@/components/ui/button';
import { useAppStore, useCartStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { OrderForm } from '@/components/checkout/OrderForm';
import { useRouter } from 'next/navigation';

export function ProfileNavigation() {
  const { user, logout } = useAppStore();
  const { itemCount, clearCart } = useCartStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const router = useRouter();

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
      
      // Show success message or redirect
      alert('Commande créée avec succès!');
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande');
    }
  };

  return (
    <>
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Logo on the left */}
            <div className="flex items-center">
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

            {/* Navigation tabs in center */}
            <div className="flex-1 flex justify-center">
              <nav className="flex items-center space-x-8">
                <Link href="/homme" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  HOMME
                </Link>
                <Link href="/femme" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  FEMME
                </Link>
                <Link href="/unisexe" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  UNISEXE
                </Link>
                <Link href="/fianka" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 px-1">
                  FIANKA
                </Link>
              </nav>
            </div>

            {/* Action icons on the right */}
            <div className="flex items-center space-x-2">
              {/* Search Icon */}
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full">
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

              {/* Profile Icon - Active State */}
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full">
                <User className="h-4 w-4" />
              </Button>
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
    </>
  );
} 
 