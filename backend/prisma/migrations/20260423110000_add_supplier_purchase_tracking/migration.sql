CREATE TABLE "suppliers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "supplier_id" INTEGER NOT NULL,
    "purchase_date" DATETIME NOT NULL,
    "invoice_number" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'unpaid',
    "subtotal" DECIMAL NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL NOT NULL DEFAULT 0,
    "total_amount" DECIMAL NOT NULL DEFAULT 0,
    "paid_amount" DECIMAL NOT NULL DEFAULT 0,
    "note" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "purchases_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "purchase_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchase_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "unit" TEXT,
    "unit_price" DECIMAL NOT NULL,
    "total_price" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "purchase_items_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "suppliers_name_key" ON "suppliers"("name");
CREATE INDEX "purchases_supplier_id_idx" ON "purchases"("supplier_id");
CREATE INDEX "purchases_purchase_date_idx" ON "purchases"("purchase_date");
CREATE INDEX "purchases_payment_status_idx" ON "purchases"("payment_status");
CREATE INDEX "purchase_items_purchase_id_idx" ON "purchase_items"("purchase_id");
