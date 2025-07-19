// Supported languages
export type Language = 'fr' | 'en';

// Translation keys structure
export interface Translations {
  // Navigation
  nav: {
    homme: string;
    femme: string;
    unisexe: string;
    fianka: string;
    search: string;
    cart: string;
    profile: string;
  };

  // Authentication
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    name: string;
    fullName: string;
    signIn: string;
    signUp: string;
    logout: string;
    rememberMe: string;
    forgotPassword: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loading: string;
    invalidCredentials: string;
    userAlreadyExists: string;
    requiredField: string;
    invalidEmail: string;
  };

  // Products
  products: {
    addToCart: string;
    selectSize: string;
    sizeChart: string;
    availableSizes: string;
    outOfStock: string;
    price: string;
    quantity: string;
    size: string;
    color: string;
    description: string;
    // Product descriptions
    descriptions: {
      tshirtUnisex: string;
      sweaterHomme: string;
      dressFemme: string;
      jacketFianka: string;
      defaultDescription: string;
    };
  };

  // Cart
  cart: {
    title: string;
    empty: string;
    continueShopping: string;
    remove: string;
    clear: string;
    subtotal: string;
    discount: string;
    total: string;
    checkout: string;
    promoCode: string;
    applyPromo: string;
    removePromo: string;
    enterCode: string;
    invalidCode: string;
    promoApplied: string;
    emptyCart: string;
  };

  // Checkout
  checkout: {
    title: string;
    orderSummary: string;
    shippingInfo: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    cancel: string;
    validateOrder: string;
    orderSuccess: string;
    orderError: string;
    processing: string;
  };

  // Profile
  profile: {
    title: string;
    personalInfo: string;
    orderHistory: string;
    totalOrders: string;
    deliveredOrders: string;
    pendingOrders: string;
    username: string;
    birthDate: string;
    gender: string;
    notProvided: string;
    editProfile: string;
    save: string;
    disconnect: string;
    backToHome: string;
    noOrders: string;
    startShopping: string;
    order: string;
    status: {
      pending: string;
      confirmed: string;
      shipped: string;
      delivered: string;
      cancelled: string;
    };
  };

  // Footer
  footer: {
    newsletter: {
      title: string;
      description: string;
      discount: string;
      placeholder: string;
      subscribe: string;
      privacy: string;
      unsubscribe: string;
    };
    about: {
      title: string;
      ourStory: string;
      expertise: string;
      values: string;
      commitments: string;
    };
    service: {
      title: string;
      care: string;
      sizeGuide: string;
    };
    contact: {
      title: string;
      followUs: string;
    };
    language: string;
    copyright: string;
  };

  // Collections
  collections: {
    homme: {
      title: string;
      description: string;
    };
    femme: {
      title: string;
      description: string;
    };
    unisexe: {
      title: string;
      description: string;
    };
    fianka: {
      title: string;
      description: string;
    };
    noProducts: string;
  };

  // General
  general: {
    welcome: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    close: string;
    back: string;
    next: string;
    previous: string;
  };
}

