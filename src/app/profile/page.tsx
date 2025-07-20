'use client';

import { useAppStore } from '@/store';
import { useUserOrders } from '@/hooks/useUserOrders';
import { Button } from '@/components/ui/button';
import { ProfileNavigation } from '@/components/layout/ProfileNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAppStore();
  const { orders, orderCount, loading: ordersLoading } = useUserOrders(user?.id);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <ProfileNavigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-[#8B7355] rounded-full flex items-center justify-center text-white text-2xl font-medium mr-4">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-light text-gray-800">
                {user.name || 'Utilisateur'}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-light text-gray-800 mb-2">
                {ordersLoading ? '...' : orderCount}
              </div>
              <div className="text-gray-600">Total des Commandes</div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-light text-gray-800 mb-6">
              INFORMATIONS PERSONNELLES
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Nom d&apos;utilisateur:</span>
                <span className="text-gray-800">{user.name || 'Non renseigné'}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Adresse e-mail:</span>
                <span className="text-gray-800">{user.email}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Date de naissance:</span>
                <span className="text-gray-800">{user.birth_date || 'Non renseigné'}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Genre:</span>
                <span className="text-gray-800">{user.gender || 'Non renseigné'}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Ville:</span>
                <span className="text-gray-800">{user.city || 'Non renseigné'}</span>
              </div>
            </div>
          </div>

          {/* Order History Summary */}
          {!ordersLoading && orderCount > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h2 className="text-xl font-light text-gray-800 mb-4">
                HISTORIQUE DES COMMANDES
              </h2>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <span className="text-sm text-gray-600">Commande #{order.id}</span>
                      <div className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">
                        {order.total.toFixed(2)}dt
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {order.status === 'pending' ? 'En attente' : 
                         order.status === 'confirmed' ? 'Confirmée' :
                         order.status === 'shipped' ? 'Expédiée' :
                         order.status === 'delivered' ? 'Livrée' :
                         order.status}
                      </div>
                    </div>
                  </div>
                ))}
                {orderCount > 3 && (
                  <div className="text-center pt-2">
                    <span className="text-sm text-gray-500">
                      et {orderCount - 3} autres commandes...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="text-center mt-8">
            <Button
              onClick={handleLogout}
              className="bg-[#8B7355] hover:bg-[#7A6249] text-white px-8 py-3 rounded-lg"
            >
              🚪 DÉCONNEXION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
 