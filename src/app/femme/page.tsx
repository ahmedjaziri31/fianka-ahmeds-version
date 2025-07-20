'use client';

import { CollectionNavigation } from '@/components/layout/CollectionNavigation';
import { ProductCard } from '@/components/products/ProductCard';
import { useState, useEffect } from 'react';
import { Product } from '@/types';

export default function FemmePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch femme products
        const femmeResponse = await fetch('/api/products?category=femme');
        const femmeData = await femmeResponse.json();
        
        // Fetch unisex products
        const unisexResponse = await fetch('/api/products?category=unisexe');
        const unisexData = await unisexResponse.json();
        
        // Combine: all femme products + first unisex product (T-shirt Unisexe)
        const combinedProducts = [
          ...femmeData.products,
          ...(unisexData.products.length > 0 ? [unisexData.products[0]] : [])
        ];
        
        setProducts(combinedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CollectionNavigation activeSection="femme" />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des produits...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CollectionNavigation activeSection="femme" />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-red-600 mb-4">Erreur lors du chargement des produits</p>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CollectionNavigation activeSection="femme" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Collection FEMME
          </h1>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Découvrez notre collection de t-shirts pour femmes, 
            alliant élégance et sophistication dans un style raffiné.
          </p>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucun produit disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 