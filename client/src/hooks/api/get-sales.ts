"use client";

import { queryKeys } from "@/libs/query-key-factory";
import { FindAllOptionsDto, SaleServiceApi } from "@/services/sale-service.api";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = (options?: FindAllOptionsDto) => {
  const saleServiceApi = new SaleServiceApi();

  return useQuery({
    queryKey: queryKeys.sale.list(options).queryKey,
    queryFn: () => saleServiceApi.findAll(options),
  });
};
