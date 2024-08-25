-- DropForeignKey
ALTER TABLE "sale_details" DROP CONSTRAINT "sale_details_product_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_details" DROP CONSTRAINT "sale_details_sale_id_fkey";

-- AddForeignKey
ALTER TABLE "sale_details" ADD CONSTRAINT "sale_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_details" ADD CONSTRAINT "sale_details_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
