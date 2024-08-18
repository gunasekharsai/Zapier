/*
  Warnings:

  - Added the required column `metadata` to the `Zaprun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zaprun" ADD COLUMN     "metadata" JSONB NOT NULL;
