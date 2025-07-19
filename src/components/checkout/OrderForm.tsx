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
    // Apply formatting and validation based on field type
    let formattedValue = value;
    
    // Phone number formatting and validation
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, '');
      
      // Limit to 8 digits for Tunisian phone numbers
      if (numericValue.length <= 8) {
        formattedValue = numericValue;
      } else {
        return; // Don't update if more than 8 digits
      }
    }
    
    // Postal code formatting
    if (field === 'postalCode') {
      // Remove all non-numeric characters and limit to 4 digits
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 4) {
        formattedValue = numericValue;
      } else {
        return; // Don't update if more than 4 digits
      }
    }
    
    // Name fields - only letters and spaces
    if (field === 'firstName' || field === 'lastName') {
      // Allow only letters, spaces, hyphens, and apostrophes
      if (!/^[a-zA-ZÀ-ÿ\s\-']*$/.test(value)) {
        return; // Don't update if invalid characters
      }
      formattedValue = value;
    }
    
    // City field - only letters and spaces
    if (field === 'city') {
      // Allow only letters, spaces, hyphens, and apostrophes
      if (!/^[a-zA-ZÀ-ÿ\s\-']*$/.test(value)) {
        return; // Don't update if invalid characters
      }
      formattedValue = value;
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Real-time validation
    validateField(field, formattedValue);
  };

  const validateField = (field: keyof ShippingAddress, value: string) => {
    let error = '';
    
    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          error = 'Le prénom est requis';
        } else if (value.trim().length < 2) {
          error = 'Le prénom doit contenir au moins 2 caractères';
        }
        break;
        
      case 'lastName':
        if (!value.trim()) {
          error = 'Le nom est requis';
        } else if (value.trim().length < 2) {
          error = 'Le nom doit contenir au moins 2 caractères';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format d\'email invalide (ex: nom@example.com)';
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          error = 'Le téléphone est requis';
        } else if (value.length !== 8) {
          error = 'Le numéro doit contenir exactement 8 chiffres';
        } else if (!/^[2-9]/.test(value)) {
          error = 'Le numéro doit commencer par 2, 3, 4, 5, 7, 9';
        }
        break;
        
      case 'address':
        if (!value.trim()) {
          error = 'L\'adresse est requise';
        } else if (value.trim().length < 10) {
          error = 'L\'adresse doit être plus détaillée (min. 10 caractères)';
        }
        break;
        
      case 'city':
        if (!value.trim()) {
          error = 'La ville est requise';
        } else if (value.trim().length < 2) {
          error = 'Le nom de la ville doit contenir au moins 2 caractères';
        }
        break;
        
      case 'postalCode':
        if (!value.trim()) {
          error = 'Le code postal est requis';
        } else if (value.length !== 4) {
          error = 'Le code postal doit contenir exactement 4 chiffres';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};

    // Validate all fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide (ex: nom@example.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (formData.phone.length !== 8) {
      newErrors.phone = 'Le numéro doit contenir exactement 8 chiffres';
    } else if (!/^[2-9]/.test(formData.phone)) {
      newErrors.phone = 'Le numéro doit commencer par 2, 3, 4, 5, 7, 9';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'L\'adresse doit être plus détaillée (min. 10 caractères)';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'Le nom de la ville doit contenir au moins 2 caractères';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (formData.postalCode.length !== 4) {
      newErrors.postalCode = 'Le code postal doit contenir exactement 4 chiffres';
    }

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
                            placeholder="Ex: Ahmed, Fatima"
                            className={errors.firstName ? 'border-red-500' : formData.firstName && !errors.firstName ? 'border-green-500' : ''}
                            maxLength={50}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                          )}
                          {formData.firstName && !errors.firstName && (
                            <p className="text-sm text-green-600 mt-1">✓ Prénom valide</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Ex: Ben Ali, Trabelsi"
                            className={errors.lastName ? 'border-red-500' : formData.lastName && !errors.lastName ? 'border-green-500' : ''}
                            maxLength={50}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                          )}
                          {formData.lastName && !errors.lastName && (
                            <p className="text-sm text-green-600 mt-1">✓ Nom valide</p>
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
                          placeholder="exemple@email.com"
                          className={errors.email ? 'border-red-500' : formData.email && !errors.email ? 'border-green-500' : ''}
                          maxLength={100}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                        {formData.email && !errors.email && (
                          <p className="text-sm text-green-600 mt-1">✓ Email valide</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Téléphone * <span className="text-xs text-gray-500">(8 chiffres)</span></Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">+216</span>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="12345678"
                            className={`pl-14 ${errors.phone ? 'border-red-500' : formData.phone && !errors.phone ? 'border-green-500' : ''}`}
                            maxLength={8}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                        )}
                        {formData.phone && !errors.phone && (
                          <p className="text-sm text-green-600 mt-1">✓ Numéro valide (+216 {formData.phone})</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Format: 8 chiffres (ex: 20123456, 98765432)</p>
                      </div>

                      <div>
                        <Label htmlFor="address">Adresse complète * <span className="text-xs text-gray-500">(min. 10 caractères)</span></Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Ex: 15 Rue de la République, Appartement 3"
                          className={errors.address ? 'border-red-500' : formData.address && !errors.address ? 'border-green-500' : ''}
                          maxLength={200}
                        />
                        {errors.address && (
                          <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                        )}
                        {formData.address && !errors.address && (
                          <p className="text-sm text-green-600 mt-1">✓ Adresse valide</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Ville *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Ex: Tunis, Sfax, Sousse"
                            className={errors.city ? 'border-red-500' : formData.city && !errors.city ? 'border-green-500' : ''}
                            maxLength={50}
                          />
                          {errors.city && (
                            <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                          )}
                          {formData.city && !errors.city && (
                            <p className="text-sm text-green-600 mt-1">✓ Ville valide</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="postalCode">Code postal * <span className="text-xs text-gray-500">(4 chiffres)</span></Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="1000"
                            className={errors.postalCode ? 'border-red-500' : formData.postalCode && !errors.postalCode ? 'border-green-500' : ''}
                            maxLength={4}
                          />
                          {errors.postalCode && (
                            <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
                          )}
                          {formData.postalCode && !errors.postalCode && (
                            <p className="text-sm text-green-600 mt-1">✓ Code postal valide</p>
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