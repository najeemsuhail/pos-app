# Prisma Database Migration Guide

This project uses **Prisma** as the ORM for managing database schema and migrations.

## Installation

Prisma has already been installed. If you need to reinstall:

```bash
npm install
npx prisma generate
```

## Common Prisma Commands

### 1. **Create a New Migration**

To create a new migration after modifying `schema.prisma`:

```bash
npx prisma migrate dev --name <migration_name>
```

**Example:** Add a new column to menu_items
```bash
npx prisma migrate dev --name add_description_to_menu_items
```

### 2. **Apply Migrations in Production**

Deploy migrations to production database (non-interactive):

```bash
npx prisma migrate deploy
```

### 3. **Create Migration Without Running It**

For reviewing before applying:

```bash
npx prisma migrate dev --name <migration_name> --create-only
```

### 4. **View Migration Status**

Check which migrations have been applied:

```bash
npx prisma migrate status
```

### 5. **Rollback to Previous Migration**

```bash
npx prisma migrate resolve --rolled-back <migration_name>
```

### 6. **Reset Database** ⚠️

**WARNING: This will delete all data!**

```bash
npx prisma migrate reset
```

### 7. **Generate Prisma Client**

After updating schema, regenerate the client:

```bash
npx prisma generate
```

### 8. **Open Prisma Studio** (GUI for database)

```bash
npx prisma studio
```

## Schema Structure

The database schema is defined in `prisma/schema.prisma` with these models:

- **User** - Staff and Admin users
- **Category** - Menu categories
- **MenuItem** - Menu items with image support
- **Order** - Customer orders
- **OrderItem** - Items in each order
- **Payment** - Payment transactions

## Adding New Fields

### Step 1: Update `prisma/schema.prisma`

Example - Adding description to MenuItem:

```prisma
model MenuItem {
  id        Int     @id @default(autoincrement())
  name      String
  price     Decimal @db.Decimal(10, 2)
  description String? // NEW FIELD
  categoryId Int     @map("category_id")
  // ... rest of fields
}
```

### Step 2: Create Migration

```bash
npx prisma migrate dev --name add_description_to_menu_items
```

This will:
- Create a new migration file in `prisma/migrations/`
- Apply the migration to your database
- Update the Prisma Client

## Using Prisma Client in Code

Example - Basic usage:

```javascript
import prisma from './db/prisma.js';

// Create
const user = await prisma.user.create({
  data: {
    name: 'admin',
    role: 'Admin',
    password: 'hashed_password'
  }
});

// Read
const users = await prisma.user.findMany();
const user = await prisma.user.findUnique({
  where: { id: 1 }
});

// Update
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { role: 'Staff' }
});

// Delete
await prisma.user.delete({
  where: { id: 1 }
});
```

## Environment Setup

Make sure your `.env` file has:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"
```

The `DIRECT_URL` is used for migrations (bypasses connection pooling).

## Troubleshooting

### Migration Fails with "Drift Detected"

This happens when database schema doesn't match migration history:

```bash
npx prisma migrate reset  # Dangerous - will delete all data!
# OR manually fix the database
```

### Can't Connect to Database

- Verify `DATABASE_URL` and `DIRECT_URL` in `.env`
- Check if PostgreSQL server is running
- Verify network/firewall access

### Migration Pending

If migration is stuck as "pending":

```bash
npx prisma migrate resolve --rolled-back <migration_name>
```

## Best Practices

✅ Always test migrations in development first  
✅ Keep migrations small and focused  
✅ Never commit `.env` files  
✅ Use descriptive migration names  
✅ Review migration files before deploying  
✅ Backup database before running migrations on production  

## Next Steps

1. Update repository methods to use Prisma instead of raw SQL
2. Update controllers/services to use Prisma queries
3. Remove old pool.js and raw SQL queries gradually

Example migration of a repository:

```javascript
// OLD - Using raw SQL
async findById(id) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

// NEW - Using Prisma
async findById(id) {
  return await prisma.user.findUnique({
    where: { id }
  });
}
```
