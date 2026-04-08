# Supabase Quick Reference Card

## 🎯 Essential Info Checklist

Print this and fill in as you go:

```
────────────────────────────────────────
SUPABASE PROJECT DETAILS
────────────────────────────────────────

Project Name: _____________________
Organization: _____________________
Creation Date: _____________________

────────────────────────────────────────
DATABASE CREDENTIALS (from Settings → Database)
────────────────────────────────────────

Host:         ________________________
Port:         ________________________
Database:     ________________________
User:         ________________________
Password:     ________________________

JWT Secret:   ________________________

────────────────────────────────────────
CONNECTION STRING
────────────────────────────────────────

postgresql://[user]:[password]@[host]:[port]/[database]

────────────────────────────────────────
.ENV FILE LOCATION
────────────────────────────────────────

backend/.env

────────────────────────────────────────
STATUS
────────────────────────────────────────

□ Supabase account created
□ Project created
□ Credentials copied
□ backend/.env updated
□ Schema applied
□ Seed data applied
□ Backend connected
□ Frontend working
```

---

## 📍 Supabase Dashboard Locations

```
MAIN MENU (Left Sidebar):
├─ Home - Overview
├─ Editor - SQL Editor (WHERE YOU RUN SCHEMA & SEED)
├─ Auth - User management
├─ Database
│  ├─ Tables - Browse data
│  └─ Backups - Manual backups
└─ Settings
   ├─ General - Project info
   ├─ Database - CONNECTION STRINGS HERE!
   └─ API - API keys

KEY PAGES:
→ Settings → Database   (Get HOST, USER, PASSWORD, PORT)
→ SQL Editor           (Run schema.sql and seed.sql)
→ Table Editor         (View and edit data)
```

---

## 💾 3-Step Quick Start

### Step 1️⃣ Get Credentials (2 min)
```
1. Supabase Dashboard → Settings → Database
2. Copy FOUR values:
   - Host
   - User (usually: postgres)
   - Password (you set this)
   - Database (usually: postgres)
```

### Step 2️⃣ Update .env (1 min)
```
Edit: backend/.env

DB_HOST=<your-host>.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-password>
```

### Step 3️⃣ Create Tables (2 min)
```
1. Supabase → SQL Editor → New Query
2. Copy entire content of: database/schema.sql
3. Paste in SQL Editor
4. Click RUN
5. Repeat with: database/seed.sql
```

**Done!** ✅

---

## 🔑 Where to Find Each Value

### HOST
```
Supabase Dashboard
  → Settings
  → Database
  → Connection info
  
Look for: "Host"
Example: abc123xyz.supabase.co
```

### PASSWORD
```
The password YOU entered when creating the project
If forgotten:
  → Project Settings
  → Reset database password
  → Create new password
```

### PORT
```
Always: 5432
(Unless you changed it)
```

### USER & DATABASE
```
User: postgres (default)
Database: postgres (default)
```

---

## 🚀 Verification Commands

### Test 1: Verify Tables Created
```
In Supabase SQL Editor:

SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

Expected result: 6 tables
- categories
- menu_items
- order_items
- orders
- payments
- users
```

### Test 2: Verify Users Exist
```
In Supabase SQL Editor:

SELECT name, role FROM users;

Expected result:
- admin     | Admin
- staff1    | Staff
```

### Test 3: Backend Connection (in Terminal)
```
cd backend
npm run dev

Expected output:
POS Backend running on port 5000
```

### Test 4: Frontend Login
```
1. Frontend running at http://localhost:3000
2. Login: admin / password
3. Should see menu items
```

---

## ⚡ Common Tasks

### View All Data in a Table
```
Supabase Dashboard
  → Table Editor
  → Select table name
  → Browse data
```

### Add New Menu Item
```
1. Table Editor → menu_items
2. Click "Insert" or "+"
3. Fill fields:
   - name: "Dish Name"
   - price: 100
   - category_id: 1
   - is_available: true
   - is_deleted: false
4. Save
```

### View Orders
```
1. Table Editor → orders
2. All orders visible with:
   - bill_number
   - status (pending/paid)
   - final_amount
   - created_at
```

### Manual Backup
```
Supabase Dashboard
  → Settings
  → Database
  → Backups
  → Request backup

Or via SQL Editor:
pg_dump -h host -U postgres > backup.sql
```

### Reset Database
```
⚠️ CAREFUL - This deletes everything!

1. Supabase SQL Editor
2. Run: DROP SCHEMA public CASCADE;
3. Then: CREATE SCHEMA public;
4. Then run schema.sql again
```

---

## 🆘 Troubleshooting Quick Fixes

| Error | Fix |
|-------|-----|
| Connection refused | Check Host and Password are correct |
| Tables not found | Run schema.sql again in SQL Editor |
| Login fails | Run seed.sql to create users |
| Slow queries | Upgrade to Pro tier if on free |
| Can't find password | Reset it in Project Settings |

---

## 📱 Accessing From Phone/Laptop

After setup, your database is accessible from anywhere!

### On Different Device:
```
1. Get connection string
2. Use PgAdmin app
3. Or use Supabase web interface
4. Same credentials work everywhere
```

---

## 🔐 Security Reminders

⚠️ NEVER:
- ❌ Commit .env to Git
- ❌ Share your password
- ❌ Paste credentials in chat
- ❌ Post screenshots with credentials

✅ DO:
- ✅ Keep .env in .gitignore
- ✅ Use strong password
- ✅ Rotate password occasionally
- ✅ Enable backups

---

## 📞 Support Links

**Supabase Docs:**
https://supabase.com/docs/guides/database/connecting-to-postgres

**PostgreSQL Connection Help:**
https://www.postgresql.org/docs/current/libpq-connect.html

**POS System Docs:**
- SUPABASE_SETUP.md
- SUPABASE_QUICK_START.md
- DATABASE_COMPARISON.md

---

## ✅ Success Checklist

You know it's working when:

- [ ] Can login with admin / password
- [ ] See menu items on screen
- [ ] Can add items to bill
- [ ] Button clicks work instantly
- [ ] Payment processing works
- [ ] Receipt displays
- [ ] No database errors in terminal

---

## 📊 Project Stats on Supabase

### Free Tier Limits
- Database: 500 MB
- Bandwidth: 2 GB/month
- Connections: 100
- Backups: 7 days

### Plenty For:
✅ Testing
✅ Development
✅ Small business
✅ ~1,000 orders/month

### When to Upgrade:
- Database size > 400 MB
- Need more backups
- Production traffic
- Team collaboration

---

## 🎓 Learning Tips

1. **Start in SQL Editor** - Feel comfortable with SQL
2. **Browse Table Editor** - See live data
3. **Check Backups** - Know backup location
4. **Read Logs** - Understand errors
5. **Test API** - Use Supabase's API testing

---

## 📝 Notes

```
My setup date: _________________
Working status: _________________
Database size: _________________
Last backup: _________________
Notes: _________________________
       _________________________
```

---

**Bookmark this page for quick reference!** 🔖
