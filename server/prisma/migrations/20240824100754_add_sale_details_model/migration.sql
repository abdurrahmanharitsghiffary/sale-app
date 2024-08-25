/*
  Warnings:

  - You are about to drop the `_ProductToSale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToSale" DROP CONSTRAINT "_ProductToSale_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSale" DROP CONSTRAINT "_ProductToSale_B_fkey";

-- DropTable
DROP TABLE "_ProductToSale";

-- CreateTable
CREATE TABLE "sale_details" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "sale_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sale_details" ADD CONSTRAINT "sale_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_details" ADD CONSTRAINT "sale_details_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
