# Vercel + Supabase Deployment

This repo is configured to deploy as:

- Vercel static frontend from `public/`
- Vercel serverless API from `api/[...path].js`
- Supabase Postgres for both Prisma migrations and runtime queries

## Vercel project settings

- Framework preset: `Other`
- Root directory: repository root
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `public`

## Required environment variables

Set these in Vercel Project Settings:

```env
DATABASE_URL=postgresql://...pooler...
DIRECT_URL=postgresql://...direct...
JWT_SECRET=change-this
JWT_EXPIRY=7d
THERMAL_PAPER_WIDTH=80
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_PRODUCT_IMAGE_FOLDER=products
REACT_APP_THEME=neon
```

## Supabase connection values

- `DATABASE_URL`: use the Supabase pooled connection string for app runtime
- `DIRECT_URL`: use the Supabase direct connection string for Prisma migrations

## Prisma migration workflow

Run Prisma migrations from your machine, not from Vercel:

```bash
cd backend
npx prisma migrate deploy
```

If you need to generate the client locally:

```bash
cd backend
npx prisma generate
```

## API paths

Frontend requests are now sent to `/api/...`

Examples:

- `/api/auth/login`
- `/api/categories`
- `/api/menu-items`
- `/api/orders`
- `/api/reports/daily-summary`

## Local development

Run these from the repo root:

```bash
npm run dev:backend
npm run dev:frontend
```

The React dev server proxies `/api` requests to `http://localhost:5000`.
