export interface SaleResponse {
  details: {
    quantity: number;
    price: number;
    product_id: number;
  }[];
  id: number;
  transaction_date: Date;
  invoice_id: string;
  customer_name: string;
  tax: string;
  discount: string;
  updated_at: Date;
  total_price: number;
}
