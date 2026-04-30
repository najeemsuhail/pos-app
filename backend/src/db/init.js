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
      feature_access_overrides TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS staff_attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      attendance_date TEXT NOT NULL,
      status TEXT NOT NULL,
      check_in TEXT,
      check_out TEXT,
      notes TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE (user_id, attendance_date)
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
      payment_status TEXT NOT NULL DEFAULT 'unpaid',
      customer_name TEXT,
      customer_phone TEXT,
      table_id INTEGER,
      order_type TEXT NOT NULL DEFAULT 'dine_in',
      subtotal DECIMAL NOT NULL DEFAULT 0,
      discount_amount DECIMAL NOT NULL DEFAULT 0,
      tax_amount DECIMAL NOT NULL DEFAULT 0,
      final_amount DECIMAL NOT NULL DEFAULT 0,
      stock_deducted BOOLEAN NOT NULL DEFAULT false,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      unit TEXT NOT NULL,
      current_stock DECIMAL NOT NULL DEFAULT 0,
      min_stock_level DECIMAL NOT NULL DEFAULT 0,
      is_deleted BOOLEAN NOT NULL DEFAULT false,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS menu_item_ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_item_id INTEGER NOT NULL,
      ingredient_id INTEGER NOT NULL,
      quantity DECIMAL NOT NULL,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items (id) ON DELETE CASCADE,
      FOREIGN KEY (ingredient_id) REFERENCES ingredients (id),
      UNIQUE (menu_item_id, ingredient_id)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS stock_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ingredient_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      quantity DECIMAL NOT NULL,
      reference_type TEXT,
      reference_id INTEGER,
      note TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS bill_sequences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_date TEXT NOT NULL UNIQUE,
      last_number INTEGER NOT NULL DEFAULT 0,
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
    CREATE TABLE IF NOT EXISTS kot_tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      kot_number TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'printed',
      printed_at DATETIME,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS kot_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kot_ticket_id INTEGER NOT NULL,
      order_item_id INTEGER,
      menu_item_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      note TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (kot_ticket_id) REFERENCES kot_tickets (id) ON DELETE CASCADE
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      method TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'Direct',
      status TEXT NOT NULL DEFAULT 'settled',
      amount DECIMAL NOT NULL,
      settled_amount DECIMAL NOT NULL DEFAULT 0,
      reference_id TEXT,
      settled_at DATETIME,
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

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      phone TEXT,
      email TEXT,
      address TEXT,
      notes TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER NOT NULL,
      purchase_date DATETIME NOT NULL,
      invoice_number TEXT,
      payment_status TEXT NOT NULL DEFAULT 'unpaid',
      subtotal DECIMAL NOT NULL DEFAULT 0,
      tax_amount DECIMAL NOT NULL DEFAULT 0,
      discount_amount DECIMAL NOT NULL DEFAULT 0,
      total_amount DECIMAL NOT NULL DEFAULT 0,
      paid_amount DECIMAL NOT NULL DEFAULT 0,
      note TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS purchase_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      purchase_id INTEGER NOT NULL,
      ingredient_id INTEGER,
      item_name TEXT NOT NULL,
      quantity DECIMAL NOT NULL,
      unit TEXT,
      unit_price DECIMAL NOT NULL,
      total_price DECIMAL NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON DELETE CASCADE,
      FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS sync_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      action TEXT NOT NULL,
      payload TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      retry_count INTEGER NOT NULL DEFAULT 0,
      last_error TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS sync_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_device_id TEXT,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      action TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await ensureColumn('menu_item_ingredients', 'ingredient_id', 'INTEGER');
  await ensureColumn('stock_movements', 'ingredient_id', 'INTEGER');
  await ensureColumn('purchase_items', 'ingredient_id', 'INTEGER');

  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_staff_attendance_attendance_date ON staff_attendance(attendance_date)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_kot_tickets_order_id ON kot_tickets(order_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_kot_tickets_status ON kot_tickets(status)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_kot_items_kot_ticket_id ON kot_items(kot_ticket_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_kot_items_order_item_id ON kot_items(order_item_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_menu_item_ingredients_ingredient_id ON menu_item_ingredients(ingredient_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_stock_movements_ingredient_id ON stock_movements(ingredient_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_stock_movements_type ON stock_movements(type)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_purchases_supplier_id ON purchases(supplier_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_purchases_purchase_date ON purchases(purchase_date)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_purchases_payment_status ON purchases(payment_status)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_purchase_items_purchase_id ON purchase_items(purchase_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_purchase_items_ingredient_id ON purchase_items(ingredient_id)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status, updated_at)');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_sync_events_created_at ON sync_events(created_at)');

  await ensureColumn('users', 'feature_access_overrides', 'TEXT');
  await ensureColumn('orders', 'payment_status', "TEXT NOT NULL DEFAULT 'unpaid'");
  await ensureColumn('orders', 'customer_name', 'TEXT');
  await ensureColumn('orders', 'customer_phone', 'TEXT');
  await ensureColumn('orders', 'order_type', "TEXT NOT NULL DEFAULT 'dine_in'");
  await ensureColumn('orders', 'stock_deducted', 'BOOLEAN NOT NULL DEFAULT false');
  await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS idx_orders_order_type ON orders(order_type)');
  await ensureColumn('payments', 'source', "TEXT NOT NULL DEFAULT 'Direct'");
  await ensureColumn('payments', 'status', "TEXT NOT NULL DEFAULT 'settled'");
  await ensureColumn('payments', 'settled_amount', 'DECIMAL NOT NULL DEFAULT 0');
  await ensureColumn('payments', 'settled_at', 'DATETIME');

  await prisma.$executeRawUnsafe(
    "UPDATE orders SET payment_status = 'paid' WHERE status = 'paid' AND (payment_status IS NULL OR payment_status = '' OR payment_status = 'unpaid')"
  );
  await prisma.$executeRawUnsafe(
    "UPDATE orders SET status = 'completed' WHERE status = 'paid'"
  );
  await prisma.$executeRawUnsafe(
    "UPDATE orders SET order_type = CASE WHEN table_id IS NULL THEN COALESCE(NULLIF(TRIM(order_type), ''), 'takeaway') ELSE 'dine_in' END WHERE order_type IS NULL OR TRIM(order_type) = ''"
  );
  await prisma.$executeRawUnsafe(
    "UPDATE payments SET source = 'Direct' WHERE source IS NULL OR TRIM(source) = ''"
  );
  await prisma.$executeRawUnsafe(
    "UPDATE payments SET status = CASE WHEN LOWER(COALESCE(method, '')) = 'credit' OR LOWER(COALESCE(source, '')) IN ('swiggy', 'zomato') THEN 'pending' ELSE 'settled' END WHERE status IS NULL OR TRIM(status) = ''"
  );
  await prisma.$executeRawUnsafe(
    "UPDATE payments SET settled_amount = CASE WHEN status = 'settled' AND (settled_amount IS NULL OR settled_amount = 0) THEN amount ELSE COALESCE(settled_amount, 0) END"
  );
  await prisma.$executeRawUnsafe(
    "UPDATE payments SET settled_at = created_at WHERE status = 'settled' AND settled_at IS NULL"
  );
}

async function hasColumn(tableName, columnName) {
  const columns = await prisma.$queryRawUnsafe(`PRAGMA table_info(${tableName})`);
  return columns.some((column) => column.name === columnName);
}

async function ensureColumn(tableName, columnName, definition) {
  if (await hasColumn(tableName, columnName)) {
    return;
  }

  await prisma.$executeRawUnsafe(
    `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`
  );
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
  const orderCount = await prisma.order.count();
  
  if (categoryCount === 0 && orderCount === 0) {
    console.log('[Init] Fresh installation detected. Bootstrapping demo data...');
    try {
      const SeederService = require('../services/SeederService');
      await SeederService.seedDemoData();
      console.log('[Init] Demo data bootstrap complete.');
    } catch (err) {
      console.error('[Init] Error during database bootstrap:', err);
    }
  } else {
    console.log('[Init] Database already initialized. Skipping bootstrap.');
  }
}

module.exports = {
  initializeDatabase,
  uploadsDir: desktopUploadsDir,
};
