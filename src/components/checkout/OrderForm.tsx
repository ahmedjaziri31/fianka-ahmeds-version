'use client';

import { useState } from 'react';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShippingAddress } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (shippingAddress: ShippingAddress) => void;
}

export function OrderForm({ isOpen, onClose, onSubmit }: OrderFormProps) {
  const { items, total, getSubtotal, getDiscount, promoCode } = useCartStore();
  
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Le code postal est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">
              Confirmation de commande
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

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Résumé de la commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
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
                          <p className="text-xs text-gray-500">
                            {item.size && `Taille: ${item.size}`}
                            {item.size && item.color && ' • '}
                            {item.color && `Couleur: ${item.color}`}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              Qté: {item.quantity}
                            </span>
                            <span className="text-sm font-medium">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sous-total</span>
                        <span>{formatPrice(getSubtotal())}</span>
                      </div>
                      
                      {getDiscount() > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Remise ({promoCode})</span>
                          <span>-{formatPrice(getDiscount())}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipping Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informations de livraison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Votre prénom"
                            className={errors.firstName ? 'border-red-500' : ''}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Votre nom"
                            className={errors.lastName ? 'border-red-500' : ''}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Votre numéro de téléphone"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="address">Adresse complète *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Votre adresse complète"
                          className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                          <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Ville *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Votre ville"
                            className={errors.city ? 'border-red-500' : ''}
                          />
                          {errors.city && (
                            <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="postalCode">Code postal *</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="Code postal"
                            className={errors.postalCode ? 'border-red-500' : ''}
                          />
                          {errors.postalCode && (
                            <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={onClose}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-gray-800 hover:bg-gray-900"
                        >
                          {isSubmitting ? 'Validation...' : 'Valider la commande'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 