'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Mail } from 'lucide-react';
import { Order } from '@/types';

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export function Invoice({ isOpen, onClose, order }: InvoiceProps) {
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  const handleDownload = () => {
    // Simple download implementation - could be enhanced with PDF generation
    const element = document.getElementById('invoice-content');
    if (element) {
      const printContent = element.innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const handleSendEmail = async () => {
    setIsEmailSending(true);
    setEmailStatus('idle');

    try {
      const response = await fetch('/api/invoice-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: order.id }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus('error');
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 transition-opacity"
      onClick={onClose}
    >
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with actions */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSendEmail}
                disabled={isEmailSending}
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>{isEmailSending ? 'Envoi...' : 'Envoyer par email'}</span>
              </Button>
              
              {emailStatus === 'success' && (
                <span className="text-green-600 text-sm">✅ Email envoyé</span>
              )}
              
              {emailStatus === 'error' && (
                <span className="text-red-600 text-sm">❌ Erreur d'envoi</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Invoice Content */}
          <div id="invoice-content" className="p-8 bg-white">
            {/* Invoice Header */}
            <div className="border-2 border-gray-300 rounded-lg p-8 shadow-sm bg-gradient-to-br from-gray-50 to-white">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Facture</h1>
                <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date:</strong> {formatDate(order.created_at)}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Client:</strong> {order.shipping_address.firstName} {order.shipping_address.lastName}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>E-mail:</strong> {order.shipping_address.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Adresse de livraison:</strong> {order.shipping_address.address}, {order.shipping_address.city} {order.shipping_address.postalCode}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Numéro de commande</p>
                    <p className="text-lg font-bold text-gray-900">#{order.id}</p>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Produits</h2>
                
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Produit</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Taille</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">Quantité</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Prix</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                            {item.product.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                            {item.size || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            {formatPrice(item.product.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Section */}
              <div className="flex justify-end">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-w-[300px]">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sous-total:</span>
                      <span className="font-medium">{formatPrice(order.subtotal)}</span>
                    </div>
                    
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Remise {order.promo_code ? `(${order.promo_code})` : ''}:</span>
                        <span>-{formatPrice(order.discount)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-xl">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Merci pour votre commande ! Votre commande sera traitée dans les plus brefs délais.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    FIANKA - Vêtements de qualité supérieure
                  </p>
                  <p className="text-xs text-gray-500">
                    Contact: welcome@fianka-shop.com | +216 93 94 66 30
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 