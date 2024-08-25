import { ApiPaginationResponse } from "@/interfaces/api-response/api-pagination-response";
import { ApiResponse } from "@/interfaces/api-response/api-response";
import { CreateSaleSchema, UpdateSaleSchema } from "@/interfaces/dto/sale.dto";
import { SaleResponse } from "@/interfaces/sale/sale-response";
import { api } from "@/libs/axios";
import { getUrl } from "@/libs/get-url";

export interface FindAllOptionsDto {
  limit?: number;
  page?: number;
  sort_by?: "ASC" | "DESC";
  order_by?: string;
  search?: string;
}

export class SaleServiceApi {
  async findOne(id: number) {
    const response = await api.get<ApiResponse<SaleResponse>>(
      getUrl("/sale", id)
    );
    return response.data;
  }

  async findAll(options?: FindAllOptionsDto) {
    const response = await api.get<ApiPaginationResponse<SaleResponse[]>>(
      getUrl("/sale"),
      { params: options }
    );
    return response.data;
  }

  async destroy(id: number) {
    const response = await api.delete<ApiResponse<SaleResponse>>(
      getUrl("/sale", id)
    );
    return response.data;
  }

  async update(updateSaleDto: UpdateSaleSchema & { id: number }) {
    const response = await api.patch<ApiResponse<SaleResponse>>(
      getUrl("/sale", updateSaleDto.id),
      updateSaleDto
    );
    return response.data;
  }

  async create(createSaleDto: CreateSaleSchema) {
    const response = await api.post<ApiResponse<SaleResponse>>(
      getUrl("/sale"),
      createSaleDto
    );
    return response.data;
  }
}
