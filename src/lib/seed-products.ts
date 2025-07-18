import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Create products table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    size TEXT,
    color TEXT,
    stock INTEGER DEFAULT 10,
    available_sizes TEXT,
    size_chart TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add missing columns if they don't exist
try {
  db.exec(`ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 10`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE products ADD COLUMN available_sizes TEXT`);
} catch (error) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE products ADD COLUMN size_chart TEXT`);
} catch (error) {
  // Column already exists, ignore
}

// Size chart for homme products
const hommeSizeChart = {
  'S': {
    longueurTotale: 64.5,
    tourPoitrine: 51,
    tourBas: 42,
    largeurEpaule: 36.5,
    ecartEncolure: 16,
    hauteurCol: 7,
    longueurManche: 22,
    basManche: 10,
    tourBiceps: 16
  },
  'M': {
    longueurTotale: 65.5,
    tourPoitrine: 53,
    tourBas: 44,
    largeurEpaule: 37.5,
    ecartEncolure: 16.5,
    hauteurCol: 7,
    longueurManche: 23,
    basManche: 10.5,
    tourBiceps: 16.5
  },
  'L': {
    longueurTotale: 66.5,
    tourPoitrine: 55,
    tourBas: 46,
    largeurEpaule: 38.5,
    ecartEncolure: 17,
    hauteurCol: 7,
    longueurManche: 24,
    basManche: 11,
    tourBiceps: 17
  },
  'XL': {
    longueurTotale: 67.5,
    tourPoitrine: 57,
    tourBas: 48,
    largeurEpaule: 39.5,
    ecartEncolure: 17.5,
    hauteurCol: 7,
    longueurManche: 25,
    basManche: 11.5,
    tourBiceps: 17.5
  },
  'XXL': {
    longueurTotale: 68.5,
    tourPoitrine: 59,
    tourBas: 50,
    largeurEpaule: 40.5,
    ecartEncolure: 18,
    hauteurCol: 7,
    longueurManche: 26,
    basManche: 12,
    tourBiceps: 18
  }
};

// Size chart for femme products
const femmeSizeChart = {
  'XS': {
    longueurTotale: 45,
    tourPoitrine: 45,
    tourBas: 38,
    largeurEpaule: 33,
    ecartEncolure: 16.5,
    hauteurCol: 7.5,
    longueurManche: 18,
    basManche: 11,
    tourBiceps: 13.5
  },
  'S': {
    longueurTotale: 46,
    tourPoitrine: 47,
    tourBas: 40,
    largeurEpaule: 34,
    ecartEncolure: 17,
    hauteurCol: 7.5,
    longueurManche: 19,
    basManche: 11.5,
    tourBiceps: 14
  },
  'M': {
    longueurTotale: 47,
    tourPoitrine: 49,
    tourBas: 42,
    largeurEpaule: 35,
    ecartEncolure: 17.5,
    hauteurCol: 7.5,
    longueurManche: 20,
    basManche: 12,
    tourBiceps: 14.5
  },
  'L': {
    longueurTotale: 48,
    tourPoitrine: 51,
    tourBas: 44,
    largeurEpaule: 36,
    ecartEncolure: 18,
    hauteurCol: 7.5,
    longueurManche: 21,
    basManche: 12.5,
    tourBiceps: 15
  },
  'XL': {
    longueurTotale: 49,
    tourPoitrine: 53,
    tourBas: 46,
    largeurEpaule: 37,
    ecartEncolure: 18.5,
    hauteurCol: 7.5,
    longueurManche: 22,
    basManche: 13,
    tourBiceps: 15.5
  }
};

// Size chart for unisex products
const unisexSizeChart = {
  'S': {
    longueurTotale: 64,
    tourPoitrine: 56,
    tourBas: 56,
    largeurEpaule: 52,
    ecartEncolure: 18,
    hauteurCol: 8,
    longueurManche: 21,
    basManche: 13,
    tourBiceps: 18.5
  },
  'M': {
    longueurTotale: 66.5,
    tourPoitrine: 58,
    tourBas: 58,
    largeurEpaule: 53,
    ecartEncolure: 18,
    hauteurCol: 8,
    longueurManche: 22,
    basManche: 13.5,
    tourBiceps: 19.5
  },
  'L': {
    longueurTotale: 69,
    tourPoitrine: 60,
    tourBas: 60,
    largeurEpaule: 54,
    ecartEncolure: 18.5,
    hauteurCol: 8,
    longueurManche: 23,
    basManche: 14,
    tourBiceps: 20.5
  },
  'XL': {
    longueurTotale: 71.5,
    tourPoitrine: 62,
    tourBas: 62,
    largeurEpaule: 55,
    ecartEncolure: 18.5,
    hauteurCol: 8,
    longueurManche: 24,
    basManche: 14.5,
    tourBiceps: 21.5
  },
  'XXL': {
    longueurTotale: 74,
    tourPoitrine: 64,
    tourBas: 64,
    largeurEpaule: 56,
    ecartEncolure: 19,
    hauteurCol: 8,
    longueurManche: 25,
    basManche: 15,
    tourBiceps: 22.5
  }
};

