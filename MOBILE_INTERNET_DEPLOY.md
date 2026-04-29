# Run POS From Mobile Browser Over the Internet

This app already serves the React frontend and Express API from the same Node server. For mobile/browser access from anywhere, host one always-on server and open its public URL on the phone.

## Recommended setup: Render web service with persistent disk

The app currently uses Prisma SQLite. SQLite needs a persistent filesystem, so deploy it to a Node host with a persistent disk. Do not use Vercel as the main live POS database unless the app is migrated to a hosted database such as Postgres; Vercel Functions only have temporary writable storage.

1. Push this repo to GitHub/GitLab.
2. In Render, create a new Blueprint from this repo. Render will use `render.yaml`.
3. Before deploy, set these secret values:
   - `DEFAULT_ADMIN_PASSWORD`: choose a strong password.
   - `SYNC_SERVER_API_KEY`: choose a long random key. Use the same key in each desktop/local sync config.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: optional, but recommended for menu images.
4. Deploy.
5. Open the Render URL, for example:
   - `https://chewbiecafe-pos.onrender.com`
6. Login from mobile browser:
   - username: `admin`
   - password: the value you set for `DEFAULT_ADMIN_PASSWORD`

## Connect existing offline desktop installs to the hosted sync server

In each offline/desktop install:

1. Login as Admin.
2. Open the Sync settings.
3. Enable sync.
4. Set Sync Server URL to your hosted app URL, for example:
   - `https://chewbiecafe-pos.onrender.com`
5. Set Sync API Key to the same `SYNC_SERVER_API_KEY` from Render.
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
