'use client';

import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import { ProfileNavigation } from '@/components/layout/ProfileNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAppStore();
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
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
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
              <div className="text-3xl font-light text-gray-800 mb-2">2</div>
              <div className="text-gray-600">Total des Commandes</div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
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

          {/* Logout Button */}
          <div className="text-center">
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
 