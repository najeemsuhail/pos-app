const prisma = require('../db/prisma');
const bcrypt = require('bcryptjs');

class SeederService {
  async seedDemoData() {
    console.log('[SeederService] Starting automated demo data generation...');
    
    try {
      // 1. Create Categories
      const catData = [
        { name: 'Appetizers' }, { name: 'Soups & Salads' }, { name: 'Pizza & Pasta' },
        { name: 'Main Course' }, { name: 'Asian Fusion' }, { name: 'Burgers & Wraps' },
        { name: 'Desserts' }, { name: 'Beverages' }, { name: 'Specialty Coffee' },
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

      // 2. Create Menu Items
      const menuItemsData = [
        { name: 'Crispy Calamari', price: 380, categoryId: categoryMap['Appetizers'].id },
        { name: 'Chicken Wings (6pcs)', price: 350, categoryId: categoryMap['Appetizers'].id },
        { name: 'Cream of Mushroom', price: 180, categoryId: categoryMap['Soups & Salads'].id },
        { name: 'Caesar Salad', price: 320, categoryId: categoryMap['Soups & Salads'].id },
        { name: 'Margherita Pizza', price: 380, categoryId: categoryMap['Pizza & Pasta'].id },
        { name: 'Fettuccine Alfredo', price: 420, categoryId: categoryMap['Pizza & Pasta'].id },
        { name: 'Grilled Salmon Steak', price: 650, categoryId: categoryMap['Main Course'].id },
        { name: 'BBQ Pork Ribs', price: 580, categoryId: categoryMap['Main Course'].id },
        { name: 'Thai Green Curry', price: 380, categoryId: categoryMap['Asian Fusion'].id },
        { name: 'Classic Cheeseburger', price: 350, categoryId: categoryMap['Burgers & Wraps'].id },
        { name: 'Tiramisu', price: 220, categoryId: categoryMap['Desserts'].id },
        { name: 'Chocolate Lava Cake', price: 250, categoryId: categoryMap['Desserts'].id },
        { name: 'Coke / Sprite / Fanta', price: 60, categoryId: categoryMap['Beverages'].id },
        { name: 'Cappuccino', price: 160, categoryId: categoryMap['Specialty Coffee'].id },
        { name: 'Virgin Mojito', price: 180, categoryId: categoryMap['Mocktails'].id }
      ];

      const createdItems = [];
      for (const item of menuItemsData) {
        let existing = await prisma.menuItem.findFirst({ where: { name: item.name } });
        if (!existing) {
          createdItems.push(await prisma.menuItem.create({ data: item }));
        } else {
          createdItems.push(existing);
        }
      }

      // 3. Create Orders (Past 30 days - lighter than full seed for performance)
      const orderCount = 45;
      for (let i = 0; i < orderCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        const numItems = Math.floor(Math.random() * 2) + 1;
        const orderItems = [];
        let subtotal = 0;
        
        for (let j = 0; j < numItems; j++) {
            const item = createdItems[Math.floor(Math.random() * createdItems.length)];
            const qty = Math.floor(Math.random() * 2) + 1;
            subtotal += parseFloat(item.price) * qty;
            orderItems.push({
                menuItemId: item.id,
                name: item.name,
                price: item.price,
                quantity: qty
            });
        }

        const finalAmount = subtotal * 1.05; // 5% tax simplification

        await prisma.order.create({
            data: {
                billNumber: `INIT-${Date.now()}-${i}`,
                status: 'paid',
                subtotal,
                taxAmount: subtotal * 0.05,
                finalAmount,
                createdAt: date,
                updatedAt: date,
                items: { create: orderItems },
                payments: {
                    create: {
                        method: Math.random() > 0.5 ? 'UPI' : 'Cash',
                        amount: finalAmount,
                        createdAt: date,
                    }
                }
            }
        });
      }

      console.log('[SeederService] Automated seeding completed successfully.');
      return true;
    } catch (error) {
      console.error('[SeederService] Automated seeding failed:', error);
      return false;
    }
  }
}

module.exports = new SeederService();
