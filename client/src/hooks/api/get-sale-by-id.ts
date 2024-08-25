"use client";

import { queryKeys } from "@/libs/query-key-factory";
import { SaleServiceApi } from "@/services/sale-service.api";
import { useQuery } from "@tanstack/react-query";

export const useGetSaleById = (saleId: number) => {
  const saleServiceApi = new SaleServiceApi();

  return useQuery({
    queryKey: queryKeys.sale.detail(saleId).queryKey,
    queryFn: () => saleServiceApi.findOne(saleId),
  });
};
