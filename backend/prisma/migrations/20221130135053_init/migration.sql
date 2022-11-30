/*
  Warnings:

  - You are about to drop the column `pokemonId` on the `teams` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainerId" TEXT NOT NULL,
    "pokemonName" TEXT,
    CONSTRAINT "teams_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teams_pokemonName_fkey" FOREIGN KEY ("pokemonName") REFERENCES "pokemons" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_teams" ("id", "trainerId") SELECT "id", "trainerId" FROM "teams";
DROP TABLE "teams";
ALTER TABLE "new_teams" RENAME TO "teams";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
