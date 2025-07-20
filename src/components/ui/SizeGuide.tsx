'use client';

import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category?: 'homme' | 'femme' | 'unisexe' | null; // If null, show all categories
  productName?: string;
}

export function SizeGuide({ isOpen, onClose, category = null, productName }: SizeGuideProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'homme' | 'femme' | 'unisexe'>(
    category || 'homme'
  );

  if (!isOpen) return null;

  // Size chart data
  const sizeCharts = {
    homme: {
      S: {
        longueurTotale: '66 cm',
        tourPoitrine: '50 cm',
        tourBas: '50 cm',
        largeurEpaule: '44 cm',
        ecartEncolure: '20 cm',
        hauteurCol: '7 cm',
        longueurManche: '60 cm',
        basManche: '10 cm',
        tourBiceps: '20 cm'
      },
      M: {
        longueurTotale: '68 cm',
        tourPoitrine: '52 cm',
        tourBas: '52 cm',
        largeurEpaule: '46 cm',
        ecartEncolure: '21 cm',
        hauteurCol: '7 cm',
        longueurManche: '61 cm',
        basManche: '10.5 cm',
        tourBiceps: '21 cm'
      },
      L: {
        longueurTotale: '70 cm',
        tourPoitrine: '54 cm',
        tourBas: '54 cm',
        largeurEpaule: '48 cm',
        ecartEncolure: '22 cm',
        hauteurCol: '7 cm',
        longueurManche: '62 cm',
        basManche: '11 cm',
        tourBiceps: '22 cm'
      },
      XL: {
        longueurTotale: '72 cm',
        tourPoitrine: '56 cm',
        tourBas: '56 cm',
        largeurEpaule: '50 cm',
        ecartEncolure: '23 cm',
        hauteurCol: '7 cm',
        longueurManche: '63 cm',
        basManche: '11.5 cm',
        tourBiceps: '23 cm'
      },
      XXL: {
        longueurTotale: '74 cm',
        tourPoitrine: '58 cm',
        tourBas: '58 cm',
        largeurEpaule: '52 cm',
        ecartEncolure: '24 cm',
        hauteurCol: '7 cm',
        longueurManche: '64 cm',
        basManche: '12 cm',
        tourBiceps: '24 cm'
      }
    },
    femme: {
      XS: {
        longueurTotale: '62 cm',
        tourPoitrine: '46 cm',
        tourBas: '46 cm',
        largeurEpaule: '40 cm',
        ecartEncolure: '18 cm',
        hauteurCol: '6 cm',
        longueurManche: '58 cm',
        basManche: '9 cm',
        tourBiceps: '18 cm'
      },
      S: {
        longueurTotale: '64 cm',
        tourPoitrine: '48 cm',
        tourBas: '48 cm',
        largeurEpaule: '42 cm',
        ecartEncolure: '19 cm',
        hauteurCol: '6 cm',
        longueurManche: '59 cm',
        basManche: '9.5 cm',
        tourBiceps: '19 cm'
      },
      M: {
        longueurTotale: '66 cm',
        tourPoitrine: '50 cm',
        tourBas: '50 cm',
        largeurEpaule: '44 cm',
        ecartEncolure: '20 cm',
        hauteurCol: '6 cm',
        longueurManche: '60 cm',
        basManche: '10 cm',
        tourBiceps: '20 cm'
      },
      L: {
        longueurTotale: '68 cm',
        tourPoitrine: '52 cm',
        tourBas: '52 cm',
        largeurEpaule: '46 cm',
        ecartEncolure: '21 cm',
        hauteurCol: '6 cm',
        longueurManche: '61 cm',
        basManche: '10.5 cm',
        tourBiceps: '21 cm'
      },
      XL: {
        longueurTotale: '70 cm',
        tourPoitrine: '54 cm',
        tourBas: '54 cm',
        largeurEpaule: '48 cm',
        ecartEncolure: '22 cm',
        hauteurCol: '6 cm',
        longueurManche: '62 cm',
        basManche: '11 cm',
        tourBiceps: '22 cm'
      }
    },
    unisexe: {
      S: {
        longueurTotale: '65 cm',
        tourPoitrine: '49 cm',
        tourBas: '49 cm',
        largeurEpaule: '43 cm',
        ecartEncolure: '19.5 cm',
        hauteurCol: '6.5 cm',
        longueurManche: '59.5 cm',
        basManche: '9.5 cm',
        tourBiceps: '19.5 cm'
      },
      M: {
        longueurTotale: '67 cm',
        tourPoitrine: '51 cm',
        tourBas: '51 cm',
        largeurEpaule: '45 cm',
        ecartEncolure: '20.5 cm',
        hauteurCol: '6.5 cm',
        longueurManche: '60.5 cm',
        basManche: '10 cm',
        tourBiceps: '20.5 cm'
      },
      L: {
        longueurTotale: '69 cm',
        tourPoitrine: '53 cm',
        tourBas: '53 cm',
        largeurEpaule: '47 cm',
        ecartEncolure: '21.5 cm',
        hauteurCol: '6.5 cm',
        longueurManche: '61.5 cm',
        basManche: '10.5 cm',
        tourBiceps: '21.5 cm'
      },
      XL: {
        longueurTotale: '71 cm',
        tourPoitrine: '55 cm',
        tourBas: '55 cm',
        largeurEpaule: '49 cm',
        ecartEncolure: '22.5 cm',
        hauteurCol: '6.5 cm',
        longueurManche: '62.5 cm',
        basManche: '11 cm',
        tourBiceps: '22.5 cm'
      },
      XXL: {
        longueurTotale: '73 cm',
        tourPoitrine: '57 cm',
        tourBas: '57 cm',
        largeurEpaule: '51 cm',
        ecartEncolure: '23.5 cm',
        hauteurCol: '6.5 cm',
        longueurManche: '63.5 cm',
        basManche: '11.5 cm',
        tourBiceps: '23.5 cm'
      }
    }
  };

  const measurementLabels = {
    longueurTotale: { fr: 'Longueur totale', en: 'Total length' },
    tourPoitrine: { fr: '1/2 Tour de poitrine', en: '1/2 Chest circumference' },
    tourBas: { fr: '1/2 Tour de bas', en: '1/2 Bottom circumference' },
    largeurEpaule: { fr: 'Largeur épaule à épaule', en: 'Shoulder to shoulder width' },
    ecartEncolure: { fr: 'Écart encolure dos', en: 'Back neckline gap' },
    hauteurCol: { fr: 'Hauteur col', en: 'Collar height' },
    longueurManche: { fr: 'Longueur manche', en: 'Sleeve length' },
    basManche: { fr: '1/2 Bas de manche (poignet)', en: '1/2 Sleeve bottom (cuff)' },
    tourBiceps: { fr: '1/2 Tour de biceps', en: '1/2 Biceps circumference' }
  };

  const currentLanguage = t('nav.homme') === 'HOMME' ? 'fr' : 'en';

  const renderSizeChart = (chartCategory: 'homme' | 'femme' | 'unisexe') => {
    const chart = sizeCharts[chartCategory];
    const sizes = Object.keys(chart);
    const measurements = Object.keys(chart[sizes[0] as keyof typeof chart]) as Array<keyof typeof measurementLabels>;

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                {currentLanguage === 'fr' ? 'Désignation' : 'Measurement'}
              </th>
              {sizes.map(size => (
                <th key={size} className="border border-gray-300 px-4 py-2 text-center">{size}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {measurements.map((measurement) => (
              <tr key={measurement}>
                <td className="border border-gray-300 px-4 py-2 font-medium">
                  {measurementLabels[measurement][currentLanguage]}
                </td>
                {sizes.map(size => (
                  <td key={size} className="border border-gray-300 px-4 py-2 text-center">
                    {chart[size as keyof typeof chart][measurement]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getCategoryTitle = (cat: 'homme' | 'femme' | 'unisexe') => {
    const titles = {
      homme: currentLanguage === 'fr' ? 'Guide des tailles - HOMME' : 'Size Guide - MEN',
      femme: currentLanguage === 'fr' ? 'Guide des tailles - FEMME' : 'Size Guide - WOMEN',
      unisexe: currentLanguage === 'fr' ? 'Guide des tailles - UNISEXE' : 'Size Guide - UNISEX'
    };
    return titles[cat];
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-semibold">
              {productName 
                ? `${currentLanguage === 'fr' ? 'Guide des tailles' : 'Size Guide'} - ${productName}`
                : (currentLanguage === 'fr' ? 'Guide des tailles' : 'Size Guide')
              }
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs - Only show if no specific category is provided */}
          {!category && (
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('homme')}
                className={cn(
                  "px-6 py-3 font-medium transition-colors",
                  activeTab === 'homme'
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {currentLanguage === 'fr' ? 'HOMME' : 'MEN'}
              </button>
              <button
                onClick={() => setActiveTab('femme')}
                className={cn(
                  "px-6 py-3 font-medium transition-colors",
                  activeTab === 'femme'
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {currentLanguage === 'fr' ? 'FEMME' : 'WOMEN'}
              </button>
              <button
                onClick={() => setActiveTab('unisexe')}
                className={cn(
                  "px-6 py-3 font-medium transition-colors",
                  activeTab === 'unisexe'
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {currentLanguage === 'fr' ? 'UNISEXE' : 'UNISEX'}
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {category ? (
              // Show specific category
              <div>
                <h4 className="text-lg font-semibold mb-4">{getCategoryTitle(category)}</h4>
                {renderSizeChart(category)}
              </div>
            ) : (
              // Show tabbed interface
              <div>
                <h4 className="text-lg font-semibold mb-4">{getCategoryTitle(activeTab)}</h4>
                {renderSizeChart(activeTab)}
              </div>
            )}

            {/* Size guide instructions */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-semibold mb-2">
                {currentLanguage === 'fr' ? 'Comment mesurer ?' : 'How to measure?'}
              </h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  {currentLanguage === 'fr' 
                    ? '• Mesurez sur un vêtement qui vous va bien'
                    : '• Measure on a garment that fits you well'
                  }
                </li>
                <li>
                  {currentLanguage === 'fr'
                    ? '• Posez le vêtement à plat sur une surface plane'
                    : '• Lay the garment flat on a flat surface'
                  }
                </li>
                <li>
                  {currentLanguage === 'fr'
                    ? '• Utilisez un mètre ruban pour plus de précision'
                    : '• Use a tape measure for more accuracy'
                  }
                </li>
                <li>
                  {currentLanguage === 'fr'
                    ? '• En cas de doute, choisissez la taille supérieure'
                    : '• When in doubt, choose the larger size'
                  }
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
            <Button
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              {currentLanguage === 'fr' ? 'Fermer' : 'Close'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 