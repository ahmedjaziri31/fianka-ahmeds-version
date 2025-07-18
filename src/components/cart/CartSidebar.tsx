'use client';

import { useCartStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const {
    items,
    total,
    itemCount,
    promoCode,
    discount,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
    getSubtotal,
    getDiscount
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoError('Veuillez entrer un code promo');
      return;
    }

    const oldDiscount = getDiscount();
    applyPromoCode(promoInput.trim());
    
    // Check if promo code was applied successfully
    const newDiscount = getDiscount();
    if (newDiscount === oldDiscount && oldDiscount === 0) {
      setPromoError('Code promo invalide');
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoError('');
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Panier ({itemCount})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-500 mb-6">
              Ajoutez des articles pour commencer vos achats
            </p>
            <Button onClick={onClose} className="bg-gray-800 hover:bg-gray-900">
              Continuer vos achats
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.size && `Taille: ${item.size}`}
                      {item.size && item.color && ' • '}
                      {item.color && `Couleur: ${item.color}`}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section - Fixed */}
            <div className="flex-shrink-0 border-t bg-white">
              {/* Promo Code Section */}
              <div className="p-4 border-b">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Code promo
                  </label>
                  {promoCode ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                      <span className="text-sm text-green-700 font-medium">
                        {promoCode}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemovePromo}
                        className="ml-auto text-red-600 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Entrez votre code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={!promoInput.trim()}
                        className="px-4"
                      >
                        Appliquer
                      </Button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-sm text-red-600">{promoError}</p>
                  )}
                </div>
              </div>

              {/* Order Summary & Checkout */}
              <div className="p-4 bg-gray-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Remise</span>
                      <span>-{formatPrice(getDiscount())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={onCheckout}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 text-base"
                  disabled={items.length === 0}
                >
                  Procéder au paiement
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
} 