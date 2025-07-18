'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import { HeroBackground } from '@/components/ui/hero-background';

export function HomePage() {
  const { user, isAuthenticated, theme, setTheme } = useAppStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <HeroBackground>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-dune-light rounded-full flex justify-center">
            <div className="w-1 h-3 bg-dune-light rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </HeroBackground>

      {/* Collections Section */}
      <section className="py-20 bg-[#f8f6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
                Nos Collections
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre gamme complète de vêtements en maille, conçus avec passion et savoir-faire traditionnel
              </p>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Femme Collection */}
              <div className="group cursor-pointer">
                <Link href="/femme">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="/wetransfer_couverture-femmes_2025-07-17_2203/IMG_8813.jpeg"
                        alt="Collection Femme"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-medium mb-2">Femme</h3>
                      <p className="text-sm opacity-90">Élégance et raffinement</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Homme Collection */}
              <div className="group cursor-pointer">
                <Link href="/homme">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="/wetransfer_couverture-vanille_2025-07-17_2204/IMG_8807.jpeg" 
                        alt="Collection Homme"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-medium mb-2">Homme</h3>
                      <p className="text-sm opacity-90">Style et sophistication</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Unisexe Collection */}
              <div className="group cursor-pointer">
                <Link href="/unisexe">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="/wetransfer_tsawer-article-achat-unisexe_2025-07-17_2156/IMG_8849.jpeg" 
                        alt="Collection Unisexe"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-medium mb-2">Unisexe</h3>
                      <p className="text-sm opacity-90">Pour tous les styles</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Women's Collection Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
                T-shirt Women
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre collection exclusive de t-shirts pour femmes, alliant confort et élégance
              </p>
            </div>

            {/* Women's Gallery Grid - Only 3 Photos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* Image 1 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_couverture-femmes_2025-07-17_2203/IMG_8813.jpeg"

                      alt="T-shirt femme - Style élégant"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image 2 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_couverture-unisexe_2025-07-17_2200/IMG_8909.jpeg"
                      alt="T-shirt femme - Style décontracté"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image 3 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_tsawer-article-achat-bnet_2025-07-17_2155/IMG_8862.jpeg" 
                      alt="T-shirt femme - Style vanille"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Product Section */}
            <div className="bg-[#f8f6f0] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="aspect-[3/4] w-80 relative">
                      <Image
                        src="/wetransfer_tsawer-article-achat-bnet_2025-07-17_2155/IMG_8832.jpeg"
                        alt="T-shirt Women - Featured Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                    T-shirt Women
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 max-w-md">
                    Un t-shirt élégant et confortable, parfait pour toutes les occasions. Fabriqué avec des matériaux de qualité supérieure.
                  </p>
                  <div className="mb-8">
                    <span className="text-2xl font-medium text-gray-800">
                      Prix: 97.00dt
                    </span>
                  </div>
                  <Button 
                    asChild 
                    className="bg-gray-800 text-white hover:bg-gray-900 px-8 py-3 text-lg font-medium rounded-full"
                  >
                    <Link href="/femme">
                      Acheter Maintenant
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Men's Collection Showcase */}
      <section className="py-20 bg-[#f8f6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
                T-shirt Homme
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre collection masculine de t-shirts, alliant style et confort pour l&apos;homme moderne
              </p>
            </div>

            {/* Men's Gallery Grid - Only 3 Photos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* Image 1 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_couverture-bleu_2025-07-17_2202/IMG_8901.jpeg"
                      alt="T-shirt homme - Style élégant"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image 2 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_couverture-vanille_2025-07-17_2204/IMG_8805.jpeg" 
                      alt="T-shirt homme - Style décontracté"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image 3 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_tsawer-article-achat-unisexe_2025-07-17_2156/IMG_8874.jpeg" 
                      alt="T-shirt homme - Style moderne"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Product Section */}
            <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg bg-gray-50 shadow-lg">
                    <div className="aspect-[3/4] w-80 relative">
                      <Image
                        src="/wetransfer_tsawer-article-achat-polo-bleu_2025-07-17_2159/IMG_8842.jpeg" 
                        alt="T-shirt Homme - Featured Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                    T-shirt Homme
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 max-w-md">
                    Un t-shirt masculin raffiné et confortable, idéal pour toutes les occasions. Conçu avec des matériaux premium.
                  </p>
                  <div className="mb-8">
                    <span className="text-2xl font-medium text-gray-800">
                      Prix: 92.00dt
                    </span>
                  </div>
                  <Button 
                    asChild 
                    className="bg-gray-800 text-white hover:bg-gray-900 px-8 py-3 text-lg font-medium rounded-full"
                  >
                    <Link href="/homme">
                      Acheter Maintenant
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unisex Collection Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
                T-shirt Unisexe
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre collection unisexe de t-shirts, conçue pour tous les styles et toutes les occasions
              </p>
            </div>

            {/* Unisex Gallery Grid - Only 3 Photos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* Image 1 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_couverture-unisexe_2025-07-17_2200/IMG_8891.jpeg"
                      alt="T-shirt unisexe - Style moderne"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image 2 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_couverture-unisexe_2025-07-17_2200/IMG_8909.jpeg"
                      alt="T-shirt unisexe - Style décontracté"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image 3 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/wetransfer_tsawer-article-achat-unisexe_2025-07-17_2156/IMG_8849.jpeg"
                      alt="T-shirt unisexe - Style polyvalent"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Product Section */}
            <div className="bg-[#f8f6f0] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="aspect-[3/4] w-80 relative">
                      <Image
                        src="/wetransfer_tsawer-article-achat-unisexe_2025-07-17_2156/IMG_8874.jpeg"
                        alt="T-shirt Unisexe - Featured Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                    T-shirt Unisexe
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 max-w-md">
                    Un t-shirt polyvalent et confortable, parfait pour tous. Design moderne et matériaux de qualité supérieure.
                  </p>
                  <div className="mb-8">
                    <span className="text-2xl font-medium text-gray-800">
                      Prix: 84.00dt
                    </span>
                  </div>
                  <Button 
                    asChild 
                    className="bg-gray-800 text-white hover:bg-gray-900 px-8 py-3 text-lg font-medium rounded-full"
                  >
                    <Link href="/unisexe">
                      Acheter Maintenant
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-[#f8f6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Savoir-Faire Column */}
              <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm h-full flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 tracking-wide">
                  SAVOIR-FAIRE
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  FIANKA se voit décerner le label &quot;Entreprise du Patrimoine Vivant&quot;. Il couronne l&apos;excellence des savoir-faire mis à l&apos;œuvre au sein de nos ateliers, et l&apos;attention toute particulière portée à leur transmission.
                </p>
                <div className="border-t border-gray-800 pt-4">
                  <span className="text-gray-800 font-medium uppercase tracking-wide text-sm">
                    DÉCOUVREZ NOTRE SAVOIR-FAIRE
                  </span>
                </div>
              </div>

              {/* Central Image */}
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                  <Image
                    src="/wetransfer_couverture-femmes_2025-07-17_2203/IMG_8813.jpeg"
                    alt="Fianka Heritage - Savoir-faire traditionnel"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Histoire Column */}
              <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm h-full flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 tracking-wide">
                  L&apos;HISTOIRE DE LA BONNETERIE
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  L&apos;histoire de FIANKA se dit aussi au travers de ses mythes : le pull marin, officier de marine, la marinière ou bien encore le Kabig...
                </p>
                <div className="border-t border-gray-800 pt-4">
                  <span className="text-gray-800 font-medium uppercase tracking-wide text-sm">
                    DÉCOUVREZ NOTRE HISTOIRE
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 