# Finding Supabase Connection Details - Visual Guide

## 🔍 Where to Find Everything

### Location 1: Supabase Dashboard Main Page

After creating your project, you should see:

```
┌────────────────────────────────────────────┐
│  PROJECT NAME: pos-db                      │
│  Status: RUNNING                           │
│                                            │
│  Quick Links:                              │
│  ├─ [Go to Dashboard]                      │
│  ├─ [Documentation]                        │
│  └─ [Copy Connection String]  ← CLICK HERE│
└────────────────────────────────────────────┘
```

---

## 🎯 Step-by-Step: Get Connection Details

### LOCATION: Settings → Database

**Path in Dashboard:**
```
Left Sidebar
  └─ [Settings ⚙️]  (Bottom of sidebar)
     └─ [Database]  (In settings menu)
        └─ Connection Info  (You are here!)
```

### What You'll See:

```
DATABASE CONNECTION

Connection settings:
┌─────────────────────────────────────────┐
│ Hostname: prof123abc.supabase.co        │ ← Copy this
├─────────────────────────────────────────┤
│ Port: 5432                              │ ← Usually this
├─────────────────────────────────────────┤
│ Database: postgres                      │ ← Or this  
├─────────────────────────────────────────┤
│ User: postgres                          │ ← Or this
├─────────────────────────────────────────┤
│ Password: [Click to reveal]             │ ← Copy your password
├─────────────────────────────────────────┤
│ SSL Mode: require                       │
└─────────────────────────────────────────┘
```

---

## 📋 Connection Details Explained

### HOSTNAME (DB_HOST)

```
What it looks like:
  prof123abc.supabase.co

Where to find it:
  → Settings → Database → Hostname

What to put in .env:
  DB_HOST=prof123abc.supabase.co

❌ DON'T:
- Add "https://"
- Add port number
- Change anything
```

### PORT (DB_PORT)

```
What it is:
  5432 (default PostgreSQL port)

Where to find it:
  → Settings → Database → Port

What to put in .env:
  DB_PORT=5432

⚡ Usually always 5432 for Supabase!
```

### DATABASE (DB_NAME)

```
What it is:
  postgres (default database name)

Where to find it:
  → Settings → Database → Database

What to put in .env:
  DB_NAME=postgres

This is the default and you don't need to change it.
```

### USER (DB_USER)

```
What it is:
  postgres (default user)

Where to find it:
  → Settings → Database → User

What to put in .env:
  DB_USER=postgres

This is also the default - don't change.
```

### PASSWORD (DB_PASSWORD)

```
What it is:
  The password YOU created when setting up the project

Where to find it:
  → Settings → Database
  → Look for "Password" field
  → Click "Reveal" to see it

What to put in .env:
  DB_PASSWORD=YourActualPassword123!

⚠️ This is SENSITIVE - don't share or commit to Git!
```

---

## 🔗 Connection String Version

Supabase also shows a full connection string:

```
Location: Settings → Database → Connection strings

You'll see:
┌─────────────────────────────────────────────────┐
│ POSTGRESQL CONNECTION STRING                    │
├─────────────────────────────────────────────────┤
│ postgresql://postgres:YourPassword@             │
│ prof123abc.supabase.co:5432/postgres            │
└─────────────────────────────────────────────────┘

Format breakdown:
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]

You CAN use this directly in:
  DATABASE_URL=postgresql://postgres:pass@host:5432/postgres
```

---

## 📸 Screenshot Walkthrough

### Screen 1: Main Dashboard
```
┌──────────────────────────────────────────┐
│ Supabase                     [⚙️ Settings]│
├──────────────────────────────────────────┤
│                                          │
│ ← [Back]  Your Project: pos-db           │
│                                          │
│ Status: Running ✅                       │
│                                          │
│ Quick Start:                             │
│ [View Connection Strings] ← Alternative  │
│                                          │
└──────────────────────────────────────────┘

👆 Click [Settings] at bottom left sidebar
```

### Screen 2: Settings Menu
```
┌──────────────────────────────────────────┐
│ Project Settings                         │
├──────────────────────────────────────────┤
│                                          │
│  [General]                               │
│  [Database]  ← CLICK HERE!               │
│  [API]                                   │
│  [Auth]                                  │
│  [Billing]                               │
│                                          │
└──────────────────────────────────────────┘
```

### Screen 3: Database Settings
```
┌────────────────────────────────────────────┐
│ Database Settings                          │
├────────────────────────────────────────────┤
│                                            │
│ Connection Info:                           │
│                                            │
│ Host:        prof123abc.supabase.co        │
│ Port:        5432                          │
│ Database:    postgres                      │
│ User:        postgres                      │
│ Password:    [••••••] [Reveal]             │
│                                            │
│ Connection strings: [View]                 │
│                                            │
└────────────────────────────────────────────┘
```

