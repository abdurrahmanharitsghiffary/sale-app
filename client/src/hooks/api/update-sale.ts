"use client";

import { queryKeys } from "@/libs/query-key-factory";
import { SaleServiceApi } from "@/services/sale-service.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSale = () => {
  const saleServiceApi = new SaleServiceApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saleServiceApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sale.list({}).queryKey,
      });
    },
  });
};
