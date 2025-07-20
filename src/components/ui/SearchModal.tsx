'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search, Loader2 } from 'lucide-react';
import { Product } from '@/types';
import Image from 'next/image';
import { useTranslation } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await response.json();
      
      if (response.ok) {
        setResults(data.products || []);
      } else {
        console.error('Search error:', data.error);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  const handleProductClick = (product: Product) => {
    onClose();
    // Navigate to the appropriate category page based on product category
    let categoryPath = '/';
    switch (product.category) {
      case 'homme':
        categoryPath = '/homme';
        break;
      case 'femme':
        categoryPath = '/femme';
        break;
      case 'unisexe':
        categoryPath = '/unisexe';
        break;
      case 'fianka':
        categoryPath = '/';
        break;
      default:
        categoryPath = '/';
    }
    router.push(categoryPath);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 transition-opacity"
      onClick={onClose}
    >
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600">Recherche en cours...</span>
              </div>
            )}

            {!loading && hasSearched && results.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">Aucun produit trouvé</p>
                <p className="text-gray-400 text-sm">
                  Essayez avec d'autres mots-clés
                </p>
              </div>
            )}

            {!loading && !hasSearched && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">Rechercher des produits</p>
                <p className="text-gray-400 text-sm">
                  Tapez pour commencer votre recherche
                </p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  {results.length} produit{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                </p>
                <div className="space-y-3">
                  {results.map((product) => (
                    <Button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      variant="ghost"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left h-auto justify-start"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 