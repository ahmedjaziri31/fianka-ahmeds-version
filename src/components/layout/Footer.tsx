'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#f8f6f0] border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl font-medium text-gray-700 mb-3">
            Inscrivez-vous à Notre Newsletter
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Restez informé des dernières collections et offres exclusives.
          </p>
          <p className="text-gray-600 font-medium text-sm mb-8">
            Recevez 10% de réduction sur votre premier achat !
          </p>
          
          <div className="flex gap-2 max-w-sm mx-auto mb-4">
            <Input
              type="email"
              placeholder="Entrez votre email"
              className="flex-1 border-gray-300 focus:border-gray-500 bg-white text-sm"
            />
            <Button className="bg-gray-700 text-white hover:bg-gray-800 px-6 text-sm">
              S'inscrire
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            En vous inscrivant, vous acceptez notre <span className="underline">politique de confidentialité</span>.<br />
            Vous pouvez vous désinscrire à tout moment via le lien dans nos emails.
          </p>
        </div>

        {/* Brand Separator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-8 text-xl font-bold text-gray-800 tracking-wider">FIANKA</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* À PROPOS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">À PROPOS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  Savoir-faire
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  Nos Valeurs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  Nos Engagements
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICE CLIENT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">SERVICE CLIENT</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  Entretien des Pulls
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  Guide des Tailles
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACTEZ-NOUS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">CONTACTEZ-NOUS</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+216 93 94 66 30</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">welcome@fianka-shop.com</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3 tracking-wide">SUIVEZ-NOUS</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* LANGUE */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">LANGUE</h3>
            <Select defaultValue="english">
              <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 bg-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="arabic">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2025 Fianka. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 