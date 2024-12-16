/*
  Warnings:

  - You are about to drop the column `sousCategorieId` on the `Produit` table. All the data in the column will be lost.
  - Added the required column `sousSousCategorieId` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_sousCategorieId_fkey";

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "sousCategorieId",
ADD COLUMN     "sousSousCategorieId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SousSousCategorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "sousCategorieId" INTEGER NOT NULL,
    "photo" TEXT,

    CONSTRAINT "SousSousCategorie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SousSousCategorie_nom_key" ON "SousSousCategorie"("nom");

-- AddForeignKey
ALTER TABLE "SousSousCategorie" ADD CONSTRAINT "SousSousCategorie_sousCategorieId_fkey" FOREIGN KEY ("sousCategorieId") REFERENCES "SousCategorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_sousSousCategorieId_fkey" FOREIGN KEY ("sousSousCategorieId") REFERENCES "SousSousCategorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
