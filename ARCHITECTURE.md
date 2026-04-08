# Restaurant POS - Architecture & Design Document

## Executive Summary

This is a **production-ready restaurant billing POS system** designed for speed, reliability, and future expansion. The architecture follows clean code principles with layered separation of concerns, making it easy to maintain, test, and extend.

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│            React Frontend (UI Layer)            │
│  - POS Interface (Categories + Menu + Bill)     │
│  - Login Page                                   │
│  - Context API for state management             │
└─────────────────────────────────────────────────┘
                        ↓ (Axios/HTTP)
┌─────────────────────────────────────────────────┐
│          Express Backend (API Layer)            │
│  ┌──────────────────────────────────────────┐  │
│  │ Controllers (HTTP Request Handling)      │  │
│  │ - AuthController, OrderController, etc.  │  │
│  └──────────────────────────────────────────┘  │
│                        ↓                        │
│  ┌──────────────────────────────────────────┐  │
│  │ Services (Business Logic)                │  │
│  │ - AuthService, OrderService, etc.        │  │
│  │ - Validations & calculations             │  │
│  └──────────────────────────────────────────┘  │
│                        ↓                        │
│  ┌──────────────────────────────────────────┐  │
│  │ Repositories (Data Access)               │  │
│  │ - UserRepository, OrderRepository, etc.  │  │
│  │ - Direct database queries                │  │
│  └──────────────────────────────────────────┘  │
│                        ↓                        │
│  ┌──────────────────────────────────────────┐  │
│  │ Middleware                               │  │
│  │ - Authentication, Error Handling         │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                        ↓ (SQL)
┌─────────────────────────────────────────────────┐
│       PostgreSQL Database (Data Layer)          │
│ - users, categories, menu_items                │
│ - orders, order_items, payments                │
│ - Indexed for fast queries                     │
└─────────────────────────────────────────────────┘
```

## Layered Architecture Pattern

### 1. Controllers (API Endpoints)
**Location:** `backend/src/controllers/`

Responsible for:
- Receiving HTTP requests
- Validating input parameters
- Calling services for business logic
- Sending responses back to client
- Error handling

**Examples:**
- `AuthController.js` - handles `/auth/login`, `/auth/register`
- `OrderController.js` - handles `/orders/*` endpoints
- `ReportController.js` - handles `/reports/*` endpoints

### 2. Services (Business Logic)
**Location:** `backend/src/services/`

Responsible for:
- Implementing business rules
- Data validation
- Complex calculations (tax, discounts, totals)
- Orchestrating multiple repository calls
- Error handling and exceptions

**Examples:**
- `AuthService.js` - password hashing, JWT generation
- `OrderService.js` - order creation, finalization, payment processing
- `ReportService.js` - sales summaries, analytics

### 3. Repositories (Data Access)
**Location:** `backend/src/repositories/`

Responsible for:
- Database queries (SELECT, INSERT, UPDATE, DELETE)
- Query optimization
- Connection management
- SQL preparation and parameter binding

**Examples:**
- `UserRepository.js` - user queries
- `OrderRepository.js` - order CRUD
- `OrderItemRepository.js` - order items management
- `PaymentRepository.js` - payment records

### 4. Middleware
**Location:** `backend/src/middleware/`

Responsible for:
- JWT authentication
- Role-based authorization
- Error handling and logging
- Request/response transformation

**Examples:**
- `auth.js` - `authenticate()` and `authorize()` middleware
- `errorHandler.js` - centralized error handling

### 5. Utilities & Helpers
**Location:** `backend/src/utils/`

Responsible for:
- Authentication utilities (JWT, password hashing)
- Billing calculations (tax, discount)
- Receipt formatting (thermal printer)
- Bill number generation

## Data Flow Example: Creating an Order

```
Client Action: Click "New Order" button
                    ↓
Frontend (React) → POST /orders
                    ↓
OrderController.create()
    ↓ calls
OrderService.createOrder()
    ↓ calls
OrderRepository.create(billNumber, ...)
    ↓
INSERT INTO orders (...)
    ↓
Returns order with ID
    ↓
Response sent to frontend
    ↓
OrderContext updated with new order
    ↓
UI re-renders with order ready for items
```

## Frontend Architecture

### Component Structure
```
App.js (Router & Provider)
├── Login.js (Public page)
└── POSPage.js (Protected page)
    ├── Header.js (User info, logout)
    ├── POSLayout.js (Main POS interface)
    │   ├── Categories section
    │   ├── Menu items grid
    │   └── Bill summary
    ├── PaymentModal.js (Payment processing)
    └── ReceiptModal.js (Receipt display)
```

### State Management
- **React Context API** (`OrderContext`) - manages cart items
- **Local Storage** - stores authentication token
- **Component State** - local UI state (modals, loading)

### Key Features
- No Redux needed (simple state requirements)
- Direct API calls via Axios
- Responsive CSS Grid layout
- Touch-friendly UI

## Database Design

### Entity Relationship Diagram

```
users (1) ──→ (many) orders
              
categories (1) ──→ (many) menu_items
                              │
                    (many) order_items
                              │
                              ↓
orders (1) ──→ (many) order_items
       (1) ──→ (many) payments
```

### Table Details

| Table | Purpose | Soft Delete | Indexes |
|-------|---------|-----------|---------|
| users | Authentication | - | username |
| categories | Menu categories | is_deleted | - |
| menu_items | Menu items | is_deleted | category_id |
| orders | Bill records | - | status, created_at |
| order_items | Items per bill | - | order_id |
| payments | Payment records | - | order_id |

### Key Design Decisions

1. **Soft Deletes** - Categories and menu_items use `is_deleted` flag instead of hard deletes for audit trails
2. **Item Snapshots** - `order_items` stores name & price snapshot (not just menu_item_id) to preserve historical data
3. **Timestamps** - All tables have `created_at` for audit and reporting
4. **Indexes** - Foreign keys and frequently filtered columns are indexed for performance
5. **Decimal Precision** - Money fields use `DECIMAL(10, 2)` for accurate calculations

## Authentication & Authorization

### JWT Flow
```
1. User enters credentials (username/password)
   ↓
2. Backend validates and hashes password
   ↓
3. JWT token generated with user info + expiry
   ↓ Token sent to client
4. Client stores in localStorage
   ↓
5. Subsequent requests include token in Authorization header
   ↓
6. Middleware validates token
   ↓
7. Request approved if valid and not expired
```

### Role-Based Access

```
Endpoint: POST /categories (Create Category)
    ↓
Middleware: authenticate()  → Checks token validity
    ↓
Middleware: authorize('Admin')  → Checks user.role === 'Admin'
    ↓
Allowed: Admin users only
Blocked: Staff users get 403 Forbidden
```

## API Design

### RESTful Principles
- `GET /resource` - List resources
- `GET /resource/:id` - Get single resource
- `POST /resource` - Create resource
- `PATCH /resource/:id` - Update resource
- `DELETE /resource/:id` - Delete resource

### Error Handling
- All errors return JSON with error message
- HTTP status codes used appropriately (400, 401, 403, 404, 500)
- Centralized error handler middleware

## Performance Optimizations

### Database Level
- Connection pooling (reuse connections)
- Indexed queries on foreign keys and frequently filtered columns
- Soft deletes avoid expensive table migrations
- Decimal arithmetic for accurate money calculations

### Backend Level
- Layered architecture separates concerns
- Services contain reusable business logic
- Repositories prevent N+1 queries
- Error handling prevents cascading failures

### Frontend Level
- React Context API avoids prop drilling
- Memoized calculations for totals
- Efficient re-rendering with proper state updates
- CSS Grid layout for responsive design

## Extensibility Points

### Adding New Features

**Example: Add Customer Loyalty**

1. Add `customers` table to schema
2. Create `CustomerRepository` for queries
3. Create `CustomerService` for business logic
4. Create `CustomerController` for API endpoints
5. Create routes in `customerRoutes.js`
6. Add to `index.js` route registration
7. Frontend components as needed

### Future Integrations

- **WebSocket** - For realtime multi-device sync
- **Payment Gateways** - Stripe, Razorpay, PayU
- **Inventory System** - Stock tracking
- **Kitchen Display System** - KOT
- **Analytics Dashboard** - Advanced reports

## Deployment Considerations

### Backend Deployment
1. Build production bundle
2. Update `.env` with production values
3. Use process manager (PM2)
4. Enable HTTPS
5. Setup database backups
6. Monitor logs and errors

### Frontend Deployment
1. `npm run build` creates optimized bundle
2. Deploy `build/` folder to CDN/static hosting
3. Update `REACT_APP_API_URL` to production API
4. Enable gzip compression

### Database Deployment
1. Automated backups scheduled
2. Connection limits configured
3. Slow query logging enabled
4. Index statistics updated regularly

## Security Measures

1. **Authentication** - JWT tokens with expiry
2. **Authorization** - Role-based access control
3. **Password** - Hashed with bcrypt
4. **SQL Injection** - Parameterized queries
5. **CORS** - Configured for frontend origin only
6. **Environment** - Sensitive data in .env files
7. **HTTPS** - Enforced in production

## Monitoring & Maintenance

### Logging
- Error logs in backend
- Browser console logs in frontend
- Database query logs

### Health Checks
- `GET /health` endpoint
- Database connectivity test
- API response time tracking

## Summary

This POS system is built on **solid architectural principles**:

✅ **Layered Architecture** - Clear separation of concerns
✅ **DRY Principle** - No code duplication
✅ **SOLID Principles** - Single responsibility, dependency inversion
✅ **Clean Code** - Readable, maintainable, testable
✅ **Scalability** - Ready for future features
✅ **Security** - Multiple layers of protection
✅ **Performance** - Optimized at all levels

The system is **production-ready** and can handle real restaurant operations while remaining **flexible** for future enhancements.
