# Chewbie Cafe POS - App Features

## What a restaurant owner gets

Chewbie Cafe POS gives a restaurant owner a simple daily operating system for billing, kitchen tickets, table orders, menu management, payments, reports, and backups. It is designed for quick counter use: staff can select a table or order type, add items, send KOT to the kitchen, take payment, and print the final receipt with fewer steps.

For the owner, the main benefit is control and visibility. Orders are organized by table and order type, menu items can be managed from the admin area, receipts and KOTs are printable, and reports show sales, payments, expenses, and net performance. The app also supports desktop use with local data, backups, and printer settings, so the restaurant can keep running in a practical shop environment.

## POS billing and order taking

- Table-based dine-in order flow.
- Separate order modes for takeaway, delivery, and online orders.
- Active order tracking so open tables and order types can be resumed.
- Menu item search for faster billing.
- Category filtering for menu items.
- Keyboard-driven item adding and quantity changes.
- Bill summary with subtotal, discount, tax, and total.
- Split/expand summary view to keep the billing panel compact.
- Payment flow with final bill generation.
- Final receipt print preview after payment, without the extra in-app receipt preview step.

## KOT kitchen workflow

- Compact `KOT` button shown beside the wide `PAY (F9)` button.
- KOT auto-prints when the KOT button is clicked.
- `F8` shortcut for sending KOT.
- KOT button tooltip showing `Send KOT (F8)`.
- KOT generation waits for the active order save to complete, preventing missed/immediate-click failures.
- KOT can still be saved even if printing fails, with a clear app message.
- KOT print output is simple and does not include logo or extra brand header.

## Receipt printing

- Receipt print output has no logo.
- Extra printed heading `Chewbie Cafe / Receipt` was removed.
- Receipt content starts directly from the generated bill text.
- Browser print preview cleanup was improved to avoid JavaScript errors when preview is closed.
- Electron print preview cancellation is handled gracefully.
- Cancelled print preview is treated as normal cancellation, not a failed order.

## Keyboard shortcuts

- `F8` sends KOT.
- `F9` opens checkout/payment.
- Direct table shortcuts are available for table function keys, excluding `F8` and `F9`.
- `/` focuses item search.
- `Esc` clears search/category selection.
- Arrow keys move item selection.
- `Enter` adds the highlighted item.
- `+` and `-` adjust the last item quantity.
- `Alt + Left/Right` moves between tables.
- `Ctrl + Up/Down` changes category.
- Keyboard help modal lists available shortcuts.

## Admin and management

- Admin page for restaurant management tasks.
- Menu item management with categories, pricing, availability, and images.
- Ingredient stock management with units, current stock, and low-stock thresholds.
- Menu item recipes that link ingredients and usage quantities to each sellable item.
- Purchase entries can link line items to ingredients and automatically add stock.
- Paid/completed orders automatically deduct recipe ingredients from stock once.
- Ingredient stock alerts highlight low, out-of-stock, and negative stock items.
- Table count and table name configuration.
- Store settings, tax rate, and printer selection.
- Staff/user management with role-based access.
- Order history with details and reprint support.
- Settlement support for pending payments.
- Expense management.
- Purchase and supplier management.
- Staff attendance tracking.

## Reports and owner visibility

- Daily, weekly, monthly, and custom date reports.
- Sales summary, order totals, discounts, tax, expenses, and net sales after expenses.
- Payment breakdown reporting.
- Order and item level report sections.
- Export support for reports.
- Catchier sticky `Jump to` report navigation chips for faster report browsing.

## Desktop and deployment support

- React frontend, Express backend, Prisma database layer, and Electron desktop shell.
- Desktop app can run with a local SQLite database.
- Desktop runtime starts the backend locally.
- Data folder access from the Electron menu.
- Database backup export from the Electron menu.
- Local image storage fallback when Cloudinary credentials are not configured.
- Deployment support for Vercel frontend/API, Supabase Postgres, and mobile/browser access.
- License activation/trial support with remote license ledger option.

## UI improvements

- Compact KOT plus wide Pay action row in the bill panel.
- Custom app alert dialog replaced default browser alert boxes in POS.
- Cleaner receipt and KOT print templates.
- Improved print-preview close handling.
- Report `Jump to` buttons restyled as prominent quick-navigation chips.
