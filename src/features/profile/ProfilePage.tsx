'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store';
import { useUserOrders } from '@/hooks/useUserOrders';
import Link from 'next/link';
import { useState } from 'react';
import { Package, Calendar, CreditCard } from 'lucide-react';

export function ProfilePage() {
  const { user, logout } = useAppStore();
  const { orders, orderCount, loading: ordersLoading } = useUserOrders(user?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    if (user) {
      useAppStore.getState().setUser({
        ...user,
        name: formData.name,
        email: formData.email,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}dt`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto border-pine bg-gradient-to-br from-dune-light to-white">
          <CardHeader>
            <CardTitle className="text-porto">Authentication Required</CardTitle>
            <CardDescription className="text-paddy">Please log in to view your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Information */}
        <Card className="border-pine bg-gradient-to-br from-dune-light to-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-porto">Profil Utilisateur</CardTitle>
            <CardDescription className="text-paddy">Gérez vos informations de compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">{user.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                )}
              </div>

              <div>
                <Label>ID Utilisateur</Label>
                <p className="mt-1 text-sm text-muted-foreground">{user.id}</p>
              </div>
            </div>

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Enregistrer</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
                  <Button variant="outline" onClick={logout}>
                    Se déconnecter
                  </Button>
                </>
              )}
            </div>

            <div className="pt-4 border-t">
              <Button asChild variant="ghost">
                <Link href="/">Retour à l'accueil</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Statistics */}
        <Card className="border-pine bg-gradient-to-br from-white to-dune-light">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-porto flex items-center gap-2">
              <Package className="h-5 w-5" />
              Statistiques des Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-porto">
                  {ordersLoading ? '...' : orderCount}
                </div>
                <div className="text-sm text-paddy">Total des Commandes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {ordersLoading ? '...' : orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-paddy">Commandes Livrées</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">
                  {ordersLoading ? '...' : orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length}
                </div>
                <div className="text-sm text-paddy">Commandes En Cours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="border-pine">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-porto flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historique des Commandes
            </CardTitle>
            <CardDescription className="text-paddy">
              Vos {orderCount} commandes récentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="text-gray-600 mt-2">Chargement des commandes...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Aucune commande trouvée</p>
                <Button asChild className="mt-4">
                  <Link href="/">Commencer vos achats</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Commande #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><strong>Articles:</strong> {order.items.length} produit(s)</p>
                      <p><strong>Livraison:</strong> {order.shipping_address.city}</p>
                      {order.promo_code && (
                        <p><strong>Code promo:</strong> {order.promo_code}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 