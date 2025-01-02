/*
  Warnings:

  - You are about to drop the column `capacidade` on the `Onibus` table. All the data in the column will be lost.
  - Added the required column `numero` to the `Onibus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Onibus" DROP COLUMN "capacidade",
ADD COLUMN     "numero" TEXT NOT NULL;
