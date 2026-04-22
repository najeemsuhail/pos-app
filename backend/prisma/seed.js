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
    console.log('📂 Populating comprehensive categories...');
    const catData = [
      { name: 'Appetizers' },
      { name: 'Soups & Salads' },
      { name: 'Pizza & Pasta' },
      { name: 'Main Course' },
      { name: 'Asian Fusion' },
      { name: 'Burgers & Wraps' },
      { name: 'Desserts' },
      { name: 'Beverages' },
      { name: 'Specialty Coffee' },
      { name: 'Mocktails' }
    ];
    
    const categoryMap = {};
    for (const item of catData) {
      let cat = await prisma.category.findFirst({ where: { name: item.name } });
      if (!cat) {
        cat = await prisma.category.create({ data: { name: item.name } });
      }
      categoryMap[item.name] = cat;
    }

    // 3. Create Menu Items
    console.log('🍕 Populating diverse menu items (40+ items)...');
    const menuItemsData = [
      // Appetizers
      { name: 'Crispy Calamari', price: 380, categoryId: categoryMap['Appetizers'].id },
      { name: 'Stuffed Mushrooms', price: 290, categoryId: categoryMap['Appetizers'].id },
      { name: 'Chicken Wings (6pcs)', price: 350, categoryId: categoryMap['Appetizers'].id },
      { name: 'Nachos Supreme', price: 420, categoryId: categoryMap['Appetizers'].id },
      
      // Soups & Salads
      { name: 'Cream of Mushroom', price: 180, categoryId: categoryMap['Soups & Salads'].id },
      { name: 'Caesar Salad', price: 320, categoryId: categoryMap['Soups & Salads'].id },
      { name: 'Greek Salad', price: 280, categoryId: categoryMap['Soups & Salads'].id },
      
      // Pizza & Pasta
      { name: 'Margherita Pizza', price: 380, categoryId: categoryMap['Pizza & Pasta'].id },
      { name: 'Pepperoni Feast', price: 480, categoryId: categoryMap['Pizza & Pasta'].id },
      { name: 'Penne Arrabbiata', price: 350, categoryId: categoryMap['Pizza & Pasta'].id },
      { name: 'Fettuccine Alfredo', price: 420, categoryId: categoryMap['Pizza & Pasta'].id },
      
      // Main Course
      { name: 'Grilled Salmon Steak', price: 650, categoryId: categoryMap['Main Course'].id },
      { name: 'BBQ Pork Ribs', price: 580, categoryId: categoryMap['Main Course'].id },
      { name: 'Beef Tenderloin', price: 720, categoryId: categoryMap['Main Course'].id },
      { name: 'Roast Chicken', price: 450, categoryId: categoryMap['Main Course'].id },
      
      // Asian Fusion
      { name: 'Thai Green Curry', price: 380, categoryId: categoryMap['Asian Fusion'].id },
      { name: 'Kung Pao Chicken', price: 420, categoryId: categoryMap['Asian Fusion'].id },
      { name: 'Sushi Platter (12pcs)', price: 850, categoryId: categoryMap['Asian Fusion'].id },
      { name: 'Stir-fry Noodles', price: 320, categoryId: categoryMap['Asian Fusion'].id },
      
      // Burgers & Wraps
      { name: 'Classic Cheeseburger', price: 350, categoryId: categoryMap['Burgers & Wraps'].id },
      { name: 'Crispy Chicken Burger', price: 320, categoryId: categoryMap['Burgers & Wraps'].id },
      { name: 'Veggie Garden Wrap', price: 280, categoryId: categoryMap['Burgers & Wraps'].id },
      
      // Desserts
      { name: 'Tiramisu', price: 220, categoryId: categoryMap['Desserts'].id },
      { name: 'Chocolate Lava Cake', price: 250, categoryId: categoryMap['Desserts'].id },
      { name: 'Cheesecake Slice', price: 240, categoryId: categoryMap['Desserts'].id },
      { name: 'Apple Pie with Ice Cream', price: 210, categoryId: categoryMap['Desserts'].id },
      
      // Beverages
      { name: 'Coke / Sprite / Fanta', price: 60, categoryId: categoryMap['Beverages'].id },
      { name: 'Mineral Water', price: 40, categoryId: categoryMap['Beverages'].id },
      { name: 'Fresh Lime Soda', price: 90, categoryId: categoryMap['Beverages'].id },
      
      // Specialty Coffee
      { name: 'Cappuccino', price: 160, categoryId: categoryMap['Specialty Coffee'].id },
      { name: 'Caffè Latte', price: 170, categoryId: categoryMap['Specialty Coffee'].id },
      { name: 'Iced Americano', price: 140, categoryId: categoryMap['Specialty Coffee'].id },
      { name: 'Caramel Macchiato', price: 190, categoryId: categoryMap['Specialty Coffee'].id },
      
      // Mocktails
      { name: 'Virgin Mojito', price: 180, categoryId: categoryMap['Mocktails'].id },
      { name: 'Blue Lagoon', price: 190, categoryId: categoryMap['Mocktails'].id },
      { name: 'Strawberry Daiquiri', price: 210, categoryId: categoryMap['Mocktails'].id }
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

    // 4. Create Random Orders (Past 60 Days - Heavier Vol)
    console.log('💳 Generating significant billing history (120+ orders)...');
    for (let i = 0; i < 120; i++) {
        const date = new Date();
        const daysAgo = Math.floor(Math.random() * 60);
        date.setDate(date.getDate() - daysAgo);
        
        // Randomly pick 1-4 items per order
        const numItems = Math.floor(Math.random() * 3) + 1;
        const orderItems = [];
        let subtotal = 0;
        
        for (let j = 0; j < numItems; j++) {
          const item = createdItems[Math.floor(Math.random() * createdItems.length)];
          const qty = Math.floor(Math.random() * 2) + 1;
          const itemTotal = parseFloat(item.price) * qty;
          subtotal += itemTotal;
          orderItems.push({
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity: qty
          });
        }

        const taxAmount = subtotal * 0.05;
        const finalAmount = subtotal + taxAmount;

        await prisma.order.create({
            data: {
                billNumber: `INV-${Date.now()}-${i}`,
                status: 'completed',
                paymentStatus: 'paid',
                subtotal,
                taxAmount,
                finalAmount,
                createdAt: date,
                updatedAt: date,
                items: {
                    create: orderItems
                },
                payments: {
                    create: {
                        method: Math.random() > 0.4 ? 'UPI' : 'Cash',
                        source: 'Direct',
                        status: 'settled',
                        amount: finalAmount,
                        settledAmount: finalAmount,
                        settledAt: date,
                        createdAt: date,
                    },
                },
            },
        });
    }

    // 5. Create Random Expenses
    console.log('💸 Populating extensive expense entries...');
    const expenseData = [
      { category: 'Rent', note: 'Monthly outlet rent' },
      { category: 'Utilities', note: 'Electricity & Water bill' },
      { category: 'Salary', note: 'Head Chef salary' },
      { category: 'Salary', note: 'Waitstaff salaries' },
      { category: 'Supplies', note: 'Vegetables & Meat supply' },
      { category: 'Supplies', note: 'Dairy products' },
      { category: 'Maintenance', note: 'Kitchen AC repair' },
      { category: 'Maintenance', note: 'Duct cleaning' },
      { category: 'Marketing', note: 'Facebook/Instagram ads' },
      { category: 'Marketing', note: 'Local flyer distribution' },
      { category: 'Other', note: 'Miscellaneous stationaries' }
    ];

    for (let i = 0; i < 25; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 60));
      const expTemplate = expenseData[Math.floor(Math.random() * expenseData.length)];
      await prisma.expense.create({
        data: {
          expenseDate: date,
          category: expTemplate.category,
          note: expTemplate.note,
          amount: Math.floor(Math.random() * 5000) + 200,
          paymentMethod: Math.random() > 0.5 ? 'Bank Transfer' : 'Cash',
          createdAt: date,
        },
      });
    }

    console.log('✅ Seeding completed! Database is now rich with production-grade demo data.');
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
