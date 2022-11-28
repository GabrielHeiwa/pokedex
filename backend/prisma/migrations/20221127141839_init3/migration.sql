/*
  Warnings:

  - A unique constraint covering the columns `[trainer_name]` on the table `trainners` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "trainners_trainer_name_key" ON "trainners"("trainer_name");
