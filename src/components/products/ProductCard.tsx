'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store';
import { useTranslation } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { SizeGuide } from '@/components/ui/SizeGuide';
import Image from 'next/image';
import { ShoppingCart, Info, X } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const handleAddToCartClick = () => {
    if (product.availableSizes && product.availableSizes.length > 0) {
      setShowSizeModal(true);
    } else {
      // If no sizes available, add directly
      handleAddToCart('');
    }
  };

  const handleAddToCart = async (size: string) => {
    setIsAdding(true);
    
    try {
      addItem(product, 1, size, product.color);
      
      // Close modal and reset
      setShowSizeModal(false);
      setSelectedSize('');
      
      // Show brief feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  // Function to get translated product description
  const getTranslatedDescription = (product: Product) => {
    // Map product names to translation keys
    const descriptionMap: Record<string, string> = {
      'T-shirt Unisexe': 'products.descriptions.tshirtUnisex',
      'Pull Homme Blue': 'products.descriptions.sweaterHomme',
      'Pull Homme Vanille': 'products.descriptions.sweaterHomme',
      'Pull Femme Élégant': 'products.descriptions.dressFemme',
      'Pull Fianka': 'products.descriptions.jacketFianka',
    };

    const translationKey = descriptionMap[product.name];
    if (translationKey) {
      return t(translationKey);
    }

    // Fallback to default description or original description
    return product.description || t('products.descriptions.defaultDescription');
  };

  // Function to determine product category for size guide
  const getProductCategory = (product: Product): 'homme' | 'femme' | 'unisexe' => {
    if (product.category) {
      return product.category as 'homme' | 'femme' | 'unisexe';
    }
    
    // Fallback based on product name
    const name = product.name.toLowerCase();
    if (name.includes('homme') || name.includes('men')) return 'homme';
    if (name.includes('femme') || name.includes('women')) return 'femme';
    return 'unisexe';
  };

  const renderSizeSelectionModal = () => {
    if (!showSizeModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('products.selectSize')}</h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Product Info */}
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-20 mr-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.color}</p>
                <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">{t('products.selectSize')}:</label>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                >
                  <Info className="w-3 h-3 mr-1" />
                  {t('products.sizeChart')}
                </button>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {product.availableSizes?.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-md text-center font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowSizeModal(false)}
                variant="outline"
                className="flex-1"
              >
                {t('general.cancel')}
              </Button>
              <Button
                onClick={() => handleAddToCart(selectedSize)}
                disabled={!selectedSize || isAdding}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
              >
                {isAdding ? t('general.loading') : t('products.addToCart')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
              Plus que {product.stock} en stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              {t('products.outOfStock')}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{getTranslatedDescription(product)}</p>
          
          {/* Color Display */}
          {product.color && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">{t('products.color')}: </span>
              <span className="text-sm font-medium text-gray-800">{product.color}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <Button
              onClick={handleAddToCartClick}
              disabled={isAdding || product.stock === 0}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              {isAdding ? t('general.loading') : t('products.addToCart')}
            </Button>
          </div>
        </div>
      </div>

      {/* Size Selection Modal */}
      {renderSizeSelectionModal()}

      {/* Size Guide Modal */}
      <SizeGuide 
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={getProductCategory(product)}
        productName={product.name}
      />
    </>
  );
} 