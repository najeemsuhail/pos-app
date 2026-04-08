# Supabase Database Setup Guide

## Step 1: Create Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project for free"**
3. Sign up with email/GitHub
4. Create a new project:
   - **Project name:** `pos-db` (or your choice)
   - **Database password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
   - Click **"Create new project"**

Wait 2-3 minutes for the project to initialize.

---

## Step 2: Get Connection Details

Once your project is ready:

1. Go to **Settings** → **Database** (left sidebar)
2. Under **Connection string**, you'll see options:
   - Choose **"URI"** for full connection string
   - Copy the connection string that looks like:
     ```
     postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
     ```

Or individual details:
   - **Host:** Get from Connection Info
   - **Port:** Usually `5432`
   - **Database:** `postgres`
   - **User:** `postgres`
   - **Password:** The password you set during project creation

---

## Step 3: Update Backend .env File

Edit `backend/.env`:

```env
NODE_ENV=development
PORT=5000
DB_HOST=<your-supabase-host>.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-database-password>
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRY=7d
THERMAL_PAPER_WIDTH=80
```

**To find your Supabase host:**
1. Go to Project Settings → Database
2. Look for "Host" under Connection info
3. It will look like: `xyz123.supabase.co`

---

## Step 4: Run Database Schema on Supabase

You have two options:

### Option A: Using Supabase Dashboard (Easiest)

1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New Query"**
3. Copy entire content of `database/schema.sql`
4. Paste into the SQL editor
5. Click **"Run"**
6. Repeat with `database/seed.sql` to add demo data

### Option B: Using psql Command Line

First, install PostgreSQL tools if needed:

**Windows:**
```bash
# Download PostgreSQL from https://www.postgresql.org/download/windows/
# During installation, choose to install "Command Line Tools"
```

**Mac:**
```bash
brew install libpq
```

**Then run:**
```bash
# Set connection details (replace with your Supabase values)
psql -h <your-host>.supabase.co -U postgres -d postgres -f database/schema.sql
psql -h <your-host>.supabase.co -U postgres -d postgres -f database/seed.sql

# It will prompt for password (your database password)
```

### Option C: Using GUI Tool (PgAdmin or DBeaver)

1. Download PgAdmin or DBeaver
2. Create new connection:
   - **Host:** Your Supabase host
   - **Port:** 5432
   - **Database:** postgres
   - **User:** postgres
   - **Password:** Your database password
3. Connect and run SQL files

---

## Step 5: Verify Database Setup

Check if tables were created:

```bash
# In Supabase SQL Editor or psql:
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
```

You should see 6 tables:
- ✅ users
- ✅ categories
- ✅ menu_items
- ✅ orders
- ✅ order_items
- ✅ payments

---

## Step 6: Test Connection from Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
POS Backend running on port 5000
```

If no errors, congratulations! Connection is working.

---

## Step 7: Test with Frontend

```bash
cd frontend
npm install
npm start
```

Login with:
```
Username: admin
Password: password
```

---

## Supabase Dashboard Features

### View Data
- **Table Editor** - Browse and edit data directly
- **SQL Editor** - Run custom queries

### Manage Users
- **Auth** - User authentication management
- **Settings** → **Database** - Password, backup settings

### Monitor Usage
- **Usage** - See project usage stats
- **Logs** - View activity logs

---

## Troubleshooting

### "Connection Refused"
- Check host/port is correct
- Verify password is correct
- Ensure project is in "Running" state in Supabase dashboard

### "Permission Denied"
- Use `postgres` user (not other users)
- Check database password

### "Tables Not Found"
- Verify SQL schema was executed successfully
- Check Supabase SQL Editor for errors

### "SSL Certificate Error"
Add to backend connection (if needed):
```
?sslmode=require
```

---

## Environment Variables Reference

| Variable | Example | Notes |
|----------|---------|-------|
| DB_HOST | `abc123.supabase.co` | From Supabase connection info |
| DB_PORT | `5432` | Usually 5432 for Supabase |
| DB_NAME | `postgres` | Default is `postgres` |
| DB_USER | `postgres` | Use postgres user |
| DB_PASSWORD | `your_password_here` | Password you set during setup |

---

## Important Security Notes

🔒 **Never commit .env file to Git**
- It contains sensitive credentials
- .gitignore already excludes it

🔒 **In Production:**
- Use strong, random database password
- Enable SSL connections (Supabase default)
- Use environment variables from your hosting provider
- Rotate passwords regularly

---

## Backup & Restore

### Backup (Supabase)
1. Go to **Settings** → **Database**
2. Under **Backups**, automatic backups are enabled
3. You can manually trigger backup from this screen

### Manual Backup (Command Line)
```bash
# Backup all data
pg_dump -h <host> -U postgres -d postgres > backup.sql

# Restore from backup
psql -h <host> -U postgres -d postgres < backup.sql
```

---

## Switching Back to Local PostgreSQL

If you want to switch back to local database:

Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pos_db
DB_USER=postgres
DB_PASSWORD=postgres
```

Make sure local PostgreSQL is running and database created.

---

## Next Steps

1. ✅ Create Supabase project
2. ✅ Get connection details
3. ✅ Update .env file
4. ✅ Run schema SQL
5. ✅ Run seed data SQL
6. ✅ Test backend connection
7. ✅ Test frontend login
8. Start billing!

---

## Quick Reference

**Supabase Project Created?** ✅ or ❌
**Connection Details Ready?** ✅ or ❌
**Tables Created?** ✅ or ❌
**Backend Connected?** ✅ or ❌
**Frontend Working?** ✅ or ❌

---

Need help? Check the troubleshooting section or review connection details from Supabase dashboard.
