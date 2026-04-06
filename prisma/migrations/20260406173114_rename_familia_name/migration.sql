/*
  Warnings:

  - You are about to drop the column `nombreApellido` on the `Familia` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Familia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Familia" DROP COLUMN "nombreApellido",
ADD COLUMN     "nombre" TEXT NOT NULL;
