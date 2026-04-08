# Prisma Quick Reference

## NPM Scripts

Added to `package.json`:

```bash
npm run migrate              # Create and apply migrations interactively
npm run migrate:deploy       # Deploy migrations without (for production)
npm run prisma:gen          # Generate Prisma Client
npm run prisma:studio       # Open Prisma Studio UI
```

## Quick Start

### 1. Initial Setup (Already Done)

```bash
npm install                          # Install Prisma packages
npx prisma generate                  # Generate Prisma Client
npx prisma migrate dev --name init_pos_app_schema  # Create/apply initial migration
```

### 2. Make Database Changes

Edit `prisma/schema.prisma` with new models or fields.

### 3. Create and Apply Migration

```bash
# Create a migration with a descriptive name
npx prisma migrate dev --name add_status_to_orders

# This will:
# - Create new migration file in prisma/migrations/
# - Apply it to the database
# - Regenerate Prisma Client
```

### 4. Check Migration Status

```bash
npx prisma migrate status
```

Output shows applied and pending migrations.

## Example: Add New Field

### Before (schema.prisma)
```prisma
model MenuItem {
  id   Int    @id @default(autoincrement())
  name String
  price Decimal @db.Decimal(10, 2)
  // ...
}
```

### After (schema.prisma)
```prisma
model MenuItem {
  id          Int    @id @default(autoincrement())
  name        String
  price       Decimal @db.Decimal(10, 2)
  description String?  // NEW FIELD
  // ...
}
```

### Command
```bash
npx prisma migrate dev --name add_description_to_menu_items
```

## Current Migrations

1. **20260408074459_init_pos_app_schema**
   - Creates all initial tables
   - Sets up relationships and indexes
   - Adds image_url to menu_items

## Using Prisma Client

```javascript
import prisma from '/src/db/prisma.js';

// Query examples
const items = await prisma.menuItem.findMany();
const order = await prisma.order.findUnique({ where: { id: 1 } });
const user = await prisma.user.create({ data: { /* ... */ } });
```

## Production Deployment

For production servers:

```bash
npm run migrate:deploy
```

This applies pending migrations without interactive prompts.

## Troubleshooting

**"connect ECONNREFUSED"** - Database not accessible
- Check DATABASE_URL in .env
- Verify PostgreSQL is running

**"Drift detected"** - Schema mismatch
```bash
npx prisma migrate reset  # ⚠️ Deletes all data!
```

**Can't rollback** - Rollback a migration
```bash
npx prisma migrate resolve --rolled-back migration_name
```
