-- Add ingredient stock tracking and recipe links for menu items.

CREATE TABLE "ingredients" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "unit" TEXT NOT NULL,
  "current_stock" DECIMAL NOT NULL DEFAULT 0,
  "min_stock_level" DECIMAL NOT NULL DEFAULT 0,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

CREATE TABLE "menu_item_ingredients" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "menu_item_id" INTEGER NOT NULL,
  "ingredient_id" INTEGER NOT NULL,
  "quantity" DECIMAL NOT NULL,
  CONSTRAINT "menu_item_ingredients_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "menu_item_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "menu_item_ingredients_menu_item_id_ingredient_id_key" ON "menu_item_ingredients"("menu_item_id", "ingredient_id");
CREATE INDEX "menu_item_ingredients_ingredient_id_idx" ON "menu_item_ingredients"("ingredient_id");

CREATE TABLE "stock_movements" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "ingredient_id" INTEGER NOT NULL,
  "type" TEXT NOT NULL,
  "quantity" DECIMAL NOT NULL,
  "reference_type" TEXT,
  "reference_id" INTEGER,
  "note" TEXT,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "stock_movements_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "stock_movements_ingredient_id_idx" ON "stock_movements"("ingredient_id");
CREATE INDEX "stock_movements_type_idx" ON "stock_movements"("type");

ALTER TABLE "orders" ADD COLUMN "stock_deducted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "purchase_items" ADD COLUMN "ingredient_id" INTEGER;

CREATE INDEX "purchase_items_ingredient_id_idx" ON "purchase_items"("ingredient_id");
