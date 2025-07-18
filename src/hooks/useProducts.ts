import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(category?: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = category 
          ? `/api/products?category=${encodeURIComponent(category)}`
          : '/api/products';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // If no products found, try to seed them
        if (data.products.length === 0) {
          try {
            const seedResponse = await fetch('/api/seed', {
              method: 'POST',
            });
            
            if (seedResponse.ok) {
              // Retry fetching products after seeding
              const retryResponse = await fetch(url);
              if (retryResponse.ok) {
                const retryData = await retryResponse.json();
                setProducts(retryData.products);
              } else {
                setProducts([]);
              }
            } else {
              setProducts([]);
            }
          } catch (seedError) {
            console.error('Failed to seed products:', seedError);
            setProducts([]);
          }
        } else {
          setProducts(data.products);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
} 