"use client";

import { queryKeys } from "@/libs/query-key-factory";
import { ProductServiceApi } from "@/services/product-service.api";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const productApiService = new ProductServiceApi();

  return useQuery({
    queryKey: queryKeys.product.list({}).queryKey,
    queryFn: () => productApiService.findAll(),
  });
};
