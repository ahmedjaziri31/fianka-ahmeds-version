'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useAppStore } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setUser(data.user);
      onClose();
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#f8f6f0] rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/fianka-logo.gif"
              alt="Fianka Logo"
              width={60}
              height={60}
              className="rounded-lg"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-light text-gray-800 text-center mb-8">
            SE CONNECTER
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-gray-700 text-sm">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 bg-white border-gray-300 focus:border-gray-500"
                  placeholder="Votre nom complet"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 bg-white border-gray-300 focus:border-gray-500"
                placeholder="fianka.client@exemple.tn"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 text-sm">
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 bg-white border-gray-300 focus:border-gray-500"
                placeholder="••••••••"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300"
                  />
                  Se souvenir de moi
                </label>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Mot de passe oublié ?
                </a>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B7355] hover:bg-[#7A6249] text-white py-3 text-lg font-medium"
            >
              {loading ? 'Chargement...' : 'SE CONNECTER'}
            </Button>
          </form>

          {/* Switch between login/register */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? (
              <>
                Vous n&apos;avez pas de compte ?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-gray-800 hover:underline font-medium"
                >
                  S&apos;inscrire
                </button>
              </>
            ) : (
              <>
                Vous avez déjà un compte ?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-gray-800 hover:underline font-medium"
                >
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
 