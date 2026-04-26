CREATE TABLE "staff_attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "attendance_date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "check_in" TEXT,
    "check_out" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "staff_attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "staff_attendance_user_id_attendance_date_key" ON "staff_attendance"("user_id", "attendance_date");
CREATE INDEX "staff_attendance_attendance_date_idx" ON "staff_attendance"("attendance_date");
