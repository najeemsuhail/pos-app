CREATE TABLE "bill_sequences" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "business_date" TEXT NOT NULL,
    "last_number" INTEGER NOT NULL DEFAULT 0,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "bill_sequences_business_date_key" ON "bill_sequences"("business_date");
