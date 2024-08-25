import { z } from "zod";

export const saleItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
  price: z.number().min(1),
});
export type SaleItemSchema = z.infer<typeof saleItemSchema>;

export const createSaleSchema = z.object({
  transaction_date: z.date().optional(),
  customer_name: z.string().min(2).max(150),
  tax: z
    .string()
    .regex(/^((100)|(\d{1,2}(.\d*)?))%$/, "Tax must be a percentage"),
  discount: z
    .string()
    .regex(/^((100)|(\d{1,2}(.\d*)?))%$/, "Discount must be a percentage"),
  details: z.array(saleItemSchema).min(1),
});
export type CreateSaleSchema = z.infer<typeof createSaleSchema>;

export const updateSaleSchema = createSaleSchema.partial();
export type UpdateSaleSchema = z.infer<typeof updateSaleSchema>;
