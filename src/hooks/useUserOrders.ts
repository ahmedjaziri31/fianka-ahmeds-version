import { useState, useEffect } from 'react';
import { Order } from '@/types';

interface UseUserOrdersResult {
  orders: Order[];
  orderCount: number;
  loading: boolean;
  error: string | null;
}

export function useUserOrders(userId?: number): UseUserOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/orders?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { 
    orders, 
    orderCount: orders.length, 
    loading, 
    error 
  };
} 
 