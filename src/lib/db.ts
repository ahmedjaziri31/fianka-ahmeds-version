import Database from 'better-sqlite3';
import path from 'path';
import { hash, compare } from 'bcryptjs';
import { CreateOrderData, Order, CartItem, Product } from '@/types';

// Initialize database
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    birth_date DATE,
    gender TEXT,
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create products table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('homme', 'femme', 'unisexe', 'fianka')),
    size TEXT,
    color TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    available_sizes TEXT,
    size_chart TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create orders table
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    shipping_address TEXT NOT NULL,
    total REAL NOT NULL,
    subtotal REAL NOT NULL,
    discount REAL DEFAULT 0,
    promo_code TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`);

// Create order_items table
db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    size TEXT,
    color TEXT,
    price REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )
`);

// User operations
export const userDb = {
  // Create user
  async createUser(userData: { name: string; email: string; password: string }): Promise<any> {
    // Hash the password before storing
    const hashedPassword = await hash(userData.password, 12);
    
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(userData.name, userData.email, hashedPassword);
    
    const user = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?')
      .get(result.lastInsertRowid) as any;
    
    return user;
  },

  // Login user
  async loginUser(loginData: { email: string; password: string }): Promise<any | null> {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(loginData.email) as any;
    
    if (!user) return null;
    
    // Compare the provided password with the hashed password
    const isValid = await compare(loginData.password, user.password);
    if (!isValid) return null;
    
    // Return user without password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birth_date: user.birth_date,
      gender: user.gender,
      city: user.city,
      created_at: user.created_at
    };
  },

  // Get user by email
  getUserByEmail(email: string): any {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    return user;
  },

  // Get user by ID
  getUserById(id: number): any {
    const user = db.prepare('SELECT id, name, email, birth_date, gender, city, created_at FROM users WHERE id = ?')
      .get(id) as any;
    return user;
  }
};

// Product operations
export const productDb = {
  // Get all products
  getAllProducts(): Product[] {
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all() as Product[];
    return products;
  },

  // Get products by category
  getProductsByCategory(category: string): Product[] {
    const products = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC')
      .all(category) as Product[];
    return products;
  },

  // Get product by ID
  getProductById(id: number): Product | null {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as Product;
    return product || null;
  },

  // Create product
  createProduct(productData: Omit<Product, 'id' | 'created_at'>): Product {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, image, category, size, color, stock, available_sizes, size_chart)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      productData.name,
      productData.description,
      productData.price,
      productData.image,
      productData.category,
      productData.size,
      productData.color,
      productData.stock,
      JSON.stringify(productData.availableSizes || []),
      JSON.stringify(productData.sizeChart || {})
    );
    
    const product = db.prepare('SELECT * FROM products WHERE id = ?')
      .get(result.lastInsertRowid) as Product;
    
    return product;
  }
};

// Order operations
export const orderDb = {
  // Create order
  createOrder(orderData: CreateOrderData, userId?: number): Order {
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = 0; // TODO: Implement promo code logic
    const total = subtotal - discount;

    const stmt = db.prepare(`
      INSERT INTO orders (user_id, shipping_address, total, subtotal, discount, promo_code, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userId || null,
      JSON.stringify(orderData.shipping_address),
      total,
      subtotal,
      discount,
      orderData.promo_code || null,
      'pending'
    );

    const orderId = result.lastInsertRowid as number;

    // Insert order items
    const itemStmt = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, size, color, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const item of orderData.items) {
      itemStmt.run(
        orderId,
        item.product.id,
        item.quantity,
        item.size || null,
        item.color || null,
        item.product.price
      );
    }

    // Get the complete order
    const completeOrder = this.getOrderById(orderId);
    if (!completeOrder) {
      throw new Error('Failed to retrieve created order');
    }

    return completeOrder;
  },

  // Get order by ID
  getOrderById(id: number): Order | null {
    const orderRow = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
    
    if (!orderRow) {
      return null;
    }

    const itemRows = db.prepare(`
      SELECT oi.*, p.name, p.description, p.image, p.category
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(id) as any[];

    const items: CartItem[] = itemRows.map(row => ({
      id: `${row.product_id}-${row.size || 'default'}-${row.color || 'default'}`,
      product: {
        id: row.product_id,
        name: row.name,
        description: row.description,
        price: row.price,
        image: row.image,
        category: row.category,
        size: row.size,
        color: row.color,
        stock: 0, // Not needed for order items
        created_at: ''
      },
      quantity: row.quantity,
      size: row.size,
      color: row.color
    }));

    const order: Order = {
      id: orderRow.id,
      user_id: orderRow.user_id,
      items,
      shipping_address: JSON.parse(orderRow.shipping_address),
      total: orderRow.total,
      subtotal: orderRow.subtotal,
      discount: orderRow.discount,
      promo_code: orderRow.promo_code,
      status: orderRow.status,
      created_at: orderRow.created_at,
      updated_at: orderRow.updated_at
    };

    return order;
  },

  // Get orders by user ID
  getOrdersByUserId(userId: number): Order[] {
    const orderRows = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[];
    
    return orderRows.map(row => this.getOrderById(row.id)).filter(Boolean) as Order[];
  },

  // Update order status
  updateOrderStatus(id: number, status: Order['status']): boolean {
    const stmt = db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    const result = stmt.run(status, id);
    return result.changes > 0;
  }
};

export default db; 