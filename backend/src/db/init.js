const fs = require('fs');
const prisma = require('./prisma');
const { hashPassword } = require('../utils/auth');
const { desktopUploadsDir, ensureDir } = require('./paths');

async function ensureSchema() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_deleted BOOLEAN NOT NULL DEFAULT false,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price DECIMAL NOT NULL,
      category_id INTEGER NOT NULL,
      is_available BOOLEAN NOT NULL DEFAULT true,
      image_url TEXT,
      is_deleted BOOLEAN NOT NULL DEFAULT false,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_number TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'pending',
      table_id INTEGER,
      subtotal DECIMAL NOT NULL DEFAULT 0,
      discount_amount DECIMAL NOT NULL DEFAULT 0,
      tax_amount DECIMAL NOT NULL DEFAULT 0,
      final_amount DECIMAL NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      menu_item_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price DECIMAL NOT NULL,
      quantity INTEGER NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items (id)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      method TEXT NOT NULL,
      amount DECIMAL NOT NULL,
      reference_id TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      expense_date DATETIME NOT NULL,
      category TEXT NOT NULL,
      note TEXT NOT NULL,
      amount DECIMAL NOT NULL,
      payment_method TEXT NOT NULL,
      reference TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date)');
}

async function ensureDefaultAdmin() {
  const adminName = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'password';
  const existingAdmin = await prisma.user.findUnique({
    where: { name: adminName },
  });

  if (existingAdmin) {
    return;
  }

  const password = await hashPassword(adminPassword);
  await prisma.user.create({
    data: {
      name: adminName,
      role: 'Admin',
      password,
    },
  });
}

async function initializeDatabase() {
  ensureDir(desktopUploadsDir);
  await ensureSchema();
  await ensureDefaultAdmin();
  
  // Check if we need to seed demo data (first run check)
  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    const SeederService = require('../services/SeederService');
    await SeederService.seedDemoData();
  }
}

module.exports = {
  initializeDatabase,
  uploadsDir: desktopUploadsDir,
};
