/*
  Warnings:

  - You are about to drop the column `actionId` on the `AvailableAction` table. All the data in the column will be lost.
  - Added the required column `name` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" DROP COLUMN "actionId",
ADD COLUMN     "name" TEXT NOT NULL;