// French translations
export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      homme: 'HOMME',
      femme: 'FEMME',
      unisexe: 'UNISEXE',
      fianka: 'FIANKA',
      search: 'Rechercher',
      cart: 'Panier',
      profile: 'Profil',
    },
    auth: {
      login: 'Se connecter',
      register: 'S\'inscrire',
      email: 'Email',
      password: 'Mot de passe',
      name: 'Nom',
      fullName: 'Nom complet',
      signIn: 'SE CONNECTER',
      signUp: 'S\'INSCRIRE',
      logout: 'Déconnexion',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      dontHaveAccount: 'Vous n\'avez pas de compte ?',
      loading: 'Chargement...',
      invalidCredentials: 'Identifiants invalides',
      userAlreadyExists: 'L\'utilisateur existe déjà',
      requiredField: 'Ce champ est requis',
      invalidEmail: 'Email invalide',
    },
    products: {
      addToCart: 'Ajouter au panier',
      selectSize: 'Sélectionner la taille',
      sizeChart: 'Guide des tailles',
      availableSizes: 'Tailles disponibles',
      outOfStock: 'Rupture de stock',
      price: 'Prix',
      quantity: 'Quantité',
      size: 'Taille',
      color: 'Couleur',
      description: 'Description',
      descriptions: {
        tshirtUnisex: 'T-shirt unisexe confortable en coton bio, parfait pour un style décontracté. Coupe moderne et matière douce.',
        sweaterHomme: 'Pull homme élégant en laine mérinos, idéal pour les saisons fraîches. Design classique et finitions soignées.',
        dressFemme: 'Robe femme raffinée en tissu fluide, parfaite pour toutes occasions. Coupe flatteuse et style intemporel.',
        jacketFianka: 'Veste signature Fianka en matières premium. Design unique alliant confort et élégance moderne.',
        defaultDescription: 'Article de mode de qualité supérieure, conçu avec soin pour allier style et confort.',
      },
    },
    cart: {
      title: 'Panier',
      empty: 'Votre panier est vide',
      continueShopping: 'Continuer les achats',
      remove: 'Supprimer',
      clear: 'Vider le panier',
      subtotal: 'Sous-total',
      discount: 'Remise',
      total: 'Total',
      checkout: 'Passer la commande',
      promoCode: 'Code promo',
      applyPromo: 'Appliquer',
      removePromo: 'Supprimer',
      enterCode: 'Entrez votre code',
      invalidCode: 'Code promo invalide',
      promoApplied: 'Code promo appliqué!',
      emptyCart: 'Vider le panier',
    },
    checkout: {
      title: 'Confirmation de commande',
      orderSummary: 'Résumé de la commande',
      shippingInfo: 'Informations de livraison',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse complète',
      city: 'Ville',
      postalCode: 'Code postal',
      cancel: 'Annuler',
      validateOrder: 'Valider la commande',
      orderSuccess: 'Commande créée avec succès!',
      orderError: 'Erreur lors de la création de la commande',
      processing: 'Validation...',
    },
    profile: {
      title: 'Mon Profil',
      personalInfo: 'INFORMATIONS PERSONNELLES',
      orderHistory: 'HISTORIQUE DES COMMANDES',
      totalOrders: 'Total des Commandes',
      deliveredOrders: 'Commandes Livrées',
      pendingOrders: 'Commandes En Cours',
      username: 'Nom d\'utilisateur',
      birthDate: 'Date de naissance',
      gender: 'Genre',
      notProvided: 'Non renseigné',
      editProfile: 'Modifier le profil',
      save: 'Enregistrer',
      disconnect: '🚪 DÉCONNEXION',
      backToHome: 'Retour à l\'accueil',
      noOrders: 'Aucune commande trouvée',
      startShopping: 'Commencer vos achats',
      order: 'Commande',
      status: {
        pending: 'En attente',
        confirmed: 'Confirmée',
        shipped: 'Expédiée',
        delivered: 'Livrée',
        cancelled: 'Annulée',
      },
    },
    footer: {
      newsletter: {
        title: 'Inscrivez-vous à Notre Newsletter',
        description: 'Restez informé des dernières collections et offres exclusives.',
        discount: 'Recevez 10% de réduction sur votre premier achat !',
        placeholder: 'Entrez votre email',
        subscribe: 'S\'inscrire',
        privacy: 'politique de confidentialité',
        unsubscribe: 'Vous pouvez vous désinscrire à tout moment via le lien dans nos emails.',
      },
      about: {
        title: 'À PROPOS',
        ourStory: 'Notre Histoire',
        expertise: 'Savoir-faire',
        values: 'Nos Valeurs',
        commitments: 'Nos Engagements',
      },
      service: {
        title: 'SERVICE CLIENT',
        care: 'Entretien des Pulls',
        sizeGuide: 'Guide des Tailles',
      },
      contact: {
        title: 'CONTACTEZ-NOUS',
        followUs: 'SUIVEZ-NOUS',
      },
      language: 'LANGUE',
      copyright: '© 2025 Fianka. All rights reserved.',
    },
    collections: {
      homme: {
        title: 'Collection HOMME',
        description: 'Découvrez notre collection de t-shirts pour hommes, alliant élégance et confort dans un style intemporel.',
      },
      femme: {
        title: 'Collection FEMME',
        description: 'Découvrez notre collection de t-shirts pour femmes, alliant élégance et sophistication dans un style raffiné.',
      },
      unisexe: {
        title: 'Collection UNISEXE',
        description: 'Découvrez notre collection unisexe, parfaite pour tous avec un style polyvalent et moderne.',
      },
      fianka: {
        title: 'Collection FIANKA',
        description: 'Notre collection signature, où tradition et modernité se rencontrent pour créer des pièces uniques qui racontent notre histoire.',
      },
      noProducts: 'Aucun produit disponible pour le moment.',
    },
    general: {
      welcome: 'Bienvenue',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      edit: 'Modifier',
      delete: 'Supprimer',
      close: 'Fermer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
    },
  },
  en: {
    nav: {
      homme: 'MEN',
      femme: 'WOMEN',
      unisexe: 'UNISEX',
      fianka: 'FIANKA',
      search: 'Search',
      cart: 'Cart',
      profile: 'Profile',
    },
    auth: {
      login: 'Sign In',
      register: 'Sign Up',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      fullName: 'Full Name',
      signIn: 'SIGN IN',
      signUp: 'SIGN UP',
      logout: 'Logout',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      loading: 'Loading...',
      invalidCredentials: 'Invalid credentials',
      userAlreadyExists: 'User already exists',
      requiredField: 'This field is required',
      invalidEmail: 'Invalid email',
    },
    products: {
      addToCart: 'Add to Cart',
      selectSize: 'Select Size',
      sizeChart: 'Size Chart',
      availableSizes: 'Available Sizes',
      outOfStock: 'Out of Stock',
      price: 'Price',
      quantity: 'Quantity',
      size: 'Size',
      color: 'Color',
      description: 'Description',
      descriptions: {
        tshirtUnisex: 'Comfortable unisex t-shirt in organic cotton, perfect for casual style. Modern cut and soft material.',
        sweaterHomme: 'Elegant men\'s sweater in merino wool, ideal for cool seasons. Classic design and refined finishes.',
        dressFemme: 'Refined women\'s dress in fluid fabric, perfect for all occasions. Flattering cut and timeless style.',
        jacketFianka: 'Signature Fianka jacket in premium materials. Unique design combining comfort and modern elegance.',
        defaultDescription: 'Superior quality fashion item, carefully designed to combine style and comfort.',
      },
    },
    cart: {
      title: 'Cart',
      empty: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      remove: 'Remove',
      clear: 'Clear Cart',
      subtotal: 'Subtotal',
      discount: 'Discount',
      total: 'Total',
      checkout: 'Checkout',
      promoCode: 'Promo Code',
      applyPromo: 'Apply',
      removePromo: 'Remove',
      enterCode: 'Enter your code',
      invalidCode: 'Invalid promo code',
      promoApplied: 'Promo code applied!',
      emptyCart: 'Empty Cart',
    },
    checkout: {
      title: 'Order Confirmation',
      orderSummary: 'Order Summary',
      shippingInfo: 'Shipping Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Full Address',
      city: 'City',
      postalCode: 'Postal Code',
      cancel: 'Cancel',
      validateOrder: 'Validate Order',
      orderSuccess: 'Order created successfully!',
      orderError: 'Error creating order',
      processing: 'Processing...',
    },
    profile: {
      title: 'My Profile',
      personalInfo: 'PERSONAL INFORMATION',
      orderHistory: 'ORDER HISTORY',
      totalOrders: 'Total Orders',
      deliveredOrders: 'Delivered Orders',
      pendingOrders: 'Pending Orders',
      username: 'Username',
      birthDate: 'Birth Date',
      gender: 'Gender',
      notProvided: 'Not provided',
      editProfile: 'Edit Profile',
      save: 'Save',
      disconnect: '🚪 LOGOUT',
      backToHome: 'Back to Home',
      noOrders: 'No orders found',
      startShopping: 'Start Shopping',
      order: 'Order',
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
      },
    },
    footer: {
      newsletter: {
        title: 'Subscribe to Our Newsletter',
        description: 'Stay informed about the latest collections and exclusive offers.',
        discount: 'Get 10% off your first purchase!',
        placeholder: 'Enter your email',
        subscribe: 'Subscribe',
        privacy: 'privacy policy',
        unsubscribe: 'You can unsubscribe at any time via the link in our emails.',
      },
      about: {
        title: 'ABOUT',
        ourStory: 'Our Story',
        expertise: 'Expertise',
        values: 'Our Values',
        commitments: 'Our Commitments',
      },
      service: {
        title: 'CUSTOMER SERVICE',
        care: 'Sweater Care',
        sizeGuide: 'Size Guide',
      },
      contact: {
        title: 'CONTACT US',
        followUs: 'FOLLOW US',
      },
      language: 'LANGUAGE',
      copyright: '© 2025 Fianka. All rights reserved.',
    },
    collections: {
      homme: {
        title: 'HOMME Collection',
        description: 'Discover our men\'s t-shirt collection, combining elegance and comfort in a timeless style.',
      },
      femme: {
        title: 'FEMME Collection',
        description: 'Discover our women\'s t-shirt collection, combining elegance and sophistication in a refined style.',
      },
      unisexe: {
        title: 'UNISEX Collection',
        description: 'Discover our unisex collection, perfect for everyone with a versatile and modern style.',
      },
      fianka: {
        title: 'FIANKA Collection',
        description: 'Our signature collection, where tradition and modernity meet to create unique pieces that tell our story.',
      },
      noProducts: 'No products available at the moment.',
    },
    general: {
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
    },
  },
};

// Helper function to get translation
export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// Default language
export const DEFAULT_LANGUAGE: Language = 'fr'; 