-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trainners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainer_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT
);
INSERT INTO "new_trainners" ("access_token", "id", "password", "refresh_token", "trainer_name") SELECT "access_token", "id", "password", "refresh_token", "trainer_name" FROM "trainners";
DROP TABLE "trainners";
ALTER TABLE "new_trainners" RENAME TO "trainners";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
