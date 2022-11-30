/*
  Warnings:

  - Added the required column `name` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "teamId" TEXT,
    CONSTRAINT "pokemons_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pokemons" ("data", "id", "teamId") SELECT "data", "id", "teamId" FROM "pokemons";
DROP TABLE "pokemons";
ALTER TABLE "new_pokemons" RENAME TO "pokemons";
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
