# POS App

Chewbiecafe POS app prepared for:

- Vercel frontend + API deployment
- Supabase Postgres database
- Cloudinary image uploads
- Electron desktop packaging

## Structure

- `frontend/` React client
- `backend/` Express app and Prisma schema
- `electron/` desktop shell
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

## Desktop development

Install dependencies, then run:

```bash
npm run dev:desktop
```

That starts:

- the backend on `http://localhost:5000`
- the frontend dev server on `http://localhost:3000`
- the Electron shell pointed at the frontend dev server
- the backend in SQLite mode for desktop work

## Desktop build

To run the desktop app against the built local frontend:

```bash
npm run desktop
```

To package an installer:

```bash
npm run dist:desktop
```

The desktop runtime now starts the backend locally. The backend defaults to a local SQLite database file and seeds a default admin account on first launch:

- username: `admin`
- password: `password`

Desktop app data is stored in the user profile instead of the repo:

- Windows: `%APPDATA%\\POS App\\data`
- macOS: `~/Library/Application Support/POS App/data`
- Linux: `~/.local/share/POS App/data`

That data directory contains:

- `pos-app.db`
- `uploads/`

If Cloudinary credentials are not set, menu image uploads are stored locally in that desktop data directory.

The Electron app menu includes:

- `File > Open Data Folder`
- `File > Export Database Backup`
