import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeyStore({
  product: {
    detail: (productId: number) => ["PRODUCT", productId],
    list: (filters: any) => ({
      queryKey: ["PRODUCT", { filters }],
    }),
  },
  sale: {
    detail: (saleId: number) => ["SALE", saleId],
    list: (filters: any) => ({
      queryKey: ["SALE", { filters }],
    }),
  },
});
