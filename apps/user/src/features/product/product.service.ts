import { http } from "@/services/http";
import type { ProductDetail } from "./product.types";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getProductDetail(slug: string) {
  const response = await http.get<ApiResponse<ProductDetail>>(`/products/${slug}`);
  return response.data.data;
}
