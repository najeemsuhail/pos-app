# Supabase Setup - Step by Step Visual Guide

## 🚀 Quick Setup (10 minutes)

### Step 1: Create Supabase Project

```
1. Go to https://supabase.com
2. Click "Start your project for free"
3. Sign in (GitHub or email)
4. Click "New project"

        ┌─────────────────────────┐
        │  Create New Project     │
        ├─────────────────────────┤
        │ Organization: (yours)   │
        │ Project name: pos-db    │
        │ Database pw: ••••••••   │
        │ Region: [Closest]       │
        │ [Create new project]    │
        └─────────────────────────┘

⏳ Wait 2-3 minutes for setup to complete
```

---

### Step 2: Get Connection Details

```
In Supabase Dashboard:
Settings → Database → Connection

You need FOUR pieces of info:

📍 HOST:     abc123.supabase.co
🔑 USER:     postgres  
🔐 PASSWORD: Your_Database_Password
📦 DATABASE: postgres
```

**Example full credentials:**
```
Host:     prof123abc.supabase.co
Port:     5432
User:     postgres
Password: abcd1234xyz5678!@#$
Database: postgres
```

---

### Step 3: Update Backend .env

Edit `backend/.env`:

```bash
# Copy this template
NODE_ENV=development
PORT=5000
DB_HOST=prof123abc.supabase.co        # Your Supabase host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=abcd1234xyz5678!@#$       # Your Supabase password
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRY=7d
THERMAL_PAPER_WIDTH=80
```

**Where to find each value:**

```
Supabase Dashboard → Settings → Database

┌─────────────────────────────────────────┐
│ Connection Info                         │
├─────────────────────────────────────────┤
│ Host:        prof123abc.supabase.co     │ <- DB_HOST
│ Port:        5432                       │ <- DB_PORT
│ Database:    postgres                   │ <- DB_NAME
│ User:        postgres                   │ <- DB_USER
│ Password:    [Your password here]       │ <- DB_PASSWORD
│ SSL Mode:    require                    │
└─────────────────────────────────────────┘
```

---

### Step 4: Create Database Tables

**EASIEST METHOD - Supabase SQL Editor:**

1. In Supabase Dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open `database/schema.sql` in your editor
4. Copy ALL the content
5. Paste into Supabase SQL Editor
6. Click **"Run"**

```
Supabase Dashboard
    ↓
SQL Editor (left menu)
    ↓
New Query
    ↓
[Paste schema.sql content]
    ↓
Click RUN ▶️
    ↓
✅ Tables created!
```

---

### Step 5: Add Demo Data

Repeat Step 4 but with `database/seed.sql`:

1. Click **"New Query"**
2. Copy content of `database/seed.sql`
3. Paste and **Run**

```
Result:
✅ 1 admin user created
✅ 1 staff user created
✅ 3 categories created
✅ 6 menu items created
```

---

### Step 6: Verify Setup

In Supabase SQL Editor, run:

```sql
-- Check if tables exist
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Check users
SELECT name, role FROM users;

-- Check categories
SELECT name FROM categories;

-- Check menu items
SELECT name, price FROM menu_items LIMIT 5;
```

You should see:
```
Tables: categories, menu_items, order_items, orders, payments, users ✅

Users: admin, staff1 ✅

Categories: Starters, Main Course, Drinks ✅

Menu Items: Samosa, Paneer Tikka, etc. ✅
```

---

### Step 7: Start Backend

```bash
cd backend
npm install        # If not already done
npm run dev
```

**Expected output:**
```
POS Backend running on port 5000
```

If you see this, Supabase connection is working! ✅

---

### Step 8: Start Frontend

```bash
cd frontend
npm install        # If not already done
npm start
```

**Browser opens:**
```
http://localhost:3000
```

---

### Step 9: Login & Test

```
Username: admin
Password: password
```

If you can:
- ✅ Login successfully
- ✅ See menu items
- ✅ Create an order
- ✅ Add items
- ✅ Process payment

**Then Supabase setup is complete!** 🎉

---

## 📋 Checklist

Before moving forward, verify:

- [ ] Supabase account created
- [ ] Project created
- [ ] Connection details noted
- [ ] .env file updated
- [ ] Schema SQL executed
- [ ] Seed SQL executed
- [ ] Tables visible in Supabase
- [ ] Backend connected
- [ ] Frontend loaded
- [ ] Login successful

---

## 🔧 Troubleshooting

### ❌ "Connection refused"

**Problem:** Backend cannot connect to Supabase

**Solution:**
1. Check `DB_HOST` is correct (must end with `.supabase.co`)
2. Check `DB_PASSWORD` is correct
3. Verify project is "Running" in Supabase (check dashboard)
4. Ensure `DB_PORT=5432`

```bash
# Test connection from command line
psql -h prof123abc.supabase.co -U postgres -d postgres
# It will ask for password - enter your Supabase password
```

---

### ❌ "Tables not found"

**Problem:** Schema SQL didn't run correctly

**Solution:**
1. Go to Supabase SQL Editor
2. Run this to check:
   ```sql
   SELECT * FROM pg_tables WHERE schemaname = 'public';
   ```
3. If no tables, try running schema.sql again
4. Check for error messages in SQL Editor

---

### ❌ "Login fails"

**Problem:** Cannot login with admin/password

**Solution:**
1. Check seed.sql was executed
2. Verify users table has data:
   ```sql
   SELECT * FROM users;
   ```
3. If empty, run seed.sql again

---

### ❌ Frontend shows "API error"

**Problem:** Frontend cannot reach backend API

**Solution:**
1. Check backend is running: `npm run dev` in `backend/` folder
2. Check backend shows "POS Backend running on port 5000"
3. Check `REACT_APP_API_URL` in `frontend/.env`

---

## 🎯 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Host not found | Copy full host from Supabase (includes .supabase.co) |
| Wrong password | Verify password at Supabase → Settings → Database |
| SSL error | Normal for Supabase, it uses SSL by default |
| Slow database | Supabase free tier is slower, upgrade if needed |
| Tables disappeared | Check if project initialized fully, wait if needed |

---

## 📖 Reference

### Database Credentials Format

```
Local PostgreSQL:
  Host: localhost
  Port: 5432
  User: postgres
  Password: postgres

Supabase:
  Host: abc123xyz.supabase.co
  Port: 5432
  User: postgres
  Password: [Your strong password]
```

### File Locations

```
.env file location: backend/.env
Schema file:        database/schema.sql
Seed file:          database/seed.sql
Backend:            backend/src/index.js
Frontend:           frontend/src/App.js
```

---

## ✨ Success Indicators

Once complete, you should have:

✅ Live database in Supabase
✅ All 6 tables created
✅ Demo users and items loaded
✅ Backend connected to Supabase
✅ Frontend able to login
✅ POS system ready to use

---

## 🚀 You're Done!

Your restaurant POS system is now running on **Supabase cloud database** instead of local PostgreSQL!

**Advantages:**
- ✅ No local database installation needed
- ✅ Automatic backups
- ✅ Accessible from anywhere
- ✅ Scales with your business
- ✅ Free tier for testing

**Next Steps:**
1. Process some test orders
2. Check daily reports
3. Customize menu items
4. Deploy to production when ready

Enjoy your cloud-powered POS system! 💰☁️
