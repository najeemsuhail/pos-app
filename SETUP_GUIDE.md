# Restaurant Billing POS System - Setup Guide

## Project Structure

```
pos-app/
├── backend/                 # Express.js REST API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Database queries
│   │   ├── middleware/      # Auth, error handling
│   │   ├── utils/          # Helpers (auth, billing, printing)
│   │   ├── routes/         # API route definitions
│   │   ├── db/             # Database connection
│   │   └── index.js        # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                # React POS UI
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components (Login, POS)
│   │   ├── services/       # API integration
│   │   ├── context/        # React Context (Order state)
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Helper functions
│   │   ├── styles/         # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── database/                # Database schema and migrations
│   ├── schema.sql
│   └── seed.sql
│
└── README.md
```

## Prerequisites

- **Node.js** (v16+)
- **PostgreSQL** (v12+)
- **npm** or **yarn**

## Installation & Setup

### 1. PostgreSQL Database Setup

#### On Windows:

```bash
# Connect to PostgreSQL
psql -U postgres

# In psql console, create database:
CREATE DATABASE pos_db OWNER postgres;

# Exit psql
\q
```

#### On Linux/Mac:

```bash
createdb pos_db
```

### 2. PostgreSQL - Create Schema and Seed Data

```bash
# Connect to the database
psql -U postgres -d pos_db

# Execute the schema file
\i database/schema.sql

# Execute the seed file (demo data)
\i database/seed.sql

# Exit
\q
```

### 3. Backend Setup

```bash
cd backend

# Create .env file from template
cp .env.example .env

# Edit .env file with your database credentials
# Recommended editor: code .env
```

Edit `.env` file:
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pos_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRY=7d
THERMAL_PAPER_WIDTH=80
```

```bash
# Install dependencies
npm install

# Start the backend server
npm run dev  # Development with nodemon
# or
npm start   # Production
```

Backend will be running at: `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Create .env file from template
cp .env.example .env

# Edit .env if needed (default points to localhost:5000)
```

```bash
# Install dependencies
npm install

# Start the React development server
npm start
```

Frontend will open at: `http://localhost:3000`

## Demo Login Credentials

```
Username: admin
Password: password
```

(Seed script creates these credentials automatically)

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Create new user (Admin only)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (Admin)
- `PATCH /categories/:id` - Update category (Admin)
- `DELETE /categories/:id` - Delete category (Admin)

### Menu Items
- `GET /menu-items` - Get all items
- `GET /menu-items/:id` - Get item by ID
- `GET /menu-items/category/:categoryId` - Get items by category
- `POST /menu-items` - Create item (Admin)
- `PATCH /menu-items/:id` - Update item (Admin)
- `PATCH /menu-items/:id/availability` - Toggle availability
- `DELETE /menu-items/:id` - Delete item (Admin)

### Orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order details
- `POST /orders/:id/items` - Add item to order
- `PATCH /orders/:id/items/:itemId` - Update item quantity
- `DELETE /orders/:id/items/:itemId` - Remove item
- `GET /orders/:id/items` - Get order items
- `POST /orders/:id/finalize` - Finalize order (calculate totals)
- `POST /orders/:id/payments` - Process payment
- `GET /orders/:id/receipt` - Get receipt text
- `POST /orders/:id/cancel` - Cancel order

