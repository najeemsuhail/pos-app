const prisma = require('../db/prisma');

class AdminController {
  async resetDatabase(req, res, next) {
    try {
      const currentUser = req.user;

      console.log(`[AdminController] Factory reset initiated by user ${currentUser.id} (${currentUser.name})`);

      // Deleting in order of dependency
      await prisma.$transaction([
        // Clear transaction history
        prisma.orderItem.deleteMany(),
        prisma.payment.deleteMany(),
        prisma.order.deleteMany(),
        
        // Clear product catalog
        prisma.menuItem.deleteMany(),
        prisma.category.deleteMany(),
        
        // Clear expenses
        prisma.expense.deleteMany(),
        
        // Clear non-admin users
        prisma.user.deleteMany({
          where: {
            role: { not: 'Admin' }
          }
        })
      ]);

      console.log('[AdminController] Factory reset completed successfully');
      res.json({ message: 'System reset successful. All demo data has been cleared.' });
    } catch (error) {
      console.error('[AdminController] Factory reset failed:', error);
      next(error);
    }
  }
}

module.exports = new AdminController();