---

## ✍️ Copy-Paste Template

Print this and fill in as you get the values:

```
FROM SUPABASE:

DB_HOST = _________________________.supabase.co
DB_PORT = 5432
DB_NAME = postgres
DB_USER = postgres
DB_PASSWORD = ____________________

PASTE INTO backend/.env:

NODE_ENV=development
PORT=5000
DB_HOST=_________________________.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=____________________
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRY=7d
THERMAL_PAPER_WIDTH=80
```

---

## 🎯 Common Mistakes to Avoid

### ❌ Copying Wrong Value

```
DON'T copy: postgresql://postgres:pass@prof123abc.supabase.co:5432/postgres

DO copy just: prof123abc.supabase.co
```

### ❌ Including Protocol

```
DON'T: https://prof123abc.supabase.co
DO:    prof123abc.supabase.co
```

### ❌ Wrong Password

```
What you set: MySecurePass123
What to NOT use: The project password
What to use: Database password from Settings
```

### ❌ Forgetting .supabase.co

```
DON'T: prof123abc
DO:    prof123abc.supabase.co
```

---

## ✅ Verification Checklist

After copying values, verify:

```
□ DB_HOST ends with .supabase.co
□ DB_PORT is 5432
□ DB_NAME is postgres
□ DB_USER is postgres
□ DB_PASSWORD is NOT empty
□ All values copied from same dashboard
□ No extra spaces or quotes in .env
```

---

## 🆘 If Credentials Look Different

### Scenario: You see different values

```
Example: What if Port is 6543?
→ It's fine, use what Supabase shows

Example: What if Database is "mydb"?
→ Use that name instead of "postgres"

Example: What if User is "admin"?
→ Use the actual user name shown
```

### Scenario: Can't find Settings

```
Try this:
1. Go to your project page
2. Click your avatar (top right)
3. Look for "Organization Settings"
   or "Project Settings"
4. Find "Database" section
```

### Scenario: Password not shown

```
If password field is blank or hidden:
1. Click "Change Password"
2. Set a new password
3. Use the new password in .env
```

---

## 📍 Alternative Ways to Get Connection String

### Method 1: SQL Editor
```
1. Go to SQL Editor
2. Look for connection dropdown at top
3. It shows your connection string
```

### Method 2: API Documentation
```
1. Settings → API
2. Under "Project Settings"
3. Shows connection info
```

### Method 3: Command Line
```
If you have psql installed:
psql -h host -U postgres -d postgres
It will show connection status
```

---

## 🧪 Test Your Values

### In .env file:
```env
DB_HOST=prof123abc.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=MySuperSecurePassword123
```

### Test 1: Check connection
```bash
cd backend
npm run dev
# Should say: "POS Backend running on port 5000"
# No errors = working! ✅
```

### Test 2: Check values in code
```bash
# In backend folder, this works:
node -e "require('dotenv').config(); console.log(process.env.DB_HOST)"
# Should print: prof123abc.supabase.co
```

---

## 🎓 Understanding the Connection

```
Your App
    ↓
Connects to: postgres://user:password@host:port/database
    ↓
User: postgres (just a username)
Password: Your database password
Host: prof123abc.supabase.co (Supabase's server)
Port: 5432 (PostgreSQL standard port)
Database: postgres (default DB to connect to)
    ↓
Connected to Supabase PostgreSQL ✅
```

---

## 📊 Visual Flow

```
1. Supabase Project Created
          ↓
2. Go to Settings → Database
          ↓
3. Get these 5 values:
   ├─ HOSTNAME
   ├─ PORT (always 5432)
   ├─ DATABASE (always postgres)
   ├─ USER (always postgres)
   └─ PASSWORD (your choice)
          ↓
4. Put in backend/.env
          ↓
5. Run backend
          ↓
6. Connected! ✅
```

---

## 🎯 Summary

| Item | Where to Find | What to Use |
|------|---------------|------------|
| Host | Settings → Database → Hostname | DB_HOST |
| Port | Settings → Database → Port | DB_PORT |
| Database | Settings → Database → Database | DB_NAME |
| User | Settings → Database → User | DB_USER |
| Password | Settings → Database → Password | DB_PASSWORD |

---

## 💾 Save This Reference

**Bookmark for later:**
- Location: Settings → Database
- Values needed: Host, Port, Database, User, Password
- All go into: backend/.env

You'll likely need this multiple times during setup!

---

**Ready to copy your credentials?** ✅

Go to Supabase Dashboard → Settings → Database and gather your values!
