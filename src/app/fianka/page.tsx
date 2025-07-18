'use client';

import { Navigation } from '@/components/layout/Navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function FiankaPage() {
  const { products, loading, error } = useProducts('fianka');

  if (loading) {
    return (
      <div className="min-h-screen bg-dune-light">
        <Navigation />
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
      <div className="min-h-screen bg-dune-light">
        <Navigation />
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
    <div className="min-h-screen bg-dune-light">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-porto mb-8 text-center">
            Collection FIANKA
          </h1>
          <p className="text-paddy text-center mb-12 max-w-2xl mx-auto">
            Notre collection signature, où tradition et modernité se rencontrent 
            pour créer des pièces uniques qui racontent notre histoire.
          </p>
          
          {/* Hero section for Fianka collection */}
          <div className="bg-gradient-to-br from-porto to-paddy text-white rounded-lg p-8 mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Notre Héritage</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Depuis des générations, nous créons des pulls d'exception, 
              alliant savoir-faire traditionnel et innovation contemporaine.
            </p>
            <button className="bg-dune-gold text-dune-light px-6 py-3 rounded-lg hover:bg-dune-gold/90 transition-colors">
              Découvrir l'Histoire
            </button>
          </div>
          
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