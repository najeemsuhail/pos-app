# API Documentation

## Base URL
`http://localhost:5000`

## Authentication
All endpoints except `/auth/login` require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All responses are JSON:
```json
{
  "data": {},
  "error": null
}
```

---

## Auth Endpoints

### POST /auth/login
Login user and get JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "name": "admin",
    "role": "Admin"
  }
}
```

**Errors:** 401 (Invalid credentials)

---

### POST /auth/register
Create new user (Admin only).

**Request:**
```json
{
  "name": "staff2",
  "role": "Staff",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "id": 2,
  "name": "staff2",
  "role": "Staff"
}
```

**Errors:** 400 (Validation), 403 (Not Admin)

---

## Category Endpoints

### GET /categories
Get all active categories.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Starters",
    "is_deleted": false,
    "created_at": "2024-01-01T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Main Course",
    "is_deleted": false,
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

---

### GET /categories/:id
Get specific category.

**Response (200):** Category object
**Errors:** 404 (Not found)

---

### POST /categories
Create category (Admin only).

**Request:**
```json
{
  "name": "Desserts"
}
```

**Response (201):** Category object
**Errors:** 400 (Validation), 403 (Not Admin)

---

### PATCH /categories/:id
Update category (Admin only).

**Request:**
```json
{
  "name": "Appetizers"
}
```

**Response (200):** Updated category
**Errors:** 400, 403, 404

---

### DELETE /categories/:id
Soft delete category (Admin only).

**Response (200):**
```json
{
  "message": "Category deleted",
  "category": { ... }
}
```

---

## Menu Item Endpoints

### GET /menu-items
Get all active menu items.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Samosa",
    "price": "50.00",
    "category_id": 1,
    "is_available": true,
    "is_deleted": false,
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

---

### GET /menu-items/:id
Get specific menu item.

---

### GET /menu-items/category/:categoryId
Get menu items by category.

**Query Params:**
- `categoryId` - Category ID

---

### POST /menu-items
Create menu item (Admin only).

**Request:**
```json
{
  "name": "Paneer Tikka",
  "price": 150,
  "category_id": 1,
  "is_available": true
}
```

**Response (201):** Menu item object

---

### PATCH /menu-items/:id
Update menu item (Admin only).

**Request:** Same as create

---

### PATCH /menu-items/:id/availability
Toggle item availability.

**Request:**
```json
{
  "is_available": false
}
```

**Response (200):** Updated item

---

### DELETE /menu-items/:id
Soft delete menu item (Admin only).

---

## Order Endpoints

### POST /orders
Create new order.

**Response (201):**
```json
{
  "id": 1,
  "bill_number": "BILL-12345678-9999",
  "status": "pending",
  "subtotal": "0.00",
  "discount_amount": "0.00",
  "tax_amount": "0.00",
  "final_amount": "0.00",
  "created_at": "2024-01-01T10:00:00Z"
}
```

---

### GET /orders/:id
Get order details.

**Response (200):** Order object
**Errors:** 404 (Order not found)

---

### POST /orders/:id/items
Add item to order.

**Request:**
```json
{
  "menu_item_id": 1,
  "quantity": 2
}
```

**Response (201):**
```json
{
  "id": 1,
  "order_id": 1,
  "menu_item_id": 1,
  "name": "Samosa",
  "price": "50.00",
  "quantity": 2,
  "created_at": "2024-01-01T10:00:00Z"
}
```

**Errors:** 404 (Item not found), 400 (Not available)

---

### PATCH /orders/:id/items/:itemId
Update item quantity (or remove if quantity = 0).

**Request:**
```json
{
  "quantity": 3
}
```

**Response (200):** Updated item (if quantity > 0) or removal confirmation

---

### DELETE /orders/:id/items/:itemId
Remove item from order.

**Response (200):**
```json
{
  "message": "Item removed",
  "item": { ... }
}
```

---

### GET /orders/:id/items
Get all items in order.

**Response (200):** Array of order items

---

### POST /orders/:id/finalize
Calculate totals and finalize order.

**Request:**
```json
{
  "discount_percent": 10,
  "tax_rate": 5
}
```

**Response (200):**
```json
{
  "id": 1,
  "bill_number": "BILL-12345678-9999",
  "status": "pending",
  "subtotal": "250.00",
  "discount_amount": "25.00",
  "tax_amount": "11.25",
  "final_amount": "236.25",
  "created_at": "2024-01-01T10:00:00Z"
}
```

**Validation:** Order must have at least one item

---

### POST /orders/:id/payments
Process payment for order.

**Request:**
```json
{
  "payments": [
    {
      "method": "Cash",
      "amount": 236.25,
      "reference_id": null
    }
  ]
}
```

Or split payment:
```json
{
  "payments": [
    {
      "method": "Card",
      "amount": 150.00,
      "reference_id": "TXN-12345"
    },
    {
      "method": "Cash",
      "amount": 86.25,
      "reference_id": null
    }
  ]
}
```

**Response (200):**
```json
{
  "payments": [
    {
      "id": 1,
      "order_id": 1,
      "method": "Cash",
      "amount": "236.25",
      "reference_id": null,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ],
  "change": 0
}
```

**Validation:** Total paid >= final_amount, order not already paid

---

### GET /orders/:id/receipt
Get thermal receipt in 80mm format.

**Response (200):** Text/plain

```
========================================
             RESTAURANT POS RECEIPT
========================================

Bill #: BILL-12345678-9999
Date: Jan 1, 2024 10:00 AM
========================================

Item                Qty      Amount
========================================
Samosa              2              100.00
Paneer Tikka        1              150.00

========================================
Subtotal: Rs. 250.00
Discount: -Rs. 25.00
Tax (GST): Rs. 11.25
========================================
TOTAL: Rs. 236.25
========================================

PAYMENT BREAKDOWN
========================================
Cash: Rs. 236.25

=====================================
Thank you! Please visit again.
========================================
```

---

### POST /orders/:id/cancel
Cancel order (only if pending).

**Response (200):**
```json
{
  "message": "Order cancelled",
  "order": { ... }
}
```

**Errors:** 400 (Order already paid)

---

## Report Endpoints

### GET /reports/daily-summary
Get daily sales summary.

**Query Params:**
- `date` (optional) - YYYY-MM-DD format, defaults to today

**Response (200):**
```json
{
  "date": "2024-01-01",
  "totalOrders": 15,
  "paidOrders": 14,
  "totalSales": 3500.50,
  "totalDiscount": 250.00,
  "totalTax": 175.00,
  "paymentByMethod": {
    "Cash": 2000.00,
    "Card": 1200.00,
    "UPI": 300.50
  },
  "averageOrderValue": 250.04
}
```

---

### GET /reports/range-summary
Get sales summary for date range.

**Query Params:**
- `start_date` - YYYY-MM-DD
- `end_date` - YYYY-MM-DD

**Response (200):**
```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "totalOrders": 450,
  "paidOrders": 445,
  "totalSales": 105000.00,
  "totalDiscount": 7500.00,
  "totalTax": 5250.00,
  "paymentByMethod": {
    "Cash": 60000.00,
    "Card": 35000.00,
    "UPI": 10000.00
  },
  "averageOrderValue": 235.96
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting
Not implemented yet (for future enhancement)

## Pagination
Not implemented yet (for future enhancement with large datasets)
