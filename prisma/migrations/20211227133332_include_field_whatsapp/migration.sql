/*
  Warnings:

  - Added the required column `greeting_message` to the `whatsapps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "whatsapps" ADD COLUMN     "greeting_message" TEXT NOT NULL;
