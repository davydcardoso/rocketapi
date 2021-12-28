/*
  Warnings:

  - Added the required column `whatsappId` to the `whatsapps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "whatsapps" ADD COLUMN     "whatsappId" INTEGER NOT NULL;
