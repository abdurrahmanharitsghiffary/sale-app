/*
  Warnings:

  - The primary key for the `sale_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sale_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sale_details" DROP CONSTRAINT "sale_details_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sale_details_pkey" PRIMARY KEY ("product_id", "sale_id");
