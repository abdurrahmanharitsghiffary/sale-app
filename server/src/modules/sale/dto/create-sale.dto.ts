import { z } from 'zod';

class SaleItemDto {
  product_id: number;
  quantity: number;
  price: number;
}

export const saleItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number(),
  price: z.number(),
});
export type SaleItemSchema = z.infer<typeof saleItemSchema>;

export const createSaleSchema = z.object({
  transaction_date: z.string().optional(),
  customer_name: z.string().max(150),
  tax: z.string(),
  discount: z.string(),
  details: z.array(saleItemSchema).min(1),
});
export type CreateSaleSchema = z.infer<typeof createSaleSchema>;

// invoice_id: string;
export class CreateSaleDto {
  transaction_date?: Date;
  customer_name: string;
  tax: string;
  discount: string;
  details: SaleItemDto[];
}
