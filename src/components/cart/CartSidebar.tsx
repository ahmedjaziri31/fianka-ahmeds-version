'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store';
import { useTranslation } from '@/contexts/LanguageContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

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
    promoMessage, 
    promoValid, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    applyPromoCode, 
    removePromoCode,
    getSubtotal 
  } = useCartStore();

  const { t } = useTranslation();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {t('cart.title')} ({itemCount})
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

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">{t('cart.empty')}</p>
              <Button 
                onClick={onClose}
                className="mt-4"
              >
                {t('cart.continueShopping')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.size && <span>{t('products.size')}: {item.size}</span>}
                      {item.size && item.color && <span> • </span>}
                      {item.color && <span>{t('products.color')}: {item.color}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-600 hover:text-red-700 p-0 h-auto"
                          onClick={() => removeItem(item.id)}
                        >
                          {t('cart.remove')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section - Fixed */}
        {items.length > 0 && (
          <div className="border-t bg-white p-4 space-y-4">
            {/* Promo Code Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('cart.promoCode')}</label>
              
              {promoCode ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">
                        {promoCode}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-700 p-0 h-auto text-xs"
                        onClick={handleRemovePromo}
                      >
                        {t('cart.removePromo')}
                      </Button>
                    </div>
                    {promoMessage && (
                      <p className="text-xs text-green-600 mt-1">{promoMessage}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder={t('cart.enterCode')}
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={!promoInput.trim()}
                  >
                    {t('cart.applyPromo')}
                  </Button>
                </div>
              )}
              
              {promoMessage && !promoValid && (
                <p className="text-xs text-red-600">{promoMessage}</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-2 pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span>{t('cart.subtotal')}</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>{t('cart.discount')} ({promoCode})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>{t('cart.total')}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={onCheckout}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              >
                {t('cart.checkout')}
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  {t('cart.continueShopping')}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  {t('cart.clear')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 