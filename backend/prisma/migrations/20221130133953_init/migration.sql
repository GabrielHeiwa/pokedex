/*
  Warnings:

  - You are about to drop the column `teamId` on the `pokemons` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainerId" TEXT NOT NULL,
    "pokemonId" TEXT,
    CONSTRAINT "teams_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teams_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_teams" ("id", "trainerId") SELECT "id", "trainerId" FROM "teams";
DROP TABLE "teams";
ALTER TABLE "new_teams" RENAME TO "teams";
CREATE TABLE "new_pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL
);
INSERT INTO "new_pokemons" ("data", "id", "name") SELECT "data", "id", "name" FROM "pokemons";
DROP TABLE "pokemons";
ALTER TABLE "new_pokemons" RENAME TO "pokemons";
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
