CREATE TABLE "shifts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "opened_by_user_id" INTEGER NOT NULL,
    "closed_by_user_id" INTEGER,
    "opening_cash" DECIMAL NOT NULL DEFAULT 0,
    "closing_cash" DECIMAL,
    "cash_total" DECIMAL NOT NULL DEFAULT 0,
    "card_total" DECIMAL NOT NULL DEFAULT 0,
    "upi_total" DECIMAL NOT NULL DEFAULT 0,
    "other_total" DECIMAL NOT NULL DEFAULT 0,
    "total_payments" DECIMAL NOT NULL DEFAULT 0,
    "expected_cash" DECIMAL,
    "difference" DECIMAL,
    "opening_notes" TEXT,
    "closing_notes" TEXT,
    "opened_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "shifts_opened_by_user_id_fkey" FOREIGN KEY ("opened_by_user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shifts_closed_by_user_id_fkey" FOREIGN KEY ("closed_by_user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "shifts_status_idx" ON "shifts"("status");
CREATE INDEX "shifts_opened_at_idx" ON "shifts"("opened_at");
CREATE INDEX "shifts_closed_at_idx" ON "shifts"("closed_at");
