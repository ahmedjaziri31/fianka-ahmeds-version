'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingCart, Info, X } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeChart, setShowSizeChart] = useState(false);
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

  const renderSizeSelectionModal = () => {
    if (!showSizeModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Choisir la taille</h3>
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
                <label className="text-sm font-medium text-gray-700">Sélectionner une taille:</label>
                {product.sizeChart && Object.keys(product.sizeChart).length > 0 && (
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    Guide des tailles
                  </button>
                )}
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
                Annuler
              </Button>
              <Button
                onClick={() => handleAddToCart(selectedSize)}
                disabled={!selectedSize || isAdding}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
              >
                {isAdding ? 'Ajout...' : 'Ajouter au panier'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSizeChart = () => {
    if (!product.sizeChart || Object.keys(product.sizeChart).length === 0) {
      return null;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Guide des tailles - {product.name}</h3>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Désignation</th>
                    {Object.keys(product.sizeChart).map(size => (
                      <th key={size} className="border border-gray-300 px-4 py-2 text-center">{size}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Longueur totale</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.longueurTotale}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">1/2 Tour de poitrine</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.tourPoitrine}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">1/2 Tour de bas</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.tourBas}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Largeur épaule à épaule</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.largeurEpaule}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Écart encolure dos</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.ecartEncolure}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Hauteur col</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.hauteurCol}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Longueur manche</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.longueurManche}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">1/2 Bas de manche (poignet)</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.basManche}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">1/2 Tour de biceps</td>
                    {Object.values(product.sizeChart).map((measurements, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {measurements.tourBiceps}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
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
              Rupture de stock
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          {/* Color Display */}
          {product.color && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Couleur: </span>
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
              {isAdding ? 'Ajouté ✓' : 'Ajouter au panier'}
            </Button>
          </div>
        </div>
      </div>

      {/* Size Selection Modal */}
      {renderSizeSelectionModal()}

      {/* Size Chart Modal */}
      {showSizeChart && renderSizeChart()}
    </>
  );
} 