### Reports
- `GET /reports/daily-summary?date=YYYY-MM-DD` - Daily sales report
- `GET /reports/range-summary?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Date range report

## Key Features

### 1. Fast Billing Flow
- Optimized React rendering with context API
- Instant item search by category
- Quick quantity adjustments with +/- buttons
- Minimal clicks to complete order

### 2. POS-Style Interface
- 3-column layout (Categories | Menu | Bill)
- Large touch-friendly buttons (80mm thermal width concept)
- Real-time bill summary
- Quick payment processing

### 3. Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Staff)
- Protected sensitive endpoints

### 4. Thermal Printer Support
- 80mm thermal receipt format
- ESC/POS compatible output
- `/orders/:id/receipt` endpoint returns formatted text
- Print directly from browser or export to file

### 5. Soft Deletes
- Categories and menu items use `is_deleted` flag
- No hard deletes - data retention for audit trails
- Marked as unavailable for users

### 6. Order Management
- Bill number generation (BILL-TIMESTAMP-RANDOM)
- Order status tracking (pending → paid → completed)
- Multiple payment methods (Cash, UPI, Card)
- Payment reference tracking

### 7. Tax & Discount Calculation
- Configurable tax rate (default 5%)
- Percentage or fixed discount support
- Real-time calculation

### 8. Reports
- Daily sales summary
- Payment method breakdown
- Date range analysis
- Average order value

## Database Schema

### users
```sql
- id (PK)
- name (unique)
- role (Admin | Staff)
- password
- created_at
```

### categories
```sql
- id (PK)
- name
- is_deleted
- created_at
```

### menu_items
```sql
- id (PK)
- name
- price
- category_id (FK)
- is_available
- is_deleted
- created_at
```

### orders
```sql
- id (PK)
- bill_number (unique)
- status (pending | paid | cancelled)
- table_id (reserved for future)
- subtotal
- discount_amount
- tax_amount
- final_amount
- created_at
- updated_at
```

### order_items
```sql
- id (PK)
- order_id (FK)
- menu_item_id (FK)
- name (snapshot)
- price (snapshot)
- quantity
- created_at
```

### payments
```sql
- id (PK)
- order_id (FK)
- method (Cash | UPI | Card)
- amount
- reference_id
- created_at
```

## Architecture Features

### Layered Architecture
1. **Controllers** - HTTP request/response handling
2. **Services** - Business logic & validation
3. **Repositories** - Database queries
4. **Middleware** - Authentication, error handling
5. **Utils** - Helper functions

### Separation of Concerns
- API layer independent from business logic
- Easy to add new features without breaking existing code
- Testable and maintainable

### Future-Ready Design
- Event-based order system (ready for realtime sync)
- Table ID field prepared for future multi-table support
- Open for KOT (Kitchen Order Ticket) integration
- Extensible payment gateway support

## Performance Optimizations

### Backend
- Database connection pooling
- Indexed queries on frequently searched fields
- Soft deletes minimize data migrations
- Decimal precision for accurate calculations

### Frontend
- React Context for state management (avoids prop drilling)
- Memoized calculations for totals
- Efficient re-rendering with hooks
- Local storage for user authentication

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development          # development or production
PORT=5000                    # Server port
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pos_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_secret_key   # Change in production!
JWT_EXPIRY=7d
THERMAL_PAPER_WIDTH=80       # Characters per line
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## Development Workflow

### Backend Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev
```

### Frontend Development
```bash
# Terminal 2 - Frontend
cd frontend
npm start
```

### Database Changes
1. Modify `database/schema.sql`
2. Recreate database:
   ```bash
   dropdb pos_db
   createdb pos_db
   psql -U postgres -d pos_db -f database/schema.sql
   psql -U postgres -d pos_db -f database/seed.sql
   ```

## Testing the API

### Using cURL or Postman

```bash
# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Get token from response, then use in Authorization header:
# Authorization: Bearer <token>

# Get all categories
curl http://localhost:5000/categories

# Get menu items
curl http://localhost:5000/menu-items
```

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running
- Verify credentials in `.env`
- Ensure database `pos_db` exists

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### CORS Error
- Ensure backend is running on `http://localhost:5000`
- Frontend `.env` has correct `REACT_APP_API_URL`

### Module Not Found
```bash
# For backend
cd backend && npm install

# For frontend
cd frontend && npm install
```

## Production Deployment

### Backend
1. Change `NODE_ENV` to production in `.env`
2. Update `JWT_SECRET` with secure value
3. Use process manager (PM2)
4. Deploy to cloud (AWS/Heroku/DigitalOcean)

### Frontend
1. Build production bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy `build/` folder to static hosting (Vercel/Netlify)
3. Update `REACT_APP_API_URL` to production API URL

## Future Enhancements

- [ ] WebSocket for realtime multi-device sync
- [ ] Table management UI
- [ ] Kitchen Order Ticket (KOT) system
- [ ] Inventory tracking
- [ ] Customer management
- [ ] Loyalty programs
- [ ] Integration with payment gateways
- [ ] Multi-branch support
- [ ] Advanced analytics dashboard
- [ ] Receipt reprinting
- [ ] Void/Return handling

## License

ISC
