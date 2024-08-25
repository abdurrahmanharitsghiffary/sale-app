import { ApiPaginationResponse } from "@/interfaces/api-response/api-pagination-response";
import { ApiResponse } from "@/interfaces/api-response/api-response";
import { ProductResponse } from "@/interfaces/product/product-response";
import { api } from "@/libs/axios";
import { getUrl } from "@/libs/get-url";

export class ProductServiceApi {
  async findOne(id: number) {
    const response = await api.get<ApiResponse<ProductResponse>>(
      getUrl("product", id)
    );
    return response.data;
  }

  async findAll() {
    const response = await api.get<ApiPaginationResponse<ProductResponse[]>>(
      getUrl("product")
    );
    return response.data;
  }

  //   async destroy(id: number) {
  //     const response = await api.delete<ApiResponse<ProductResponse>>(
  //       getUrl("product", id)
  //     );
  //     return response.data;
  //   }

  //   async update(updateSaleDto: UpdateSaleSchema & { id: number }) {
  //     const response = await api.patch<ApiResponse<ProductResponse>>(
  //       getUrl("product", updateSaleDto.id),
  //       updateSaleDto
  //     );
  //     return response.data;
  //   }

  //   async create(createSaleDto: CreateSaleSchema) {
  //     const response = await api.post<ApiResponse<ProductResponse>>(
  //       getUrl("product"),
  //       createSaleDto
  //     );
  //     return response.data;
  //   }
}