export function seedProducts() {
  // Clear existing products
  db.exec('DELETE FROM products');

  const products = [
    // Homme products (92dt each) - 2 products
    {
      name: 'Pull Homme Blue',
      description: 'Pull masculin bleu marine, confort optimal pour l\'homme moderne.',
      price: 92,
      image: '/wetransfer_couverture-bleu_2025-07-17_2202/IMG_8901.jpeg',
      category: 'homme',
      size: 'M',
      color: 'Bleu Marine',
      stock: 15,
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      sizeChart: hommeSizeChart
    },
    {
      name: 'Pull Homme Vanille',
      description: 'Style décontracté et élégant, parfait pour toutes les occasions.',
      price: 92,
      image: '/wetransfer_couverture-vanille_2025-07-17_2204/IMG_8807.jpeg',
      category: 'homme',
      size: 'M',
      color: 'Vanille',
      stock: 12,
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      sizeChart: hommeSizeChart
    },
    // Femme product (97dt) - 1 product
    {
      name: 'Pull Femme Élégant',
      description: 'Pull féminin élégant et raffiné, idéal pour un look sophistiqué.',
      price: 97,
      image: '/wetransfer_couverture-femmes_2025-07-17_2203/IMG_8813.jpeg',
      category: 'femme',
      size: 'M',
      color: 'Rose',
      stock: 10,
      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      sizeChart: femmeSizeChart
    },
    // Unisex products (84dt each) - 2 products so both homme and femme pages can show one
    {
      name: 'T-shirt Unisexe',
      description: 'T-shirt unisexe confortable et polyvalent, parfait pour tous.',
      price: 84,
      image: '/wetransfer_tsawer-article-achat-unisexe_2025-07-17_2156/IMG_8849.jpeg',
      category: 'unisexe',
      size: 'L',
      color: 'Blanc',
      stock: 20,
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      sizeChart: unisexSizeChart
    },
    {
      name: 'T-shirt Unisexe Classic',
      description: 'T-shirt unisexe classique, design intemporel et confortable.',
      price: 84,
      image: '/wetransfer_tsawer-article-achat-unisexe_2025-07-17_2156/IMG_8874.jpeg',
      category: 'unisexe',
      size: 'M',
      color: 'Gris',
      stock: 18,
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      sizeChart: unisexSizeChart
    }
  ];

  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, image, category, size, color, stock, available_sizes, size_chart)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  products.forEach(product => {
    insertProduct.run(
      product.name,
      product.description,
      product.price,
      product.image,
      product.category,
      product.size,
      product.color,
      product.stock,
      JSON.stringify(product.availableSizes),
      JSON.stringify(product.sizeChart)
    );
  });

  console.log('Products seeded successfully!');
}

// Export function to get products by category
export function getProductsByCategory(category: string) {
  const stmt = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY id');
  const products = stmt.all(category) as any[];
  
  return products.map(product => ({
    ...product,
    availableSizes: product.available_sizes ? JSON.parse(product.available_sizes) : [],
    sizeChart: product.size_chart ? JSON.parse(product.size_chart) : {}
  }));
}

// Export function to get all products
export function getAllProducts() {
  const stmt = db.prepare('SELECT * FROM products ORDER BY category, id');
  const products = stmt.all() as any[];
  
  return products.map(product => ({
    ...product,
    availableSizes: product.available_sizes ? JSON.parse(product.available_sizes) : [],
    sizeChart: product.size_chart ? JSON.parse(product.size_chart) : {}
  }));
}

// Export function to get a single product
export function getProductById(id: number) {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  const product = stmt.get(id) as any;
  
  if (!product) return null;
  
  return {
    ...product,
    availableSizes: product.available_sizes ? JSON.parse(product.available_sizes) : [],
    sizeChart: product.size_chart ? JSON.parse(product.size_chart) : {}
  };
} 