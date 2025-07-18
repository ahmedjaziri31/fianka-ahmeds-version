const { seedProducts } = require('../src/lib/seed-products.ts');

console.log('Starting database seeding...');

try {
  seedProducts();
  console.log('✅ Database seeded successfully with correct image URLs!');
} catch (error) {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
} 