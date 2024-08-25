/*
  Warnings:

  - A unique constraint covering the columns `[invoice_id]` on the table `sales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sales_invoice_id_key" ON "sales"("invoice_id");
