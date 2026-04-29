# Run POS From Mobile Browser Over the Internet

This app already serves the React frontend and Express API from the same Node server. For mobile/browser access from anywhere, host one always-on server and open its public URL on the phone.

## Free setup: Railway with a volume

The frontend is included. `npm run build` builds `frontend/`, copies it to `public/`, and the backend serves both the browser app and `/api`.

The app currently uses Prisma SQLite. SQLite needs persistent storage, so the free host must support a persistent volume. Railway's free plan currently includes a small volume, so it is the best free fit for this codebase.

1. Push this repo to GitHub/GitLab.
2. Create a new Railway project from the repo.
3. Add a Volume to the web service.
4. Mount the volume at:
   - `/data`
5. Set these variables in Railway:
   - `NODE_ENV=production`
   - `DESKTOP_DATA_DIR=/data`
   - `DATABASE_URL=file:/data/pos-app.db`
   - `JWT_SECRET=<long-random-secret>`
   - `JWT_EXPIRY=7d`
   - `DEFAULT_ADMIN_USERNAME=admin`
   - `DEFAULT_ADMIN_PASSWORD=<strong-password>`
   - `SYNC_SERVER_API_KEY=<long-random-sync-key>`
6. Optional image upload variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `CLOUDINARY_PRODUCT_IMAGE_FOLDER=products`
7. Deploy.
8. Open the Railway public URL on mobile, for example:
   - `https://your-app.up.railway.app`
9. Login from mobile browser:
   - username: `admin`
   - password: the value you set for `DEFAULT_ADMIN_PASSWORD`

Railway free is suitable for testing and light use. Watch usage in the Railway dashboard because the free plan has limited monthly credits/resources.

## Connect existing offline desktop installs to the hosted sync server

In each offline/desktop install:

1. Login as Admin.
2. Open the Sync settings.
3. Enable sync.
4. Set Sync Server URL to your hosted app URL, for example:
   - `https://your-app.up.railway.app`
5. Set Sync API Key to the same `SYNC_SERVER_API_KEY` from Railway.
6. Run full sync once.

After that, each device can keep working offline and manually sync when internet is available.

## Quick testing on mobile on the same Wi-Fi only

This is not internet access from anywhere, but useful for testing mobile layout:

```powershell
npm run dev:backend
npm run dev:frontend
```

Then find your PC LAN IP and open:

```text
http://YOUR_PC_IP:3000
```

The phone and PC must be on the same Wi-Fi.

## Notes

- Keep only one hosted instance for the central sync server.
- Back up the persistent disk regularly.
- If the hosted app will be used as the live POS by multiple users at the same time, consider migrating from SQLite to Postgres later.
