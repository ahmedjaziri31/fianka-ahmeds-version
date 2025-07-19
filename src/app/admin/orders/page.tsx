'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Eye, Mail, Calendar, User, Package, MapPin } from 'lucide-react';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  promoCode?: string;
  discount?: number;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sendingInvoice, setSendingInvoice] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvoice = async (orderId: string) => {
    try {
      setSendingInvoice(orderId);
      const response = await fetch('/api/invoice-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        alert('Invoice sent successfully!');
      } else {
        alert('Failed to send invoice');
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Error sending invoice');
    } finally {
      setSendingInvoice(null);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600 mt-2">View and manage all customer orders</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-lg">Loading orders...</div>
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Orders will appear here once customers start placing them.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Orders List */}
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {order.customerName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{formatCurrency(order.total)}</div>
                        {order.discount && (
                          <div className="text-sm text-green-600">
                            -{formatCurrency(order.discount)} ({order.promoCode})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-medium mb-2">Customer Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {order.customerName}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {order.customerEmail}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-4 w-4 text-center">📞</span>
                          {order.customerPhone}
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <div>
                            {order.shippingAddress.street}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                            {order.shippingAddress.country}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <div>
                              <div className="font-medium">{item.productName}</div>
                              <div className="text-gray-600">
                                Size: {item.size}, Color: {item.color}, Qty: {item.quantity}
                              </div>
                            </div>
                            <div className="font-medium">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendInvoice(order.id)}
                      disabled={sendingInvoice === order.id}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {sendingInvoice === order.id ? 'Sending...' : 'Send Invoice'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Order Details #{selectedOrder.id.slice(-8)}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Customer</h3>
                    <div className="text-sm space-y-1">
                      <div>{selectedOrder.customerName}</div>
                      <div>{selectedOrder.customerEmail}</div>
                      <div>{selectedOrder.customerPhone}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="text-sm">
                      {selectedOrder.shippingAddress.street}<br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br />
                      {selectedOrder.shippingAddress.country}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium">Product</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
                          <th className="px-4 py-2 text-right text-sm font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="px-4 py-3">{item.productName}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              Size: {item.size}, Color: {item.color}<br />
                              Quantity: {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-right font-medium">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold">{formatCurrency(selectedOrder.total)}</span>
                  </div>
                  {selectedOrder.discount && (
                    <div className="flex justify-between items-center text-green-600 mt-1">
                      <span>Discount ({selectedOrder.promoCode}):</span>
                      <span>-{formatCurrency(selectedOrder.discount)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 