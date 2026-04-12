require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Import the real paths used by the application
const { desktopDbPath } = require('../src/db/paths');

console.log('--- SEED CONFIG ---');
console.log('Target Database:', desktopDbPath);

// Ensure the directory exists
const dataDir = path.dirname(desktopDbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

process.env.DATABASE_URL = `file:${desktopDbPath}`;

const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting robust demo seed process...');

  try {
    // 0. Ensure tables exist (Windows-safe execution)
    console.log('📦 Syncing schema to database...');
    const schemaPath = path.resolve(__dirname, 'schema.prisma');
    
    // Commands to try (Windows npx can be tricky)
    const prismaCommands = [
        `npx prisma db push --schema="${schemaPath}" --accept-data-loss`,
        `..\\node_modules\\.bin\\prisma db push --schema="${schemaPath}" --accept-data-loss`,
        `node ..\\node_modules\\prisma\\build\\index.js db push --schema="${schemaPath}" --accept-data-loss`
    ];

    let success = false;
    for (const cmd of prismaCommands) {
        try {
            console.log(`- Trying: ${cmd.split(' ')[0]}...`);
            execSync(cmd, {
                cwd: __dirname,
                env: { ...process.env, DATABASE_URL: `file:${desktopDbPath}` },
                stdio: 'inherit',
                shell: true // Crucial for Windows
            });
            success = true;
            break;
        } catch (e) {
            continue;
        }
    }

    if (!success) {
        console.warn('⚠️ Warning: Schema sync might have failed, but trying to proceed with seeding...');
    } else {
        console.log('✅ Schema synced.');
    }

    // 1. Create Users (Upsert)
    console.log('👥 Ensuring users exist...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    await prisma.user.upsert({
      where: { name: 'Admin' },
      update: { password: adminPassword },
      create: { name: 'Admin', role: 'Admin', password: adminPassword },
    });
    console.log('✅ Admin user ready.');

    const cashierPassword = await bcrypt.hash('cashier123', salt);
    await prisma.user.upsert({
      where: { name: 'Cashier' },
      update: { password: cashierPassword },
      create: { name: 'Cashier', role: 'Cashier', password: cashierPassword },
    });
    console.log('✅ Cashier user ready.');

    // 2. Create Categories
    console.log('📂 Populating categories...');
    const catNames = ['Continental', 'Pan-Asian', 'Italian', 'Desserts', 'Beverages'];
    const categories = [];
    
    for (const name of catNames) {
      let cat = await prisma.category.findFirst({ where: { name } });
      if (!cat) {
        cat = await prisma.category.create({ data: { name } });
      }
      categories.push(cat);
    }
    const [continental, asian, italian, desserts, drinks] = categories;

    // 3. Create Menu Items
    console.log('🍕 Populating signature dishes...');
    const menuItemsData = [
      { name: 'Grilled Salmon', price: 450, categoryId: continental.id },
      { name: 'Thai Green Curry', price: 320, categoryId: asian.id },
      { name: 'Wood-fired Pepperoni', price: 420, categoryId: italian.id },
      { name: 'Tiramisu', price: 220, categoryId: desserts.id },
      { name: 'Virgin Mojito', price: 150, categoryId: drinks.id },
      { name: 'Draft Beer', price: 280, categoryId: drinks.id },
    ];

    const createdItems = [];
    for (const item of menuItemsData) {
      const existing = await prisma.menuItem.findFirst({ where: { name: item.name } });
      if (!existing) {
        createdItems.push(await prisma.menuItem.create({ data: item }));
      } else {
        createdItems.push(existing);
      }
    }
    console.log('✅ Menu items ready.');

    // 4. Create Random Orders (Past 30 Days)
    console.log('💳 Generating billing history...');
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        const daysAgo = Math.floor(Math.random() * 30);
        date.setDate(date.getDate() - daysAgo);
        
        const randomItem = createdItems[Math.floor(Math.random() * createdItems.length)];
        const qty = Math.floor(Math.random() * 2) + 1;
        const subtotal = parseFloat(randomItem.price) * qty;
        const taxAmount = subtotal * 0.05;
        const finalAmount = subtotal + taxAmount;

        await prisma.order.create({
            data: {
                billNumber: `DEMO-${Date.now()}-${i}`,
                status: 'paid',
                subtotal,
                taxAmount,
                finalAmount,
                createdAt: date,
                updatedAt: date,
                items: {
                    create: {
                        menuItemId: randomItem.id,
                        name: randomItem.name,
                        price: randomItem.price,
                        quantity: qty,
                    }
                },
                payments: {
                    create: {
                        method: Math.random() > 0.5 ? 'Cash' : 'UPI',
                        amount: finalAmount,
                        createdAt: date,
                    },
                },
            },
        });
    }

    // 5. Create Random Expenses
    console.log('💸 Populating expense dashboard...');
    const expenseNames = ['Rent', 'Utilities', 'Salary', 'Maintenance', 'Supplies'];
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      await prisma.expense.create({
        data: {
          expenseDate: date,
          category: expenseNames[Math.floor(Math.random() * expenseNames.length)],
          note: `Demo expense #${i + 1}`,
          amount: Math.floor(Math.random() * 2000) + 100,
          paymentMethod: 'Cash',
          createdAt: date,
        },
      });
    }

    console.log('✅ Seeding completed! Real database at ' + desktopDbPath + ' is ready.');
  } catch (error) {
    console.error('❌ SEEDING ERROR:', error.message || error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ CRITICAL ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

