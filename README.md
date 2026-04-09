# POS App

Restaurant POS app prepared for:

- Vercel frontend + API deployment
- Supabase Postgres database
- Cloudinary image uploads

## Structure

- `frontend/` React client
- `backend/` Express app and Prisma schema
- `api/[...path].js` Vercel API entrypoint
- `public/` generated frontend output during build
- `vercel.json` Vercel routing/build config

## Local development

Create local env files from:

- `backend/.env.example`
- `frontend/.env.example`

Run:

```bash
npm run dev:backend
npm run dev:frontend
```

Frontend runs on `http://localhost:3000` and proxies `/api` to the backend on `http://localhost:5000`.

## Production deployment

Use [VERCEL_SUPABASE_DEPLOY.md](./VERCEL_SUPABASE_DEPLOY.md).

## Build

```bash
npm run build
```

This builds the React app and copies the output to `public/` for Vercel static hosting.
