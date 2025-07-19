// Valid promo codes with their discount percentages
export const VALID_PROMO_CODES: Record<string, number> = {
  // Newsletter welcome code
  'FIANKEWI-OVERT31': 10,
  'FIANKEWI-zaZdI': 10,
  'FIANKEWI-Xe6bl': 10,
  'FIANKEWI-XB8ZU': 10,
  'FIANKEWI-X59sS': 10,
  'FIANKEWI-WDYpl': 10,
  'FIANKEWI-wBxur': 10,
  'FIANKEWI-Vg1V6': 10,
  'FIANKEWI-UFYBr': 10,
  'FIANKEWI-SQ5RV': 10,
  'FIANKEWI-Rp9Gb': 10,
  'FIANKEWI-qBtaH': 10,
  'FIANKEWI-q9Yjl': 10,
  'FIANKEWI-NWO74': 10,
  'FIANKEWI-LtJxS': 10,
  'FIANKEWI-Klm6m': 10,
  'FIANKEWI-KhE4p': 10,
  'FIANKEWI-I3o6c': 10,
  'FIANKEWI-eEgMx': 10,
  'FIANKEWI-EAgHS': 10,
  'FIANKEWI-cVgVP': 10,
  'FIANKEWI-BHkvt': 10,
  'FIANKEWI-bbO3t': 10,
  'FIANKEWI-B5pTR': 10,
  'FIANKEWI-B4Pz5': 10,
  'FIANKEWI-A4k6g': 10,
  'FIANKEWI-OVERT31': 10,
};

export interface PromoCodeResult {
  valid: boolean;
  discount: number;
  message: string;
}

/**
 * Validates a promo code and returns the discount percentage
 * @param code - The promo code to validate
 * @returns PromoCodeResult with validation status and discount
 */
export function validatePromoCode(code: string): PromoCodeResult {
  const trimmedCode = code.trim().toUpperCase();
  
  if (!trimmedCode) {
    return {
      valid: false,
      discount: 0,
      message: 'Veuillez entrer un code promo'
    };
  }
  
  if (VALID_PROMO_CODES[trimmedCode]) {
    return {
      valid: true,
      discount: VALID_PROMO_CODES[trimmedCode],
      message: `Code promo appliqué! ${VALID_PROMO_CODES[trimmedCode]}% de réduction`
    };
  }
  
  return {
    valid: false,
    discount: 0,
    message: 'Code promo invalide'
  };
}

/**
 * Calculates the discount amount based on subtotal and promo code
 * @param subtotal - The subtotal amount
 * @param promoCode - The promo code
 * @returns The discount amount
 */
export function calculateDiscount(subtotal: number, promoCode: string): number {
  const result = validatePromoCode(promoCode);
  if (!result.valid) return 0;
  
  return (subtotal * result.discount) / 100;
}

/**
 * Calculates the final total after applying promo code discount
 * @param subtotal - The subtotal amount
 * @param promoCode - The promo code
 * @returns Object with subtotal, discount, and total
 */
export function calculateOrderTotal(subtotal: number, promoCode?: string) {
  const discount = promoCode ? calculateDiscount(subtotal, promoCode) : 0;
  const total = subtotal - discount;
  
  return {
    subtotal,
    discount,
    total
  };
}