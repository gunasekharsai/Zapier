/*
  Warnings:

  - Added the required column `image` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `AvailableTriggers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AvailableTriggers" ADD COLUMN     "image" TEXT NOT NULL;
