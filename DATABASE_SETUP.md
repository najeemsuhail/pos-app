# Restaurant POS - Database Setup Instructions

## Quick Setup (Recommended)

### Windows (using WSL or pgAdmin):

1. **Using psql command line:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # In psql console:
   CREATE DATABASE pos_db OWNER postgres;
   \q
   
   # Create tables and indexes
   psql -U postgres -d pos_db -f database/schema.sql
   
   # Seed demo data
   psql -U postgres -d pos_db -f database/seed.sql
   ```

2. **Using pgAdmin (GUI):**
   - Open pgAdmin
   - Create new database: `pos_db`
   - Right-click database → Query Tool
   - Copy-paste content of `database/schema.sql` → Execute
   - Copy-paste content of `database/seed.sql` → Execute

### Linux / Mac:

```bash
# Create database
createdb pos_db

# Create schema
psql pos_db < database/schema.sql

# Seed data
psql pos_db < database/seed.sql

# Verify setup
psql pos_db -c "SELECT COUNT(*) FROM users;"
```

## Verify Installation

```bash
# Connect to database
psql -U postgres -d pos_db

# Run these queries to verify:
SELECT COUNT(*) FROM categories;     -- Should show: 3
SELECT COUNT(*) FROM menu_items;     -- Should show: 6
SELECT COUNT(*) FROM users;          -- Should show: 2
\q
```

## Database Schema Overview

### Tables Created:
1. **users** - User accounts (admin, staff)
2. **categories** - Menu categories
3. **menu_items** - Menu items with prices
4. **orders** - Order records
5. **order_items** - Items in each order
6. **payments** - Payment records

### Demo Data Included:
- **Users:** admin, staff1 (password: password)
- **Categories:** Starters, Main Course, Drinks
- **Menu Items:** 6 sample items

## Manual Schema Creation (if needed)

If automatic setup fails, create tables manually:

```sql
-- Copy content from database/schema.sql
-- Paste into your PostgreSQL IDE
-- Execute
```

## Troubleshooting

### "Database already exists"
```bash
# Drop and recreate
dropdb pos_db
createdb pos_db
psql -U postgres -d pos_db -f database/schema.sql
```

### "Role 'postgres' does not exist"
```bash
# Use your actual PostgreSQL username
psql -U your_username -d pos_db -f database/schema.sql
```

### "permission denied"
```bash
# Grant permissions
psql -U postgres -d pos_db -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;"
```

### Connection refused
- Ensure PostgreSQL service is running
- Windows: Start → Services → PostgreSQL
- Linux: `sudo systemctl start postgresql`
- Mac: `brew services start postgresql`

## For Production

Before deploying to production:

1. **Change credentials:**
   - Update backend `.env` with strong database password
   - Update JWT_SECRET with random key

2. **Create database backup:**
   ```bash
   pg_dump -U postgres pos_db > backup.sql
   ```

3. **Performance tuning:**
   ```sql
   -- For large datasets, add more indexes
   CREATE INDEX idx_orders_user ON orders(user_id);
   CREATE INDEX idx_payments_status ON payments(status);
   ```

## Resetting Database

```bash
# Drop everything and start fresh
dropdb pos_db
createdb pos_db
psql -U postgres -d pos_db -f database/schema.sql
psql -U postgres -d pos_db -f database/seed.sql
```

## Backup & Restore

```bash
# Backup
pg_dump -U postgres pos_db > backup.sql

# Restore
psql -U postgres pos_db < backup.sql
```
