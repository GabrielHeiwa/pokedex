-- CreateTable
CREATE TABLE "trainners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainer_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainerId" TEXT NOT NULL,
    CONSTRAINT "teams_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pokemons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "teamId" TEXT,
    CONSTRAINT "pokemons_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
