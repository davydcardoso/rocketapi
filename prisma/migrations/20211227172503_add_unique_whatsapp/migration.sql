/*
  Warnings:

  - A unique constraint covering the columns `[whatsappId]` on the table `whatsapps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "whatsapps_whatsappId_key" ON "whatsapps"("whatsappId");
