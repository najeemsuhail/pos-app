ALTER TABLE "orders" ADD COLUMN "payment_status" TEXT NOT NULL DEFAULT 'unpaid';

ALTER TABLE "payments" ADD COLUMN "source" TEXT NOT NULL DEFAULT 'Direct';
ALTER TABLE "payments" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'settled';
ALTER TABLE "payments" ADD COLUMN "settled_amount" DECIMAL NOT NULL DEFAULT 0;
ALTER TABLE "payments" ADD COLUMN "settled_at" DATETIME;

UPDATE "orders"
SET "payment_status" = 'paid'
WHERE "status" = 'paid';

UPDATE "orders"
SET "status" = 'completed'
WHERE "status" = 'paid';

UPDATE "payments"
SET "source" = 'Direct'
WHERE "source" IS NULL OR TRIM("source") = '';

UPDATE "payments"
SET "status" = CASE
  WHEN LOWER(COALESCE("method", '')) = 'credit' OR LOWER(COALESCE("source", '')) IN ('swiggy', 'zomato') THEN 'pending'
  ELSE 'settled'
END
WHERE "status" IS NULL OR TRIM("status") = '';

UPDATE "payments"
SET "settled_amount" = CASE
  WHEN "status" = 'settled' AND ("settled_amount" IS NULL OR "settled_amount" = 0) THEN "amount"
  ELSE COALESCE("settled_amount", 0)
END;

UPDATE "payments"
SET "settled_at" = "created_at"
WHERE "status" = 'settled' AND "settled_at" IS NULL;
